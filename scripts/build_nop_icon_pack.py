"""Generate the NOP icon pack: website icons, the Houdini shelf icon and the pack preview page.

The NOP icon (owner choice, 2026-10-28) is a spiral spider web. Eight spokes leave the center of
the Houdini spiral, the web makes two turns to the outer row (turn radii 76, 208 and 385 px on the
512 canvas) with a 34px stroke and a gentle organic thickness wave. All geometry is computed here,
nothing is traced. Earlier designs and the scripts that explored them are in the git history.

1. Writes the master SVGs to ``design/nop-icon/``: ``nop-icon.svg`` (white web on orange) and
   ``nop-icon-cutout.svg`` (orange with the web cut out).
2. Writes vector SVG variants to ``design/nop-icon/pack/``:
   - ``nop-icon.svg``: 512x512 square icon (Houdini orange #FE4703 + white web)
   - ``favicon.svg``: 512x512 orange square with the spiderweb cut out (transparent web)
   - ``nop-icon-rounded.svg``: 512x512 rounded-square badge (rx=96, white web on orange)
   - ``nop-icon-circle.svg``: 512x512 circular badge (white web on orange)
   - ``nop-icon-transparent.svg`` (and the alias ``nop-icon-cutout.svg``): orange square with the spiderweb cut out
   - ``nop-icon-rounded-transparent.svg``: orange rounded square with the spiderweb cut out
   - ``nop-icon-circle-transparent.svg``: orange circle with the spiderweb cut out
   - ``nop-icon-transparent-white.svg``: white (#FFFFFF) square with the spiderweb cut out
   - ``nop-icon-transparent-dark.svg``: dark (#1E1E1E) square with the spiderweb cut out
   - ``safari-pinned-tab.svg``: black (#000000) square with the spiderweb cut out
3. Writes raster PNGs, multi-size ``favicon.ico``, ``og-image.png`` (1200x630), and
   ``site.webmanifest`` into ``design/nop-icon/pack/``.
4. Writes the icon pack showcase page to ``design/nop-icon/web.html``.
5. Copies the website icons into ``public/`` and writes the see-through icon as a 256px PNG for
   the Houdini shelf (``exporter/package/nop/icons/nop.png``).

Usage: ``python scripts/build_nop_icon_pack.py`` (needs numpy and Pillow).
"""

from __future__ import annotations

import json
import math
import random
import shutil
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT_DIR = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT_DIR / "design" / "nop-icon"
PACK_DIR = ICON_DIR / "pack"
SHELF_ICON = ROOT_DIR / "exporter" / "package" / "nop" / "icons" / "nop.png"
SHELF_ICON_PX = 256  # sharp on high-DPI screens; Houdini scales it down for the shelf

FINAL_NAME = "nop-icon"

SIZE = 512
ORANGE = "#FE4703"  # sampled from the Houdini app icon background
WHITE = "#FFFFFF"
DARK = "#1E1E1E"

HUB = (182.0, 316.0)  # center of the Houdini spiral on the 512x512 canvas
SPOKE_LEN = 600.0  # extends past every edge and corner of the 512x512 square
SAG_RATIO = 0.855  # midpoint radius as a fraction of the average endpoint radius (~14.5% inward sag)

Point = tuple[float, float]


def polar(hub: Point, angle_deg: float, radius: float) -> Point:
    """Point at ``radius`` from ``hub``; angles are math angles (0 = right, 90 = up)."""
    a = math.radians(angle_deg)
    return hub[0] + radius * math.cos(a), hub[1] - radius * math.sin(a)


def fmt(p: Point) -> str:
    return f"{p[0]:.1f} {p[1]:.1f}"


@dataclass
class SpiralWeb:
    """Spiral spider web: spokes from the hub and one spiral thread with a filled pinhole center."""

    hub: Point = HUB
    num_spokes: int = 8
    rotate: float = 22.5
    start_spoke: int = 5
    turn_radii: tuple[float, ...] = (76.0, 208.0, 385.0, 620.0, 900.0)
    turns: int = 5
    max_step: int = 20
    skip_steps: set[int] = field(default_factory=lambda: {14, 15, 16})
    stroke_w: float = 34.0
    fill_inner_steps: int = 5
    vert_sag_ratio: float | None = 0.79
    random_seed: int | None = 7
    # Asymmetric thickness wave: the organic feel of seed 7 without thin spots
    mod_plus_frac: float = 0.20
    mod_minus_frac: float = 0.12

    @property
    def step_angle(self) -> float:
        return 360.0 / self.num_spokes

    @property
    def center_ramp_steps(self) -> int:
        # Half a turn from the center (0) to turn_radii[0]
        return max(3, self.num_spokes // 2)

    def interp_radius(self, turn: float) -> float:
        if turn <= 0:
            return self.turn_radii[0] * max(0.0, 1.0 + turn)
        idx = int(turn)
        frac = turn - idx
        if idx >= len(self.turn_radii) - 1:
            step = self.turn_radii[-1] - self.turn_radii[-2]
            return self.turn_radii[-1] + step * (turn - (len(self.turn_radii) - 1))
        r0 = self.turn_radii[idx]
        r1 = self.turn_radii[idx + 1]
        return r0 + (r1 - r0) * frac

    def spiral_nodes(self) -> list[tuple[int, float, float]]:
        """``(spoke index, angle, radius)`` where the spiral crosses each spoke."""
        total_steps = min(self.turns * self.num_spokes, self.max_step)
        ramp = self.center_ramp_steps
        nodes: list[tuple[int, float, float]] = []
        for step in range(total_steps + 1):
            spoke_idx = (self.start_spoke + step) % self.num_spokes
            angle = self.rotate + (self.start_spoke + step) * self.step_angle
            if step >= ramp:
                turn = (step - ramp) / float(self.num_spokes)
            else:
                turn = -1.0 + step / float(ramp)
            nodes.append((spoke_idx, angle, self.interp_radius(turn)))
        return nodes

    def segment_sag(self, spoke_idx: int) -> float:
        # The segments that cross the left and right horizontal get the stronger "vertical dent"
        if self.vert_sag_ratio is not None and spoke_idx in (3, 7):
            return self.vert_sag_ratio
        return SAG_RATIO

    def segment_curve(self, s0: int, a0: float, r0: float, a1: float, r1: float) -> tuple[Point, Point, Point]:
        """Start, control and end point of the sagging quadratic thread between two spokes."""
        am = (a0 + a1) / 2.0
        rm = 0.5 * (r0 + r1) * self.segment_sag(s0)
        p0 = polar(self.hub, a0, r0)
        p1 = polar(self.hub, a1, r1)
        pm = polar(self.hub, am, rm)
        ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
        return p0, ctrl, p1

    def spoke_ends(self) -> list[tuple[Point, Point]]:
        return [(self.hub, polar(self.hub, self.rotate + i * self.step_angle, SPOKE_LEN)) for i in range(self.num_spokes)]

    def spokes_d(self) -> str:
        return " ".join(f"M {fmt(p0)} L {fmt(p1)}" for p0, p1 in self.spoke_ends())

    def inner_fill_curves(self) -> list[tuple[Point, Point, Point]]:
        nodes = self.spiral_nodes()[: self.fill_inner_steps + 1]
        return [self.segment_curve(s0, a0, r0, a1, r1) for (s0, a0, r0), (_, a1, r1) in zip(nodes, nodes[1:])]

    def inner_fill_d(self) -> str:
        """Filled pinhole at the center, bounded by the first spiral segments."""
        if self.fill_inner_steps <= 0:
            return ""
        segs = [f"M {fmt(self.hub)}"]
        segs.extend(f"Q {fmt(ctrl)} {fmt(p1)}" for _, ctrl, p1 in self.inner_fill_curves())
        segs.append("Z")
        return " ".join(segs)

    def spiral_strokes(self) -> list[tuple[Point, Point, Point, float]]:
        """The spiral as short quadratic pieces ``(start, control, end, stroke width)``."""
        nodes = self.spiral_nodes()
        rnd = random.Random(self.random_seed or 7)
        phases = [(rnd.uniform(0, 6.28), rnd.uniform(1.8, 3.4)) for _ in range(5)]
        strokes: list[tuple[Point, Point, Point, float]] = []
        sub = 6

        for k, ((s0, a0, r0), (_, a1, r1)) in enumerate(zip(nodes, nodes[1:])):
            p0, ctrl, p1 = self.segment_curve(s0, a0, r0, a1, r1)

            if k in self.skip_steps:
                p0_in = 0.0 <= p0[0] <= SIZE and 0.0 <= p0[1] <= SIZE
                p1_in = 0.0 <= p1[0] <= SIZE and 0.0 <= p1[1] <= SIZE
                if not p0_in and not p1_in:
                    continue

            def qpt(t: float, p0: Point = p0, ctrl: Point = ctrl, p1: Point = p1) -> Point:
                mt = 1.0 - t
                return (
                    mt * mt * p0[0] + 2 * mt * t * ctrl[0] + t * t * p1[0],
                    mt * mt * p0[1] + 2 * mt * t * ctrl[1] + t * t * p1[1],
                )

            for s in range(sub):
                t0 = s / sub
                t1 = (s + 1) / sub
                tm = 0.5 * (t0 + t1)
                qa = qpt(t0)
                qb = qpt(t1)
                qm = qpt(tm)
                qctrl = (2 * qm[0] - 0.5 * (qa[0] + qb[0]), 2 * qm[1] - 0.5 * (qa[1] + qb[1]))
                if self.random_seed is not None:
                    wave = sum(math.sin(freq * k * 0.45 + freq * tm * 0.45 + ph) for ph, freq in phases) / len(phases)
                    ramp = min(1.0, max(0.0, (k + tm - 3.0) / 3.0))
                    if wave >= 0:
                        delta = self.stroke_w * self.mod_plus_frac * (wave / 0.59) * ramp
                    else:
                        delta = self.stroke_w * self.mod_minus_frac * (wave / 0.55) * ramp
                    w = self.stroke_w + delta
                else:
                    w = self.stroke_w
                strokes.append((qa, qctrl, qb, w))
        return strokes

    def spiral_subpaths(self, stroke_color: str) -> list[str]:
        return [
            f'<path d="M {fmt(qa)} Q {fmt(qctrl)} {fmt(qb)}" fill="none" stroke="{stroke_color}" '
            f'stroke-width="{w:.1f}" stroke-linecap="round" stroke-linejoin="round"/>'
            for qa, qctrl, qb, w in self.spiral_strokes()
        ]


FINAL_WEB = SpiralWeb()


def shape_element(shape: str, fill: str, extra_attrs: str = "", corner_rx: int = 96) -> str:
    extra = f" {extra_attrs}" if extra_attrs else ""
    if shape == "rounded":
        return f'<rect width="{SIZE}" height="{SIZE}" rx="{corner_rx}" fill="{fill}"{extra}/>'
    if shape == "circle":
        half = SIZE // 2
        return f'<circle cx="{half}" cy="{half}" r="{half}" fill="{fill}"{extra}/>'
    return f'<rect width="{SIZE}" height="{SIZE}" fill="{fill}"{extra}/>'


def build_svg_variant(
    web: SpiralWeb,
    *,
    bg_color: str = ORANGE,
    fg_color: str | None = WHITE,  # None means the spiderweb is cut out (transparent) from bg_color
    shape: str = "square",  # "square" | "rounded" | "circle"
    corner_rx: int = 96,
) -> str:
    """Render an SVG variant of the final NOP spiderweb icon.

    When ``fg_color`` is ``None``, the spiderweb is punched out of ``bg_color`` with an SVG
    ``<mask>``, so everything is ``bg_color`` except the transparent web.
    """
    fill_d = web.inner_fill_d()
    if fg_color is None:
        # Cutout mask: white (opaque) everywhere, black (transparent) on the spiderweb
        common_mask = (
            f'fill="none" stroke="#000000" stroke-width="{web.stroke_w:g}" '
            'stroke-linecap="round" stroke-linejoin="round"'
        )
        lines = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
            "  <defs>",
            f'    <mask id="web-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="{SIZE}" height="{SIZE}">',
            f'      <rect width="{SIZE}" height="{SIZE}" fill="#FFFFFF"/>',
        ]
        if fill_d:
            lines.append(f'      <path d="{fill_d}" fill="#000000"/>')
        lines.append(f'      <path d="{web.spokes_d()}" {common_mask}/>')
        lines.extend("      " + sub_path for sub_path in web.spiral_subpaths("#000000"))
        mask_attr = 'mask="url(#web-cutout)"'
        lines.extend([
            "    </mask>",
            "  </defs>",
            f"  {shape_element(shape, bg_color, extra_attrs=mask_attr, corner_rx=corner_rx)}",
            "</svg>",
            "",
        ])
        return "\n".join(lines)

    clip_shape = shape_element(shape, bg_color, corner_rx=corner_rx).replace(f' fill="{bg_color}"', "")
    lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
        f'  <clipPath id="canvas">{clip_shape}</clipPath>',
        '  <g clip-path="url(#canvas)">',
        f'    <rect width="{SIZE}" height="{SIZE}" fill="{bg_color}"/>',
    ]
    if fill_d:
        lines.append(f'    <path d="{fill_d}" fill="{fg_color}"/>')
    common = (
        f'fill="none" stroke="{fg_color}" stroke-width="{web.stroke_w:g}" '
        'stroke-linecap="round" stroke-linejoin="round"'
    )
    lines.append(f'    <path d="{web.spokes_d()}" {common}/>')
    lines.extend("    " + sub_path for sub_path in web.spiral_subpaths(fg_color))
    lines.extend([
        "  </g>",
        "</svg>",
        "",
    ])
    return "\n".join(lines)


def quad_points(p0: Point, ctrl: Point, p1: Point, steps: int) -> list[Point]:
    """``steps + 1`` points along a quadratic curve, both ends included."""
    pts: list[Point] = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1.0 - t
        pts.append((
            mt * mt * p0[0] + 2 * mt * t * ctrl[0] + t * t * p1[0],
            mt * mt * p0[1] + 2 * mt * t * ctrl[1] + t * t * p1[1],
        ))
    return pts


def render_web_alpha_mask(web: SpiralWeb, out_px: int = 1024) -> np.ndarray:
    """Anti-aliased float alpha mask (0..1) of the spiderweb at ``out_px``, matching the SVG geometry."""
    scale = out_px / SIZE
    # Round-capped line segments (x0, y0, x1, y1, half width), like the SVG strokes
    segs: list[tuple[float, float, float, float, float]] = []
    for p0, p1 in web.spoke_ends():
        segs.append((p0[0], p0[1], p1[0], p1[1], web.stroke_w / 2.0))
    for qa, qctrl, qb, w in web.spiral_strokes():
        pts = quad_points(qa, qctrl, qb, 4)
        for a, b in zip(pts, pts[1:]):
            segs.append((a[0], a[1], b[0], b[1], w / 2.0))

    coords = (np.arange(out_px, dtype=np.float32) + 0.5) / scale
    gx, gy = np.meshgrid(coords, coords)
    signed_dist = np.full((out_px, out_px), 1e6, dtype=np.float32)
    for x0, y0, x1, y1, hw in segs:
        vx, vy = x1 - x0, y1 - y0
        l2 = vx * vx + vy * vy
        if l2 == 0:
            d = np.hypot(gx - x0, gy - y0) - hw
        else:
            t = np.clip(((gx - x0) * vx + (gy - y0) * vy) / l2, 0.0, 1.0)
            d = np.hypot(gx - (x0 + t * vx), gy - (y0 + t * vy)) - hw
        signed_dist = np.minimum(signed_dist, d)

    aa_half = 0.5 / scale
    alpha = np.clip(0.5 - signed_dist / (2.0 * aa_half), 0.0, 1.0)

    # Filled pinhole at the center
    inner_img = Image.new("L", (out_px, out_px), 0)
    poly_pts: list[Point] = [(web.hub[0] * scale, web.hub[1] * scale)]
    for p0, ctrl, p1 in web.inner_fill_curves():
        poly_pts.extend((x * scale, y * scale) for x, y in quad_points(p0, ctrl, p1, 8)[1:])
    ImageDraw.Draw(inner_img).polygon(poly_pts, fill=255)
    inner_alpha = np.asarray(inner_img, dtype=np.float32) / 255.0
    return np.maximum(alpha, inner_alpha)


def hex_rgb(hex_color: str) -> tuple[int, int, int]:
    h = hex_color.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def make_shape_mask(out_px: int, shape: str = "square", corner_rx_512: float = 96.0) -> np.ndarray:
    """Anti-aliased shape alpha mask (square, rounded, or circle) at ``out_px``."""
    if shape == "square":
        return np.ones((out_px, out_px), dtype=np.float32)
    scale = out_px / SIZE
    coords = (np.arange(out_px, dtype=np.float32) + 0.5) / scale
    gx, gy = np.meshgrid(coords, coords)
    half = SIZE / 2.0
    if shape == "circle":
        d = np.hypot(gx - half, gy - half) - half
    else:
        r = corner_rx_512
        qx = np.abs(gx - half) - (half - r)
        qy = np.abs(gy - half) - (half - r)
        d = np.hypot(np.maximum(qx, 0.0), np.maximum(qy, 0.0)) + np.minimum(np.maximum(qx, qy), 0.0) - r
    aa_half = 0.5 / scale
    return np.clip(0.5 - d / (2.0 * aa_half), 0.0, 1.0)


def compose_rgba(
    web_mask: np.ndarray,
    *,
    bg_color: str = ORANGE,
    fg_color: str | None = WHITE,  # None means the spiderweb is cut out (transparent) from bg_color
    shape: str = "square",
) -> Image.Image:
    """Compose a 1024x1024 RGBA PIL image from ``web_mask``."""
    out_px = web_mask.shape[0]
    shape_mask = make_shape_mask(out_px, shape=shape)
    br, bg, bb = hex_rgb(bg_color)
    rgba = np.zeros((out_px, out_px, 4), dtype=np.uint8)
    if fg_color is None:
        # Everything inside the shape is bg_color (e.g. orange), and the spiderweb itself is transparent
        a = shape_mask * (1.0 - web_mask)
        rgba[:, :, 0] = br
        rgba[:, :, 1] = bg
        rgba[:, :, 2] = bb
        rgba[:, :, 3] = np.round(a * 255.0).astype(np.uint8)
    else:
        fr, fg, fb = hex_rgb(fg_color)
        w = web_mask
        rgba[:, :, 0] = np.round(br * (1.0 - w) + fr * w).astype(np.uint8)
        rgba[:, :, 1] = np.round(bg * (1.0 - w) + fg * w).astype(np.uint8)
        rgba[:, :, 2] = np.round(bb * (1.0 - w) + fb * w).astype(np.uint8)
        rgba[:, :, 3] = np.round(shape_mask * 255.0).astype(np.uint8)
    return Image.fromarray(rgba, mode="RGBA")


def build_og_image(rounded_icon_1024: Image.Image) -> Image.Image:
    """Create a 1200x630 Open Graph social preview card with the rounded NOP icon centered."""
    w, h = 1200, 630
    card = Image.new("RGBA", (w, h), (30, 30, 30, 255))
    icon_size = 360
    icon = rounded_icon_1024.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    x = (w - icon_size) // 2
    y = (h - icon_size) // 2
    card.alpha_composite(icon, (x, y))
    return card.convert("RGB")


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    PACK_DIR.mkdir(parents=True, exist_ok=True)

    final_svg = build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="square")
    cutout_svg = build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="square")
    (ICON_DIR / f"{FINAL_NAME}.svg").write_text(final_svg, encoding="utf-8", newline="\n")
    (ICON_DIR / f"{FINAL_NAME}-cutout.svg").write_text(cutout_svg, encoding="utf-8", newline="\n")

    svg_variants = [
        ("nop-icon.svg", "Standard 512x512 square icon (Houdini orange #FE4703 + white web)", final_svg),
        ("favicon.svg", "Scalable SVG favicon (512x512 orange square with transparent web cutout)", cutout_svg),
        (
            "nop-icon-rounded.svg",
            "Rounded square app/navbar badge (rx=96, white web on orange)",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="rounded"),
        ),
        (
            "nop-icon-circle.svg",
            "Circular avatar / social badge (white web on orange)",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="circle"),
        ),
        (
            "nop-icon-transparent.svg",
            "Transparent cutout square: Houdini orange (#FE4703) square with the spiderweb cut out",
            cutout_svg,
        ),
        (
            "nop-icon-cutout.svg",
            "Transparent cutout square alias: Houdini orange (#FE4703) square with the spiderweb cut out",
            cutout_svg,
        ),
        (
            "nop-icon-rounded-transparent.svg",
            "Transparent cutout rounded square (rx=96): Houdini orange (#FE4703) with the spiderweb cut out",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="rounded"),
        ),
        (
            "nop-icon-circle-transparent.svg",
            "Transparent cutout circle: Houdini orange (#FE4703) circle with the spiderweb cut out",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="circle"),
        ),
        (
            "nop-icon-transparent-white.svg",
            "Monochrome white (#FFFFFF) square with the spiderweb cut out (for dark backgrounds)",
            build_svg_variant(FINAL_WEB, bg_color=WHITE, fg_color=None, shape="square"),
        ),
        (
            "nop-icon-transparent-dark.svg",
            "Monochrome dark (#1E1E1E) square with the spiderweb cut out (for light backgrounds)",
            build_svg_variant(FINAL_WEB, bg_color=DARK, fg_color=None, shape="square"),
        ),
        (
            "safari-pinned-tab.svg",
            "Monochrome black (#000000) square with the spiderweb cut out (Safari pinned tab mask)",
            build_svg_variant(FINAL_WEB, bg_color="#000000", fg_color=None, shape="square"),
        ),
    ]
    for filename, _, content in svg_variants:
        (PACK_DIR / filename).write_text(content, encoding="utf-8", newline="\n")

    # Render high-resolution master mask and raster pack
    web_mask = render_web_alpha_mask(FINAL_WEB, out_px=1024)
    master_square = compose_rgba(web_mask, bg_color=ORANGE, fg_color=WHITE, shape="square")
    master_rounded = compose_rgba(web_mask, bg_color=ORANGE, fg_color=WHITE, shape="rounded")
    master_circle = compose_rgba(web_mask, bg_color=ORANGE, fg_color=WHITE, shape="circle")
    master_cutout_square = compose_rgba(web_mask, bg_color=ORANGE, fg_color=None, shape="square")
    master_cutout_rounded = compose_rgba(web_mask, bg_color=ORANGE, fg_color=None, shape="rounded")
    master_cutout_circle = compose_rgba(web_mask, bg_color=ORANGE, fg_color=None, shape="circle")
    master_cutout_white = compose_rgba(web_mask, bg_color=WHITE, fg_color=None, shape="square")
    master_cutout_dark = compose_rgba(web_mask, bg_color=DARK, fg_color=None, shape="square")

    png_specs: list[tuple[str, Image.Image, int, str]] = [
        ("favicon-16x16.png", master_cutout_square, 16, "16x16 browser tab favicon (orange square with transparent web cutout)"),
        ("favicon-32x32.png", master_cutout_square, 32, "32x32 browser tab favicon (orange square with transparent web cutout)"),
        ("favicon-48x48.png", master_cutout_square, 48, "48x48 desktop shortcut icon (orange square with transparent web cutout)"),
        ("nop-icon-64.png", master_square, 64, "64x64 UI / toolbar icon"),
        ("nop-icon-128.png", master_square, 128, "128x128 store / badge icon"),
        ("apple-touch-icon.png", master_square, 180, "180x180 iOS / iPadOS home screen icon (solid orange + white web)"),
        ("android-chrome-192x192.png", master_square, 192, "192x192 Android / PWA home screen icon (solid orange + white web)"),
        ("nop-icon-256.png", master_square, 256, "256x256 desktop / documentation icon"),
        ("android-chrome-512x512.png", master_square, 512, "512x512 Android / PWA splash & store icon (solid orange + white web)"),
        ("nop-icon-512.png", master_square, 512, "512x512 standard square PNG (white web on orange)"),
        ("nop-icon-1024.png", master_square, 1024, "1024x1024 high-DPI master PNG (white web on orange)"),
        ("nop-icon-rounded-512.png", master_rounded, 512, "512x512 rounded square PNG (white web on orange)"),
        ("nop-icon-circle-512.png", master_circle, 512, "512x512 circular avatar PNG (white web on orange)"),
        ("nop-icon-transparent-512.png", master_cutout_square, 512, "512x512 orange square with transparent spiderweb cutout"),
        ("nop-icon-cutout-512.png", master_cutout_square, 512, "512x512 orange square with transparent spiderweb cutout (alias)"),
        ("nop-icon-transparent-1024.png", master_cutout_square, 1024, "1024x1024 orange square with transparent spiderweb cutout"),
        ("nop-icon-rounded-transparent-512.png", master_cutout_rounded, 512, "512x512 orange rounded square with transparent spiderweb cutout"),
        ("nop-icon-circle-transparent-512.png", master_cutout_circle, 512, "512x512 orange circle with transparent spiderweb cutout"),
        ("nop-icon-transparent-white-512.png", master_cutout_white, 512, "512x512 white square with transparent spiderweb cutout"),
        ("nop-icon-transparent-dark-512.png", master_cutout_dark, 512, "512x512 dark square with transparent spiderweb cutout"),
    ]
    for filename, source_img, px, _ in png_specs:
        resized = source_img if px == 1024 else source_img.resize((px, px), Image.Resampling.LANCZOS)
        resized.save(PACK_DIR / filename, format="PNG", optimize=True)

    # Houdini shelf icon: the see-through version as a PNG. The cutout SVG needs a <mask>, which the
    # Qt SVG renderer behind Houdini's icons may ignore (it would draw a plain orange square).
    shelf_icon = master_cutout_square.resize((SHELF_ICON_PX, SHELF_ICON_PX), Image.Resampling.LANCZOS)
    shelf_icon.save(SHELF_ICON, format="PNG", optimize=True)

    # Multi-resolution favicon.ico (16, 32, 48) from transparent cutout square
    ico_16 = master_cutout_square.resize((16, 16), Image.Resampling.LANCZOS)
    ico_32 = master_cutout_square.resize((32, 32), Image.Resampling.LANCZOS)
    ico_48 = master_cutout_square.resize((48, 48), Image.Resampling.LANCZOS)
    ico_48.save(PACK_DIR / "favicon.ico", format="ICO", append_images=[ico_16, ico_32], sizes=[(16, 16), (32, 32), (48, 48)])

    # Open Graph 1200x630 social preview image
    og_img = build_og_image(master_rounded)
    og_img.save(PACK_DIR / "og-image.png", format="PNG", optimize=True)

    # Web App Manifest (with relative icon paths so subpath hosting works)
    manifest = {
        "name": "NOP",
        "short_name": "NOP",
        "icons": [
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
        ],
        "theme_color": ORANGE,
        "background_color": DARK,
        "display": "standalone",
    }
    (PACK_DIR / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8", newline="\n")

    # Sync playground public/ assets
    public_dir = ICON_DIR.parent.parent / "public"
    if public_dir.is_dir():
        for pub_name in (
            "favicon.ico",
            "favicon.svg",
            "favicon-16x16.png",
            "favicon-32x32.png",
            "apple-touch-icon.png",
            "android-chrome-192x192.png",
            "android-chrome-512x512.png",
            "og-image.png",
            "site.webmanifest",
        ):
            shutil.copy2(PACK_DIR / pub_name, public_dir / pub_name)

    # Generate web.html showcase page
    head_snippet = """&lt;link rel="icon" href="/favicon.ico" sizes="32x32"&gt;
&lt;link rel="icon" href="/favicon.svg" type="image/svg+xml"&gt;
&lt;link rel="apple-touch-icon" href="/apple-touch-icon.png"&gt;
&lt;link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FE4703"&gt;
&lt;link rel="manifest" href="/site.webmanifest"&gt;
&lt;meta name="theme-color" content="#FE4703"&gt;
&lt;meta property="og:image" content="/og-image.png"&gt;"""

    svg_cards = []
    for filename, desc, _ in svg_variants:
        small = "".join(f"<img src='pack/{filename}' width='{n}' height='{n}' alt=''>" for n in (64, 32, 24, 16))
        light = "".join(f"<img src='pack/{filename}' width='{n}' height='{n}' alt=''>" for n in (32, 16))
        svg_cards.append(
            f"<div class='card'><code>{filename}</code><p>{desc}</p><div class='sizes'>"
            f"<img class='big checker' src='pack/{filename}' alt='{filename}'>{small}"
            f"<span class='light'>{light}</span></div></div>"
        )

    png_cards = []
    for filename, _, px, desc in png_specs:
        disp = min(px, 128)
        png_cards.append(
            f"<div class='card'><code>pack/{filename}</code><p>{desc} ({px}x{px})</p>"
            f"<div class='sizes'><img class='checker' src='pack/{filename}' width='{disp}' height='{disp}' alt='{filename}'></div></div>"
        )

    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NOP Final Icon Pack</title>
<style>
  body {{ margin: 0; padding: 24px 16px; background: #1e1e1e; color: #ddd; font: 14px/1.4 system-ui, sans-serif; }}
  h1 {{ font-size: 20px; margin: 0 0 4px; }}
  h2 {{ font-size: 16px; margin: 32px 0 6px; }}
  p {{ margin: 0 0 12px; color: #999; }}
  a {{ color: #fe4703; }}
  .row {{ display: flex; flex-wrap: wrap; gap: 16px; }}
  .card {{ background: #2b2b2b; border-radius: 8px; padding: 12px; max-width: 360px; }}
  .card code {{ display: block; margin-bottom: 4px; color: #eee; font-weight: 600; }}
  .sizes {{ display: flex; align-items: flex-end; gap: 10px; flex-wrap: wrap; }}
  .big {{ width: 160px; height: 160px; display: block; }}
  .checker {{ background: repeating-conic-gradient(#383838 0% 25%, #262626 0% 50%) 50% / 16px 16px; border-radius: 4px; }}
  .light {{ background: #f2f2f2; padding: 6px; border-radius: 4px; display: flex; gap: 6px; align-items: flex-end; }}
  pre {{ background: #141414; border: 1px solid #333; border-radius: 6px; padding: 12px; color: #ccc; overflow-x: auto; font-size: 13px; }}
</style></head><body>
<h1>NOP Final Icon Pack</h1>
<p>Chosen final icon: <code>{FINAL_NAME}.svg</code> and <code>{FINAL_NAME}-cutout.svg</code> (also saved as <code>pack/nop-icon.svg</code>, <code>pack/favicon.svg</code> and the Houdini shelf icon).</p>

<h2>1. Vector SVG Variants (<code>design/nop-icon/</code> &amp; <code>design/nop-icon/pack/</code>)</h2>
<div class="row">{"".join(svg_cards)}</div>

<h2>2. Website HTML <code>&lt;head&gt;</code> Snippet</h2>
<pre><code>{head_snippet}</code></pre>

<h2>3. Raster PNGs, <code>favicon.ico</code> &amp; Social Preview (<code>design/nop-icon/pack/</code>)</h2>
<div class="row">
  <div class="card"><code>pack/favicon.ico</code><p>Multi-size ICO (16x16, 32x32, 48x48)</p><div class="sizes"><img src="pack/favicon.ico" width="48" height="48" alt="favicon.ico"><img src="pack/favicon.ico" width="32" height="32" alt=""><img src="pack/favicon.ico" width="16" height="16" alt=""></div></div>
  <div class="card"><code>pack/og-image.png</code><p>Open Graph social card (1200x630)</p><div class="sizes"><img src="pack/og-image.png" width="300" height="158" alt="og-image.png" style="border-radius:4px"></div></div>
  {"".join(png_cards)}
</div>
</body></html>
"""
    (ICON_DIR / "web.html").write_text(html, encoding="utf-8", newline="\n")
    print(f"wrote {len(svg_variants)} SVGs, {len(png_specs)} PNGs, favicon.ico, og-image.png, and site.webmanifest to {PACK_DIR}")


if __name__ == "__main__":
    main()

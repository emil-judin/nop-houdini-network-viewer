"""Generate the NOP logo files: website icons and the Houdini shelf icon.

The NOP icon (owner choice, 2026-10-28) is a spiral spider web. Eight spokes leave the center of
the Houdini spiral, the web makes two turns to the outer row (turn radii 76, 208 and 385 px on the
512 canvas) with a 34px stroke and a gentle organic thickness wave. All geometry is computed here,
nothing is traced. The logo is the cutout: a square in the brand orange with the web cut out, so the
background shows through. Earlier designs and variants are in the git history.

Writes only the files that are used:

- ``design/nop-icon/nop-icon-cutout.svg``: the master SVG
- ``design/nop-icon/nop-icon-cutout-512.png``: input for ``scripts/build_og_image.py`` (link preview)
- ``public/favicon.svg`` (the master) and ``public/favicon.ico`` (16, 32, 48): browser tab icons
- ``public/apple-touch-icon.png``, ``public/android-chrome-192x192.png`` and ``-512x512.png``: home
  screen icons, the cutout drawn on the dark page color
- ``public/site.webmanifest``
- ``exporter/package/nop/icons/nop.png``: the Houdini shelf icon

Run ``scripts/build_og_image.py`` after this script to rebuild ``public/og-image.png``.

Usage: ``python scripts/build_nop_icon_pack.py`` (needs numpy and Pillow).
"""

from __future__ import annotations

import json
import math
import random
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT_DIR = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT_DIR / "design" / "nop-icon"
PUBLIC_DIR = ROOT_DIR / "public"
SHELF_ICON = ROOT_DIR / "exporter" / "package" / "nop" / "icons" / "nop.png"
SHELF_ICON_PX = 256  # sharp on high-DPI screens; Houdini scales it down for the shelf

FINAL_NAME = "nop-icon"

SIZE = 512
ORANGE = "#FF6600"  # brand orange: the web value of PMS 172 (was #FE4703, sampled from the Houdini app icon)
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


def build_cutout_svg(web: SpiralWeb, bg_color: str = ORANGE) -> str:
    """The NOP icon as SVG: a ``bg_color`` square with the spiderweb punched out by an SVG ``<mask>``."""
    fill_d = web.inner_fill_d()
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
    lines.extend([
        "    </mask>",
        "  </defs>",
        f'  <rect width="{SIZE}" height="{SIZE}" fill="{bg_color}" mask="url(#web-cutout)"/>',
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


def compose_rgba(web_mask: np.ndarray, *, bg_color: str = ORANGE, fg_color: str | None = None) -> Image.Image:
    """An RGBA square from ``web_mask``: ``bg_color`` with the web cut out (``fg_color`` None) or drawn in ``fg_color``."""
    out_px = web_mask.shape[0]
    br, bg, bb = hex_rgb(bg_color)
    rgba = np.zeros((out_px, out_px, 4), dtype=np.uint8)
    if fg_color is None:
        rgba[:, :, 0] = br
        rgba[:, :, 1] = bg
        rgba[:, :, 2] = bb
        rgba[:, :, 3] = np.round((1.0 - web_mask) * 255.0).astype(np.uint8)
    else:
        fr, fg, fb = hex_rgb(fg_color)
        w = web_mask
        rgba[:, :, 0] = np.round(br * (1.0 - w) + fr * w).astype(np.uint8)
        rgba[:, :, 1] = np.round(bg * (1.0 - w) + fg * w).astype(np.uint8)
        rgba[:, :, 2] = np.round(bb * (1.0 - w) + fb * w).astype(np.uint8)
        rgba[:, :, 3] = 255
    return Image.fromarray(rgba, mode="RGBA")


def save_png(img: Image.Image, px: int, path: Path) -> None:
    resized = img if img.width == px else img.resize((px, px), Image.Resampling.LANCZOS)
    resized.save(path, format="PNG", optimize=True)


def main() -> None:
    cutout_svg = build_cutout_svg(FINAL_WEB)
    for svg_path in (ICON_DIR / f"{FINAL_NAME}-cutout.svg", PUBLIC_DIR / "favicon.svg"):
        svg_path.write_text(cutout_svg, encoding="utf-8", newline="\n")

    web_mask = render_web_alpha_mask(FINAL_WEB, out_px=1024)
    cutout = compose_rgba(web_mask)
    # Home screen icons cannot be see-through (iOS fills transparency with black, Android puts the icon on a
    # white plate), so they draw the web in the dark page color: they look like the cutout icon on a dark page
    dark_web = compose_rgba(web_mask, fg_color=DARK)

    save_png(cutout, 512, ICON_DIR / f"{FINAL_NAME}-cutout-512.png")
    save_png(dark_web, 180, PUBLIC_DIR / "apple-touch-icon.png")
    save_png(dark_web, 192, PUBLIC_DIR / "android-chrome-192x192.png")
    save_png(dark_web, 512, PUBLIC_DIR / "android-chrome-512x512.png")
    # Houdini shelf icon: the see-through version as a PNG. The cutout SVG needs a <mask>, which the
    # Qt SVG renderer behind Houdini's icons may ignore (it would draw a plain orange square).
    save_png(cutout, SHELF_ICON_PX, SHELF_ICON)

    # Multi-resolution favicon.ico (16, 32, 48) from the cutout
    ico = [cutout.resize((n, n), Image.Resampling.LANCZOS) for n in (16, 32, 48)]
    ico[2].save(PUBLIC_DIR / "favicon.ico", format="ICO", append_images=ico[:2], sizes=[(16, 16), (32, 32), (48, 48)])

    # Web App Manifest (with relative icon paths so subpath hosting works)
    manifest = {
        "name": "NOP",
        "short_name": "NOP",
        "icons": [
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
            # The art fills the whole square and the hub sits inside the maskable safe zone (the middle 80%
            # circle), so Android can crop the same files to its icon shape instead of using a white plate
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
        "theme_color": ORANGE,
        "background_color": DARK,
        "display": "standalone",
    }
    (PUBLIC_DIR / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(f"wrote the NOP icon to {ICON_DIR}, {PUBLIC_DIR} and {SHELF_ICON}")


if __name__ == "__main__":
    main()

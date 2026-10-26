"""Archive prototype WOP icons and generate the production WOP website icon pack.

Final chosen design: ``wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-random-spiral.svg``

1. Moves all non-final prototype SVGs and old HTML preview pages in ``design/wop-icon/``
   into ``design/wop-icon/archive/`` (nothing is deleted).
2. Writes vector SVG variants in ``design/wop-icon/`` and ``design/wop-icon/pack/``:
   - ``wop-icon.svg`` (and ``favicon.svg``): 512x512 square icon (Houdini orange #FE4703 + white web)
   - ``wop-icon-rounded.svg``: 512x512 rounded-square badge (rx=96, white web on orange)
   - ``wop-icon-circle.svg``: 512x512 circular badge (white web on orange)
   - ``wop-icon-transparent.svg``: 512x512 Houdini orange (#FE4703) square with the spiderweb cut out (transparent web)
   - ``wop-icon-rounded-transparent.svg``: 512x512 Houdini orange (#FE4703) rounded square with the spiderweb cut out
   - ``wop-icon-circle-transparent.svg``: 512x512 Houdini orange (#FE4703) circle with the spiderweb cut out
   - ``wop-icon-transparent-white.svg``: 512x512 white (#FFFFFF) square with the spiderweb cut out
   - ``wop-icon-transparent-dark.svg``: 512x512 dark (#1E1E1E) square with the spiderweb cut out
   - ``safari-pinned-tab.svg``: 512x512 black (#000000) square with the spiderweb cut out
3. Writes raster PNGs, multi-size ``favicon.ico``, ``og-image.png`` (1200x630), and
   ``site.webmanifest`` into ``design/wop-icon/pack/``.
4. Writes the icon pack showcase page to ``design/wop-icon/web.html``.

Usage: ``python scripts/build_wop_icon_pack.py``
"""

from __future__ import annotations

import json
import math
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

from build_wop_icon_prototypes import ORANGE, SIZE, WHITE, fmt, polar
from build_wop_web_prototypes import SAG_RATIO, SPOKE_LEN, SpiralSpiderWeb

ROOT_DIR = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT_DIR / "design" / "wop-icon"
ARCHIVE_DIR = ICON_DIR / "archive"
PACK_DIR = ICON_DIR / "pack"

FINAL_SOURCE_NAME = "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-random-spiral.svg"
DARK = "#1E1E1E"

FINAL_WEB = SpiralSpiderWeb(
    rotate=22.5,
    from_center=True,
    turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
    stroke_w=22.0,
    random_seed=7,
    random_spokes=False,
    fill_inner_steps=5,
    vert_sag_ratio=0.79,
)


def shape_element(shape: str, fill: str, extra_attrs: str = "", corner_rx: int = 96) -> str:
    extra = f" {extra_attrs}" if extra_attrs else ""
    if shape == "rounded":
        return f'<rect width="{SIZE}" height="{SIZE}" rx="{corner_rx}" fill="{fill}"{extra}/>'
    if shape == "circle":
        half = SIZE // 2
        return f'<circle cx="{half}" cy="{half}" r="{half}" fill="{fill}"{extra}/>'
    return f'<rect width="{SIZE}" height="{SIZE}" fill="{fill}"{extra}/>'


def build_svg_variant(
    web: SpiralSpiderWeb,
    *,
    bg_color: str = ORANGE,
    fg_color: str | None = WHITE,  # None means the spiderweb is cut out (transparent) from bg_color
    shape: str = "square",         # "square" | "rounded" | "circle"
    corner_rx: int = 96,
) -> str:
    """Render an SVG variant of the final WOP spiderweb icon.

    When ``fg_color`` is ``None``, the spiderweb is punched out of ``bg_color`` using an
    SVG ``<mask>`` so everything is ``bg_color`` except the transparent web.
    """
    fill_d = web.inner_fill_d()
    if fg_color is None:
        # Cutout mask: white (opaque) everywhere, black (transparent) on the spiderweb
        common_mask = f'fill="none" stroke="#000000" stroke-width="{web.stroke_w:g}" stroke-linecap="round" stroke-linejoin="round"'
        lines = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
            '  <defs>',
            f'    <mask id="web-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="{SIZE}" height="{SIZE}">',
            f'      <rect width="{SIZE}" height="{SIZE}" fill="#FFFFFF"/>',
        ]
        if fill_d:
            lines.append(f'      <path d="{fill_d}" fill="#000000"/>')
        lines.append(f'      <path d="{web.spokes_d()}" {common_mask}/>')
        for path_line in web.variable_spiral_paths():
            lines.append("  " + path_line.replace(f'stroke="{WHITE}"', 'stroke="#000000"'))
        mask_attr = 'mask="url(#web-cutout)"'
        lines.extend([
            '    </mask>',
            '  </defs>',
            f'  {shape_element(shape, bg_color, extra_attrs=mask_attr, corner_rx=corner_rx)}',
            '</svg>',
            '',
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
    common = f'fill="none" stroke="{fg_color}" stroke-width="{web.stroke_w:g}" stroke-linecap="round" stroke-linejoin="round"'
    lines.append(f'    <path d="{web.spokes_d()}" {common}/>')
    for path_line in web.variable_spiral_paths():
        lines.append(path_line.replace(f'stroke="{WHITE}"', f'stroke="{fg_color}"'))
    lines.extend([
        '  </g>',
        '</svg>',
        '',
    ])
    return "\n".join(lines)


def render_web_alpha_mask(web: SpiralSpiderWeb, out_px: int = 1024) -> np.ndarray:
    """Compute a high-resolution anti-aliased float alpha mask (0..1) of the spiderweb at ``out_px``."""
    scale = out_px / SIZE
    segs: list[tuple[float, float, float, float, float]] = []

    # 1. 8 spokes
    nodes = web.spiral_nodes()
    first_r: dict[int, float] = {}
    for spoke_idx, _, r in nodes:
        if spoke_idx not in first_r:
            first_r[spoke_idx] = 0.0 if web.from_center else r
    for i in range(8):
        ang = web.rotate + i * 45.0
        p0 = polar(web.hub, ang, first_r[i])
        p1 = polar(web.hub, ang, SPOKE_LEN)
        segs.append((p0[0], p0[1], p1[0], p1[1], web.stroke_w / 2.0))

    # 2. Subdivided spiral segments
    import random
    rnd = random.Random(web.random_seed or 1)
    phases = [(rnd.uniform(0, 6.28), rnd.uniform(1.8, 3.4)) for _ in range(5)]
    sub = 6
    curve_steps = 4
    for k, ((s0, a0, r0), (_, a1, r1)) in enumerate(zip(nodes, nodes[1:])):
        if k in web.skip_steps:
            continue
        am = (a0 + a1) / 2.0
        sag = web.vert_sag_ratio if (web.vert_sag_ratio is not None and s0 in (3, 7)) else SAG_RATIO
        rm = 0.5 * (r0 + r1) * sag
        p0 = polar(web.hub, a0, r0)
        p1 = polar(web.hub, a1, r1)
        pm = polar(web.hub, am, rm)
        ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))

        def qpt(t: float) -> tuple[float, float]:
            mt = 1.0 - t
            return (
                mt * mt * p0[0] + 2 * mt * t * ctrl[0] + t * t * p1[0],
                mt * mt * p0[1] + 2 * mt * t * ctrl[1] + t * t * p1[1],
            )

        for s in range(sub):
            t0 = s / sub
            t1 = (s + 1) / sub
            tm = 0.5 * (t0 + t1)
            wave = sum(math.sin(freq * k * 0.45 + freq * tm * 0.45 + ph) for ph, freq in phases) / len(phases)
            ramp = min(1.0, max(0.0, (k + tm - 3.0) / 3.0))
            w = web.stroke_w + 11.0 * wave * ramp
            for cs in range(curve_steps):
                ta = t0 + (t1 - t0) * (cs / curve_steps)
                tb = t0 + (t1 - t0) * ((cs + 1) / curve_steps)
                qa = qpt(ta)
                qb = qpt(tb)
                segs.append((qa[0], qa[1], qb[0], qb[1], w / 2.0))

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
            px = x0 + t * vx
            py = y0 + t * vy
            d = np.hypot(gx - px, gy - py) - hw
        signed_dist = np.minimum(signed_dist, d)

    aa_half = 0.5 / scale
    alpha = np.clip(0.5 - signed_dist / (2.0 * aa_half), 0.0, 1.0)

    inner_img = Image.new("L", (out_px, out_px), 0)
    draw = ImageDraw.Draw(inner_img)
    poly_pts: list[tuple[float, float]] = [(web.hub[0] * scale, web.hub[1] * scale)]
    for (s0, a0, r0), (_, a1, r1) in zip(nodes[: web.fill_inner_steps], nodes[1 : web.fill_inner_steps + 1]):
        am = (a0 + a1) / 2.0
        sag = web.vert_sag_ratio if (web.vert_sag_ratio is not None and s0 in (3, 7)) else SAG_RATIO
        rm = 0.5 * (r0 + r1) * sag
        p0 = polar(web.hub, a0, r0)
        p1 = polar(web.hub, a1, r1)
        pm = polar(web.hub, am, rm)
        ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
        for step_i in range(1, 9):
            t = step_i / 8.0
            mt = 1.0 - t
            qx = mt * mt * p0[0] + 2 * mt * t * ctrl[0] + t * t * p1[0]
            qy = mt * mt * p0[1] + 2 * mt * t * ctrl[1] + t * t * p1[1]
            poly_pts.append((qx * scale, qy * scale))
    draw.polygon(poly_pts, fill=255)
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
    """Create a 1200x630 Open Graph social preview card with the rounded WOP icon centered."""
    w, h = 1200, 630
    card = Image.new("RGBA", (w, h), (30, 30, 30, 255))
    icon_size = 360
    icon = rounded_icon_1024.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    x = (w - icon_size) // 2
    y = (h - icon_size) // 2
    card.alpha_composite(icon, (x, y))
    return card.convert("RGB")


def archive_old_prototypes(keep_names: set[str]) -> int:
    """Move all non-final SVGs and old HTML pages into ``design/wop-icon/archive/``."""
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    moved = 0
    for item in list(ICON_DIR.iterdir()):
        if item.is_dir():
            continue
        if item.name == FINAL_SOURCE_NAME:
            shutil.copy2(item, ARCHIVE_DIR / item.name)
            continue
        if item.name not in keep_names:
            target = ARCHIVE_DIR / item.name
            if target.exists():
                target.unlink()
            shutil.move(str(item), str(target))
            moved += 1
    return moved


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    PACK_DIR.mkdir(parents=True, exist_ok=True)

    # Clean up old transparent files from pack/ if present
    for stale in ("wop-icon-transparent-orange.svg", "wop-icon-transparent-orange-512.png"):
        for folder in (ICON_DIR, PACK_DIR):
            p = folder / stale
            if p.exists():
                p.unlink()

    final_svg = build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="square")
    cutout_svg = build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="square")
    (ICON_DIR / FINAL_SOURCE_NAME).write_text(final_svg, encoding="utf-8")

    svg_variants = [
        ("wop-icon.svg", "Standard 512x512 square icon (Houdini orange #FE4703 + white web)", final_svg),
        ("favicon.svg", "Scalable SVG favicon (512x512 orange square with transparent web cutout)", cutout_svg),
        (
            "wop-icon-rounded.svg",
            "Rounded square app/navbar badge (rx=96, white web on orange)",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="rounded"),
        ),
        (
            "wop-icon-circle.svg",
            "Circular avatar / social badge (white web on orange)",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=WHITE, shape="circle"),
        ),
        (
            "wop-icon-transparent.svg",
            "Transparent cutout square: Houdini orange (#FE4703) square with the spiderweb cut out",
            cutout_svg,
        ),
        (
            "wop-icon-cutout.svg",
            "Transparent cutout square alias: Houdini orange (#FE4703) square with the spiderweb cut out",
            cutout_svg,
        ),
        (
            "wop-icon-rounded-transparent.svg",
            "Transparent cutout rounded square (rx=96): Houdini orange (#FE4703) with the spiderweb cut out",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="rounded"),
        ),
        (
            "wop-icon-circle-transparent.svg",
            "Transparent cutout circle: Houdini orange (#FE4703) circle with the spiderweb cut out",
            build_svg_variant(FINAL_WEB, bg_color=ORANGE, fg_color=None, shape="circle"),
        ),
        (
            "wop-icon-transparent-white.svg",
            "Monochrome white (#FFFFFF) square with the spiderweb cut out (for dark backgrounds)",
            build_svg_variant(FINAL_WEB, bg_color=WHITE, fg_color=None, shape="square"),
        ),
        (
            "wop-icon-transparent-dark.svg",
            "Monochrome dark (#1E1E1E) square with the spiderweb cut out (for light backgrounds)",
            build_svg_variant(FINAL_WEB, bg_color=DARK, fg_color=None, shape="square"),
        ),
        (
            "safari-pinned-tab.svg",
            "Monochrome black (#000000) square with the spiderweb cut out (Safari pinned tab mask)",
            build_svg_variant(FINAL_WEB, bg_color="#000000", fg_color=None, shape="square"),
        ),
    ]
    keep_names = {FINAL_SOURCE_NAME, "web.html"} | {name for name, _, _ in svg_variants}
    for filename, _, content in svg_variants:
        (ICON_DIR / filename).write_text(content, encoding="utf-8")
        (PACK_DIR / filename).write_text(content, encoding="utf-8")

    moved_count = archive_old_prototypes(keep_names)

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
        ("wop-icon-64.png", master_square, 64, "64x64 UI / toolbar icon"),
        ("wop-icon-128.png", master_square, 128, "128x128 store / badge icon"),
        ("apple-touch-icon.png", master_square, 180, "180x180 iOS / iPadOS home screen icon (solid orange + white web)"),
        ("android-chrome-192x192.png", master_square, 192, "192x192 Android / PWA home screen icon (solid orange + white web)"),
        ("wop-icon-256.png", master_square, 256, "256x256 desktop / documentation icon"),
        ("android-chrome-512x512.png", master_square, 512, "512x512 Android / PWA splash & store icon (solid orange + white web)"),
        ("wop-icon-512.png", master_square, 512, "512x512 standard square PNG (white web on orange)"),
        ("wop-icon-1024.png", master_square, 1024, "1024x1024 high-DPI master PNG (white web on orange)"),
        ("wop-icon-rounded-512.png", master_rounded, 512, "512x512 rounded square PNG (white web on orange)"),
        ("wop-icon-circle-512.png", master_circle, 512, "512x512 circular avatar PNG (white web on orange)"),
        ("wop-icon-transparent-512.png", master_cutout_square, 512, "512x512 orange square with transparent spiderweb cutout"),
        ("wop-icon-cutout-512.png", master_cutout_square, 512, "512x512 orange square with transparent spiderweb cutout (alias)"),
        ("wop-icon-transparent-1024.png", master_cutout_square, 1024, "1024x1024 orange square with transparent spiderweb cutout"),
        ("wop-icon-rounded-transparent-512.png", master_cutout_rounded, 512, "512x512 orange rounded square with transparent spiderweb cutout"),
        ("wop-icon-circle-transparent-512.png", master_cutout_circle, 512, "512x512 orange circle with transparent spiderweb cutout"),
        ("wop-icon-transparent-white-512.png", master_cutout_white, 512, "512x512 white square with transparent spiderweb cutout"),
        ("wop-icon-transparent-dark-512.png", master_cutout_dark, 512, "512x512 dark square with transparent spiderweb cutout"),
    ]
    for filename, source_img, px, _ in png_specs:
        resized = source_img if px == 1024 else source_img.resize((px, px), Image.Resampling.LANCZOS)
        resized.save(PACK_DIR / filename, format="PNG", optimize=True)

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
        "name": "WOP",
        "short_name": "WOP",
        "icons": [
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"},
        ],
        "theme_color": ORANGE,
        "background_color": DARK,
        "display": "standalone",
    }
    (PACK_DIR / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

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
        small = "".join(f"<img src='{filename}' width='{n}' height='{n}' alt=''>" for n in (64, 32, 24, 16))
        light = "".join(f"<img src='{filename}' width='{n}' height='{n}' alt=''>" for n in (32, 16))
        svg_cards.append(
            f"<div class='card'><code>{filename}</code><p>{desc}</p><div class='sizes'>"
            f"<img class='big checker' src='{filename}' alt='{filename}'>{small}"
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
<title>WOP Final Icon Pack</title>
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
<h1>WOP Final Icon Pack</h1>
<p>Chosen final icon: <code>{FINAL_SOURCE_NAME}</code> (also saved as <code>wop-icon.svg</code> and <code>favicon.svg</code>). All earlier prototypes are archived in <a href="archive/"><code>design/wop-icon/archive/</code></a>.</p>

<h2>1. Vector SVG Variants (<code>design/wop-icon/</code> &amp; <code>design/wop-icon/pack/</code>)</h2>
<div class="row">{"".join(svg_cards)}</div>

<h2>2. Website HTML <code>&lt;head&gt;</code> Snippet</h2>
<pre><code>{head_snippet}</code></pre>

<h2>3. Raster PNGs, <code>favicon.ico</code> &amp; Social Preview (<code>design/wop-icon/pack/</code>)</h2>
<div class="row">
  <div class="card"><code>pack/favicon.ico</code><p>Multi-size ICO (16x16, 32x32, 48x48)</p><div class="sizes"><img src="pack/favicon.ico" width="48" height="48" alt="favicon.ico"><img src="pack/favicon.ico" width="32" height="32" alt=""><img src="pack/favicon.ico" width="16" height="16" alt=""></div></div>
  <div class="card"><code>pack/og-image.png</code><p>Open Graph social card (1200x630)</p><div class="sizes"><img src="pack/og-image.png" width="300" height="158" alt="og-image.png" style="border-radius:4px"></div></div>
  {"".join(png_cards)}
</div>
</body></html>
"""
    (ICON_DIR / "web.html").write_text(html, encoding="utf-8")
    print(f"archived {moved_count} prototype files to {ARCHIVE_DIR}")
    print(f"wrote {len(svg_variants)} SVGs, {len(png_specs)} PNGs, favicon.ico, og-image.png, and site.webmanifest to {PACK_DIR}")


if __name__ == "__main__":
    main()

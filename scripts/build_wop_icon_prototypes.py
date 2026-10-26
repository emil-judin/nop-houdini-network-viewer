"""Generate WOP (web operator) icon prototypes: a white spider web on Houdini orange.

Writes one SVG per variant and stroke weight into ``design/wop-icon/`` plus an
``index.html`` preview that shows every SVG at several sizes on light and dark
backgrounds. All geometry is computed here, nothing is traced from other art.

Usage: ``python scripts/build_wop_icon_prototypes.py``
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass, field
from pathlib import Path

SIZE = 512
ORANGE = "#FE4703"  # sampled from the Houdini app icon background
WHITE = "#FFFFFF"
OUT_DIR = Path(__file__).resolve().parent.parent / "design" / "wop-icon"

Point = tuple[float, float]


def polar(hub: Point, angle_deg: float, radius: float) -> Point:
    """Point at ``radius`` from ``hub``; angles are math angles (0 = right, 90 = up)."""
    a = math.radians(angle_deg)
    return hub[0] + radius * math.cos(a), hub[1] - radius * math.sin(a)


def fmt(p: Point) -> str:
    return f"{p[0]:.1f} {p[1]:.1f}"


def sag_segment(hub: Point, a0: float, r0: float, a1: float, r1: float, sag: float) -> str:
    """Quadratic thread from spoke a0 to spoke a1 that sags toward the hub like real silk."""
    half = math.radians(abs(a1 - a0)) / 2
    mid_r = (r0 + r1) / 2 * math.cos(half) * (1 - sag)
    ctrl = polar(hub, (a0 + a1) / 2, mid_r)
    return f"Q {fmt(ctrl)} {fmt(polar(hub, a1, r1))}"


@dataclass
class Web:
    """One web design. Strokes are in px at the 512 canvas."""

    hub: Point
    angles: list[float]
    lengths: list[float]
    rings: list[float] = field(default_factory=list)  # fractions of each spoke length
    sag: float = 0.18
    spiral_turns: float = 0.0  # > 0 draws one spiral capture thread instead of rings
    spiral_start: float = 0.0  # spiral radius at the first spoke, fraction of length
    closed: bool = False  # True when spokes go all the way round the hub
    jitter: float = 0.0  # 0..1 hand-made irregularity on ring radii
    skip: set[tuple[int, int]] = field(default_factory=set)  # (ring, segment) gaps for a torn look
    seed: int = 7
    hub_gap: float = 0.0  # spokes start this far from the hub, so they do not merge into a blob
    round_frame: bool = False  # draw the outermost ring as one smooth arc instead of sagging silk

    def spokes(self) -> str:
        return " ".join(
            f"M {fmt(polar(self.hub, a, self.hub_gap))} L {fmt(polar(self.hub, a, l))}"
            for a, l in zip(self.angles, self.lengths)
        )

    def ring_paths(self) -> list[str]:
        rnd = random.Random(self.seed)
        n = len(self.angles)
        count = n if self.closed else n - 1
        paths = []
        for ri, frac in enumerate(self.rings):
            radii = [l * frac * (1 + self.jitter * rnd.uniform(-0.06, 0.06)) for l in self.lengths]
            d, pen_down = [], False
            for si in range(count):
                j = (si + 1) % n
                if (ri, si) in self.skip:
                    pen_down = False
                    continue
                a0, a1 = self.angles[si], self.angles[j]
                if self.closed and j == 0:
                    a1 += 360
                if not pen_down:
                    d.append(f"M {fmt(polar(self.hub, a0, radii[si]))}")
                    pen_down = True
                sag = self.sag
                if self.round_frame and ri == len(self.rings) - 1:
                    sag = 1 - 1 / math.cos(math.radians(abs(a1 - a0)) / 2) ** 2  # circular arc
                d.append(sag_segment(self.hub, a0, radii[si], a1, radii[j], sag))
            paths.append(" ".join(d))
        return paths

    def spiral_path(self) -> str:
        """Archimedean capture thread that steps outward a little at every spoke."""
        n = len(self.angles)
        steps = int(self.spiral_turns * n)
        frac_step = (1 - self.spiral_start) / steps
        d = []
        for k in range(steps):
            i, j = k % n, (k + 1) % n
            a0 = self.angles[i] + 360 * (k // n)
            a1 = self.angles[j] + 360 * ((k + 1) // n)
            r0 = self.lengths[i] * (self.spiral_start + frac_step * k)
            r1 = self.lengths[j] * (self.spiral_start + frac_step * (k + 1))
            if k == 0:
                d.append(f"M {fmt(polar(self.hub, a0, r0))}")
            d.append(sag_segment(self.hub, a0, r0, a1, r1, self.sag))
        return " ".join(d)

    def threads(self) -> str:
        if self.spiral_turns:
            return self.spiral_path()
        return " ".join(self.ring_paths())

    def outer_ring(self) -> str:
        return self.ring_paths()[-1] if self.rings else ""


def svg(web: Web, spoke_w: float, ring_w: float, frame_w: float | None = None) -> str:
    """Square icon. ``frame_w`` draws the outermost ring heavier, like the Houdini swirl band."""
    common = f'fill="none" stroke="{WHITE}" stroke-linecap="round" stroke-linejoin="round"'
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
        f'<rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}"/>',
        f'<path d="{web.spokes()}" {common} stroke-width="{spoke_w}"/>',
    ]
    if frame_w:
        inner = Web(**{**web.__dict__, "rings": web.rings[:-1]})
        parts.append(f'<path d="{inner.threads()}" {common} stroke-width="{ring_w}"/>')
        parts.append(f'<path d="{web.outer_ring()}" {common} stroke-width="{frame_w}"/>')
    else:
        parts.append(f'<path d="{web.threads()}" {common} stroke-width="{ring_w}"/>')
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


CORNER = (0.0, 512.0)

# Close to the reference: hub in the bottom-left corner, fan of nine spokes, seven sagging rings.
classic = Web(
    hub=CORNER,
    angles=[0, 13, 30, 47, 62, 77, 90],
    lengths=[500, 450, 395, 380, 395, 420, 440],
    rings=[0.17, 0.3, 0.44, 0.59, 0.78, 1.0],
    sag=0.22,
)

# Uniform spoke lengths so the outer thread can be one smooth band like the Houdini swirl.
framed = Web(
    hub=CORNER,
    angles=[0, 15, 30, 45, 60, 75, 90],
    lengths=[430] * 7,
    rings=[0.2, 0.36, 0.53, 0.72, 1.0],
    sag=0.2,
    round_frame=True,
)

# Few spokes and rings so it still reads at 16 to 32 px (favicon, node badge, shelf tool).
minimal = Web(
    hub=CORNER,
    angles=[0, 22, 45, 68, 90],
    lengths=[470, 430, 400, 430, 470],
    rings=[0.3, 0.6, 1.0],
    sag=0.2,
)

# Web reaches past the top-right corner and is cropped by the canvas, like the Houdini swirl.
full_bleed = Web(
    hub=(-20.0, 532.0),
    angles=[0, 12, 25, 38, 52, 65, 78, 90],
    lengths=[720] * 8,
    rings=[0.12, 0.22, 0.34, 0.47, 0.62, 0.79, 0.98],
    sag=0.14,
)

# Hand-made look: uneven spoke spacing and ring radii, two torn gaps.
organic = Web(
    hub=CORNER,
    angles=[0, 7, 19, 33, 41, 57, 66, 81, 90],
    lengths=[495, 455, 430, 360, 395, 370, 410, 430, 420],
    rings=[0.15, 0.26, 0.4, 0.53, 0.68, 0.83, 1.0],
    sag=0.2,
    jitter=1.0,
    skip={(3, 5), (5, 1)},
    seed=11,
)

# Houdini crossover: full round web with one spiral capture thread, hub where the swirl's
# center sits, cropped by the left and bottom edges.
swirl = Web(
    hub=(175.0, 335.0),
    angles=[float(a) for a in range(0, 360, 36)],
    lengths=[380.0] * 10,
    sag=0.06,
    spiral_turns=2.6,
    spiral_start=0.06,
    closed=True,
)

VARIANTS: list[tuple[str, str, Web, list[tuple[str, float, float, float | None]]]] = [
    ("classic", "Corner fan, close to the reference", classic,
     [("thin", 7, 7, None), ("regular", 12, 12, None), ("bold", 18, 18, None)]),
    ("minimal", "Fewer threads for 16 to 32 px", minimal,
     [("regular", 18, 18, None), ("bold", 28, 28, None), ("heavy", 40, 40, None)]),
    ("full-bleed", "Larger web cropped by the canvas", full_bleed,
     [("thin", 8, 8, None), ("regular", 13, 13, None), ("bold", 20, 20, None)]),
    ("organic", "Uneven, hand-made, two torn gaps", organic,
     [("thin", 7, 7, None), ("regular", 12, 12, None), ("bold", 18, 18, None)]),
    ("framed", "Heavy outer band echoes the Houdini swirl", framed,
     [("regular", 10, 9, 30), ("bold", 14, 12, 46), ("tapered", 18, 8, 18)]),
    ("swirl", "Spiral capture thread, Houdini swirl crossover", swirl,
     [("thin", 8, 10, None), ("regular", 10, 18, None), ("bold", 14, 28, None)]),
]

PREVIEW_HEAD = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WOP Icon Prototypes</title>
<style>
  body { margin: 0; padding: 24px 16px; background: #1e1e1e; color: #ddd; font: 14px/1.4 system-ui, sans-serif; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  h2 { font-size: 16px; margin: 32px 0 4px; }
  p { margin: 0 0 12px; color: #999; }
  .row { display: flex; flex-wrap: wrap; gap: 16px; }
  .card { background: #2b2b2b; border-radius: 8px; padding: 12px; }
  .card code { display: block; margin-bottom: 8px; color: #bbb; }
  .sizes { display: flex; align-items: flex-end; gap: 10px; }
  .big { width: 192px; height: 192px; display: block; }
  .light { background: #f2f2f2; padding: 6px; border-radius: 4px; display: flex; gap: 6px; align-items: flex-end; }
</style></head><body>
<h1>WOP icon prototypes</h1>
<p>Each card: 192 px, then 64, 32, 24 and 16 px on dark, and 32 / 16 px on light.</p>
"""


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    html = [PREVIEW_HEAD]
    for name, blurb, web, weights in VARIANTS:
        html.append(f"<h2>{name}</h2><p>{blurb}</p><div class='row'>")
        for weight, spoke_w, ring_w, frame_w in weights:
            file = f"wop-{name}-{weight}.svg"
            (OUT_DIR / file).write_text(svg(web, spoke_w, ring_w, frame_w), encoding="utf-8")
            small = "".join(f"<img src='{file}' width='{s}' height='{s}' alt=''>" for s in (64, 32, 24, 16))
            light = "".join(f"<img src='{file}' width='{s}' height='{s}' alt=''>" for s in (32, 16))
            html.append(
                f"<div class='card'><code>{file}</code><div class='sizes'>"
                f"<img class='big' src='{file}' alt='{name} {weight}'>{small}"
                f"<span class='light'>{light}</span></div></div>"
            )
        html.append("</div>")
    html.append("</body></html>\n")
    (OUT_DIR / "index.html").write_text("".join(html), encoding="utf-8")
    print(f"wrote {sum(len(v[3]) for v in VARIANTS)} SVGs and index.html to {OUT_DIR}")


if __name__ == "__main__":
    main()

"""Round 2 of the WOP icon: cleaner versions of the swirl web (spiral capture thread).

Fixes over ``wop-swirl-bold.svg``: spokes and spiral run off the canvas instead of stopping
inside it, spokes are rotated off the horizontal, the spiral has a constant pitch in pixels,
and the hub can be opened up so the spokes do not clump into a blob.

Writes ``design/wop-icon/wop-swirl2-*.svg`` and ``design/wop-icon/swirl.html``.

Usage: ``python scripts/build_wop_swirl_prototypes.py``
"""

from __future__ import annotations

import math
from dataclasses import dataclass

from build_wop_icon_prototypes import OUT_DIR, ORANGE, PREVIEW_HEAD, SIZE, WHITE, fmt, polar, sag_segment

SPOKE_LENGTH = 900  # always past the canvas, the edge crops it


@dataclass
class Swirl:
    """Round web with one spiral thread. Lengths are px at the 512 canvas."""

    hub: tuple[float, float] = (172.0, 330.0)  # where the Houdini swirl's center sits
    spokes: int = 10
    rotate: float = 9.0  # keeps spokes off the exact horizontal and vertical
    hub_gap: float = 0.0  # spokes start this far from the hub
    hub_dot: float = 0.0  # filled dot radius at the hub
    start: float = 30.0  # spiral radius where it begins
    pitch: float = 105.0  # spiral growth per full turn
    clockwise: bool = False
    sag: float = 0.06
    spoke_w: float = 14.0
    thread_w: float = 28.0
    thread_w_end: float | None = None  # thread widens toward the outside when set
    outer: float | None = None  # web ends at this radius (spokes stop on the last turn); None = full bleed
    frame: bool = False  # with ``outer``: closed ring at ``outer``, spokes end on it
    frame_w: float | None = None  # ring stroke, defaults to the thread width

    def max_radius(self) -> float:
        hx, hy = self.hub
        return max(math.hypot(x - hx, y - hy) for x in (0, SIZE) for y in (0, SIZE))

    def thread_points(self) -> list[tuple[int, float, float]]:
        """(spoke index, angle, radius) where the spiral crosses each spoke, inside out."""
        sign = -1 if self.clockwise else 1
        limit = self.max_radius() + self.thread_w * 2
        if self.outer:
            limit = self.outer - (self.pitch * 0.55 if self.frame else 0)
        points, k = [], 0
        while (r := self.start + self.pitch * k / self.spokes) <= limit:
            points.append(((sign * k) % self.spokes, self.rotate + sign * k * 360 / self.spokes, r))
            k += 1
        return points

    def spoke_path(self) -> str:
        lengths = [float(SPOKE_LENGTH)] * self.spokes
        if self.outer:
            for i, _, r in self.thread_points():
                lengths[i] = r  # last crossing wins, so each spoke ends on the outermost turn
            if self.frame:
                lengths = [self.outer] * self.spokes
        step = 360 / self.spokes
        return " ".join(
            f"M {fmt(polar(self.hub, self.rotate + i * step, self.hub_gap))} "
            f"L {fmt(polar(self.hub, self.rotate + i * step, lengths[i]))}"
            for i in range(self.spokes)
        )

    def thread_segments(self) -> list[tuple[str, str]]:
        """(start point, segment) pairs from the inside out."""
        pts = self.thread_points()
        return [
            (f"M {fmt(polar(self.hub, a0, r0))}", sag_segment(self.hub, a0, r0, a1, r1, self.sag))
            for (_, a0, r0), (_, a1, r1) in zip(pts, pts[1:])
        ]


def swirl_svg(s: Swirl) -> str:
    common = f'fill="none" stroke="{WHITE}" stroke-linecap="round" stroke-linejoin="round"'
    segs = s.thread_segments()
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
        f'<clipPath id="c"><rect width="{SIZE}" height="{SIZE}"/></clipPath>',
        f'<rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}"/>',
        '<g clip-path="url(#c)">',
        f'<path d="{s.spoke_path()}" {common} stroke-width="{s.spoke_w}"/>',
    ]
    if s.thread_w_end is None:
        d = segs[0][0] + " " + " ".join(seg for _, seg in segs)
        parts.append(f'<path d="{d}" {common} stroke-width="{s.thread_w}"/>')
    else:
        # One path per segment so the width can grow; round caps hide the joints.
        for i, (move, seg) in enumerate(segs):
            w = s.thread_w + (s.thread_w_end - s.thread_w) * min(1.0, i / (len(segs) * 0.7))
            parts.append(f'<path d="{move} {seg}" {common} stroke-width="{w:.1f}"/>')
    if s.outer and s.frame:
        step = 360 / s.spokes
        ring = [f"M {fmt(polar(s.hub, s.rotate, s.outer))}"] + [
            sag_segment(s.hub, s.rotate + i * step, s.outer, s.rotate + (i + 1) * step, s.outer, s.sag)
            for i in range(s.spokes)
        ]
        parts.append(f'<path d="{" ".join(ring)} Z" {common} stroke-width="{s.frame_w or s.thread_w}"/>')
    if s.hub_dot:
        parts.append(f'<circle cx="{s.hub[0]}" cy="{s.hub[1]}" r="{s.hub_dot}" fill="{WHITE}"/>')
    parts += ["</g>", "</svg>"]
    return "\n".join(parts) + "\n"


SWIRLS: list[tuple[str, str, Swirl]] = [
    ("framed-clean", "Web ends inside the canvas, open orange top right like the Houdini logo",
     Swirl(outer=275, pitch=92, hub_gap=30, start=36)),
    ("framed-loose", "Same, 8 spokes and wider pitch for small sizes",
     Swirl(outer=285, spokes=8, rotate=12, pitch=118, sag=0.1, spoke_w=16, thread_w=32, hub_gap=30, start=40)),
    ("framed-tapered", "Same, thread widens outward like the Houdini band",
     Swirl(outer=280, pitch=100, spoke_w=12, thread_w=14, thread_w_end=42, hub_gap=30, start=34)),
    ("framed-dot", "Same, open hub with a dot",
     Swirl(outer=275, pitch=95, hub_gap=40, hub_dot=18, start=56)),
    ("framed-clockwise", "Same, spiral winds the other way",
     Swirl(outer=275, pitch=92, hub_gap=30, start=36, clockwise=True)),
    ("framed-even", "Same, spokes and thread one weight",
     Swirl(outer=280, pitch=90, spoke_w=22, thread_w=22, hub_gap=28, start=34)),
    ("ring-clean", "Spiral inside a closed frame ring: no loose outer end",
     Swirl(outer=285, frame=True, pitch=88, hub_gap=30, start=36)),
    ("ring-dot", "Frame ring, open hub with a dot",
     Swirl(outer=285, frame=True, pitch=92, hub_gap=40, hub_dot=18, start=56)),
    ("ring-loose", "Frame ring, 8 spokes, wide pitch",
     Swirl(outer=295, frame=True, spokes=8, rotate=12, pitch=110, sag=0.1, spoke_w=16, thread_w=30,
           hub_gap=30, start=40)),
    ("ring-band", "Frame ring as a heavy band, thinner spiral inside",
     Swirl(outer=290, frame=True, pitch=80, hub_gap=30, start=36, spoke_w=12, thread_w=18, frame_w=44)),
    ("ring-big", "Frame ring, bigger web cropped on three sides",
     Swirl(outer=350, frame=True, pitch=100, hub_gap=32, start=38, spoke_w=15, thread_w=30)),
    ("framed-big", "Bigger web, cropped on three sides",
     Swirl(outer=360, pitch=108, hub_gap=32, start=38, spoke_w=15, thread_w=30)),
    ("clean", "Bold as before, but spokes and spiral run off the canvas, spokes rotated 9 degrees", Swirl()),
    ("open-hub", "Spokes stop short of the center, spiral starts with an inner curl",
     Swirl(hub_gap=40, start=40, pitch=110)),
    ("hub-dot", "Open hub with a solid dot in the middle", Swirl(hub_gap=42, hub_dot=20, start=58, pitch=105)),
    ("clockwise", "Spiral winds the other way", Swirl(clockwise=True)),
    ("loose", "8 spokes, wider pitch, more sag: bolder and better at small sizes",
     Swirl(spokes=8, rotate=12, pitch=140, sag=0.1, spoke_w=16, thread_w=34, hub_gap=30, start=36)),
    ("tapered", "Spiral thread widens outward like the Houdini band",
     Swirl(spoke_w=12, thread_w=16, thread_w_end=46, pitch=118, hub_gap=34, start=34)),
    ("even", "Spokes and thread the same weight", Swirl(spoke_w=22, thread_w=22, pitch=100, hub_gap=30, start=36)),
    ("low-hub", "Hub further down and left, more of the web cropped",
     Swirl(hub=(130.0, 385.0), pitch=118, hub_gap=34, start=40)),
]


def main() -> None:
    html = [PREVIEW_HEAD.replace("WOP icon prototypes</h1>", "WOP swirl, round 2</h1>")]
    cards = [("wop-swirl-bold.svg", "round 1 (for comparison)")]
    for name, blurb, s in SWIRLS:
        file = f"wop-swirl2-{name}.svg"
        (OUT_DIR / file).write_text(swirl_svg(s), encoding="utf-8")
        cards.append((file, blurb))
    html.append("<div class='row'>")
    for file, blurb in cards:
        small = "".join(f"<img src='{file}' width='{n}' height='{n}' alt=''>" for n in (64, 32, 24, 16))
        light = "".join(f"<img src='{file}' width='{n}' height='{n}' alt=''>" for n in (32, 16))
        html.append(
            f"<div class='card'><code>{file}</code><p>{blurb}</p><div class='sizes'>"
            f"<img class='big' src='{file}' alt='{file}'>{small}"
            f"<span class='light'>{light}</span></div></div>"
        )
    html.append("</div></body></html>\n")
    (OUT_DIR / "swirl.html").write_text("".join(html), encoding="utf-8")
    print(f"wrote {len(SWIRLS)} SVGs and swirl.html to {OUT_DIR}")


if __name__ == "__main__":
    main()

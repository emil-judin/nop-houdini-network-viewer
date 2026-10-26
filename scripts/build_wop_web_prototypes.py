"""Generate ``design/wop-icon/wop-houdini-web*.svg`` and ``design/wop-icon/web-prototypes.html`` (``web.html`` is the icon pack page).

Draws the 8-spoke white spiderweb on the Houdini orange (`#FE4703`) 512x512 square,
centered at the Houdini spiral hub ``(182, 316)`` with progressively wider spacing
toward the outside, extending completely to the edges of the square.

Usage: ``python scripts/build_wop_web_prototypes.py``
"""

from __future__ import annotations

from dataclasses import dataclass, field

from build_wop_icon_prototypes import OUT_DIR, ORANGE, PREVIEW_HEAD, SIZE, WHITE, fmt, polar

HUB = (182.0, 316.0)  # center of the Houdini spiral on the 512x512 canvas
SPOKE_LEN = 600.0     # extends past every edge and corner of the 512x512 square
SAG_RATIO = 0.855     # midpoint radius as a fraction of the average endpoint radius (~14.5% inward sag)


@dataclass
class SpiralSpiderWeb:
    """8-spoke spiderweb whose capture thread spirals out of the middle like the SideFX spiral."""

    hub: tuple[float, float] = HUB
    rotate: float = 22.5
    start_spoke: int = 5  # spoke 5 = 225 deg (+rotate), matching the inner tip of the SideFX spiral
    from_center: bool = True
    # Turn radii at each full turn: progressive spacing outward from the first inner loop at 60 px
    turn_radii: tuple[float, ...] = (60.0, 138.0, 236.0, 360.0, 512.0, 695.0)
    turns: int = 5
    max_step: int = 28
    skip_steps: set[int] = field(default_factory=lambda: {22, 23, 24})
    stroke_w: float = 20.0
    fill_inner_steps: int = 4  # fills the tiny inner pinhole inside steps 0..3 with white
    vert_sag_ratio: float | None = None  # optional deeper sag ratio on vertical web segments (spokes 3->4 and 7->0)
    spoke_dent: float = 0.0  # optional slight perpendicular curve (in px) on the radial spokes going out
    spiral_w_end: float | None = None  # when set, spiral stroke thickness changes along the spiral from stroke_w to spiral_w_end
    spoke_w_start: float | None = None  # when set with spoke_w_end, spokes taper from spoke_w_start at hub to spoke_w_end outside
    spoke_w_end: float | None = None
    houdini_modulation: bool = False  # modulate thickness by angle like the SideFX Houdini swirl (wider on right, narrower at top/bottom)
    random_seed: int | None = None  # when set, vary thickness randomly & smoothly along the spline (uncorrelated with inside/outside)
    random_spokes: bool = False  # when True with random_seed, also vary spoke thickness randomly along each spoke

    def interp_radius(self, turn: float) -> float:
        """Interpolate progressive turn radii for fractional turn ``turn``."""
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
        """List of (spoke_index, angle_deg, radius) along the counter-clockwise spiral."""
        total_steps = min(self.turns * 8, self.max_step)
        nodes: list[tuple[int, float, float]] = []
        for step in range(total_steps + 1):
            spoke_idx = (self.start_spoke + step) % 8
            angle = self.rotate + (self.start_spoke + step) * 45.0
            if self.from_center:
                turn = (step - 4) / 8.0 if step >= 4 else -1.0 + step / 4.0
            else:
                turn = step / 8.0
            nodes.append((spoke_idx, angle, self.interp_radius(turn)))
        return nodes

    def spokes_d(self) -> str:
        nodes = self.spiral_nodes()
        first_r: dict[int, float] = {}
        for spoke_idx, _, r in nodes:
            if spoke_idx not in first_r:
                first_r[spoke_idx] = 0.0 if self.from_center else r
        parts: list[str] = []
        for i in range(8):
            ang = self.rotate + i * 45.0
            p0 = polar(self.hub, ang, first_r[i])
            p1 = polar(self.hub, ang, SPOKE_LEN)
            if self.spoke_dent:
                mid = polar(self.hub, ang, 0.5 * (first_r[i] + SPOKE_LEN))
                perp = polar((0.0, 0.0), ang + 90.0, self.spoke_dent)
                ctrl = (mid[0] + perp[0], mid[1] + perp[1])
                parts.append(f"M {fmt(p0)} Q {fmt(ctrl)} {fmt(p1)}")
            else:
                parts.append(f"M {fmt(p0)} L {fmt(p1)}")
        return " ".join(parts)

    def inner_fill_d(self) -> str:
        """Closed white wedge bounded by the centerlines of steps 0..fill_inner_steps to cover the inner pinhole."""
        if not self.from_center or self.fill_inner_steps <= 0:
            return ""
        nodes = self.spiral_nodes()[: self.fill_inner_steps + 1]
        segs = [f"M {fmt(self.hub)}"]
        for (s0, a0, r0), (_, a1, r1) in zip(nodes, nodes[1:]):
            am = (a0 + a1) / 2.0
            sag = self.vert_sag_ratio if (self.vert_sag_ratio is not None and s0 in (3, 7)) else SAG_RATIO
            rm = 0.5 * (r0 + r1) * sag
            p0 = polar(self.hub, a0, r0)
            p1 = polar(self.hub, a1, r1)
            pm = polar(self.hub, am, rm)
            ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
            segs.append(f"Q {fmt(ctrl)} {fmt(p1)}")
        segs.append("Z")
        return " ".join(segs)

    def spiral_d(self) -> str:
        nodes = self.spiral_nodes()
        segs: list[str] = []
        pen_down = False
        for k, ((s0, a0, r0), (_, a1, r1)) in enumerate(zip(nodes, nodes[1:])):
            if k in self.skip_steps:
                pen_down = False
                continue
            am = (a0 + a1) / 2.0
            sag = self.vert_sag_ratio if (self.vert_sag_ratio is not None and s0 in (3, 7)) else SAG_RATIO
            rm = 0.5 * (r0 + r1) * sag
            p0 = polar(self.hub, a0, r0)
            p1 = polar(self.hub, a1, r1)
            pm = polar(self.hub, am, rm)
            ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
            if not pen_down:
                segs.append(f"M {fmt(p0)}")
                pen_down = True
            segs.append(f"Q {fmt(ctrl)} {fmt(p1)}")
        return " ".join(segs)

    def tapered_spoke_polys(self) -> list[str]:
        """Filled tapered polygons for the 8 spokes when spoke_w_start and spoke_w_end are set."""
        import math
        w0 = self.spoke_w_start or self.stroke_w
        w1 = self.spoke_w_end or self.stroke_w
        polys: list[str] = []
        for i in range(8):
            ang = self.rotate + i * 45.0
            a = math.radians(ang)
            nx, ny = math.sin(a), math.cos(a)  # unit normal to spoke direction (cos a, -sin a)
            p0 = self.hub
            p1 = polar(self.hub, ang, SPOKE_LEN)
            l0 = (p0[0] + nx * w0 / 2, p0[1] + ny * w0 / 2)
            r0 = (p0[0] - nx * w0 / 2, p0[1] - ny * w0 / 2)
            l1 = (p1[0] + nx * w1 / 2, p1[1] + ny * w1 / 2)
            r1 = (p1[0] - nx * w1 / 2, p1[1] - ny * w1 / 2)
            polys.append(f"M {fmt(l0)} L {fmt(l1)} L {fmt(r1)} L {fmt(r0)} Z")
        return polys

    def random_spoke_paths(self) -> list[str]:
        """Subdivided spoke segments with smooth random thickness along each spoke."""
        import math, random
        rnd = random.Random((self.random_seed or 1) + 100)
        paths: list[str] = []
        sub = 12
        for i in range(8):
            ang = self.rotate + i * 45.0
            ph1, ph2, ph3 = rnd.uniform(0, 6.28), rnd.uniform(0, 6.28), rnd.uniform(0, 6.28)
            for s in range(sub):
                r_a = SPOKE_LEN * (s / sub)
                r_b = SPOKE_LEN * ((s + 1) / sub)
                u = (s + 0.5) / sub
                wave = (
                    0.50 * math.sin(2.2 * math.pi * u + ph1)
                    + 0.35 * math.sin(4.7 * math.pi * u + ph2)
                    + 0.15 * math.sin(7.3 * math.pi * u + ph3)
                )
                w = self.stroke_w + 7.5 * wave
                pa = polar(self.hub, ang, r_a)
                pb = polar(self.hub, ang, r_b)
                paths.append(
                    f'    <path d="M {fmt(pa)} L {fmt(pb)}" fill="none" stroke="{WHITE}" '
                    f'stroke-width="{w:.1f}" stroke-linecap="round"/>'
                )
        return paths

    def variable_spiral_paths(self) -> list[str]:
        """Subdivided quadratic Bezier sub-segments with smoothly varying stroke-width along the spline."""
        import math, random
        nodes = self.spiral_nodes()
        total = max(1, len(nodes) - 1)
        w_start = self.stroke_w
        w_end = self.spiral_w_end if self.spiral_w_end is not None else self.stroke_w
        rnd = random.Random(self.random_seed or 1)
        phases = [(rnd.uniform(0, 6.28), rnd.uniform(1.8, 3.4)) for _ in range(5)]
        paths: list[str] = []
        sub = 6  # subdivide each spoke-to-spoke curve into 6 smooth sub-arcs
        for k, ((s0, a0, r0), (_, a1, r1)) in enumerate(zip(nodes, nodes[1:])):
            if k in self.skip_steps:
                continue
            am = (a0 + a1) / 2.0
            sag = self.vert_sag_ratio if (self.vert_sag_ratio is not None and s0 in (3, 7)) else SAG_RATIO
            rm = 0.5 * (r0 + r1) * sag
            p0 = polar(self.hub, a0, r0)
            p1 = polar(self.hub, a1, r1)
            pm = polar(self.hub, am, rm)
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
                qa = qpt(t0)
                qb = qpt(t1)
                qm = qpt(tm)
                qctrl = (2 * qm[0] - 0.5 * (qa[0] + qb[0]), 2 * qm[1] - 0.5 * (qa[1] + qb[1]))
                u = (k + tm) / total
                if self.random_seed is not None:
                    # Keep the first inner turn steady so the center fill stays seamless, then vary randomly along the spline
                    wave = sum(math.sin(freq * k * 0.45 + freq * tm * 0.45 + ph) for ph, freq in phases) / len(phases)
                    ramp = min(1.0, max(0.0, (k + tm - 3.0) / 3.0))
                    w = self.stroke_w + 11.0 * wave * ramp
                else:
                    w = w_start + (w_end - w_start) * (u ** 0.85)
                    if self.houdini_modulation and k >= 5:
                        ang_here = a0 + (a1 - a0) * tm
                        w *= 1.0 + 0.18 * math.cos(math.radians(ang_here - 10.0))
                paths.append(
                    f'    <path d="M {fmt(qa)} Q {fmt(qctrl)} {fmt(qb)}" fill="none" stroke="{WHITE}" '
                    f'stroke-width="{w:.1f}" stroke-linecap="round" stroke-linejoin="round"/>'
                )
        return paths

    def to_svg(self) -> str:
        common = f'fill="none" stroke="{WHITE}" stroke-width="{self.stroke_w:g}" stroke-linecap="round" stroke-linejoin="round"'
        fill_d = self.inner_fill_d()
        lines = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
            f'  <clipPath id="canvas"><rect width="{SIZE}" height="{SIZE}"/></clipPath>',
            f'  <rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}"/>',
            '  <g clip-path="url(#canvas)">',
        ]
        if fill_d:
            lines.append(f'    <path d="{fill_d}" fill="{WHITE}"/>')
        if self.random_seed is not None and self.random_spokes:
            lines.extend(self.random_spoke_paths())
        elif self.spoke_w_start is not None and self.spoke_w_end is not None:
            lines.append(f'    <path d="{" ".join(self.tapered_spoke_polys())}" fill="{WHITE}"/>')
        else:
            lines.append(f'    <path d="{self.spokes_d()}" {common}/>')
        if self.spiral_w_end is not None or self.houdini_modulation or self.random_seed is not None:
            lines.extend(self.variable_spiral_paths())
        else:
            lines.append(f'    <path d="{self.spiral_d()}" {common}/>')
        lines.extend([
            '  </g>',
            '</svg>',
            '',
        ])
        return "\n".join(lines)


@dataclass
class ReferenceSpiderWeb:
    """8-spoke spiderweb with closed concentric rings and progressively increasing ring distances."""

    hub: tuple[float, float] = HUB
    rotate: float = 0.0
    ring_radii: tuple[tuple[float, float, float, float, float], ...] = (
        (60.0, 59.0, 57.0, 50.0, 47.0),
        (135.0, 136.0, 134.0, 110.5, 112.0),
        (228.0, 228.0, 226.5, 194.0, 192.5),
        (342.0, 342.0, 340.0, 291.0, 289.0),
        (480.0, 480.0, 478.0, 408.5, 406.5),
    )
    stroke_w: float = 17.0

    def spokes_d(self) -> str:
        rh, rd, rv, _, _ = self.ring_radii[0]
        inner_r = [rh, rd, rv, rd, rh, rd, rv, rd]
        return " ".join(
            f"M {fmt(polar(self.hub, self.rotate + i * 45.0, inner_r[i]))} "
            f"L {fmt(polar(self.hub, self.rotate + i * 45.0, SPOKE_LEN))}"
            for i in range(8)
        )

    def rings_d(self) -> str:
        paths: list[str] = []
        for rh, rd, rv, rm_hd, rm_dv in self.ring_radii:
            spoke_r = [rh, rd, rv, rd, rh, rd, rv, rd]
            mid_r = [rm_hd, rm_dv, rm_dv, rm_hd, rm_hd, rm_dv, rm_dv, rm_hd]
            segs = [f"M {fmt(polar(self.hub, self.rotate, spoke_r[0]))}"]
            for i in range(8):
                j = (i + 1) % 8
                a0 = self.rotate + i * 45.0
                a1 = self.rotate + (i + 1) * 45.0
                am = a0 + 22.5
                p0 = polar(self.hub, a0, spoke_r[i])
                p1 = polar(self.hub, a1, spoke_r[j])
                pm = polar(self.hub, am, mid_r[i])
                ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
                segs.append(f"Q {fmt(ctrl)} {fmt(p1)}")
            segs.append("Z")
            paths.append(" ".join(segs))
        return " ".join(paths)

    def to_svg(self) -> str:
        common = f'fill="none" stroke="{WHITE}" stroke-width="{self.stroke_w:g}" stroke-linecap="round" stroke-linejoin="round"'
        return "\n".join([
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
            f'  <clipPath id="canvas"><rect width="{SIZE}" height="{SIZE}"/></clipPath>',
            f'  <rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}"/>',
            '  <g clip-path="url(#canvas)">',
            f'    <path d="{self.spokes_d()}" {common}/>',
            f'    <path d="{self.rings_d()}" {common}/>',
            '  </g>',
            '</svg>',
            '',
        ])


SPIRAL_VARIANTS: list[tuple[str, str, SpiralSpiderWeb]] = [
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent.svg",
        "Final: 22.5 deg, 22 px stroke, inner turns (54, 140), outer turns (256, 405, 595), vertical web dent",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-thick-to-thin.svg",
        "Thick-to-thin: thicker inside (28 px) tapering thinner toward the outside (13 px) on spiral & spokes",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=28.0,
            spiral_w_end=13.0,
            spoke_w_start=26.0,
            spoke_w_end=13.0,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-thick35-to-thin11.svg",
        "Even thicker inside (35 px spiral, 32 px spokes) tapering thinner outside (11 px)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=35.0,
            spiral_w_end=11.0,
            spoke_w_start=32.0,
            spoke_w_end=11.0,
            fill_inner_steps=6,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-thick40-to-thin10.svg",
        "Heavy inside (40 px spiral, 36 px spokes) tapering thin outside (10 px)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=40.0,
            spiral_w_end=10.0,
            spoke_w_start=36.0,
            spoke_w_end=10.0,
            fill_inner_steps=7,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-thick35-to-thin11-spiral.svg",
        "Even thicker inside (35 -> 11 px) on spiral only, uniform 20 px spokes",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=35.0,
            spiral_w_end=11.0,
            fill_inner_steps=6,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-thick-to-thin-spiral.svg",
        "Thick-to-thin on spiral only (28 -> 13 px), uniform 20 px spokes",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=28.0,
            spiral_w_end=13.0,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-random1.svg",
        "Random thickness along the spline & spokes (no inside/outside correlation, seed 1)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            random_seed=7,
            random_spokes=True,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-random2.svg",
        "Random thickness along the spline & spokes (no inside/outside correlation, seed 2)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            random_seed=19,
            random_spokes=True,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-random-spiral.svg",
        "Random thickness along the spiral spline only (uniform 22 px spokes)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            random_seed=7,
            random_spokes=False,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-tapered.svg",
        "Variable thickness: spiral & spokes widen outward (16 -> 32 px) with Houdini-style modulation",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=16.0,
            spiral_w_end=32.0,
            spoke_w_start=15.0,
            spoke_w_end=28.0,
            houdini_modulation=True,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-tapered-spiral.svg",
        "Variable thickness on spiral only (16 -> 34 px with Houdini modulation), uniform 20 px spokes",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=20.0,
            spiral_w_end=34.0,
            houdini_modulation=True,
            fill_inner_steps=5,
            vert_sag_ratio=0.79,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5.svg",
        "Baseline without extra vertical dent: 22.5 deg, 22 px stroke",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            fill_inner_steps=5,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-vdent-strong.svg",
        "Variant: slightly deeper inward dent on the vertical web lines",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            stroke_w=22.0,
            fill_inner_steps=5,
            vert_sag_ratio=0.76,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px-fill5-wider.svg",
        "22.5 deg: 22 px stroke, inner turns (54, 140), outer turns (265, 425, 635)",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(54.0, 140.0, 265.0, 425.0, 635.0, 890.0),
            stroke_w=22.0,
            fill_inner_steps=5,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-subtle.svg",
        "22.5 deg: 20 px stroke, radii (60, 138, 236, 360, 512), inner pinhole filled with white",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(60.0, 138.0, 236.0, 360.0, 512.0, 695.0),
            stroke_w=20.0,
            fill_inner_steps=4,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5-22px.svg",
        "22.5 deg: 22 px stroke, radii (60, 140, 245, 380, 550), inner pinhole filled with white",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(60.0, 140.0, 245.0, 380.0, 550.0, 760.0),
            stroke_w=22.0,
            fill_inner_steps=4,
        ),
    ),
    (
        "wop-houdini-web-spiral-center-rot22.5.svg",
        "22.5 deg: 20 px stroke, radii (60, 140, 245, 380, 550), inner pinhole filled with white",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=True,
            turn_radii=(60.0, 140.0, 245.0, 380.0, 550.0, 760.0),
            stroke_w=20.0,
            fill_inner_steps=4,
        ),
    ),
    (
        "wop-houdini-web-spiral-center.svg",
        "0 deg: 20 px stroke, inner pinhole filled with white",
        SpiralSpiderWeb(
            rotate=0.0,
            from_center=True,
            turn_radii=(60.0, 138.0, 236.0, 360.0, 512.0, 695.0),
            max_step=27,
            skip_steps={22, 23, 24},
            stroke_w=20.0,
        ),
    ),
    (
        "wop-houdini-web-spiral.svg",
        "0 deg: open middle spiral web, 20 px stroke",
        SpiralSpiderWeb(
            rotate=0.0,
            from_center=False,
            turn_radii=(60.0, 138.0, 236.0, 360.0, 512.0, 695.0),
            max_step=23,
            skip_steps={18, 19, 20},
            stroke_w=20.0,
        ),
    ),
    (
        "wop-houdini-web-spiral-rot22.5.svg",
        "22.5 deg: open middle spiral web, 20 px stroke",
        SpiralSpiderWeb(
            rotate=22.5,
            from_center=False,
            turn_radii=(60.0, 138.0, 236.0, 360.0, 512.0, 695.0),
            max_step=24,
            skip_steps={18, 19, 20},
            stroke_w=20.0,
        ),
    ),
]

ROTATION_VARIANTS: list[tuple[str, str, ReferenceSpiderWeb]] = [
    ("wop-houdini-web.svg", "0 deg rotation (cardinal + diagonal spokes)", ReferenceSpiderWeb(rotate=0.0)),
    ("wop-houdini-web-rot7.5.svg", "7.5 deg rotation", ReferenceSpiderWeb(rotate=7.5)),
    ("wop-houdini-web-rot15.svg", "15 deg rotation", ReferenceSpiderWeb(rotate=15.0)),
    ("wop-houdini-web-rotated.svg", "22.5 deg (45/2) rotation", ReferenceSpiderWeb(rotate=22.5)),
    ("wop-houdini-web-rot30.svg", "30 deg rotation", ReferenceSpiderWeb(rotate=30.0)),
    ("wop-houdini-web-rot37.5.svg", "37.5 deg rotation", ReferenceSpiderWeb(rotate=37.5)),
]


def card_html(file: str, blurb: str) -> str:
    small = "".join(f"<img src='{file}' width='{n}' height='{n}' alt=''>" for n in (64, 32, 24, 16))
    light = "".join(f"<img src='{file}' width='{n}' height='{n}' alt=''>" for n in (32, 16))
    return (
        f"<div class='card'><code>{file}</code><p>{blurb}</p><div class='sizes'>"
        f"<img class='big' src='{file}' alt='{file}'>{small}"
        f"<span class='light'>{light}</span></div></div>"
    )


def main() -> None:
    html = [
        PREVIEW_HEAD.replace("WOP icon prototypes</h1>", "WOP Houdini spiderweb</h1>"),
        "<h2>SideFX-style spiral web from the middle</h2><div class='row'>",
    ]
    for file, blurb, sweb in SPIRAL_VARIANTS:
        (OUT_DIR / file).write_text(sweb.to_svg(), encoding="utf-8")
        html.append(card_html(file, blurb))

    html.append("</div><h2>Concentric rings: rotation variants (0 to 37.5 deg)</h2><div class='row'>")
    for file, blurb, web in ROTATION_VARIANTS:
        (OUT_DIR / file).write_text(web.to_svg(), encoding="utf-8")
        html.append(card_html(file, blurb))

    html.append("</div></body></html>\n")
    (OUT_DIR / "web-prototypes.html").write_text("".join(html), encoding="utf-8")
    total = len(SPIRAL_VARIANTS) + len(ROTATION_VARIANTS)
    print(f"wrote {total} SVGs and web-prototypes.html to {OUT_DIR}")


if __name__ == "__main__":
    main()

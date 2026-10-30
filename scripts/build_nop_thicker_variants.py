"""Generate thicker (and fewer-strand) test variants of the NOP spiderweb icon.

Saves SVG variants (both white-on-orange ``.svg`` and transparent-web cutout
``-cutout.svg`` matching ``public/favicon.svg``) plus an interactive comparison
page ``index.html`` into ``design/nop-icon/thicker-variants/``.

Preserves the exact structure and idea of the chosen NOP icon:
- Hub at ``(182, 316)`` (the SideFX Houdini spiral center on a 512x512 canvas)
- Counter-clockwise spiral emerging from the center with inner pinhole fill
- 22.5 deg base rotation and inward vertical sag dent (``vert_sag_ratio = 0.79``)
- Organic spiral thickness modulation (``random_seed = 7``) without thin spots

Usage: ``python scripts/build_nop_thicker_variants.py``
"""

from __future__ import annotations

import math
import random
import shutil
from dataclasses import dataclass, field
from pathlib import Path

from build_nop_icon_prototypes import ORANGE, SIZE, WHITE, fmt, polar
from build_nop_web_prototypes import HUB, SAG_RATIO, SPOKE_LEN

ROOT_DIR = Path(__file__).resolve().parent.parent
TEST_DIR = ROOT_DIR / "design" / "nop-icon" / "thicker-variants"


@dataclass
class ThickerWebVariant:
    """Configurable NOP spiral spiderweb that supports any spoke count, turn radii, and stroke weight."""

    hub: tuple[float, float] = HUB
    num_spokes: int = 8
    rotate: float = 22.5
    start_spoke: int = 5
    turn_radii: tuple[float, ...] = (54.0, 140.0, 256.0, 405.0, 595.0, 830.0)
    turns: int = 5
    max_step: int = 28
    skip_steps: set[int] = field(default_factory=lambda: {22, 23, 24})
    stroke_w: float = 22.0
    spoke_w_start: float | None = None
    spoke_w_end: float | None = None
    fill_inner_steps: int = 5
    vert_sag_ratio: float | None = 0.79
    random_seed: int | None = 7
    # Asymmetric modulation: keeps the exact seed=7 organic feel without letting negative dips get too thin
    mod_plus_frac: float = 0.20
    mod_minus_frac: float = 0.12
    # Optional explicit radius overrides by step index (e.g. to keep step 20 exiting the top border when turn 2 is pulled closer)
    step_radius_overrides: dict[int, float] = field(default_factory=dict)

    @property
    def step_angle(self) -> float:
        return 360.0 / self.num_spokes

    @property
    def center_ramp_steps(self) -> int:
        # Half a turn from center (0) to turn_radii[0]
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
            r = self.step_radius_overrides.get(step, self.interp_radius(turn))
            nodes.append((spoke_idx, angle, r))
        return nodes

    def is_vertical_sector(self, spoke_idx: int) -> bool:
        """True when the segment from spoke_idx to spoke_idx+1 straddles the left or right horizontal axis."""
        if self.num_spokes == 8:
            return spoke_idx in (3, 7)
        a0 = (self.rotate + spoke_idx * self.step_angle) % 360.0
        a1 = a0 + self.step_angle
        return (a0 <= 180.0 <= a1) or (a0 <= 360.0 <= a1) or (a0 == 0.0)

    def segment_sag(self, spoke_idx: int) -> float:
        if self.vert_sag_ratio is not None and self.is_vertical_sector(spoke_idx):
            return self.vert_sag_ratio
        return SAG_RATIO

    def spokes_d(self) -> str:
        parts: list[str] = []
        for i in range(self.num_spokes):
            ang = self.rotate + i * self.step_angle
            p0 = self.hub
            p1 = polar(self.hub, ang, SPOKE_LEN)
            parts.append(f"M {fmt(p0)} L {fmt(p1)}")
        return " ".join(parts)

    def tapered_spoke_polys(self) -> list[str]:
        w0 = self.spoke_w_start or self.stroke_w
        w1 = self.spoke_w_end or self.stroke_w
        polys: list[str] = []
        for i in range(self.num_spokes):
            ang = self.rotate + i * self.step_angle
            a = math.radians(ang)
            nx, ny = math.sin(a), math.cos(a)
            p0 = self.hub
            p1 = polar(self.hub, ang, SPOKE_LEN)
            l0 = (p0[0] + nx * w0 / 2, p0[1] + ny * w0 / 2)
            r0 = (p0[0] - nx * w0 / 2, p0[1] - ny * w0 / 2)
            l1 = (p1[0] + nx * w1 / 2, p1[1] + ny * w1 / 2)
            r1 = (p1[0] - nx * w1 / 2, p1[1] - ny * w1 / 2)
            polys.append(f"M {fmt(l0)} L {fmt(l1)} L {fmt(r1)} L {fmt(r0)} Z")
        return polys

    def inner_fill_d(self) -> str:
        if self.fill_inner_steps <= 0:
            return ""
        nodes = self.spiral_nodes()[: self.fill_inner_steps + 1]
        segs = [f"M {fmt(self.hub)}"]
        for (s0, a0, r0), (_, a1, r1) in zip(nodes, nodes[1:]):
            am = (a0 + a1) / 2.0
            sag = self.segment_sag(s0)
            rm = 0.5 * (r0 + r1) * sag
            p0 = polar(self.hub, a0, r0)
            p1 = polar(self.hub, a1, r1)
            pm = polar(self.hub, am, rm)
            ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))
            segs.append(f"Q {fmt(ctrl)} {fmt(p1)}")
        segs.append("Z")
        return " ".join(segs)

    def spiral_subpaths(self, stroke_color: str) -> list[str]:
        nodes = self.spiral_nodes()
        rnd = random.Random(self.random_seed or 7)
        phases = [(rnd.uniform(0, 6.28), rnd.uniform(1.8, 3.4)) for _ in range(5)]
        paths: list[str] = []
        sub = 6

        for k, ((s0, a0, r0), (_, a1, r1)) in enumerate(zip(nodes, nodes[1:])):
            am = (a0 + a1) / 2.0
            sag = self.segment_sag(s0)
            rm = 0.5 * (r0 + r1) * sag
            p0 = polar(self.hub, a0, r0)
            p1 = polar(self.hub, a1, r1)
            pm = polar(self.hub, am, rm)
            ctrl = (2 * pm[0] - 0.5 * (p0[0] + p1[0]), 2 * pm[1] - 0.5 * (p0[1] + p1[1]))

            if k in self.skip_steps:
                p0_in = 0.0 <= p0[0] <= SIZE and 0.0 <= p0[1] <= SIZE
                p1_in = 0.0 <= p1[0] <= SIZE and 0.0 <= p1[1] <= SIZE
                if not p0_in and not p1_in:
                    continue

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
                paths.append(
                    f'<path d="M {fmt(qa)} Q {fmt(qctrl)} {fmt(qb)}" fill="none" stroke="{stroke_color}" '
                    f'stroke-width="{w:.1f}" stroke-linecap="round" stroke-linejoin="round"/>'
                )
        return paths

    def to_svg(self, *, cutout: bool = False) -> str:
        fill_d = self.inner_fill_d()
        if cutout:
            lines = [
                f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
                "  <defs>",
                f'    <mask id="web-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="{SIZE}" height="{SIZE}">',
                f'      <rect width="{SIZE}" height="{SIZE}" fill="#FFFFFF"/>',
            ]
            if fill_d:
                lines.append(f'      <path d="{fill_d}" fill="#000000"/>')
            if self.spoke_w_start is not None and self.spoke_w_end is not None:
                lines.append(f'      <path d="{" ".join(self.tapered_spoke_polys())}" fill="#000000"/>')
            else:
                common_mask = (
                    f'fill="none" stroke="#000000" stroke-width="{self.stroke_w:g}" '
                    'stroke-linecap="round" stroke-linejoin="round"'
                )
                lines.append(f'      <path d="{self.spokes_d()}" {common_mask}/>')
            for sub_path in self.spiral_subpaths("#000000"):
                lines.append("      " + sub_path)
            lines.extend([
                "    </mask>",
                "  </defs>",
                f'  <rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}" mask="url(#web-cutout)"/>',
                "</svg>",
                "",
            ])
            return "\n".join(lines)

        lines = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" width="{SIZE}" height="{SIZE}">',
            f'  <clipPath id="canvas"><rect width="{SIZE}" height="{SIZE}"/></clipPath>',
            '  <g clip-path="url(#canvas)">',
            f'    <rect width="{SIZE}" height="{SIZE}" fill="{ORANGE}"/>',
        ]
        if fill_d:
            lines.append(f'    <path d="{fill_d}" fill="{WHITE}"/>')
        if self.spoke_w_start is not None and self.spoke_w_end is not None:
            lines.append(f'    <path d="{" ".join(self.tapered_spoke_polys())}" fill="{WHITE}"/>')
        else:
            common = (
                f'fill="none" stroke="{WHITE}" stroke-width="{self.stroke_w:g}" '
                'stroke-linecap="round" stroke-linejoin="round"'
            )
            lines.append(f'    <path d="{self.spokes_d()}" {common}/>')
        for sub_path in self.spiral_subpaths(WHITE):
            lines.append("    " + sub_path)
        lines.extend([
            "  </g>",
            "</svg>",
            "",
        ])
        return "\n".join(lines)


VARIANTS: list[tuple[str, str, str, ThickerWebVariant]] = [
    # --- Focused Comparison: 02-2turns-34px with Outer Row Closer to Center ---
    (
        "02-2turns-34px",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Baseline 02-2turns-34px: turn radii (78, 218, 408), 34px stroke",
        ThickerWebVariant(
            turn_radii=(78.0, 218.0, 408.0, 650.0, 935.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02a-2turns-34px-outer385",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Slightly closer outer row (-23px): turn radii (76, 208, 385), right junction inside border",
        ThickerWebVariant(
            turn_radii=(76.0, 208.0, 385.0, 620.0, 900.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02b-2turns-34px-outer365",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Medium closer outer row (-43px): turn radii (75, 200, 365), both right spoke junctions visible",
        ThickerWebVariant(
            turn_radii=(75.0, 200.0, 365.0, 590.0, 860.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02c-2turns-34px-outer345",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Closer outer row (-63px): turn radii (74, 194, 345), concentric outer ring",
        ThickerWebVariant(
            turn_radii=(74.0, 194.0, 345.0, 540.0, 780.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02d-2turns-34px-outer325",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Much closer outer row (-83px): turn radii (72, 186, 325), concentric outer ring",
        ThickerWebVariant(
            turn_radii=(72.0, 186.0, 325.0, 510.0, 740.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02e-2turns-34px-outer350-only-last-row",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Only last row pulled closer: inner rings stay (78, 212), outer ring pulled from 408 to 350",
        ThickerWebVariant(
            turn_radii=(78.0, 212.0, 350.0, 540.0, 780.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02f-2turns-34px-outer330-only-last-row",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Only last row pulled even closer: inner rings stay (78, 206), outer ring pulled from 408 to 330",
        ThickerWebVariant(
            turn_radii=(78.0, 206.0, 330.0, 510.0, 740.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "02g-2turns-34px-outer335-wrap-top",
        "02-2turns-34px: Outer Ring Pulled Closer to Center",
        "Closer outer row (72, 188, 335) that continues across the top spoke before exiting left",
        ThickerWebVariant(
            turn_radii=(72.0, 188.0, 335.0, 520.0, 750.0),
            max_step=22,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    # --- Reference: Current 22px icon ---
    (
        "00-current-22px",
        "Reference (Current Icon)",
        "Current 22px icon: 8 spokes, 3 turns (54, 140, 256, 405), dips to 15.9px at thin spots",
        ThickerWebVariant(
            turn_radii=(54.0, 140.0, 256.0, 405.0, 595.0, 830.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=22.0,
            mod_plus_frac=0.295,
            mod_minus_frac=0.275,
        ),
    ),
    # --- Group A: 2-Turn Same-Frame (1 full turn fewer inside the exact same r=405..415 outer frame, matching Houdini swirl density) ---
    (
        "01-2turns-30px",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes, 2 turns to outer ring (76, 214, 405), 30px stroke (+36% thicker)",
        ThickerWebVariant(
            turn_radii=(76.0, 214.0, 405.0, 645.0, 930.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=30.0,
        ),
    ),
    (
        "02-2turns-34px",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes, 2 turns to outer ring (78, 218, 408), 34px stroke (+55% thicker)",
        ThickerWebVariant(
            turn_radii=(78.0, 218.0, 408.0, 650.0, 935.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=34.0,
        ),
    ),
    (
        "03-2turns-38px",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes, 2 turns to outer ring (80, 222, 410), 38px stroke (+73% thicker)",
        ThickerWebVariant(
            turn_radii=(80.0, 222.0, 410.0, 655.0, 940.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=38.0,
        ),
    ),
    (
        "04-2turns-42px",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes, 2 turns to outer ring (84, 226, 414), 42px stroke (+91% thicker)",
        ThickerWebVariant(
            turn_radii=(84.0, 226.0, 414.0, 660.0, 945.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=42.0,
        ),
    ),
    (
        "05-2turns-36px-tapered-spokes",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes (tapered 24px at hub -> 36px outside), 2 turns (78, 218, 408), 36px spiral",
        ThickerWebVariant(
            turn_radii=(78.0, 218.0, 408.0, 650.0, 935.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=36.0,
            spoke_w_start=24.0,
            spoke_w_end=36.0,
        ),
    ),
    (
        "06-2turns-40px-tapered-spokes",
        "Group A: Fewer Strands (2 Turns in Frame - Houdini Density)",
        "8 spokes (tapered 26px at hub -> 40px outside), 2 turns (82, 224, 412), 40px spiral",
        ThickerWebVariant(
            turn_radii=(82.0, 224.0, 412.0, 655.0, 940.0),
            max_step=20,
            skip_steps={14, 15, 16},
            stroke_w=40.0,
            spoke_w_start=26.0,
            spoke_w_end=40.0,
        ),
    ),
    # --- Group B: 2.5-Turn Intermediate (2 vertical strands on right + 3rd strand in top-right corner) ---
    (
        "07-2.5turns-30px",
        "Group B: Slightly Fewer Strands (2.5 Turns in Frame)",
        "8 spokes, 2.5 turns (66, 174, 320, 505), 30px stroke (+36% thicker)",
        ThickerWebVariant(
            turn_radii=(66.0, 174.0, 320.0, 505.0, 730.0, 990.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=30.0,
        ),
    ),
    (
        "08-2.5turns-34px",
        "Group B: Slightly Fewer Strands (2.5 Turns in Frame)",
        "8 spokes, 2.5 turns (68, 180, 330, 518), 34px stroke (+55% thicker)",
        ThickerWebVariant(
            turn_radii=(68.0, 180.0, 330.0, 518.0, 745.0, 1010.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=34.0,
        ),
    ),
    (
        "09-2.5turns-38px",
        "Group B: Slightly Fewer Strands (2.5 Turns in Frame)",
        "8 spokes, 2.5 turns (72, 186, 338, 528), 38px stroke (+73% thicker)",
        ThickerWebVariant(
            turn_radii=(72.0, 186.0, 338.0, 528.0, 760.0, 1030.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=38.0,
        ),
    ),
    (
        "10-2.5turns-36px-tapered-spokes",
        "Group B: Slightly Fewer Strands (2.5 Turns in Frame)",
        "8 spokes (tapered 24px at hub -> 36px outside), 2.5 turns (68, 180, 330, 518), 36px spiral",
        ThickerWebVariant(
            turn_radii=(68.0, 180.0, 330.0, 518.0, 745.0, 1010.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=36.0,
            spoke_w_start=24.0,
            spoke_w_end=36.0,
        ),
    ),
    # --- Group C: Original 3-Turn Layout, Thicker Strokes Only ---
    (
        "11-3turns-28px",
        "Group C: Original 3-Turn Layout, Thicker Lines Only",
        "8 spokes, all 3 turns kept (58, 144, 260, 408), 28px stroke (+27% thicker)",
        ThickerWebVariant(
            turn_radii=(58.0, 144.0, 260.0, 408.0, 598.0, 830.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=28.0,
        ),
    ),
    (
        "12-3turns-32px",
        "Group C: Original 3-Turn Layout, Thicker Lines Only",
        "8 spokes, all 3 turns kept (62, 148, 264, 412), 32px stroke (+45% thicker)",
        ThickerWebVariant(
            turn_radii=(62.0, 148.0, 264.0, 412.0, 602.0, 835.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=32.0,
        ),
    ),
    (
        "13-3turns-36px",
        "Group C: Original 3-Turn Layout, Thicker Lines Only",
        "8 spokes, all 3 turns kept (64, 152, 268, 415), 36px stroke (+64% thicker)",
        ThickerWebVariant(
            turn_radii=(64.0, 152.0, 268.0, 415.0, 605.0, 840.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=36.0,
        ),
    ),
    (
        "14-3turns-34px-tapered-spokes",
        "Group C: Original 3-Turn Layout, Thicker Lines Only",
        "8 spokes (tapered 22px at hub -> 34px outside), all 3 turns kept (60, 146, 262, 410), 34px spiral",
        ThickerWebVariant(
            turn_radii=(60.0, 146.0, 262.0, 410.0, 600.0, 835.0),
            max_step=28,
            skip_steps={22, 23, 24},
            stroke_w=34.0,
            spoke_w_start=22.0,
            spoke_w_end=34.0,
        ),
    ),
    # --- Group D: Fewer Radial Spokes (7 and 6 Spokes) + Thicker Lines ---
    (
        "15-7spokes-2turns-36px",
        "Group D: Fewer Radial Spokes (7 & 6 Spokes)",
        "7 radial spokes, 2 turns (82, 232, 430), 36px stroke",
        ThickerWebVariant(
            num_spokes=7,
            rotate=18.0,
            start_spoke=4,
            fill_inner_steps=4,
            turn_radii=(82.0, 232.0, 430.0, 680.0, 960.0),
            max_step=18,
            skip_steps={13},
            stroke_w=36.0,
        ),
    ),
    (
        "16-7spokes-2.5turns-34px",
        "Group D: Fewer Radial Spokes (7 & 6 Spokes)",
        "7 radial spokes, 2.5 turns (68, 180, 330, 518), 34px stroke",
        ThickerWebVariant(
            num_spokes=7,
            rotate=18.0,
            start_spoke=4,
            fill_inner_steps=4,
            turn_radii=(68.0, 180.0, 330.0, 518.0, 745.0, 1010.0),
            max_step=25,
            skip_steps={19, 20, 21},
            stroke_w=34.0,
        ),
    ),
    (
        "17-6spokes-2turns-38px",
        "Group D: Fewer Radial Spokes (7 & 6 Spokes)",
        "6 radial spokes, 2 turns (84, 236, 435), 38px stroke",
        ThickerWebVariant(
            num_spokes=6,
            rotate=15.0,
            start_spoke=3,
            fill_inner_steps=3,
            turn_radii=(84.0, 236.0, 435.0, 680.0, 960.0),
            max_step=16,
            skip_steps={11, 12},
            stroke_w=38.0,
        ),
    ),
    (
        "18-6spokes-2.5turns-34px",
        "Group D: Fewer Radial Spokes (7 & 6 Spokes)",
        "6 radial spokes, 2.5 turns (68, 180, 330, 518), 34px stroke",
        ThickerWebVariant(
            num_spokes=6,
            rotate=15.0,
            start_spoke=3,
            fill_inner_steps=3,
            turn_radii=(68.0, 180.0, 330.0, 518.0, 745.0, 1010.0),
            max_step=22,
            skip_steps={17, 18},
            stroke_w=34.0,
        ),
    ),
]


def main() -> None:
    if TEST_DIR.exists():
        shutil.rmtree(TEST_DIR)
    TEST_DIR.mkdir(parents=True, exist_ok=True)

    groups: dict[str, list[tuple[str, str]]] = {}
    for slug, group_title, desc, variant in VARIANTS:
        white_file = f"{slug}.svg"
        cutout_file = f"{slug}-cutout.svg"
        (TEST_DIR / white_file).write_text(variant.to_svg(cutout=False), encoding="utf-8")
        (TEST_DIR / cutout_file).write_text(variant.to_svg(cutout=True), encoding="utf-8")
        groups.setdefault(group_title, []).append((slug, desc))

    sections_html: list[str] = []
    for group_title, items in groups.items():
        cards: list[str] = []
        for slug, desc in items:
            white_file = f"{slug}.svg"
            cutout_file = f"{slug}-cutout.svg"
            cutout_sizes = "".join(
                f"<div class='sz'><img src='{cutout_file}' width='{n}' height='{n}' alt=''><span>{n}</span></div>"
                for n in (96, 64, 32, 24, 16)
            )
            white_sizes = "".join(
                f"<div class='sz'><img src='{white_file}' width='{n}' height='{n}' alt=''><span>{n}</span></div>"
                for n in (96, 64, 32, 24, 16)
            )
            cards.append(
                f"""<div class="card">
  <code>{slug}</code>
  <p>{desc}</p>
  <div class="mode-label">Cutout on Dark (Playground <code>favicon.svg</code> style):</div>
  <div class="sizes dark-well">{cutout_sizes}</div>
  <div class="mode-label">White Web on Orange (<code>nop-icon.svg</code> style):</div>
  <div class="sizes">{white_sizes}</div>
</div>"""
            )
        sections_html.append(f"<h2>{group_title}</h2><div class='row'>{''.join(cards)}</div>")

    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NOP Icon - Thicker &amp; Fewer-Strand Variants</title>
<style>
  body {{ margin: 0; padding: 24px 20px 48px; background: #1e1e1e; color: #ddd; font: 13px/1.45 system-ui, sans-serif; }}
  h1 {{ font-size: 20px; margin: 0 0 6px; }}
  h2 {{ font-size: 15px; margin: 28px 0 10px; color: #fff; border-bottom: 1px solid #333; padding-bottom: 6px; }}
  p {{ margin: 0 0 10px; color: #aaa; }}
  .row {{ display: flex; flex-wrap: wrap; gap: 16px; }}
  .card {{ background: #2b2b2b; border: 1px solid #383838; border-radius: 8px; padding: 12px; width: 340px; }}
  .card code {{ display: block; margin-bottom: 4px; color: #fff; font-size: 13px; font-weight: 600; }}
  .mode-label {{ font-size: 11px; color: #999; margin: 8px 0 4px; }}
  .sizes {{ display: flex; align-items: flex-end; gap: 10px; padding: 8px; border-radius: 6px; background: #232323; }}
  .dark-well {{ background: #3a3a3a; }}
  .sz {{ display: flex; flex-direction: column; align-items: center; gap: 4px; }}
  .sz span {{ font-size: 10px; color: #888; }}
</style></head><body>
<h1>NOP Icon - Thicker &amp; Fewer-Strand Test Variants</h1>
<p>Each variant is saved in <code>design/nop-icon/thicker-variants/</code> as both <code>&lt;name&gt;.svg</code> (white on orange) and <code>&lt;name&gt;-cutout.svg</code> (transparent cutout like <code>public/favicon.svg</code>).</p>
{"".join(sections_html)}
</body></html>
"""
    (TEST_DIR / "index.html").write_text(html, encoding="utf-8")
    print(f"Wrote {len(VARIANTS) * 2} SVGs and index.html to {TEST_DIR}")


if __name__ == "__main__":
    main()


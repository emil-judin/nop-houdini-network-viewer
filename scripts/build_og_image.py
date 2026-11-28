"""Build the link preview image (Open Graph card, 1200x630): the NOP lockup over the orb web render.

The lockup is the one of the README banner (``docs/assets/nop-banner.jpg``): the icon on the left, as tall
as the name and the tagline together, "NOP" to its right and the spaced tagline under the name. All
measures below are the banner's own pixels (icon 156 px); ``SCALE`` and ``ORIGIN`` place it on the card so
the tagline ends before the web.

Input: ``design/nop-icon/og-background.jpg`` (the web render without text, from the owner's Houdini
project) and ``design/nop-icon/nop-icon-cutout-512.png`` (run ``build_nop_icon_pack.py`` first).
Output: ``public/og-image.png``.

Usage: ``python scripts/build_og_image.py`` (needs Pillow and the Noto Sans Bold font).
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT_DIR / "design" / "nop-icon"
BACKGROUND = ICON_DIR / "og-background.jpg"
ICON = ICON_DIR / "nop-icon-cutout-512.png"
OUT = ROOT_DIR / "public" / "og-image.png"
FONT = "C:/Windows/Fonts/NotoSans-Bold.ttf"

CARD = (1200, 630)
SCALE = 0.665  # card lockup size relative to the banner lockup; leaves the same gap between the tagline and the web as on the banner (about 0.75 icon heights)
ORIGIN = (64, 281)  # top left corner of the icon on the card
SUPER = 4  # the lockup is drawn 4x larger and scaled down, for smooth edges at any scale

# Banner measures, relative to the top left corner of the icon
ICON_PX = 156
NAME = "NOP"
NAME_FONT_PX = 102
NAME_INK_LEFT = 196  # left edge of the N
NAME_BASELINE = 98
TAGLINE = "HOUDINI NETWORK VIEWER FOR THE WEB"
TAGLINE_FONT_PX = 26
TAGLINE_INK_LEFT = 193  # left edge of the H
TAGLINE_INK_RIGHT = 1018  # right edge of the last letter; the letter spacing is computed from it
TAGLINE_BASELINE = 143
TEXT_TOP = 25  # top of the name's capitals; the text block runs from here to TAGLINE_BASELINE
TEXT_SCALE = 0.9  # card only: the text is a bit smaller than on the banner and centered on the icon's height
NAME_COLOR = (255, 255, 255)
TAGLINE_COLOR = (215, 215, 215)


def ink_span(font: ImageFont.FreeTypeFont, text: str) -> tuple[int, int]:
    """Left and right edge of the drawn ink of ``text``, relative to its pen position (measured, not from metrics)."""
    pad = font.size
    probe = Image.new("L", (round(font.getlength(text)) + 2 * pad, 2 * pad), 0)
    ImageDraw.Draw(probe).text((pad, round(1.5 * pad)), text, font=font, fill=255, anchor="ls")
    box = probe.point(lambda v: 255 if v > 127 else 0).getbbox()
    assert box is not None, f"no ink for {text!r}"
    return box[0] - pad, box[2] - pad


def draw_lockup() -> Image.Image:
    """The lockup on a transparent layer at ``SCALE * SUPER`` banner pixels."""
    k = SCALE * SUPER
    layer = Image.new("RGBA", (round((TAGLINE_INK_RIGHT + 8) * k), round((ICON_PX + 8) * k)), (0, 0, 0, 0))
    icon_px = round(ICON_PX * k)
    icon = Image.open(ICON).convert("RGBA").resize((icon_px, icon_px), Image.Resampling.LANCZOS)
    layer.alpha_composite(icon, (0, 0))

    d = ImageDraw.Draw(layer)
    # The text block (capitals of the name down to the tagline's baseline) is scaled by TEXT_SCALE around its
    # left edge and centered on the icon's height
    t = TEXT_SCALE
    block_top = (ICON_PX - (TAGLINE_BASELINE - TEXT_TOP) * t) / 2
    name_baseline = block_top + (NAME_BASELINE - TEXT_TOP) * t
    tagline_baseline = block_top + (TAGLINE_BASELINE - TEXT_TOP) * t

    name_font = ImageFont.truetype(FONT, round(NAME_FONT_PX * t * k))
    # anchor "ls" starts at the pen position; shift by the left bearing so the ink starts at NAME_INK_LEFT
    name_x = NAME_INK_LEFT * k - ink_span(name_font, NAME)[0]
    d.text((name_x, name_baseline * k), NAME, font=name_font, fill=NAME_COLOR, anchor="ls")

    tag_font = ImageFont.truetype(FONT, round(TAGLINE_FONT_PX * t * k))
    first_bearing = ink_span(tag_font, TAGLINE[0])[0]
    last_ink_right = ink_span(tag_font, TAGLINE[-1])[1]
    advances = [tag_font.getlength(ch) for ch in TAGLINE]
    ink_width = (TAGLINE_INK_RIGHT - TAGLINE_INK_LEFT) * t * k
    # ink width = advances of all letters but the last + their spacing + the last letter's ink, minus the first bearing
    spacing = (ink_width + first_bearing - sum(advances[:-1]) - last_ink_right) / (len(TAGLINE) - 1)
    x = TAGLINE_INK_LEFT * k - first_bearing
    for ch, advance in zip(TAGLINE, advances):
        d.text((x, tagline_baseline * k), ch, font=tag_font, fill=TAGLINE_COLOR, anchor="ls")
        x += advance + spacing
    return layer.resize((round(layer.width / SUPER), round(layer.height / SUPER)), Image.Resampling.LANCZOS)


def main() -> None:
    card = Image.open(BACKGROUND).convert("RGBA")
    if card.size != CARD:
        card = card.resize(CARD, Image.Resampling.LANCZOS)
    lockup = draw_lockup()
    card.alpha_composite(lockup, ORIGIN)
    card.convert("RGB").save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT}; lockup {lockup.width}x{lockup.height} at {ORIGIN}")


if __name__ == "__main__":
    main()

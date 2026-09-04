from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.ttLib.removeOverlaps import removeOverlaps
from fontTools.varLib.instancer import instantiateVariableFont


OUTPUT_WIDTH = 1600
OUTPUT_HEIGHT = 400
SIDE_PADDING = 100
WEIGHT = 700
WORDMARKS = {
    "krypto-was-panchang.svg": "KRYPTO, WAS?",
    "muenzkabinett-skd-panchang.svg": "MÜNZKABINETT SKD",
}


def make_svg(font, text):
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font["hmtx"].metrics
    head = font["head"]
    glyph_names = [cmap[ord(character)] for character in text]
    advance_width = sum(hmtx[glyph_name][0] for glyph_name in glyph_names)
    scale = min((OUTPUT_WIDTH - 2 * SIDE_PADDING) / advance_width, 0.24)
    baseline = (OUTPUT_HEIGHT + (head.yMax - head.yMin) * scale) / 2 + head.yMin * scale
    cursor = (OUTPUT_WIDTH - advance_width * scale) / 2
    paths = []

    for glyph_name in glyph_names:
        pen = SVGPathPen(glyph_set)
        transform = (scale, 0, 0, -scale, cursor, baseline)
        glyph_set[glyph_name].draw(TransformPen(pen, transform))
        path = pen.getCommands()
        if path:
            paths.append(path)
        cursor += hmtx[glyph_name][0] * scale

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{OUTPUT_WIDTH}" height="{OUTPUT_HEIGHT}" '
        f'viewBox="0 0 {OUTPUT_WIDTH} {OUTPUT_HEIGHT}" role="img" aria-label="{text}">'
        f'<title>{text}</title><path fill="#11110f" fill-rule="evenodd" d="{" ".join(paths)}"/></svg>\n'
    )


def main():
    directory = Path(__file__).parent
    font_path = directory.parent / "00_design-system" / "fonts" / "panchang" / "Panchang-Variable.woff2"
    font = instantiateVariableFont(TTFont(font_path), {"wght": WEIGHT}, inplace=False)
    removeOverlaps(font)

    for filename, text in WORDMARKS.items():
        (directory / filename).write_text(make_svg(font, text), encoding="utf-8")


if __name__ == "__main__":
    main()
# Pipeline des dividers torn/scratch : convertit une silhouette N/B (noir = la
# matiere, bord dechire en HAUT, masse solide en BAS) en bande alpha fine pour
# CSS mask-image. Le composant TornDivider peint background-color masque par
# l'asset -> recolorable avec n'importe quel token, flip-Y fait en CSS.
# Emet 4 variantes par source : base, flipx (miroir H), seg-a / seg-b (crops
# horizontaux re-etires -> rythme de dechirure decale).
# Sources stagees dans PNG/dividers/ (untracked), outputs commits.
# Usage : python tests/process-divider.py "<input>" <slug> [--invert-y]
#   ex   : python tests/process-divider.py "PNG/dividers/torn-rough.webp" rough
#   -> public/assets/dividers/torn-rough-{base,flipx,seg-a,seg-b}.png
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

WHITE_THRESHOLD = 242  # luminance au-dessus = papier (alpha 0)
INK_FLOOR = 30  # luminance en dessous = encre pleine (alpha 1)
TOP_MARGIN = 6  # px de transparent garde au-dessus du pic le plus haut
BLEED = 40  # px de solide garanti sous la vallee la plus basse (zero seam)
MAX_WIDTH = 1920
BLUR = 0.6  # antialias du bord (precedent process-frame)
SEG_SPLIT = 0.66  # seg-a = colonnes [0..66%], seg-b = [34%..100%]
ASSETS_DIR = Path(__file__).resolve().parent.parent / "public" / "assets" / "dividers"


def flatten_on_white(img: Image.Image) -> Image.Image:
    """Aplatie les sources detourees (alpha) sur blanc avant traitement."""
    if img.mode in ("RGBA", "LA", "P"):
        rgba = img.convert("RGBA")
        flat = Image.new("RGB", rgba.size, (255, 255, 255))
        flat.paste(rgba, mask=rgba.split()[-1])
        return flat
    return img.convert("RGB")


def alpha_band(src: Path, invert_y: bool) -> np.ndarray:
    """Silhouette N/B -> bande alpha float [0,1] trimee au bord dechire."""
    img = flatten_on_white(Image.open(src))
    if invert_y:
        img = img.transpose(Image.FLIP_TOP_BOTTOM)
    gray = np.asarray(img.convert("L"), dtype=np.float32)
    alpha = np.clip((WHITE_THRESHOLD - gray) / (WHITE_THRESHOLD - INK_FLOOR), 0.0, 1.0)

    # Ligne de dechirure par colonne : 1er passage alpha>0.5 depuis le haut.
    solid = alpha > 0.5
    has_ink = solid.any(axis=0)
    if not has_ink.any():
        raise SystemExit(f"Aucune encre detectee dans {src} (seuil {WHITE_THRESHOLD})")
    tear = np.where(has_ink, solid.argmax(axis=0), alpha.shape[0] - 1)

    top = max(0, int(tear.min()) - TOP_MARGIN)
    bottom = min(alpha.shape[0], int(tear.max()) + BLEED)
    band = alpha[top:bottom]
    band[-4:] = 1.0  # bas force opaque : jonction sans couture avec la section
    return band


def save_variant(band: np.ndarray, slug: str, variant: str) -> None:
    a8 = Image.fromarray((band * 255).astype(np.uint8), "L")
    if a8.width > MAX_WIDTH:
        a8 = a8.resize((MAX_WIDTH, a8.height), Image.LANCZOS)
    a8 = a8.filter(ImageFilter.GaussianBlur(BLUR))
    out_img = Image.new("RGBA", a8.size, (255, 255, 255, 0))
    out_img.putalpha(a8)
    out = ASSETS_DIR / f"torn-{slug}-{variant}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    out_img.save(out, "PNG", optimize=True)
    kb = out.stat().st_size / 1024
    print(f"{out.name}: {out_img.width}x{out_img.height}, {kb:.0f} KB")


def process(src: Path, slug: str, invert_y: bool = False) -> None:
    band = alpha_band(src, invert_y)
    w = band.shape[1]
    full = Image.fromarray((band * 255).astype(np.uint8), "L")
    seg_a = full.crop((0, 0, round(w * SEG_SPLIT), full.height)).resize(full.size, Image.LANCZOS)
    seg_b = full.crop((round(w * (1 - SEG_SPLIT)), 0, w, full.height)).resize(full.size, Image.LANCZOS)
    save_variant(band, slug, "base")
    save_variant(np.fliplr(band), slug, "flipx")
    save_variant(np.asarray(seg_a, dtype=np.float32) / 255, slug, "seg-a")
    save_variant(np.asarray(seg_b, dtype=np.float32) / 255, slug, "seg-b")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--invert-y"]
    if len(args) != 2:
        raise SystemExit('Usage: python tests/process-divider.py "<input>" <slug> [--invert-y]')
    process(Path(args[0]), args[1], "--invert-y" in sys.argv)

# Pipeline assets stamps du livre d'or : trim du blanc (bbox de l'encre + marge),
# decoupe "die-cut" (exterieur transparent, TOUT l'interieur du tampon opaque —
# les fonds interieurs cream/vert pale font partie du design et sont conserves),
# resize hauteur max, export webp -> public/assets/stamps/stamp-{slug}.webp.
# Le rendu carte ajoute un halo blanc (drop-shadow) pour la lisibilite sur photo.
# Usage : python tests/process-stamp.py "<input>" <slug>
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

# L'encre est rendue a ~56px de haut ; 240px = marge retina x4 confortable.
MAX_HEIGHT = 240
WHITE_THRESHOLD = 242  # en dessous (luminance min) = encre, pour la bbox
MARGIN_PCT = 0.02  # 2% de marge autour de la bbox
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "assets" / "stamps"


def flatten_on_white(img: Image.Image) -> Image.Image:
    """Aplatie les sources detourees (alpha) sur blanc avant traitement."""
    if img.mode in ("RGBA", "LA", "P"):
        rgba = img.convert("RGBA")
        flat = Image.new("RGB", rgba.size, (255, 255, 255))
        flat.paste(rgba, mask=rgba.split()[-1])
        return flat
    return img.convert("RGB")


def _spread(mask: np.ndarray) -> np.ndarray:
    """Dilatation binaire 4-connexe d'1 pixel (numpy pur)."""
    return (
        mask
        | np.roll(mask, 1, 0)
        | np.roll(mask, -1, 0)
        | np.roll(mask, 1, 1)
        | np.roll(mask, -1, 1)
    )


def die_cut_alpha(img: Image.Image) -> Image.Image:
    """Decoupe die-cut : flood du blanc exterieur depuis les bords de l'image,
    tout le reste (bordure + fond interieur clair + texture) reste opaque.
    Les fonds interieurs (cream, vert pale) sont conserves tels quels."""
    arr = np.asarray(img, dtype=np.uint8)
    ink = arr.min(axis=2) < 252  # tout pixel non quasi-blanc

    # Ferme les trous d'encre de la bordure (texture tamponnee) pour que le
    # flood exterieur ne fuie pas a l'interieur du tampon.
    wall = ink
    for _ in range(2):
        wall = _spread(wall)
    background = ~wall

    # Flood de l'exterieur : graines = pixels de fond touchant les bords
    ext = np.zeros_like(background)
    ext[0, :] = background[0, :]
    ext[-1, :] = background[-1, :]
    ext[:, 0] |= background[:, 0]
    ext[:, -1] |= background[:, -1]
    while True:
        grown = _spread(ext) & background
        grown |= ext
        if np.array_equal(grown, ext):
            break
        ext = grown

    inside = ~ext
    # Compense la dilatation du mur (sinon 2px de frange blanche autour)
    for _ in range(2):
        inside = (
            inside
            & np.roll(inside, 1, 0)
            & np.roll(inside, -1, 0)
            & np.roll(inside, 1, 1)
            & np.roll(inside, -1, 1)
        )

    alpha = Image.fromarray((inside * 255).astype(np.uint8), "L").filter(
        ImageFilter.GaussianBlur(0.8)
    )
    out = img.convert("RGBA")
    out.putalpha(alpha)
    return out


def process(src: Path, slug: str) -> Path:
    img = flatten_on_white(Image.open(src))

    # Bbox de l'encre : pixel dont la luminance passe sous le seuil
    gray = img.convert("L")
    mask = gray.point(lambda v: 255 if v < WHITE_THRESHOLD else 0)
    bbox = mask.getbbox()
    if not bbox:
        raise SystemExit(f"Aucune encre detectee dans {src} (seuil {WHITE_THRESHOLD})")

    mw = round((bbox[2] - bbox[0]) * MARGIN_PCT)
    mh = round((bbox[3] - bbox[1]) * MARGIN_PCT)
    bbox = (
        max(0, bbox[0] - mw),
        max(0, bbox[1] - mh),
        min(img.width, bbox[2] + mw),
        min(img.height, bbox[3] + mh),
    )
    img = img.crop(bbox)

    if img.height > MAX_HEIGHT:
        ratio = MAX_HEIGHT / img.height
        img = img.resize((round(img.width * ratio), MAX_HEIGHT), Image.LANCZOS)

    img = die_cut_alpha(img)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"stamp-{slug}.webp"
    img.save(out, "WEBP", quality=85)
    kb = out.stat().st_size / 1024
    print(f"{out.name}: {img.width}x{img.height} RGBA, {kb:.0f} KB (source {src.name})")
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python tests/process-stamp.py <input> <slug>")
    process(Path(sys.argv[1]), sys.argv[2])

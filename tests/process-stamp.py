# Pipeline assets stamps du livre d'or : trim du blanc (bbox de l'encre + marge),
# conversion blanc -> alpha (unmultiply : seule l'encre subsiste, en RGBA),
# resize hauteur max, export webp -> public/assets/stamps/stamp-{slug}.webp.
# Le rendu carte ajoute un halo blanc (drop-shadow) pour la lisibilite sur photo.
# Usage : python tests/process-stamp.py "<input>" <slug>
import sys
from pathlib import Path

import numpy as np
from PIL import Image

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


def white_to_alpha(img: Image.Image) -> Image.Image:
    """Unmultiply depuis un fond blanc : alpha = 1 - min(R,G,B)/255,
    couleur = (C - (1-a)*255) / a. Composite sur blanc == source exacte ;
    sur fond sombre, seule l'encre apparait (vrai tampon)."""
    arr = np.asarray(img, dtype=np.float64) / 255.0
    alpha = 1.0 - arr.min(axis=2)
    safe = np.maximum(alpha, 1e-6)[..., None]
    color = (arr - (1.0 - alpha[..., None])) / safe
    color = np.clip(color, 0.0, 1.0)
    color[alpha < 1e-3] = 0.0
    out = np.dstack([color, alpha[..., None]])
    return Image.fromarray((out * 255.0 + 0.5).astype(np.uint8), "RGBA")


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

    img = white_to_alpha(img)

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

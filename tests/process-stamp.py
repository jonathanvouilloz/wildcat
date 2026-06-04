# Pipeline assets stamps du livre d'or : trim du blanc (bbox de l'encre + marge),
# resize hauteur max, export webp -> public/assets/stamps/stamp-{slug}.webp.
# Usage : python tests/process-stamp.py "<input.png>" <slug>
#         python tests/process-stamp.py "C:/.../image.png" main-event
import sys
from pathlib import Path

from PIL import Image

# L'encre est rendue a ~56px de haut (multiply) ; 240px = marge retina x4 confortable.
MAX_HEIGHT = 240
WHITE_THRESHOLD = 242  # en dessous (sur un canal min) = encre
MARGIN_PCT = 0.02  # 2% de marge autour de la bbox
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "assets" / "stamps"


def process(src: Path, slug: str) -> Path:
    img = Image.open(src).convert("RGB")

    # Masque encre : pixel dont le canal le plus sombre passe sous le seuil
    gray = img.convert("L")
    mask = gray.point(lambda v: 255 if v < WHITE_THRESHOLD else 0)
    bbox = mask.getbbox()
    if not bbox:
        raise SystemExit(f"Aucune encre detectee dans {src} (seuil {WHITE_THRESHOLD})")

    # Marge proportionnelle, clampee aux bords
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

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"stamp-{slug}.webp"
    img.save(out, "WEBP", quality=85)
    kb = out.stat().st_size / 1024
    print(f"{out.name}: {img.width}x{img.height}, {kb:.0f} KB (source {src.name})")
    return out


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: python tests/process-stamp.py <input> <slug>")
    process(Path(sys.argv[1]), sys.argv[2])

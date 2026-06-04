# Recompresse la photo équipe pour le web (hero background).
import os

from PIL import Image

SRC = "PNG/hero-section.webp"
OUT = "public/assets/hero-team.webp"

im = Image.open(SRC)
im = im.resize((1920, 1280), Image.LANCZOS)
im.save(OUT, "WEBP", quality=78, method=6)
print(f"{OUT}: {os.path.getsize(OUT) / 1024:.0f} KB ({im.width}x{im.height})")

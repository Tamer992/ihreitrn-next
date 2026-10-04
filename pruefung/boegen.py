# Legt die Abschnitts-Screenshots einer Breite nebeneinander auf einen Bogen zum Durchsehen.
# Aufruf: python pruefung/boegen.py pruefung/ergebnis
import glob, os, sys
from PIL import Image

ordner = sys.argv[1] if len(sys.argv) > 1 else "pruefung/ergebnis"
for breite in ("375", "768", "1280", "1920"):
    teile = sorted(glob.glob(os.path.join(ordner, f"start-{breite}-[0-9][0-9].png")))
    if not teile:
        continue
    bilder = [Image.open(t) for t in teile]
    massstab = 0.5 if int(breite) >= 1280 else 0.7
    klein = [b.resize((int(b.width * massstab), int(b.height * massstab))) for b in bilder]
    proZeile = 4 if int(breite) >= 1280 else 6
    w, h = klein[0].size
    zeilen = -(-len(klein) // proZeile)
    bogen = Image.new("RGB", (proZeile * (w + 12), zeilen * (h + 12)), "white")
    for i, b in enumerate(klein):
        bogen.paste(b, ((i % proZeile) * (w + 12), (i // proZeile) * (h + 12)))
    ziel = os.path.join(ordner, f"bogen-{breite}.jpg")
    bogen.save(ziel, quality=85)
    print(ziel, bogen.size)

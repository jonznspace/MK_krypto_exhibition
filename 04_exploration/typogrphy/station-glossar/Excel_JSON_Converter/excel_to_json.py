import pandas as pd
import json
from pathlib import Path
import re


# ============================================================
# EINSTELLUNGEN
# ============================================================

EXCEL_FOLDER = Path("excel")
OUTPUT_FOLDER = Path("output")

OUTPUT_FILE = OUTPUT_FOLDER / "daten.json"


# ============================================================
# JSON-KEY BEREINIGEN
# ============================================================

def clean_key(key):
    """
    Wandelt Excel-Spaltennamen in saubere snake_case JSON-Keys um.

    Beispiele:

        "Nr."                    -> "nr"
        "Gruppe"                 -> "gruppe"
        "Begriff (DE)"           -> "begriff_de"
        "Term (EN)"              -> "term_en"
        "Level 1"                -> "level_1"
        "Short definition EN"    -> "short_definition_en"
        "Ebene 2 (DE)"           -> "ebene_2_de"
    """

    # In Text umwandeln
    key = str(key)

    # Umlaute umwandeln
    replacements = {
        "ä": "ae",
        "ö": "oe",
        "ü": "ue",
        "Ä": "Ae",
        "Ö": "Oe",
        "Ü": "Ue",
        "ß": "ss"
    }

    for old, new in replacements.items():
        key = key.replace(old, new)

    # Alles klein schreiben
    key = key.lower()

    # Klammern entfernen
    key = key.replace("(", "_")
    key = key.replace(")", "")

    # Punkte entfernen
    key = key.replace(".", "")

    # Leerzeichen durch Unterstriche ersetzen
    key = key.replace(" ", "_")

    # Alles entfernen, was kein Buchstabe,
    # keine Zahl und kein Unterstrich ist
    key = re.sub(r"[^a-z0-9_]", "", key)

    # Mehrere Unterstriche hintereinander zusammenfassen
    key = re.sub(r"_+", "_", key)

    # Unterstriche am Anfang und Ende entfernen
    key = key.strip("_")

    return key


# ============================================================
# EXCEL-DATEI SUCHEN
# ============================================================

excel_files = list(EXCEL_FOLDER.glob("*.xlsx"))


if not excel_files:

    print("❌ Keine Excel-Datei gefunden!")
    print()
    print("Lege eine .xlsx-Datei in diesen Ordner:")
    print(EXCEL_FOLDER.resolve())

    input("\nEnter drücken zum Beenden...")
    exit()


if len(excel_files) > 1:

    print("⚠️ Mehrere Excel-Dateien gefunden.")
    print()

    for file in excel_files:
        print(f"  - {file.name}")

    print()
    print(f"Verwendet wird: {excel_files[0].name}")
    print()


excel_file = excel_files[0]


# ============================================================
# START
# ============================================================

print()
print("==============================================")
print("       EXCEL → JSON CONVERTER")
print("==============================================")
print()

print(f"Excel-Datei: {excel_file.name}")
print()


# ============================================================
# EXCEL EINLESEN
# ============================================================

try:

    df = pd.read_excel(excel_file)

except Exception as e:

    print("❌ Fehler beim Einlesen der Excel-Datei:")
    print()
    print(e)

    input("\nEnter drücken zum Beenden...")
    exit()


# ============================================================
# LEERE ZEILEN ENTFERNEN
# ============================================================

df = df.dropna(how="all")


# ============================================================
# SPALTENNAMEN BEREINIGEN
# ============================================================

original_columns = list(df.columns)

cleaned_columns = [
    clean_key(column)
    for column in df.columns
]

df.columns = cleaned_columns


# ============================================================
# ÄNDERUNGEN ANZEIGEN
# ============================================================

print("JSON-KEYS:")
print()

for original, cleaned in zip(
    original_columns,
    cleaned_columns
):

    original = str(original)

    if original != cleaned:

        print(f"  {original}  →  {cleaned}")

    else:

        print(f"  {cleaned}")

print()


# ============================================================
# PRÜFEN AUF DOPPELTE KEYS
# ============================================================

if len(cleaned_columns) != len(set(cleaned_columns)):

    print("⚠️ WARNUNG!")
    print()
    print("Durch die Bereinigung sind doppelte JSON-Keys entstanden.")
    print("Bitte überprüfe deine Excel-Spaltennamen.")
    print()

    duplicates = [
        key
        for key in set(cleaned_columns)
        if cleaned_columns.count(key) > 1
    ]

    print("Betroffene Keys:")

    for key in duplicates:
        print(f"  - {key}")

    print()

    input("Enter drücken zum Beenden...")
    exit()


# ============================================================
# LEERE ZELLEN → NONE
# ============================================================

df = df.where(pd.notnull(df), None)


# ============================================================
# DATAFRAME → DICTIONARY
# ============================================================

data = df.to_dict(
    orient="records"
)


# ============================================================
# OUTPUT-ORDNER ERSTELLEN
# ============================================================

OUTPUT_FOLDER.mkdir(
    exist_ok=True
)


# ============================================================
# JSON SCHREIBEN
# ============================================================

try:

    with open(
        OUTPUT_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            data,
            f,
            ensure_ascii=False,
            indent=2,
            default=str
        )

except Exception as e:

    print("❌ Fehler beim Erstellen der JSON:")
    print()
    print(e)

    input("\nEnter drücken zum Beenden...")
    exit()


# ============================================================
# ERFOLG
# ============================================================

print("==============================================")
print("               ✅ FERTIG!")
print("==============================================")
print()

print(f"Zeilen verarbeitet: {len(data)}")
print(f"Spalten gefunden:  {len(df.columns)}")
print()

print("JSON erstellt:")
print(OUTPUT_FILE.resolve())
print()

input("Enter drücken zum Beenden...")
# Galleriets bilder

Varje bild i den här mappen visas automatiskt på sidan **/galleri**. Du behöver inte ändra någon kod.

## Lägga till en bild

1. Lägg bildfilen i den här mappen (`client/src/assets/galleri/`).
2. Klart. Med `npm run dev` igång syns bilden i galleriet efter några sekunder. På den riktiga webbplatsen syns den efter nästa bygge och publicering.

Storlekarna som sidan behöver skapas automatiskt: en stor bild (1920 px) och en miniatyr (640 px), i både WebP och JPG. Små bilder förstoras aldrig.

## Ta bort en bild

Radera filen. Den försvinner från galleriet på samma sätt.

## Ordning

Bilderna visas i filnamnens ordning. Sätt en siffra först för att styra ordningen, till exempel `010-`, `020-`, `030-`. Lämna gärna luckor så att du kan lägga in en bild emellan (`015-`).

Siffran följer inte med i bildens adress. Därför fortsätter länkar som `/galleri?bild=servicegang-mot-kontor` att fungera när du döper om för att ändra ordningen.

## Bildtexter

Skriv titel, beskrivning, kategori och alt-text i `bildtexter.json` i den här mappen. Nyckeln är filnamnet utan ordningssiffra och filändelse:

```json
{
  "servicegang-mot-kontor": {
    "titel": "Servicegången i verkstaden",
    "beskrivning": "En lång vy genom verkstadens arbetsyta och utrustning.",
    "kategori": "Verkstad",
    "alt": "Servicegång i verkstaden med utrustning och däckställ"
  }
}
```

- `alt` beskriver vad bilden visar för den som inte ser den. Skriv den alltid.
- Glömmer du bildtexten visas bilden ändå, med en titel byggd på filnamnet. I `npm run dev` skrivs en påminnelse i webbläsarens konsol.

## Filer

- **Format:** JPG, PNG eller WebP. Bilder från iPhone i HEIC-format måste först exporteras till JPG.
- **Storlek:** helst minst 1920 px bred och högst ungefär 5 MB.
- **Namn:** små bokstäver, siffror och bindestreck, till exempel `040-dackhotell-hyllor.jpg`. Å och ä blir a och ö blir o i adressen.

## Regel: inga personer på bilderna

Galleriet visar bara verkstaden, utrustningen och bilar. Inga ansikten, kunder eller personal, inte heller i bakgrunden.

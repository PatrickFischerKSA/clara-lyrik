# Zwischen den Zeilen

Eine atmosphärische, interaktive Lyrikeinheit zu Clara Lösel für Sekundarstufe II (ab 16 Jahren), 90–105 Minuten. Deutschsprachig, ohne Abhängigkeiten oder Backend. Auf GitHub Pages auch unter einem Repository-Unterpfad lauffähig.

## Starten

```sh
npm start
```

Öffne http://localhost:4173. Voraussetzung: Python 3, für die Checks zusätzlich Node.js ab 20. Kein `npm install` nötig. Alternativ `python3 -m http.server 4173 --directory dist` verwenden. Wegen ES-Modulen über HTTP öffnen, nicht per Doppelklick auf index.html.

## GitHub Pages

1. Den gesamten Inhalt dieses Projektordners in ein neues Repository übernehmen (inklusive `.github`).
2. In **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** wählen.
3. Auf Branch `main` pushen oder den Workflow „Deploy to GitHub Pages“ auslösen.
4. Der Workflow prüft JavaScript und Kerntests und veröffentlicht `dist/`.

Alternativ `dist/` auf jedem statischen Webhost bereitstellen. Die `.openai/hosting.json` gehört zur separaten Sites-Veröffentlichung; GitHub Pages verwendet sie nicht. Kein GitHub-Repository wird durch diese Dateien automatisch angelegt.

## Fünf Stationen

- Ankommen: Wortimpuls, Lernziele, persönlicher Zugang.
- Worte lesen: Close Reading von „intro zwei.“, anklickbare Bildsprache, Zeilenbruch, Vergleichsauftrag zu „lange version.“.
- Stimme hören: dokumentierter Medienvergleich anhand offizieller externer Quellen; eigener Vortrag als Alternative.
- Rhythmus spüren: 8 Übungen, Silbentasten, Zäsur/Enjambement, akzeptierte Varianten, Stille, Pause, vertauschbare Tasten, verzeihender Modus.
- Selbst dichten: Impulse, Rohtext, eingebauter D-Gram-Regel-Editor mit eigenen Wortfeldern, Regelprüfung und Ableitungsansicht, Digital Poet und Regelexport, Textlupe mit Frequenzen/N-Grammen/KWIC/Vergleich, Überarbeitung, Bühne, Textexport.

## Lernstand und Datenschutz

Alle Eingaben liegen ausschließlich in `localStorage` des Browsers. Keine Konten, Tracker, externen Fonts, eingebetteten Plattform-Player oder API-Schlüssel. Links öffnen externe Angebote erst bei Klick. Einträge können auf einem geteilten Gerät sichtbar bleiben. JSON-Sicherung und Wiederherstellung, Textjournal-Export und vollständiges lokales Löschen sind eingebaut. Privater Modus oder gelöschte Websitedaten können Fortschritt verlieren. Sicherungen enthalten eigene Texte: vertraulich behandeln.

## Prüfen

```sh
npm run check
npm test
```

Kerntests überprüfen die metrischen Muster, Textanalyse, Generator und Sicherungsvalidierung. Browserprüfung für Navigation, Eingaben und Spiel ist ergänzend nötig.

## Anpassen

`dist/app.js`: Inhalte, Quellen und Werkstatt. `dist/core.js`: Übungen und reine Analysefunktionen. `dist/grammar.js`: Parser, Regelprüfung und begrenzte Texterzeugung. `dist/style.css`: Darstellung. `docs/unterricht.md`: Unterrichtsplanung; `docs/quellen.md`: Quellen und Unterschiede zu den Vorbildern.

## Rechte

Der selbst erstellte Programmcode steht unter MIT (LICENSE). Clara Lösels Gedichttext ist davon ausdrücklich ausgenommen; Rechte bei der Autorin/Rechteinhabern. Der kurze Textauszug dient der konkreten Analyse und trägt einen Quellennachweis. Das vollständige bereitgestellte Buch-PDF wird weder gebündelt noch hochgeladen. Für umfangreichere Texte und Medien müssen gesonderte Nutzungsrechte geklärt werden. DILAITS und Metrum sind verlinkte Inspirationsquellen; ihr Code und ihre Medien wurden nicht übernommen. Es handelt sich um eine unabhängige Unterrichtseinheit.

## Regel-Editor direkt in der Werkstatt

Unter **Selbst dichten → D-Gram-Regel-Editor** lassen sich Regeln und Wortfelder bearbeiten, prüfen und sofort ausprobieren. Startsymbol und Anzahl der Erzeugungen (1–24) sind frei wählbar. Regeln, Wortfelder und letzte Ausgabe werden im lokalen Journal mitgesichert. Das Beispiel „Bild und Wendung“ zeigt einen mehrzeiligen Gedichtbauplan.

```text
S -> Anrede Ding "."
Anrede -> "du nennst es" | "ich nenne es"
Ding -> "einen Anfang" | "ein offenes Fenster"
```

Unterstützt werden benannte Bausteine, Alternativen, einfache/doppelte Anführungszeichen, Kommentare mit `#`, verschachtelte Regeln und `"\n"` für Zeilenumbrüche. Eine Ableitungsansicht erklärt die konkrete Auswahl. Fehlende Referenzen, Syntaxfehler, nicht endende Regeln und Größenlimits werden angezeigt; unbenutzte Regeln erzeugen Hinweise. Eingaben werden ausschließlich als Text interpretiert, nie als Programm ausgeführt.

Die vereinfachte Engine unterstützt keine D-Gram-Merkmalsvereinbarung wie `[NUM=sg]`, Syntaxbaumgrafik oder vollständige Auflistung aller möglichen Sätze. Passende Kasus- und Verbformen werden selbst in die Wortfelder eingetragen. Der Originaldienst ist optional; der Regel-Editor funktioniert ohne ihn.

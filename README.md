# Zwischen den Zeilen

Eine atmosphärische, interaktive Lyrikeinheit zu Clara Lösel für Sekundarstufe II (ab 16 Jahren), 90–105 Minuten. Deutschsprachig, ohne Installationsschritt oder Backend. Auf GitHub Pages auch unter einem Repository-Unterpfad lauffähig.

## Zweite Ressource: Bodo Wartke

[Was im Kopf bleibt · Bodo Wartke](https://patrickfischerksa.github.io/clara-lyrik/bodo/) ist eine eigenständige, miteinander verlinkte Lyrikwerkstatt unter `dist/bodo/`. Schwerpunkt: Gedichtform und Mnemotechnik, mit offiziellen Hörbeispielen, umstellbaren Reimschemata, Sprechpuls, verdecktem Abruf und eigenen Lernversen. Die fünf Fachbereiche sind Biologie, Deutsch, Mathematik, Physik und Geschichte; ein eigenes Thema ist ebenfalls möglich. In der Schreibwerkstatt enthält der D-Gram-Regel-Editor neun Beispielgrammatiken mit Arbeitsaufträgen, bearbeitbare Wortfelder und eine eigene Grammatikbibliothek. Ganze Fassungen lassen sich nach Prüfung in die vier Versfelder übernehmen. Die Grammatiken nutzen dasselbe Dateiformat wie die Clara-Lösel-Werkstatt. Jedes der vier Hörbeispiele führt mit einem eigenen Schreibimpuls direkt zur passenden Grammatik. Diese Einstiege haben getrennte Entwürfe und teilbare Direktlinks; eigene Änderungen bleiben beim Wiederkommen erhalten.

Planung und Quellen stehen in [docs/bodo-unterricht.md](docs/bodo-unterricht.md). Entwürfe werden getrennt von der Clara-Lösel-Einheit unter `wartke-form-gedaechtnis-v1` gespeichert. JSON-Sicherung und Import, Textexport und Druckansicht sind eingebaut. YouTube und Vimeo laden erst nach Klick. Die Fachübungen und Verse sind eigene Texte; Originalaufnahmen bleiben beim jeweiligen Anbieter.

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

Alle Eingaben liegen ausschliesslich in `localStorage` des Browsers. Keine Konten, eigenen Tracker, externen Fonts oder API-Schlüssel. Die fest hinterlegten Instagram-Reels laden ihre Originalplayer beim Annähern an den sichtbaren Bereich; dabei entsteht eine Verbindung zu Instagram. Weitere Medienplayer werden erst nach bewusstem Laden aufgerufen. Einträge können auf einem geteilten Gerät sichtbar bleiben. JSON-Sicherung und Wiederherstellung, Textjournal-Export und vollständiges lokales Löschen sind eingebaut. Privater Modus oder gelöschte Websitedaten können Fortschritt verlieren. Sicherungen enthalten eigene Texte: vertraulich behandeln.

## Prüfen

```sh
npm run check
npm test
```

Kerntests überprüfen die metrischen Muster, Textanalyse, Generator und Sicherungsvalidierung. Browserprüfung für Navigation, Eingaben und Spiel ist ergänzend nötig.

## Anpassen

`dist/app.js`: Inhalte, Quellen und Werkstatt. `dist/core.js`: Übungen und reine Analysefunktionen. `dist/grammar.js`: Parser, Regelprüfung und begrenzte Texterzeugung. `dist/examples.js`: Beispielgrammatiken und Arbeitsaufträge. `dist/library.js`: benannte Grammatikbibliothek und portables Dateiformat. `dist/style.css`: Darstellung. `docs/unterricht.md`: Unterrichtsplanung; `docs/quellen.md`: Quellen und Unterschiede zu den Vorbildern.

## Rechte

Der selbst erstellte Programmcode steht unter MIT (LICENSE). Clara Lösels Gedichttexte und das offizielle Porträtmotiv sind davon ausdrücklich ausgenommen; Rechte bei der Autorin/Rechteinhabern. Der kurze Textauszug dient der konkreten Analyse und trägt einen Quellennachweis. Das vollständige bereitgestellte Buch-PDF wird weder gebündelt noch hochgeladen. Für umfangreichere Texte und Medien müssen gesonderte Nutzungsrechte geklärt werden. DILAITS und Metrum sind verlinkte Inspirationsquellen; ihr Code und ihre Medien wurden nicht übernommen. Es handelt sich um eine unabhängige Unterrichtseinheit.

## Regel-Editor direkt in der Werkstatt

Unter **Selbst dichten → D-Gram-Regel-Editor** lassen sich Regeln und Wortfelder bearbeiten, prüfen und sofort ausprobieren. Startsymbol und Anzahl der Erzeugungen (1–24) sind frei wählbar. Regeln, Wortfelder und letzte Ausgabe werden im lokalen Journal mitgesichert. Vierzehn auswählbare Beispielgrammatiken führen mit kurzen Arbeitsaufträgen zu Anaphern, Metaphern und überraschenden Wendungen. Das Laden speichert den bisherigen Bauplan für eine Wiederherstellung zwischen; die Auswahl allein ändert keine Regeln.

```text
S -> Anrede Ding "."
Anrede -> "du nennst es" | "ich nenne es"
Ding -> "einen Anfang" | "ein offenes Fenster"
```

Unterstützt werden benannte Bausteine, Alternativen, einfache/doppelte Anführungszeichen, Kommentare mit `#`, verschachtelte Regeln und `"\n"` für Zeilenumbrüche. Eine Ableitungsansicht erklärt die konkrete Auswahl. Fehlende Referenzen, Syntaxfehler, nicht endende Regeln und Grössenlimits werden angezeigt; unbenutzte Regeln erzeugen Hinweise. Eingaben werden ausschliesslich als Text interpretiert, nie als Programm ausgeführt.

Die vereinfachte Engine unterstützt keine D-Gram-Merkmalsvereinbarung wie `[NUM=sg]`, Syntaxbaumgrafik oder vollständige Auflistung aller möglichen Sätze. Passende Kasus- und Verbformen werden selbst in die Wortfelder eingetragen. Der Originaldienst ist optional; der Regel-Editor funktioniert ohne ihn.

### Sechs Wege zum eigenen Gedicht

| Verfahren | Beispielgrammatiken | Schwerpunkt |
|---|---|---|
| Anaphern | „Ich sehe …“; „Du musst nicht …“ | Wiederholung, Entwicklung und Bruch |
| Metaphern | „Ein Gefühl wird ein Gegenstand“; „Wenn Dinge handeln“ | Konkrete Bildfelder und Personifikation |
| Überraschende Wendungen | „Gesucht – gefunden“; „Der grosse Moment wird klein“ | Perspektivwechsel und Erwartungsbruch |

Beispiel auswählen → Arbeitsauftrag lesen → in den Editor laden → Wortfelder verändern → Verse erzeugen → bewusst überarbeiten. „Vorherigen Bauplan wiederherstellen“ nimmt den letzten Beispielwechsel zurück (eine Stufe). Auswahl, bearbeitete Regeln und Sicherung werden lokal gespeichert. Die Beispiele sind eigens verfasstes Unterrichtsmaterial, keine Texte von Clara Lösel.

## Eigene Grammatikbibliothek

Im Regel-Editor unter **Meine Grammatikbibliothek** einen Namen eingeben und **Unter diesem Namen speichern** wählen. Gespeichert werden Regeln, Wortfelder, Startsymbol und Versanzahl. Die Bibliothek bleibt im Browser und wird in der JSON-Lernjournal-Sicherung mitgeführt. Unfertige Entwürfe dürfen ebenfalls gespeichert werden.

- Über die Auswahl und **Gespeicherte Grammatik laden** einen Eintrag zurück in den Editor holen. Der bisherige Editorinhalt wird für die vorhandene Wiederherstellungsfunktion zwischengespeichert.
- Erneutes Speichern unter demselben Namen ersetzt den gespeicherten Stand erst nach Bestätigung. Änderungen im Editor allein verändern keinen Bibliothekseintrag.
- **Auswahl als Grammatikdatei exportieren** speichert den ausgewählten Bibliothekseintrag als `.grammatik.json`. Für aktuelle Editoränderungen vorher erneut speichern.
- **Grammatikdatei importieren** prüft Format, Version und Felder und ergänzt den Eintrag, ohne den Editor zu verändern. Gleiche Namen erhalten `(Import 2)`, `(Import 3)` usw. Danach den importierten Eintrag laden.

Die Dateien enthalten ausschliesslich Textdaten und werden nicht ausgeführt oder auf einen Server hochgeladen. Der bisherige reine Textexport ist unter **Regeln als Text herunterladen** weiterhin verfügbar; importierbar sind die neuen Grammatik-JSON-Dateien. Es gelten maximal 30 Bibliothekseinträge, 30.000 Zeichen pro Regel-/Wortfeldpaar und 180.000 Zeichen für die Bibliothek. Namen sind bis zu 80 Zeichen lang. Browserdaten-Löschen oder „Fortschritt löschen“ entfernt auch die lokale Bibliothek; wichtige Einträge vorher exportieren.

## Inspirationsbibliothek

Unter `#inspiration` ergänzt eine frei zugängliche Materialbibliothek die fünf Lernstationen, ohne den Fortschritt oder die ursprüngliche Zeitplanung zu verändern. Sie umfasst zwölf Gedichtkarten aus dem bereitgestellten Buch, einundzwanzig konkrete Medien-/Quellenkarten und fünf poetologische Themenwege. Suche, Themen-/Medienfilter, lokale Merkliste und quellenspezifische Notizen unterstützen selbstständiges Arbeiten. Schreibimpulse können in die Werkstatt übernommen werden; passende Beispielgrammatiken werden dort vorausgewählt, ohne eigene Regeln zu überschreiben.

Die Textkarten unterscheiden kurze Volltexte, Haupttext ohne PS und Auszüge. Jede hat eine PDF-Dateiseite, eine ausdrücklich als möglich gekennzeichnete Deutung und einen Arbeitsauftrag. Für das vollständige Buch können Lernende ihre eigene Datei lokal öffnen: Sie wird über eine temporäre Blob-URL im PDF-Viewer dieses Tabs angezeigt, nicht hochgeladen und nicht im Lernjournal gespeichert. Die Seiten werden mit dem mitgelieferten PDF.js-Viewer lokal gerendert; ein nativer PDF-Player ist nicht nötig. Abweichende Buchausgaben können andere Dateiseiten haben.

Konkrete Instagram-Reels, YouTube-Videos, ARD-Sendungen, Verlagsinterviews, Podcasts und Porträts sind mit Herkunft und Prüfstand erfasst. YouTube-/Instagram-Player und ein verlinkter Deutschlandfunk-Audioplayer werden erst nach Klick geladen; dabei findet ein Kontakt zum jeweiligen Anbieter statt. Die prominent eingebauten Original-Reels auf Startseite und Inspirationsseite laden dagegen bereits beim Annähern an den sichtbaren Bereich. Einbettungen, Anmeldung und zeitlich begrenzte Mediatheksangebote liegen ausserhalb der Kontrolle dieses Projekts. Die Originalquelle bleibt als Alternative erreichbar. Externe Medien und das vollständige Buch werden nicht im Repository gespeichert.

`dist/inspiration.js` enthält die redaktionell ausgewählten Materialien, Querverweise und die Filterfunktion. Details zur Recherche und Ausgabe stehen in `docs/inspiration-quellen.md`.

## Gestaltung und Original-Reels

Die Startseite rückt Clara Lösel als Lyrikerin, Poetry Artist und literarische Content Creatorin ins Zentrum: offizielles Porträtmotiv, eine feste Galerie mit acht Original-Reels und Themenfiltern, eine Einordnung ihres Arbeitens zwischen Buch, Bühne und Feed und direkte Einstiege zum eigenen Schreiben. Die visuelle Gestaltung verwendet Violett, Flieder und Apricot statt der früheren grünen Werkstattoptik.

Porträtmotiv: https://claraloesel.de/wp-content/uploads/2026/07/keyvisual-claral-loesel-2.jpg (offizielle Website). Das Bild und die fremden Medien sind nicht von der MIT-Code-Lizenz umfasst. Der lokale Viewer verwendet PDF.js 6.5.438 aus dem offiziellen npm-Paket `pdfjs-dist`; Lizenz und mitgelieferte Hinweise unter `dist/vendor/pdfjs/`. Keine Buchdatei ist Bestandteil des Repositorys.

Unter jedem der acht fest eingebetteten Original-Reels steht eine eigene kurze Schreibidee. **Dazu schreiben** öffnet die Schreibwerkstatt mit dieser Idee und dem Quellenlink. Vorhandene Entwürfe bleiben erhalten. Die Impulse erscheinen sowohl auf der Startseite als auch in der Inspirationsbibliothek.

Die eigenen Oberflächentexte, Schreibaufträge, Beispielgrammatiken und Begleitdokumente verwenden Schweizer Rechtschreibung mit ss. Zitate und Originaltexte von Clara Lösel bleiben unverändert. Bereits eingegebene eigene Texte werden nicht automatisch umgeschrieben.


Die acht Reel-Schreibideen sind jeweils einer Beispielgrammatik zugeordnet. **Mit Wörtern spielen** öffnet den D-Gram-Regel-Editor mit vorausgewähltem Beispiel, Original-Link und einem eigenen Auftrag zum Anpassen der Regeln und Wortfelder. Der vorhandene Editorinhalt bleibt erhalten, bis das Beispiel ausdrücklich geladen wird; danach kann er wiederhergestellt werden. **Dazu schreiben** bleibt als freier Einstieg verfügbar.


Jedes der acht Reels hat eine eigene Beispielgrammatik mit thematisch abgestimmten Wortfeldern und Regeln. Farben und Begegnungen, gemeinsamer Alltag, Zeichen der Hoffnung, Selbstfürsorge, innere Stimmen und Erwartungen können direkt kombiniert und verändert werden. Diese Übungsverse sind eigens verfasst und keine Originaltexte von Clara Lösel.


Unter **Deine Wörter und Bilder** lassen sich einzelne Wörter und ganze Wendungen ohne Regelsyntax hinzufügen, ändern und entfernen. Jeder Eintrag hat ein eigenes Textfeld; Zeilenumbrüche und Anführungszeichen sind möglich. Mindestens ein Eintrag bleibt je Wortfeld erhalten. Die aufklappbare Textansicht wird automatisch mitgeführt und aktualisiert ihrerseits die Eingabefelder. Zusammengesetzte oder noch unfertige Regeln bleiben erhalten und werden in der Textansicht bearbeitet. Änderungen werden lokal gespeichert und beim nächsten Erzeugen verwendet; bestehende Verse, eigene Grammatiken und deren Export verwenden dieselben Wortfelder.


**Ein eigenes Wortfeld anlegen** ergänzt im Regel-Editor ein benanntes Feld: Namen eingeben, erste Wörter oder Wendungen zeilenweise sammeln und „Wortfeld anlegen“ wählen. Leerzeichen im Namen werden zu Unterstrichen. Bereits vorhandene Namen in Regeln und Wortfeldern sind geschützt. Optional macht „Das neue Wortfeld direkt zum Erzeugen verwenden“ das Feld zum Startsymbol; so lässt es sich sofort ohne Regelsyntax ausprobieren. Ohne diese Option bleibt das aktuelle Startsymbol erhalten. Neue Felder werden mit dem aktuellen Editor, der benannten Grammatik und deren Export gespeichert.


Jedes bearbeitbare Wortfeld bietet **Umbenennen** und **Wortfeld löschen**. Beim Umbenennen werden ganze Bausteinnamen in den Regeln und Wortfeldern sowie das Startsymbol angepasst; Text in Anführungszeichen und Kommentare bleiben unverändert. Bei verwendeten Feldern lässt sich zum Löschen ein anderes vorhandenes Wortfeld als Ersatz wählen, das alle Verweise übernimmt. Fehlt ein Ersatz, bleibt das Feld erhalten. Umbenennen und Löschen lassen sich über „Vorherigen Bauplan wiederherstellen“ zurücknehmen. Die benannte Bibliothek bleibt bis zum erneuten Speichern unverändert.


Die responsive Darstellung wurde für Smartphone, Tablet und Desktop überarbeitet. Prüfbereiche, Bildschirmbreiten und Änderungen sind in [docs/lesbarkeit.md](docs/lesbarkeit.md) dokumentiert. Die ergänzenden Regeln liegen in `dist/readability.css`.


Unter zwei sicher zugeordneten Original-Reels stehen die vollständigen Buchgedichte zum Mitlesen bereit. Alle Reel-Karten unterstützen lokal ergänzte Texte, eigene Aufnahmen und geprüfte Wort-Zeitmarken. Die Synchronisation läuft am eigenen Player; der Instagram-Embed wird nicht als verfügbare Wiedergabeuhr ausgegeben. Quellen, fehlende Medien und Dateiformat: [docs/mitlesen.md](docs/mitlesen.md).


Die Recherche nach ausdrücklich zur Übernahme freigegebenen Text- und Mediendateien ist in [docs/freigabe-recherche.md](docs/freigabe-recherche.md) dokumentiert. Auf den geprüften offiziellen Seiten wurde keine passende Freigabe gefunden. Der Stand ist unter „Quellen & Hinweise“ auch auf GitHub Pages sichtbar.

# Lesbarkeitsprüfung vom 28.11.2026

Die Darstellung wurde im Browser mit simulierten Bildschirmbreiten geprüft. Es handelt sich um einen Layouttest, nicht um Tests auf physischen Smartphones.

| Bereich | Geprüfte Breiten |
| --- | --- |
| Startseite, Worte, Stimme, Rhythmus, Schreiben, Inspiration | 320, 390, 768 und 1280 Pixel |
| Vier Werkstattansichten | 320 Pixel |
| Acht Rhythmusübungen | 320 Pixel |
| 33 Gedicht- und Mediendialoge | 320 Pixel |
| Anlegen, Umbenennen und Löschen eines langen Wortfeldnamens | 320 Pixel |
| Gedichtvorschau mit einem langen Wort ohne Leerzeichen | 320 Pixel |

In diesen Zuständen wurden nach der Korrektur keine seitlichen Seitenüberläufe festgestellt. Die Navigation ist vollständig sichtbar. Die erste Reel-Karte passt in den Galerieausschnitt; weitere Karten sind bewusst seitlich erreichbar und durch einen Hinweis angekündigt.

## Änderungen

- Mobile Startüberschrift von festen 66 Pixeln auf eine flexible Grösse von etwa 34–48 Pixeln reduziert; Stationsüberschriften etwa 30–40 Pixel.
- Mobile Navigation in mehrere sichtbare Reihen umgebrochen.
- Überschriften, Quellenangaben, Links, Wortfeldnamen und eigene Gedichtzeilen können umbrechen.
- Fliesstexte und Arbeitsaufträge mit mindestens 16 Pixeln bei den üblichen Browser-Schrifteinstellungen gesetzt; relative Einheiten unterstützen geänderte Schriftgrössen.
- Dialoge und Karten erhalten auf kleinen Bildschirmen schmalere Innenabstände; Bedienelemente ausreichend Höhe und flexible Breiten.
- Wortfeldeinträge und Grammatik-Steuerfelder werden auf dem Smartphone untereinander angeordnet.
- Die Textansicht und Bedienelemente des lokalen PDF-Viewers gegen lange Inhalte abgesichert. Für diese Prüfung wurde kein Buch-PDF geladen; der Originaltext wurde nicht verändert.

Die zusätzliche Datei `dist/readability.css` bündelt die Anpassungen und wird nach dem bisherigen Stylesheet geladen. Anwendungstexte, Originalzitate und gespeicherte Lernstände werden durch diese Layoutänderungen nicht umgeschrieben. Die Inhalte eingebetteter Instagram-Player bleiben unter Kontrolle des Anbieters.

Validierung: Syntaxprüfung, 34 Funktionstests sowie Browserprüfungen und Screenshot der Smartphone-Ansicht.

# Mitlesetexte und Wortmarkierung

Stand: 28.11.2026. Diese Ergänzung unterscheidet verfügbare Buchfassungen, lokal ergänzte Texte und synchronisierte Aufnahmen.

## Sicher zugeordnete Buchtexte

| Reel | Buchgedicht | PDF-Dateiseiten |
| --- | --- | --- |
| C2UM_qzNwGl | 12/101 faschisten-döner. | 34–35 |
| DPSxE6-CFmU | 22/101 oh, die dinge, die wir tun, nur um schön zu sein. | 48–50 |

Quelle: Clara Lösel, *Wehe du gibst auf*, NOW, bereitgestelltes PDF, 18. Auflage 2026. Rechte bei der Autorin / dem Verlag. Die Texte wurden aus der bereitgestellten Datei übernommen und anhand gerenderter Seiten geprüft. Gross-/Kleinschreibung, ss/ß, Satzzeichen, Vers- und Strophenfolge bleiben erhalten. Ein Seitenwechsel innerhalb einer Strophe wird nicht als neue Strophe ausgegeben. Es sind Buchfassungen; der gesprochene Wortlaut kann davon abweichen.

Die bisher vorhandenen Gedichtkarten und ihre Auszüge wurden nicht verändert. Die vollständigen neuen Mitlesetexte stehen getrennt in `dist/readalong-texts.js`. Beim Reel C2UM_qzNwGl benennt der Autorenkommentar ausdrücklich „Faschisten-Döner“; beim Reel DPSxE6-CFmU passt der sichtbare erste gesprochene Untertitel zum Anfang des Buchgedichts.

Für die fünf weiteren Gedicht-Reels ist noch keine sicher zugeordnete vollständige Textfassung hinterlegt. Der Jahresrückblick DS6xxyiCP7v ist kein einzelnes Gedicht. Andere thematisch ähnliche Buchtexte werden nicht als deren Mitschrift ausgegeben. Alle acht Karten erlauben das lokale Ergänzen einer eigenen verfügbaren Textfassung.

## Synchronisation

Der eingebettete Instagram-Player liefert dieser Anwendung keine steuerbare Wiedergabeuhr. Deshalb wird keine scheinbar genaue Wortmarkierung durch ein geschätztes Lesetempo erzeugt.

Die Mitlesefunktion kann eine vom Nutzer ausgewählte lokale Audio- oder Videodatei im eigenen Player abspielen. Mit dazu passenden Wort-Zeitmarken folgt die Hervorhebung dessen `currentTime`; Pausen zwischen Wörtern, Pausieren und Zeitsprünge werden berücksichtigt. Der Textbereich folgt der aktiven Stelle, ohne die ganze Seite zu verschieben. Eine zusätzliche beschriftete Zeitachse funktioniert auch in schmalen Playern. Beim Schliessen, Themenwechsel oder Seitenwechsel stoppt die eigene Aufnahme; temporäre Datei-URLs werden freigegeben.

**Noch benötigte Quelldaten:** Die zugehörigen Audio-/Videodateien sowie für die verbleibenden Reels ihre tatsächlichen Textfassungen. Für Claras Aufnahmen sind bisher keine Wort-Zeitmarken hinterlegt. Die synchronisierte Funktion wurde mit einer eigenen stillen Testdatei und eindeutig bezeichneteten Testwörtern geprüft, nicht mit geschätzten Zeiten für Claras Vortrag.

## Lokale Zeitmarkendateien

Eine JSON-Datei enthält die genaue Textfassung und für jedes durch Leerraum getrennte Wort eine Start- und Endzeit in Sekunden. Satzzeichen gehören zum jeweiligen Wort. Beispiel mit eigens geschriebenem Testmaterial:

```json
{
  "text": "Eine erste Zeile.",
  "words": [
    {"word": "Eine", "start": 0.2, "end": 0.5},
    {"word": "erste", "start": 0.5, "end": 0.9},
    {"word": "Zeile.", "start": 1.1, "end": 1.6}
  ]
}
```

Text und Zeitmarken müssen Wort für Wort zusammenpassen. Fehlende, überlappende, vertauschte oder ungültige Zeitmarken werden abgewiesen; die bisherige Fassung bleibt erhalten. Reine Textfassungen können mit `"words": []` importiert und exportiert werden und erzeugen keine Wortmarkierung. Ändert man den Wortlaut, werden bisherige Zeitmarken verworfen.

Texte und Zeitmarken bleiben im lokalen Journal und können exportiert werden. Ausgewählte Medien werden nicht hochgeladen, nicht im Journal gespeichert und nicht auf GitHub veröffentlicht. Nach einem Neuladen muss die Aufnahme erneut ausgewählt werden.

## Prüfung

- 39 Funktionstests einschliesslich Zeitgrenzen, Wortpausen, Vor-/Rücksprung, Unicode, Originaltext-Erhalt, Importfehlern und Export-Rundlauf.
- Browserprüfung: Buchtextanzeige, lokale Datei- und Zeitmarkenauswahl, laufende Markierung, Zeitsprung auf 54 beziehungsweise 30 Sekunden und Wiederherstellung des passenden aktiven Testworts.
- Smartphone-Ansicht mit 390 Pixeln: Mitlesetext ohne horizontalen Überlauf.


## Recherche nach ausdrücklichen Freigaben

Am 28.11.2026 wurden die offizielle Website, ihre veröffentlichten Unterseiten, Medienverweise und verlinkten Buchangebote geprüft. Es wurde keine passende ausdrückliche Übernahmefreigabe für die benötigten Gedichtaufnahmen oder weiteren Volltexte gefunden. Die Ergebnisse und ausgeschlossenen Kandidaten stehen in [freigabe-recherche.md](freigabe-recherche.md). Die Synchronisation der Original-Reels ist deshalb weiterhin nicht vollständig eingerichtet.

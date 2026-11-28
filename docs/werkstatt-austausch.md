# Direkter Austausch zwischen Lösel und Wartke

Beide D-Gram-Editoren enthalten den Bereich «Aus … Werkstatt übernehmen». Direktzugänge:

- [Austausch in der Lösel-Werkstatt](https://patrickfischerksa.github.io/clara-lyrik/#werkstatt?editor=regeln)
- [Austausch in der Wartke-Werkstatt](https://patrickfischerksa.github.io/clara-lyrik/bodo/#werkstatt?editor=regeln)

## Eine Grammatik übernehmen

Bearbeite zunächst eine Grammatik in einer der Werkstätten oder speichere sie dort unter einem Namen. Der Link «Zu … Regel-Editor» führt unmittelbar zur anderen Werkstatt. Wähle dort den aktuellen Entwurf oder einen gespeicherten Eintrag als Quelle. Bei Wartke sind die Fachbereiche und die einzelnen Höranschlüsse in der Auswahl getrennt bezeichnet.

Die Vorschau zeigt Regeln, Wortfelder, Startsymbol und Anzahl. Mit «Grammatik übernehmen» kommt eine eigene Kopie in die lokale Grammatikbibliothek der Zielwerkstatt. Ein bereits verwendeter Name erhält einen Zusatz wie «(Kopie 2)». Die Originalgrammatik bleibt erhalten. Auch unfertige Regelsyntax kann kopiert werden; unvollständige Einstellungen wie eine ungültige Anzahl müssen zunächst in der Quellwerkstatt korrigiert werden.

Ist «Kopie gleich im aktuellen Editor öffnen» ausgewählt, erscheint die Kopie sofort dort. Der vorherige Editorinhalt wird mit der vorhandenen Wiederherstellung aufgehoben. Ohne diese Option bleibt der Editor unverändert und die Kopie lässt sich später aus der eigenen Bibliothek laden. Gedicht- und Versfelder bleiben erhalten.

Die Anzahl meint Erzeugungen des Startsymbols. In der Lösel-Werkstatt kann eine Erzeugung eine einzelne Zeile sein; in Wartkes Beispielen ist sie häufig bereits eine vierzeilige Fassung. Diese Einstellung wird beim Kopieren beibehalten. Die Wartke-Übernahme in die vier Versfelder verlangt weiterhin genau vier ausgefüllte Zeilen.

## Ein Wortfeld übernehmen

Wähle unter derselben Quellgrammatik ein einzelnes Wortfeld. Seine Wörter und Wendungen erscheinen vor der Übernahme als Vorschau. Der Name kann angepasst werden. Ein gleicher Regel- oder Feldname in der Zielwerkstatt erhält einen Zahlenzusatz, damit vorhandene Regeln und Verweise erhalten bleiben.

«Wortfeld übernehmen» ergänzt den aktuellen Editor. Das neue Feld lässt sich danach mit den vorhandenen Wortfeld-Eingaben bearbeiten und in Regeln einsetzen. Die optionale neue Startregel erzeugt vier Zeilen mit diesem Feld. Bestehende Regeln bleiben dabei erhalten und die Änderung lässt sich zurücknehmen. Wörter mit Anführungszeichen, Trennzeichen oder eingebetteten Zeilenumbrüchen bleiben wörtlicher Text. Zusammengesetzte oder noch unfertige Wortfeldregeln lassen sich mit der gesamten Grammatik übernehmen.

## Speicherung und Grenzen

Beide Seiten müssen auf derselben Website im selben Browserprofil verwendet werden. Der Austausch liest die vorhandenen lokalen Journale `zwischen-zeilen-v1` und `wartke-form-gedaechtnis-v1`. Er schreibt ausschliesslich über die Zielwerkstatt in deren eigenes Journal. Es gibt keinen Upload, keine neue gemeinsame Datenbank und keine temporäre Transferdatei. Die Kopien werden mit der bereits vorhandenen Journal-Sicherung erfasst.

Zur Auswahl stehen gespeicherte Grammatiken und ausdrücklich bearbeitete Editorentwürfe. Interne Wiederherstellungsstände werden ausgeblendet. Rohtexte, Hörnotizen und andere Journaleinträge werden nicht als Austauschmaterial aufgeführt. Bei Änderungen in einem anderen Tab aktualisiert «Andere Werkstatt neu einlesen» die Vorschau. Browserprofile und Geräte besitzen getrennte lokale Daten; für deren Wechsel bleibt die vorhandene Dateisicherung verfügbar.

`dist/workshop-exchange.js` enthält die gemeinsame Quellenvalidierung, die Kopierfunktionen und die Oberfläche. Die Tests prüfen beide Journalformate, Quellenbegrenzung, Namenskonflikte, unveränderte Originale, unvollständige Entwürfe, Bibliotheksgrenzen und die wörtliche Übernahme von Wortfeldeinträgen.

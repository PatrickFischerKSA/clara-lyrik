# Direkter Austausch zwischen Lösel und Wartke

Beide D-Gram-Editoren enthalten den Bereich «Aus … Werkstatt übernehmen». Direktzugänge:

- [Austausch in der Lösel-Werkstatt](https://patrickfischerksa.github.io/clara-lyrik/#werkstatt?editor=regeln)
- [Austausch in der Wartke-Werkstatt](https://patrickfischerksa.github.io/clara-lyrik/bodo/#werkstatt?editor=regeln)

## Eine oder mehrere Grammatiken übernehmen

Bearbeite zunächst eigene Grammatiken in einer der Werkstätten oder speichere sie dort unter einem Namen. Der Link «Zu … Regel-Editor» führt unmittelbar zur anderen Werkstatt. Dort stehen die eigenen Editorentwürfe und gespeicherten Grammatiken als Liste mit Kontrollkästchen bereit. Bei Wartke sind die Fachbereiche und die einzelnen Höranschlüsse getrennt bezeichnet.

Markiere die gewünschten Grammatiken oder verwende «Alle Grammatiken auswählen». «Grammatikauswahl aufheben» entfernt die Markierungen. Jede Grammatik hat eine Vorschau ihrer Regeln, Wortfelder, ihres Startsymbols und ihrer Anzahl. Ein Zähler zeigt die Auswahl; eine weitere Angabe zeigt die Belegung deiner Sammlung mit höchstens 30 Grammatiken.

Mit «Ausgewählte Grammatiken übernehmen» kommen alle gewählten Grammatiken gemeinsam als eigene Kopien in die Bibliothek der Zielwerkstatt. Bereits verwendete Namen erhalten Zusätze wie «(Kopie 2)». Die Namen der zuvor angelegten Kopien derselben Gruppe werden dabei ebenfalls berücksichtigt. Die Originalgrammatiken bleiben erhalten.

Die gemeinsame Übernahme wird vollständig vorbereitet, bevor die Zielbibliothek geändert wird. Reichen beispielsweise Platz oder Gesamtgrösse nicht aus, kommt keine der ausgewählten Grammatiken hinzu. Auch unfertige Regelsyntax kann kopiert werden; unvollständige Einstellungen wie eine ungültige Anzahl müssen zunächst in der Quellwerkstatt korrigiert werden.

Standardmässig bleiben die aktuellen Regeln im Editor erhalten. Mit «Eine übernommene Grammatik gleich im Editor öffnen» lässt sich zusätzlich genau eine der ausgewählten Grammatiken bestimmen, die nach der Übernahme geöffnet wird. Der vorherige Editorstand lässt sich anschliessend über die vorhandene Wiederherstellung zurückholen. Alle gespeicherten Kopien bleiben in der Bibliothek. Gedicht- und Versfelder bleiben erhalten.

Die Anzahl meint Erzeugungen des Startsymbols. In der Lösel-Werkstatt kann eine Erzeugung eine einzelne Zeile sein; in Wartkes Beispielen ist sie häufig bereits eine vierzeilige Fassung. Diese Einstellung wird beim Kopieren beibehalten. Die Wartke-Übernahme in die vier Versfelder verlangt weiterhin genau vier ausgefüllte Zeilen.

Die zusätzliche Quellgrammatik-Auswahl unterhalb der Grammatiken bestimmt die Einzelvorschau und die Wortfelder für eine gesonderte Wortfeldübernahme. Beim Neueinlesen der anderen Werkstatt werden die Grammatikauswahl und die Wortfeldauswahl zurückgesetzt.

## Ein oder mehrere Wortfelder übernehmen

Unter der ausgewählten Quellgrammatik werden einzeln übernehmbare Wortfelder mit Kontrollkästchen angezeigt. Wähle die gewünschten Felder oder verwende «Alle Wortfelder auswählen». «Auswahl aufheben» entfernt die Markierungen. Ein Zähler zeigt den Umfang der Auswahl. Beim Wechsel der Quellgrammatik oder beim Neueinlesen wird die Auswahl zurückgesetzt.

Jedes Feld hat eine eigene Vorschau seiner Einträge und einen bearbeitbaren Namen für die Zielwerkstatt. Mit «Ausgewählte Wortfelder übernehmen» werden alle markierten Felder gemeinsam ergänzt. Gleiche Namen erhalten Zusätze; dabei werden vorhandene Regeln sowie die Namen der zuvor übernommenen Felder berücksichtigt. Bestehende Regeln und Verweise bleiben erhalten. Ohne Auswahl ist die Übernahme deaktiviert.

Die gemeinsame Übernahme wird zunächst vollständig geprüft. Wenn beispielsweise der Name eines Feldes ungültig ist oder die Gesamtgrösse überschritten würde, wird keines der Felder eingefügt. Nach erfolgreicher Übernahme nennt die Rückmeldung die ursprünglichen und neuen Feldnamen. Die gesamte Gruppe lässt sich in einem Schritt mit der vorhandenen Wiederherstellung zurücknehmen.

Die optionale neue Startregel verteilt die ausgewählten Felder auf vier Zeilen. Bei weniger als vier Feldern werden sie wiederholt; bei mehr als vier Feldern stehen mehrere Felder in einer Zeile. Alle ausgewählten Felder kommen darin vor. Die erzeugten Texte bleiben Material für die eigene Überarbeitung. Eingebettete Zeilenumbrüche in Einträgen bleiben erhalten und können die sichtbare Zeilenzahl verändern.

Wörter mit Anführungszeichen, Trennzeichen oder eingebetteten Zeilenumbrüchen bleiben wörtlicher Text. Zusammengesetzte oder noch unfertige Wortfeldregeln lassen sich mit der gesamten Grammatik übernehmen. Pro gemeinsamer Übernahme sind höchstens 100 Felder möglich; Regeln und Wortfelder bleiben insgesamt auf 30.000 Zeichen begrenzt.

## Speicherung und Grenzen

Beide Seiten müssen auf derselben Website im selben Browserprofil verwendet werden. Der Austausch liest die vorhandenen lokalen Journale `zwischen-zeilen-v1` und `wartke-form-gedaechtnis-v1`. Er schreibt ausschliesslich über die Zielwerkstatt in deren eigenes Journal. Es gibt keinen Upload, keine neue gemeinsame Datenbank und keine temporäre Transferdatei. Die Kopien werden mit der bereits vorhandenen Journal-Sicherung erfasst.

Zur Auswahl stehen gespeicherte Grammatiken und ausdrücklich bearbeitete Editorentwürfe. Interne Wiederherstellungsstände werden ausgeblendet. Rohtexte, Hörnotizen und andere Journaleinträge werden nicht als Austauschmaterial aufgeführt. Bei Änderungen in einem anderen Tab aktualisiert «Andere Werkstatt neu einlesen» die Vorschau. Browserprofile und Geräte besitzen getrennte lokale Daten; für deren Wechsel bleibt die vorhandene Dateisicherung verfügbar.

`dist/workshop-exchange.js` enthält die gemeinsame Quellenvalidierung, die Kopierfunktionen und die Oberfläche. Die Tests prüfen beide Journalformate, Quellenbegrenzung, Namenskonflikte, unveränderte Originale, unvollständige Entwürfe, Bibliotheksgrenzen und die wörtliche Übernahme von Wortfeldeinträgen.

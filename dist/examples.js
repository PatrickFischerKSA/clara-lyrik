// Original teaching material: examples demonstrate devices, not an author's voice.
export const GRAMMAR_EXAMPLES = [
 {
  id:'anapher-sehen',category:'Anaphern',title:'Ich sehe … · vom Ding zum Gedanken',
  description:'Drei Zeilen beginnen gleich. Der Blick wandert von einer konkreten Beobachtung zu etwas Unsichtbarem.',
  task:'Ersetze die drei Wortfelder durch Beobachtungen aus einem einzigen Ort. Erzeuge zwei Fassungen. Behalte „ich sehe“ bei und ordne die Zeilen so, dass die letzte mehr meint als die erste.',
  rules:String.raw`Gedicht -> ZeileEins "\n" ZeileZwei "\n" ZeileDrei
ZeileEins -> "ich sehe" Gegenstand "."
ZeileZwei -> "ich sehe" Spur "."
ZeileDrei -> "ich sehe" Gedanke "."`,
  words:`Gegenstand -> "einen leeren stuhl" | "ein offenes fenster" | "eine tasse am rand"
Spur -> "staub auf deinem platz" | "den abdruck einer hand" | "licht unter der tür"
Gedanke -> "einen anfang im warten" | "die frage hinter deinem lächeln" | "ein versprechen im staub"`,start:'Gedicht',count:1
 },
 {
  id:'anapher-du',category:'Anaphern',title:'Du musst nicht … · Wiederholung mit Bruch',
  description:'Ein wiederholter Satzanfang gibt Halt. Die Schlusszeile verlässt das Muster und verändert den Ton.',
  task:'Schreibe für ein erfundenes Gegenüber. Tausche Tätigkeiten und Schluss aus. Lies den Text einmal tröstend, einmal fordernd: Welche Wörter und welche Pause entscheiden über den Ton?',
  rules:String.raw`Gedicht -> Zeile "\n" Zeile "\n" Schluss
Zeile -> "du musst nicht" Tun "."`,
  words:`Tun -> "jede antwort kennen" | "immer zuerst ankommen" | "dein schweigen erklären"
Schluss -> "du darfst erst einmal fragen." | "ich höre dir auch ohne antwort zu." | "heute reicht vielleicht ein schritt."`,start:'Gedicht',count:1
 },
 {
  id:'metapher-gefuehl',category:'Metaphern',title:'Ein Gefühl wird ein Gegenstand',
  description:'Ein abstrakter innerer Vorgang bekommt eine konkrete Gestalt. Eine zweite Zeile arbeitet an diesem Bild weiter.',
  task:'Wähle ein Gefühl und einen Gegenstand, die eine überraschende Eigenschaft teilen. Ersetze das gesamte Bild-Wortfeld. Schreibe danach eine eigene zweite Zeile, die beim Gegenstand bleibt, statt das Gefühl zu erklären.',
  rules:String.raw`Gedicht -> "meine unruhe ist" Bild "."`,
  words:String.raw`Bild -> "ein schlüsselbund in einer leeren wohnung.\nich probiere jede tür" | "ein radio zwischen zwei sendern.\nich suche eine stimme" | "ein koffer vor der falschen tür.\nich stelle ihn noch nicht ab"`,start:'Gedicht',count:1
 },
 {
  id:'metapher-dinge',category:'Metaphern',title:'Wenn Dinge handeln · Personifikation',
  description:'Ein Alltagsding erhält eine menschliche Handlung. So kann es etwas zeigen, das die sprechende Figur nicht direkt sagt.',
  task:'Wähle einen Gegenstand aus deinem Alltag und gib ihm eine menschliche Handlung. Verändere Ding, Handlung und Antwort so, dass eine kleine Szene entsteht. Welche Beziehung wird sichtbar, ohne dass du sie benennst?',
  rules:String.raw`Gedicht -> Ding Handlung "." "\n" Antwort`,
  words:`Ding -> "der wecker" | "das fenster" | "mein rucksack"
Handlung -> "hält den atem an" | "fragt nach dir" | "zählt die stunden"
Antwort -> "ich antworte erst morgen." | "ich tue so, als hätte ich nichts gehört." | "zum ersten mal höre ich zu."`,start:'Gedicht',count:1
 },
 {
  id:'wendung-suche',category:'Überraschende Wendungen',title:'Gesucht – gefunden · die Richtung wechseln',
  description:'Die ersten Zeilen eröffnen eine Suche. Der Schluss richtet den Blick vom äusseren Ziel auf die sprechende Figur.',
  task:'Ändere Ziel und Suchort. Schreibe drei eigene Schlusszeilen: eine erwartbare, eine überraschende und eine offene. Welche lässt die ersten Zeilen anders erscheinen? Übernimm diese Fassung und begründe deine Wahl.',
  rules:String.raw`Gedicht -> "ich suchte" Ziel "\n" "an" Ort "." "\n\n" "gefunden habe ich" Fund "."`,
  words:`Ziel -> "den ausgang" | "deine antwort" | "einen neuen anfang"
Ort -> "allen haltestellen" | "den rändern alter fotos" | "den falschen türen"
Fund -> "meine eigene frage" | "einen grund zu bleiben" | "den mut, nicht weiterzusuchen"`,start:'Gedicht',count:1
 },
 {
  id:'wendung-klein',category:'Überraschende Wendungen',title:'Der grosse Moment wird klein',
  description:'Eine grosse Erwartung trifft auf eine kleine Handlung. Ob die Wendung überzeugt, entscheidest du beim Überarbeiten.',
  task:'Ersetze Erwartung und kleine Handlung durch eine konkrete Situation. Erzeuge zwei Fassungen. Streiche anschliessend „stattdessen“ und prüfe, ob der Bruch ohne Erklärung stärker wirkt. Erfinde eine eigene letzte Zeile.',
  rules:String.raw`Gedicht -> "ich dachte," "\n" Erwartung "." "\n\n" "stattdessen" Handlung "." "\n" Schluss`,
  words:`Erwartung -> "mut müsste laut sein" | "ein anfang müsste glänzen" | "hoffnung müsste alles verändern"
Handlung -> "stelle ich einen zweiten stuhl dazu" | "mache ich das fenster auf" | "frage ich noch einmal nach"
Schluss -> "niemand klatscht. ich mache weiter." | "es ist wenig. es ist ein anfang." | "draussen geht jemand langsamer."`,start:'Gedicht',count:1
 }
,
{
  "id": "reel-liebe-farben",
  "reelId": "DepJatpumXF",
  "category": "Metaphern",
  "title": "Liebe · zwei Farben bleiben sichtbar",
  "description": "Farben begegnen sich, ohne ineinander zu verschwinden.",
  "task": "Ergänze eigene Farben und Oberflächen. Erzeuge zwei Fassungen und prüfe, welche Bilder zusammenpassen. Verändere die letzte Zeile so, dass Nähe und Eigenständigkeit gleichzeitig sichtbar werden.",
  "rules": "Gedicht -> \"dein\" Farbe \"\\n\" \"trifft mein\" Farbe \".\" \"\\n\" \"zwischen uns\" Begegnung \".\" \"\\n\" \"wir färben\" Ort \".\" \"\\n\" \"und doch\" Eigenes \".\" \"\\n\" Schluss",
  "words": "Farbe -> \"kupferrot\" | \"tintenblau\" | \"sonnengelb\"\nBegegnung -> \"ein heller rand\" | \"ein streifen morgen\" | \"eine ungemischte spur\"\nOrt -> \"die ränder unserer briefe\" | \"den regen vor dem fenster\" | \"das pflaster auf dem heimweg\"\nEigenes -> \"bleibt mein blau am ärmel\" | \"leuchtet mein gelb noch durch\" | \"trage ich meine farbe weiter\"\nSchluss -> \"wir müssen nicht dieselbe farbe werden.\" | \"zwischen den tönen ist noch platz.\" | \"ich gehe neben dir, in meiner farbe.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-liebe-alltag",
  "reelId": "DaUTcv1NQOr",
  "category": "Anaphern",
  "title": "Freundschaft · ein gemeinsamer Nachmittag",
  "description": "Kleine Beobachtungen erzählen von Nähe, ohne sie zu benennen.",
  "task": "Ersetze die Dinge und Spuren durch Beobachtungen aus einem Zimmer. Erzeuge zwei Fassungen, streiche ein unpassendes Bild und schreibe eine eigene letzte Zeile. Wo braucht die Wiederholung eine Pause?",
  "rules": "Gedicht -> \"ich sehe\" Ding \".\" \"\\n\" \"ich sehe\" Spur \".\" \"\\n\" \"du\" Tun \".\" \"\\n\" \"ich\" Antwort \".\" \"\\n\" Schluss",
  "words": "Ding -> \"zwei tassen auf dem boden\" | \"dein buch auf meinem tisch\" | \"unsere schuhe unter der bank\"\nSpur -> \"krümel zwischen den seiten\" | \"einen teefleck auf der karte\" | \"licht auf deinem leeren teller\"\nTun -> \"liest die nächste seite\" | \"rückst den stuhl zum fenster\" | \"lässt die tür einen spalt offen\"\nAntwort -> \"schiebe dir die schale hin\" | \"drehe die musik leiser\" | \"lasse meinen tee noch stehen\"\nSchluss -> \"die uhr darf weitergehen.\" | \"niemand muss etwas sagen.\" | \"draussen wird es langsam abend.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-hoffnung-frieden",
  "reelId": "DUKcqZ4CBMp",
  "category": "Überraschende Wendungen",
  "title": "Hoffnung · ein Ort verändert sich",
  "description": "Eine grosse Erwartung weicht kleinen Zeichen eines anderen Alltags.",
  "task": "Ergänze bei Zeichen drei kleine Veränderungen an einem vertrauten Ort. Erzeuge zwei Fassungen und ordne die Beobachtungen neu. Lass die Bilder für sich sprechen und verwende das Wort „Frieden“ nicht.",
  "rules": "Gedicht -> \"ich dachte,\" \"\\n\" Erwartung \".\" \"\\n\" \"stattdessen\" Handlung \".\" \"\\n\" Zeichen \".\" \"\\n\" Zeichen \".\" \"\\n\" Schluss",
  "words": "Erwartung -> \"der neue morgen müsste donnern\" | \"der ganze platz müsste singen\" | \"ein anfang müsste alles überstrahlen\"\nHandlung -> \"öffnet jemand den kleinen laden\" | \"trägt jemand brot über den platz\" | \"stellt jemand stühle vor die tür\"\nZeichen -> \"im hof hängt wieder wäsche\" | \"an der haltestelle fragt jemand nach der zeit\" | \"ein kind lässt seinen ball liegen\"\nSchluss -> \"zum ersten mal bleibt die tür offen.\" | \"wir hören dem regen zu.\" | \"der abend braucht keine erklärung.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-selbstwert-licht",
  "reelId": "Ddx3xGsNbxB",
  "category": "Metaphern",
  "title": "Selbstfürsorge · eine Taschenlampe spricht",
  "description": "Ein Gegenstand erzählt vom Helfen und von den eigenen Grenzen.",
  "task": "Ergänze Orte, an denen die Taschenlampe für andere leuchtet. Ersetze dann Bedarf durch konkrete Dinge, die ihr selbst fehlen. Erzeuge zwei Fassungen und schreibe die vierte Zeile einmal leise, einmal entschieden.",
  "rules": "Gedicht -> \"ich leuchte\" Ort \".\" \"\\n\" \"ich\" Helfen \".\" \"\\n\" \"doch auch ich brauche\" Bedarf \".\" \"\\n\" Schluss",
  "words": "Ort -> \"unter deine treppe\" | \"bis zum letzten wegweiser\" | \"in deinen überfüllten keller\"\nHelfen -> \"halte den weg für dich offen\" | \"suche deinen verlorenen schlüssel\" | \"bleibe wach, bis du ankommst\"\nBedarf -> \"eine neue batterie\" | \"einen trockenen platz\" | \"eine nacht in der schublade\"\nSchluss -> \"heute lege ich mich neben den schalter.\" | \"mein licht darf eine pause machen.\" | \"für den rückweg hebe ich etwas auf.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-selbstwert-stimmen",
  "reelId": "De7MToNOy6d",
  "category": "Anaphern",
  "title": "Selbstwert · zwei Stimmen",
  "description": "Eine strenge innere Stimme trifft auf die Beobachtungen eines Freundes.",
  "task": "Schreibe über eine erfundene Figur. Ergänze konkrete Beobachtungen bei Beobachtung und ändere die letzte Antwort. Vergleiche zwei Fassungen: Wo widerspricht die zweite Stimme der ersten, ohne allgemeine Komplimente zu machen?",
  "rules": "Gedicht -> \"du müsstest\" Forderung \".\" \"\\n\" \"du müsstest\" Forderung \".\" \"\\n\\n\" \"ich habe gesehen,\" \"\\n\" \"wie du\" Beobachtung \".\" \"\\n\" \"ich habe gesehen,\" \"\\n\" \"wie du\" Beobachtung \".\"",
  "words": "Forderung -> \"immer sofort eine antwort haben\" | \"jeden fehler allein ausbügeln\" | \"an jedem tag alles schaffen\"\nBeobachtung -> \"gestern vor der fremden tür gewartet hast\" | \"deinen platz am fenster geteilt hast\" | \"trotz deiner angst noch einmal gefragt hast\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-gesellschaft-widerspruch",
  "reelId": "C2UM_qzNwGl",
  "category": "Überraschende Wendungen",
  "title": "Haltung · zwischen Satz und Handlung",
  "description": "Eine kleine Szene zeigt einen Widerspruch im Alltag.",
  "task": "Wähle eine Behauptung und eine Handlung, deren Widerspruch dich interessiert. Die zufälligen Kombinationen sind ein Anfang: Ersetze unpassende Stellen und entwickle die Szene weiter, ohne eine Moral anzuhängen.",
  "rules": "Gedicht -> \"am\" Ort \"\\n\" \"sagt jemand:\" Behauptung \".\" \"\\n\" \"dann\" Handlung \".\" \"\\n\" \"auf dem tisch\" Spur \".\" \"\\n\" \"ich\" Reaktion \".\" \"\\n\" Schluss",
  "words": "Ort -> \"frühstückstisch\" | \"vereinsabend\" | \"gartenzaun\"\nBehauptung -> \"hier darf jeder mitreden\" | \"wir haben platz für alle\" | \"bei uns zählt jede stimme\"\nHandlung -> \"wird der freie stuhl weggetragen\" | \"wird das mikrofon abgeschaltet\" | \"bleibt die tür von innen zu\"\nSpur -> \"liegt noch eine unbenutzte tasse\" | \"bleibt ein namensschild zurück\" | \"steht ein glas ohne fingerabdruck\"\nReaktion -> \"rücke einen stuhl heran\" | \"lege den schlüssel neben die tür\" | \"lasse die frage im raum\"\nSchluss -> \"draussen wartet noch jemand.\" | \"das glas bleibt unberührt.\" | \"die tasse ist noch warm.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-selbstwert-ding",
  "reelId": "DPSxE6-CFmU",
  "category": "Metaphern",
  "title": "Erwartungen · ein Gegenstand antwortet",
  "description": "Ein Alltagsding spricht über die Ansprüche, die an ihm hängen.",
  "task": "Wähle einen Gegenstand und ändere die Erwartungen, die er tragen soll. Die Szene muss nicht von Aussehen handeln. Erzeuge zwei Fassungen und streiche die Schlusszeile, wenn die Handlung bereits genug zeigt.",
  "rules": "Gedicht -> \"ich bin\" Ding \".\" \"\\n\" \"jeden morgen soll ich\" Erwartung \".\" \"\\n\" \"heute\" Handlung \".\" \"\\n\" Schluss",
  "words": "Ding -> \"ein kalender mit zu kleinen kästchen\" | \"ein pokal auf dem obersten brett\" | \"ein hemd mit festem kragen\"\nErwartung -> \"deinen ganzen wert beweisen\" | \"jede lücke für dich schliessen\" | \"für einen perfekten tag geradestehen\"\nHandlung -> \"lasse ich einen rand unbeschrieben\" | \"lege ich mich quer über den tisch\" | \"bitte ich um einen freien nachmittag\"\nSchluss -> \"ich bin ein ding, kein urteil.\" | \"der leere platz gehört dir.\" | \"nicht alles braucht eine note.\"",
  "start": "Gedicht",
  "count": 1
},
{
  "id": "reel-hoffnung-schritte",
  "reelId": "DS6xxyiCP7v",
  "category": "Überraschende Wendungen",
  "title": "Neuanfang · ein kleiner Schritt",
  "description": "Ein unscheinbarer Moment tritt an die Stelle eines sichtbaren Erfolgs.",
  "task": "Ergänze bei Erwartung Vorstellungen von Erfolg und bei Schritt kleine Handlungen einer erfundenen Figur. Erzeuge zwei Fassungen und ändere die letzte Zeile so, dass die Veränderung sichtbar wird, ohne sie zu erklären.",
  "rules": "Gedicht -> \"ich dachte,\" \"\\n\" Erwartung \".\" \"\\n\" \"stattdessen\" Schritt \".\" \"\\n\" Spur \".\" \"\\n\" Schluss",
  "words": "Erwartung -> \"ein neuanfang müsste ein foto wert sein\" | \"mut müsste bis zur strasse zu hören sein\" | \"veränderung müsste einen preis gewinnen\"\nSchritt -> \"wähle ich deine nummer noch einmal\" | \"gehe ich bis zur nächsten ecke\" | \"öffne ich den lange geschlossenen brief\"\nSpur -> \"meine schuhe stehen nicht mehr im flur\" | \"neben der tasse liegt ein neuer zettel\" | \"im kalender bleibt ein feld frei\"\nSchluss -> \"diesmal lasse ich das fenster offen.\" | \"auf dem rückweg nehme ich die treppe.\" | \"ich stelle einen zweiten teller hin.\"",
  "start": "Gedicht",
  "count": 1
}
];

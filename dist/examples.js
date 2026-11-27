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
  description:'Die ersten Zeilen eröffnen eine Suche. Der Schluss richtet den Blick vom äußeren Ziel auf die sprechende Figur.',
  task:'Ändere Ziel und Suchort. Schreibe drei eigene Schlusszeilen: eine erwartbare, eine überraschende und eine offene. Welche lässt die ersten Zeilen anders erscheinen? Übernimm diese Fassung und begründe deine Wahl.',
  rules:String.raw`Gedicht -> "ich suchte" Ziel "\n" "an" Ort "." "\n\n" "gefunden habe ich" Fund "."`,
  words:`Ziel -> "den ausgang" | "deine antwort" | "einen neuen anfang"
Ort -> "allen haltestellen" | "den rändern alter fotos" | "den falschen türen"
Fund -> "meine eigene frage" | "einen grund zu bleiben" | "den mut, nicht weiterzusuchen"`,start:'Gedicht',count:1
 },
 {
  id:'wendung-klein',category:'Überraschende Wendungen',title:'Der große Moment wird klein',
  description:'Eine große Erwartung trifft auf eine kleine Handlung. Ob die Wendung überzeugt, entscheidest du beim Überarbeiten.',
  task:'Ersetze Erwartung und kleine Handlung durch eine konkrete Situation. Erzeuge zwei Fassungen. Streiche anschließend „stattdessen“ und prüfe, ob der Bruch ohne Erklärung stärker wirkt. Erfinde eine eigene letzte Zeile.',
  rules:String.raw`Gedicht -> "ich dachte," "\n" Erwartung "." "\n\n" "stattdessen" Handlung "." "\n" Schluss`,
  words:`Erwartung -> "mut müsste laut sein" | "ein anfang müsste glänzen" | "hoffnung müsste alles verändern"
Handlung -> "stelle ich einen zweiten stuhl dazu" | "mache ich das fenster auf" | "frage ich noch einmal nach"
Schluss -> "niemand klatscht. ich mache weiter." | "es ist wenig. es ist ein anfang." | "draußen geht jemand langsamer."`,start:'Gedicht',count:1
 }
];

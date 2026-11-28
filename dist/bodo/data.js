export const SOURCES = [
 {id:'wartke',title:'Bodo Wartke · Zungenbrecher 4.0',url:'https://www.bodowartke.de/zungenbrecher',note:'Offizielle Projektseite mit Medien und Hinweisen zur Arbeit an Zungenbrechergeschichten.'},
 {id:'podcast',title:'Kinderbuchpraxis · Gespräch mit Bodo Wartke',url:'https://kinderbuchpraxis.podigee.io/94-bodo-wartke-rhababerbar',note:'Ab etwa 32:10 spricht Wartke über den Auftrag von Terra X und das endoplasmatische Retikulum. Aussagen über seine Erfahrungen sind keine Wirksamkeitsstudie.'},
 {id:'retrieval',title:'Roediger & Karpicke (2006) · Test-enhanced learning',url:'https://pubmed.ncbi.nlm.nih.gov/16507066/',note:'Primärstudie zum aktiven Abrufen und längerfristigen Behalten. Sie untersucht nicht diese Website und beweist keinen Vorteil jedes gereimten Lerntexts.'},
 {id:'rhyme',title:'McGlone & Tofighbakhsh (1999) · The Keats heuristic',url:'https://gwern.net/doc/psychology/cognitive-bias/1999-mcglone.pdf',note:'Primärstudie: Bei der Beurteilung von Sprüchen kann Reim die wahrgenommene Wahrheit beeinflussen. Klang und sachliche Richtigkeit sind zu unterscheiden.'},
 {id:'bio',title:'OpenStax · Biology 2e, 4.4',url:'https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins',note:'Fachliche Grundlage zum rauen und glatten ER sowie zum Golgi-Apparat.'},
 {id:'math',title:'OpenStax · Prealgebra 2e, 6.1 und 6.2',url:'https://openstax.org/books/prealgebra-2e/pages/6-2-solve-general-applications-of-percent',note:'Fachliche Grundlage für Prozent als Anteil pro hundert und die Berechnung des Prozentwerts.'},
 {id:'grammar',title:'Leibniz-Institut für Deutsche Sprache · Kasus',url:'https://grammis.ids-mannheim.de/sgt/2218',note:'Vier Kasus und die Ersatzprobe mit maskulinem Artikel: der, des, dem, den.'},
 {id:'history',title:'Schweizer Parlament · Geschichte der Bundesverfassung',url:'https://www.parlament.ch/de/%C3%BCber-das-parlament/Seiten/bundesverfassung.aspx',note:'1848: Gründung des Bundesstaats; 1874: erste Totalrevision; 1999: Annahme der neuen Verfassung; 2000: Inkrafttreten.'},
 {id:'physics',title:'OpenStax · College Physics 2e, Geschwindigkeit',url:'https://openstax.org/books/college-physics-2e/pages/2-3-time-velocity-and-speed',note:'Für das eigene Übungsbeispiel wird die mittlere Bahngeschwindigkeit als Wegstrecke pro Zeit verwendet; Richtungen sind dort nicht Gegenstand der Rechnung.'}
];
export const MEDIA = [
 {id:'er',subject:'Biologie',title:'Das endoplasmatische Retikulum',provider:'Bodo Wartke · für Terra X · 2025',url:'https://www.youtube.com/watch?v=EP5pdFjttQ4',kind:'youtube',video:'EP5pdFjttQ4',description:'Ein langer Fachbegriff wird zum Ausgangspunkt eines Zungenbrecher-Raps.',listen:'Sprich den Fachbegriff langsam nach. Wo setzt du Wortakzente, wo hörst du Pausen? Notiere danach zwei fachliche Aussagen getrennt von den Klangbeobachtungen.',form:'Prüfe an einer selbst gewählten Stelle, wie Fachwort, Reim und Sprechtempo zusammenwirken. Notiere eine Zeitstelle statt den ganzen Text abzuschreiben.',transfer:'bio'},
 {id:'mito',subject:'Biologie',title:'Mitochondrien',provider:'Bodo Wartke · mit Terra X · 2026',url:'https://vimeo.com/1183298668',kind:'vimeo',video:'1183298668',description:'Die offizielle Gesamtfassung erweitert den Blick vom Fachwort auf einen erklärenden Ablauf.',listen:'Halte zuerst fest, was du über Mitochondrien bereits weisst. Trenne nach dem Hören neue Aussagen von wiedererkannten Begriffen.',form:'Suche eine Wiederholung und eine Stelle, an der der Vortrag einen Zusammenhang gliedert. Was hilft beim Erinnern, was verlangt zusätzliche Erklärung?',transfer:'bio'},
 {id:'barbara',subject:'Sprache',title:'Barbaras Rhabarberbar · 1. Teil',provider:'Bodo Wartke feat. Marti Fischer · 2023',url:'https://www.youtube.com/watch?v=hT42JFmxHII',kind:'youtube',video:'hT42JFmxHII',description:'Ein Sprachbeispiel für Alliteration, Wortbildung und eine fortlaufende Geschichte.',listen:'Sammle drei Wortanfänge oder zusammengesetzte Wörter, die dir auffallen. Erkläre die Bestandteile eines Kompositums.',form:'Welche Wörter verbindet der Klang? Welche Verbindung entsteht erst durch die Geschichte? Das Stück dient hier der Formuntersuchung, nicht als Biologie-Lehrgedicht.',transfer:'deutsch'},
 {id:'dach',subject:'Sprache',title:'Niemand deckt das Dach kecker als der dicke Dachdecker',provider:'Bodo Wartke · offizieller YouTube-Kanal',url:'https://www.youtube.com/watch?v=YPv1FTSmYNo',kind:'youtube',video:'YPv1FTSmYNo',description:'Ähnliche Laute machen Artikulation und Sprechrhythmus besonders hörbar.',listen:'Sprich eine kurze Stelle erst langsam, dann schneller. Welche Lautwechsel bereiten Schwierigkeiten? Tempo ist kein Bewertungskriterium.',form:'Unterscheide Alliteration, ähnlichen Wortklang und Endreim. Nicht jede Klangähnlichkeit ist ein Reim.',transfer:'deutsch'}
];
// All texts below are original exercises for this learning resource, not Wartke lyrics.
export const FORM_LINES = [
 {id:'a1',chunks:['Ich teile den Stoff','und ich finde den Takt.'],end:'Takt.',group:'a'},
 {id:'a2',chunks:['Ich prüfe den Reim','und ich prüfe den Fakt.'],end:'Fakt.',group:'a'},
 {id:'b1',chunks:['Ich decke den Text zu.','Dann zähle ich: drei.'],end:'drei.',group:'b'},
 {id:'b2',chunks:['Ich sage, was blieb','– ganz ohne Spickerei.'],end:'Spickerei.',group:'b'}
];
export const FORMS = {
 paar:{name:'Paarreim',scheme:'aabb',order:[0,1,2,3],hint:'Zwei aufeinanderfolgende Verse teilen einen Endklang. Verbinde jeweils zwei zusammengehörige Aussagen.'},
 kreuz:{name:'Kreuzreim',scheme:'abab',order:[0,2,1,3],hint:'Der Endklang kehrt nach einer anderen Zeile zurück. Prüfe, ob die neue Reihenfolge den Gedankengang verändert.'},
 umarmend:{name:'Umarmender Reim',scheme:'abba',order:[0,2,3,1],hint:'Zwei Verse umschliessen ein anderes Reimpaar. Klingt der Schluss dadurch wie eine Rückkehr?'}
};
export const TOPICS = [
 {id:'bio',subject:'Biologie',title:'Raue und glatte Membranen',source:'bio',
 facts:['Das raue ER trägt Ribosomen an seiner Oberfläche.','Am rauen ER werden bestimmte Proteine hergestellt und weiterbearbeitet.','Das glatte ER ist unter anderem an der Lipidsynthese beteiligt.','Der Golgi-Apparat verändert, sortiert und verpackt Stoffe für den Weitertransport.'],
 verse:['Ribosomen machen rau, was sich am ER zeigt.','Dort wird manch Protein gebaut, gefaltet, weitergereicht.','Glattes ER bildet Lipide; halte beides auseinander.','Golgi sortiert und packt den Stoff für seine Weiterwanderung.'],
 questions:['Was kennzeichnet das raue ER?','Was geschieht dort mit bestimmten Proteinen?','Welche Aufgabe des glatten ER kannst du nennen?','Was leistet der Golgi-Apparat?'],
 answers:['Ribosomen an der Oberfläche.','Herstellung und Weiterbearbeitung bestimmter Proteine.','Unter anderem Lipidsynthese.','Verändern, Sortieren und Verpacken für den Weitertransport.'],terms:['Ribosomen','Proteine','Lipide','Golgi'],note:'Vereinfachtes Übungsmodell. Nicht alle Proteine entstehen am rauen ER. Die Versfassung hat freie Zeilen und keinen durchgehenden Endreim.'},
 {id:'deutsch',subject:'Deutsch',title:'Vier Kasus am Artikel erkennen',source:'grammar',
 facts:['Beim maskulinen Nomen im Singular zeigt der bestimmte Artikel im Nominativ die Form der.','Im Genitiv lautet diese Artikelform des.','Im Dativ lautet sie dem.','Im Akkusativ lautet sie den.'],
 verse:['Nominativ: der Hund steht hier.','Genitiv: des Hundes Halsband liegt bei mir.','Dativ: dem Hund gebe ich Futter allein.','Akkusativ: den Hund lasse ich herein.'],
 questions:['Welcher bestimmte Artikel gehört zum maskulinen Nominativ Singular?','Wie lautet er im Genitiv?','Wie lautet er im Dativ?','Wie lautet er im Akkusativ?'],
 answers:['der','des','dem','den'],terms:['Nominativ','Genitiv','Dativ','Akkusativ'],note:'Die Reihe gilt für den bestimmten Artikel beim maskulinen Nomen im Singular, nicht für alle Nominalgruppen. Paarreime: hier/mir und allein/herein.'},
 {id:'math',subject:'Mathematik',title:'Prozent als Anteil am Ganzen',source:'math',
 facts:['Prozent bedeutet pro hundert.','100 Prozent entsprechen einem Ganzen.','50 Prozent entsprechen der Hälfte.','25 Prozent entsprechen einem Viertel.'],
 verse:['Prozent meint: Teile durch hundert – rechne genau.','Hundert Prozent sind ein Ganzes; das weisst du jetzt genau.','Fünfzig Prozent sind die Hälfte; so teilst du das hier.','Fünfundzwanzig sind ein Viertel: eins von vier.'],
 questions:['Was bedeutet Prozent?','Wie viel vom Ganzen sind 100 Prozent?','Welchem Bruch entsprechen 50 Prozent?','Welchem Bruch entsprechen 25 Prozent?'],
 answers:['pro hundert','ein Ganzes / 1','die Hälfte / 1/2','ein Viertel / 1/4'],terms:['Prozent','hundert','Hälfte','Viertel'],note:'Ein absichtlich schwacher identischer Reim: genau/genau. Verbessere die Form, ohne die Anteile zu verändern. Bei Rechnungen gilt W = G · p / 100; p ist dabei die Zahl vor dem Prozentzeichen.'},
 {id:'physics',subject:'Physik',title:'Wegstrecke und Zeit',source:'physics',
 facts:['Mittlere Bahngeschwindigkeit ist gesamte Wegstrecke geteilt durch gesamte Zeit.','Wegstrecke kann in Metern angegeben werden.','Zeit kann in Sekunden angegeben werden.','Meter pro Sekunde erhält man aus Metern geteilt durch Sekunden.'],
 verse:['Den ganzen Weg durch ganze Zeit: So rechne und vergleich.','Die mittlere Bahngeschwindigkeit ergibt sich so zugleich.','Der Weg in Metern, die Zeit in Sekunden gehen hier ein.','Meter pro Sekunde wird dann die Einheit sein.'],
 questions:['Wie berechnest du die mittlere Bahngeschwindigkeit?','Welche Längeneinheit wird hier verwendet?','Welche Zeiteinheit wird hier verwendet?','Welche Einheit hat das Ergebnis?'],
 answers:['gesamte Wegstrecke / gesamte Zeit','Meter (m)','Sekunden (s)','Meter pro Sekunde (m/s)'],terms:['Weg','Zeit','Metern','Sekunden'],note:'Es geht um die mittlere Bahngeschwindigkeit, nicht um eine momentane Geschwindigkeit oder eine gerichtete Verschiebung.'},
 {id:'history',subject:'Geschichte',title:'Vier Daten zur Schweiz',source:'history',
 facts:['1848 begründet die Bundesverfassung den Schweizer Bundesstaat.','1874 erfolgt die erste Totalrevision der Bundesverfassung.','1999 wird die neue Bundesverfassung in der Volksabstimmung angenommen.','2000 tritt diese neue Bundesverfassung in Kraft.'],
 verse:['1848: Der Bundesstaat entsteht.','1874: die erste Totalrevision, wenn man die Reihe durchgeht.','1999: Die neue Verfassung wird angenommen.','2000: Sie tritt in Kraft – zwei Schritte, nicht verschwommen.'],
 questions:['Wann wird der Schweizer Bundesstaat begründet?','Wann erfolgt die erste Totalrevision?','Wann wird die neue Bundesverfassung angenommen?','Wann tritt sie in Kraft?'],
 answers:['1848','1874','1999','2000'],terms:['1848','1874','1999','2000'],note:'Annahme und Inkrafttreten sind verschiedene Ereignisse. Ein Datenspruch ist noch keine Erklärung ihrer Ursachen und Folgen.'}
];
export const FACT_CHECKS = [
 {id:'percent-wrong',verse:'Zehn Prozent von zweihundert sind zehn;\ndas kann man an den Zahlen sehen.',correct:false,explanation:'Der Reim trägt die Behauptung, aber die Rechnung stimmt nicht: 200 · 10 / 100 = 20.',source:'math'},
 {id:'percent-right',verse:'Ein Viertel sind fünfundzwanzig Prozent;\ngut, wenn man beides als Anteil erkennt.',correct:true,explanation:'25/100 = 1/4. Die Rechnung begründet die Aussage; der Reim ist nur ihre Form.',source:'math'},
 {id:'history-wrong',verse:'1999 trat die Verfassung in Kraft;\nso hat der Reim die Ordnung geschafft.',correct:false,explanation:'1999 wurde die neue Bundesverfassung angenommen. In Kraft trat sie am 1. Januar 2000.',source:'history'}
];

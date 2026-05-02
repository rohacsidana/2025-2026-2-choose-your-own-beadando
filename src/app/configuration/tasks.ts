export const tasks: {
  A: {
    imageUrl: string,
    story: string,
    subTasks: { text: string, xp: number }[],
    title: string
  },
  B: {
    imageUrl: string,
    story: string,
    subTasks: { text: string, xp: number }[],
    title: string
  },
  preview?: {
    imageUrl: string,
    text: string
  }
}[] = [
  {
    A: {
      imageUrl: 'assets/images/tasks/1/A/fallout.jpg',
      story: `Ebben a feladatban egy küldetésvezérlő rendszert kell készítened.
Az alkalmazásban küldetéseket és személyzetet lehet létrehozni, a kettőt összerendelni, valamint a küldetések állapotát kezelni.`,
      subTasks: [
        {
          text: `Hozz létre **TypeScript interfészek**et a küldetésekhez és a személyzet tagjaihoz.

A személyzet adatai:
- azonosító
- név
- kép (string típus, base64 formátumban kerül majd letárolásra)

Egy küldetés a következő adatokat tartalmazza:
- azonosító
- név
- leírás
- nehézség (könnyű, normál, nehéz)
- státusz (nyitott, folyamatban, befejezett, sikertelen)
- szükséges létszám
- hozzárendelt személyzet`,
          xp: 2
        },
        {
          text: `A felületet bontsd két, egymás melletti panelre. A bal oldali panelben lehessen **választani a feladat fő funkciói közül**:
- Személyzetkezelő
- Küldetés létrehozása
- Küldetések kiosztása
- Küldetésvezérlő

A választás módjának megoldása tetszőleges (pl.: gombok, egy szelektor, stb.).

A fő funkciókat külön komponensekben implementáld.
Maga a funkció majd a jobb oldali panelben jelenjen meg.
          
A felület felszabdalásához használd az _ng-zorro_ splitter komponensét: https://ng.ant.design/components/splitter/en`,
          xp: 2
        },
        {
          text: `Először implementáld a **Személyzetkezelő** funkciót.
          
Egy űrlap segítségével legyen lehetőség felvenni új személyeket.
Az űrlap két mezőből álljon:
- Név (string típus)
Kapcsolódó validációk: Kötelező, minimum 5, maximum 16 karakter, a név 2 és 4 közötti szóból álljon.
- Kép (string típus - base64)
Képfeltöltéshez használd az _ngx-image-cropper_ (https://www.npmjs.com/package/ngx-image-cropper) csomagot.
A kép feltöltése opcionális, viszont ha meg van adva, akkor a kép felbontása legalább 32x32 pixel, legfeljebb 1024x1024 pixel legyen.

Mentéskor a személyzet adatait localStorage-ben tárold, beleértve a feltöltött képeket is.
Mivel localStorage-ben domainenként csak 5MB tárolható a legtöbb browser esetében, érdemes kisebb képekkel tesztelni.`,
          xp: 6
        },
        {
          text: `Az űrlap felett egy listában (https://ng.ant.design/components/list/en) jelenjenek meg a **személyzet eddig felvett tagjai**.
A listában a személyhez tartozó kép is jelenjen meg.
Amennyiben nem lett kép megadva a személyhez, egy tetszőleges placeholder képet jeleníts meg.`,
          xp: 3
        },
        {
          text: `Listaelemenként jelenjen meg két ikon vagy gomb, amellyel a **személyzet tagjai módosíthatóak valamint törölhetőek**.`,
          xp: 2
        },
        {
          text: `Következzen a **Küldetés létrehozása** funkció implementálása.
Először készíts űrlapot reactive form használatával.

Az űrlap tartalmazza a következő mezőket:
- név (string)
- leírás (string)
- nehézség (enum, értékkészlete: "könnyű", "normál", "nehéz". Használj tetszőleges választót, mint select vagy radiobutton.)
- szükséges létszám (szám, használd az InputNumber komponenst: https://ng.ant.design/components/input-number/en)

Létrehozáskor a küldetések "Nyitott" státuszban jöjjenek létre.

Az űrlap a következő validációkat alkalmazza:
- A leírást leszámítva minden mező megadása kötelező.
- A létszám értéke minimum 1, maximum 3.
- Ha a nehézség "nehéz", akkor a szükséges létszám értéke minimum 2 legyen, egyéb esetben 1 ember elegendő.

Mentéskor a küldetéseket cookie-ban tárold.
Használható például az _ngx-cookie-service_ (https://www.npmjs.com/package/ngx-cookie-service) csomag.`,
          xp: 5
        },
        {
          text: `A **Küldetések kiosztása** funkció alatt a felvett küldetések egy fában (https://ng.ant.design/components/tree/en) jelenjenek meg.

A fa legmagasabb szintű csomópontjai a státuszok legyenek:
- Nyitott
- Folyamatban
- Befejezett
- Sikertelen

Ezek alatt jelenjenek meg a küldetések nevei, mint a fa levelei.

A küldetések státusz szerinti szűrését Angular Pipa-pal (https://angular.dev/api/core/Pipe) implementáld.
Az elsődleges bemeneti paramétere legyen a küldetéslista, a második paraméter pedig egy státusz értéke (Nyitott, Folyamatban, Befejezett, Sikertelen).
A pipe eredménye legyen a státusz szerint leszűrt küldetéslista.`,
          xp: 4
        },
        {
          text: `A fa valamely levelére (egy küldetésre) kattintva jelenjenek meg a **küldetés adatai egy felugró modális ablakban** (https://ng.ant.design/components/modal/en).`,
          xp: 1
        },
        {
          text: `A modalban lehessen **személyzetet rendelni az adott küldetéshez**.
Pontosan annyi személy hozzárendelését engedje a felület, ami a küldetés létszámának meg lett adva.
Egy személy tartozhat egyszerre több küldetéshez is, ezzel nem szükséges külön foglalkozni.`,
          xp: 2
        },
        {
          text: `A **Küldetésvezérlő** menü alatti felületen lehessen változtatni a küldetések státuszát.
          
Ez egy drag&drop-os felületen keresztül történjen.
Használható például a CDK ide kapcsolódó funkciója: https://angular.dev/guide/drag-drop.

Státuszonként jelenjenek meg itt is a küldetések.
Ha a felhasználó egy küldetést másik státuszba mozgat, a változás azonnal frissüljön a cookie-ban is.`,
          xp: 3
        },
        {
          text: `A **státuszváltásra a következő szabályok vonatkoznak**:
- Azok a küldetések, amelyeknél nincs meg a megfelelő létszám egyáltalán nem mozgathatóak.
- A státuszok között csak előre lehessen haladni, visszafelé nem (tehát egy elkezdett küldetés nem mozgatható vissza "Nyitott" státuszba).
- Egyszerre csak egy lépést haladhassunk előre, tehát "Nyitott"-ból átmozgatható "Folyamatban"-ra, de "Befejezett"-be vagy "Sikertelen"-be nem.
- "Folyamatban" levő küldetés mozgatható "Befejezett"-be és "Sikertelen"-be is.

Tiltott művelet esetén egy ng-zorro message (https://ng.ant.design/components/message/en)
vagy notification (https://ng.ant.design/components/notification/en) jelenjen meg, ami a probléma okát jelzi a felhasználónak.`,
          xp: 4
        },
        {
          text: `Külön bejelentkezési felületet nem szükséges fejleszteni, helyette a bal oldali panelben a funkcióválasztó
felett legyen lehetőség kiválasztani, hogy **kinek a szemszögéből nézzük éppen a felületet**.

Két szerepkört kezeljen a program:
- Admin
- Személyzet

A két szerepkör között két tetszőleges ikonnal ellátott avatar (https://ng.ant.design/components/avatar/en) segítségével lehessen választani.
Vizuálisan látsszon, hogy a kettőből melyik van éppen kiválasztva.

A "Személyzet" opció választása esetén kelljen választani egyet az előző lépésben felvett személyzetből.
Kiválasztás után az adott személy szemszögéből jelenjen meg a felület.
Az admin szerepkör esetén felhasználószintű megkülönböztetésre nincs szükség, mivel ezek nem is léteznek.`,
          xp: 2
        },
        {
          text: `Készíts **Angular direktívá**t (https://angular.dev/api/core/Directive), amely a felhasználó jogosultsági szintje (Admin vagy Személyzet) alapján elrejthet funkciókat.

A működése valahogy így nézne ki például:

\`\`\`html
<button *appHasRole="'Admin'">Küldetés létrehozása</button>
\`\`\`

Ha Admin szerepkörrel használjuk a felületet, akkor a fenti gomb jelenjen meg, egyébként ne.

Adminisztrátorok minden funkciót láthatnak.
A személyzet számára ne jelenjenek meg a következő funkciók:
- Személyzetkezelő
- Küldetés létrehozása
- Küldetések kiosztása`,
          xp: 2
        },
        {
          text: `A **Küldetésvezérlő személyzeti szerepkörben** csökkentett funkcionalitással jelenjen meg.
- Az ő szerepkörük esetén ne legyen lehetőség státuszváltásra (legyen kikapcsolva a drag&drop).
- Ezen felül ne jelenjen meg számukra minden küldetés, csak amihez hozzá vannak rendelve.`,
          xp: 2
        }
      ],
      title: `Quest Log`
    },
    B: {
      imageUrl: 'assets/images/tasks/1/B/resident_eeeevil.png',
      story: 'Készítsd el a Resident Evil játékokból ismert inventory (eszköztár) rendszer egyszerűsített változatát Konvával és Angularban.',
      subTasks: [
        {
          text: `A felület bal oldalán jelenjen meg egy 4x2-as rács, ami a játékos inventoryját fogja reprezentálni.
A rácsot Konva felületen rajzold ki.

![Inventory](/assets/images/tasks/1/B/inventory_small.png)`,
          xp: 2
        },
        {
          text: `Szintén a Konva felületen, jelenjen meg egy elem, ami a **pénzkészletet** jelöli. 
A kezdeti értéke legyen 1000.`,
          xp: 1
        },
        {
          text: `A pénzkészlet mellett, továbbra is a Konva felületen, jelenjen meg egy gombszerű elem.
Erre kattintva a **pénzkészlet kattintásonként 100-zal növekedjen**.`,
          xp: 2
        },
        {
          text: `A Konva Canvas alatt vagy mellett jelenjen meg a **bolt**.
Ezt Angularban implementáld, DOM-ban, tehát ne a Canvas része legyen!

Először helyezz el egy három fület tartalmazó fülsort az _ng-zorro_ Tabs (https://ng.ant.design/components/tabs) komponensével.
A három tab neve legyen:
- Fegyverek
- Töltény
- Fejlesztések`,
          xp: 1
        },
        {
          text: `A fegyverek alatt legyen legalább három **termék**.
Nyugodtan választhatsz gyerekbarát eszközöket ha az szimpatikusabb (pl.: csúzli, vízipisztoly, ...).
A lehetőségek rád vannak bízva, de minden lehetőség kapjon egy nevet, egy méretet és egy árat.
A méret fogja meghatározni, hogy az adott fegyver mekkora helyet foglal az inventoryban.
Olyan méretet válassz, ami tényleg el is fog férni az inventoryban (pl.: 2x1, 4x1, 2x2).
Például egy 5x3-as méretű fegyver a korábban meghatározott rácsméretben soha nem férne el.

A töltények menüpontban lehessen töltényt venni a fegyverekhez (minden fegyvertípushoz egy tölténytípus).
A név és az ár itt is releváns, viszont a méret legyen fixen 1x1.

A fejlesztések menüpontban első körben egy lehetőség jelenjen meg az inventory bővítésére.
Az opció jelezze, hogy megvásárlás esetén 2 négyzettel fogja bővíteni az eszköztárat.`,
          xp: 3
        },
        {
          text: `Minden boltban található termék esetén legyen lehetőség **megvásárolni** azt egy gomb segítségével.
A gomb csak akkor legyen aktív ha a játékosnak van elég pénze megvásárolni a terméket,
egyéb esetben a gomb felé mozgatva az egeret egy tooltip vagy popover jelezze, hogy mennyi pénz hiányzik még a megvételéhez.`,
          xp: 2
        },
        {
          text: `Először a **fegyver megvételé**t implementáld.
Minden fegyver egészen pontosan egyszer legyen megvásárolható, ha azt a játékos már megvásárolta, akkor az opció már ne jelenjen meg a boltban.

A fegyver megvásárlása esetén a következők történjenek:
- A fegyver ára kerüljön levonásra a játékos pénzéből.
- A megvétel lehetősége kerüljön ki a boltból.
- A fegyver kerüljön be a játékos Konva-ban implementált eszköztárába.

Az utolsó ponthoz szükséges lesz készíteni egy komplex Konva objektumot és azt elhelyezni (célszerű a Konva Group típusát használni).
Ez történhet hasonlóan, mint, ahogy az órai projektben a "House" és a "Car" objektumokat létrehoztuk.
Ebben a feladatban még oké ha az eszköztár bal felső sarkába helyeződik fixen, a pozícionálással majd a következő feladat foglalkozik.
Fontos viszont, hogy a megadott méretben jelenjen meg az objektum, azaz ha például a méret 4x1-es,
akkor hosszban négy helyet (négyzetet) foglaljon el a rácsban (grid-ben) magasságban pedig 1-et.
A rajzokat érdemes a kitalált méretnek megfelelően létrehozni, hogy ne torzuljanak.`,
          xp: 6
        },
        {
          text: `Vásárlás során a megvásárolt fegyver automatikusan olyan pozícióba kerüljön lehelyezésre, ahol valóban **elfér**.
Ha a korábbi vásárlások miatt már nincsen számára hely, akkor blokkoljuk a megvásárlását és egy
tooltip vagy popover jelezze ezt a játékos számára.

Fontos, hogy két tárgy soha nem foglalhatja el ugyanazt a négyzetet.`,
          xp: 4
        },
        {
          text: `Fegyverek mellett legyen lehetőség **töltényeket is vásárolni**.
A lehelyezési szabály hasonlóan működjön, mint az előző esetben, tehát ha teljesen betelt az eszköztár
akkor ne legyen lehetőség a megvásárlására
(ha még az adott töltényből nincs az inventoryban akkor egy szabad rács szükséges).

A töltény annyiban működjön máshogy, mint a fegyver, hogy ebből többet is tud vásárolni a játékos.

Az eszköztárba ezek ne egyesével kerüljenek be, hanem egy kupacba rendeződjenek (stackeljenek).
Ha az adott tölténytípusból már van legalább egy darab az inventoryban, újabb vásárláskor ne kerüljön be új tárgy, csak a meglévő stack darabszáma növekedjen.
Ha még nincs ilyen töltény az inventoryban, akkor a vásárláshoz szükséges egy szabad 1x1-es hely.

A tárgy jobb alsó sarkában jelezze egy szám, hogy az adott tölténytípusból mennyi van a játékosnál.`,
          xp: 4
        },
        {
          text: `A játékos tudja mozgatni az inventoryban szereplő tárgyakat a rácson belül **drag&drop** használatával.
Fontos, hogy a tárgyak elengedéskor (drop) illeszkedjenek a rácshoz (snap): a tárgy bal felső sarka a legközelebbi rácsmező bal felső sarkához igazodjon.
 
 Ha a játékos olyan helyen engedi el (dropolja) az elemet ahol a tárgy nem férne el, akkor a tárgy térjen vissza az eredeti
 pozíciójába és jelenjen meg egy üzenet ami a hibajelenséget jelzi.
 Erre használható például a _ng-zorro_ message komponense: https://ng.ant.design/components/message/en`,
          xp: 4
        },
        {
          text: `Kattintásra tárgyak legyenek **kiválasztható**ak. Ilyenkor a tárgy kapjon egy keretet.
Újbóli kattintásra távolítsuk el a kiválasztást.
Egyszerre csak egy tárgy lehet kiválasztva, tehát ha egy másik tárgyra kattintunk akkor kerüljön át oda a kiválasztás.`,
          xp: 2
        },
        {
          text: `Amikor van kiválasztva tárgy, akkor a felületen valahol jelenjen meg egy gomb ami a **tárgy eldobásá**ra szolgál.
Ezt a gombot használva törlődjön a tárgy az eszköztárból.
Fegyverek esetén ilyenkor váljon újra megvásárolhatóvá a tárgy.`,
          xp: 2
        },
        {
          text: `A kiválasztott tárgyak legyenek **mozgathatóak a billentyűzet kurzorgombjaival** is.
A mozgás csak akkor érvényesüljön ha a gombnyomás valid pozícióba mozgatja a tárgyat.

Ha nincs kiválasztva tárgy, akkor a kurzorbillentyűknek nem szükséges funkciót adni.

Például ha van egy 4x1-es tárgyunk a 4x2-es rácsban akkor azt horizontálisan biztosan nem fogjuk tudni mozgatni,
vertikálisan a föl és le gombokkal viszont elképzelhető, hogy igen, hacsak nem blokkolja ezt más tárgy.`,
          xp: 3
        },
        {
          text: `A bolt fejlesztések füle alatt egyetlen termék található: az **eszköztár bővítése**.
          
Ez legyen négy alkalommal bővíthető.
Minden vásárlás 2 új négyzettel bővítse az eszköztárt, a 4-es szélesség megtartásával
(az inventory mélységét bővítjük, nem a szélességét).

Tehát ha 4x2-es négyzetrácsból indulunk, akkor az első vásárlás után a harmadik sorban két új mező jelenik meg.
A második vásárlás után három darab 4 elemes sorunk lesz már.`,
          xp: 4
        }
      ],
      title: `Inventory management`
    },
    preview: undefined
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/2/A/oblivion.png',
      story: `Készítsd el a "Guess Who?" társasjáték egyfős változatát.`,
      subTasks: [
        {
          text: `A játék célja, hogy a játékos kitalálja, melyik személyt választotta ki véletlenszerűen a gép.
Ehhez első lépésként hozz létre egy **adatstruktúrát**, amely leírja a megjelenő karaktereket.
- Név (pl.: "Kata", "Péter")
- Fej alak (legalább két típus legyen, de tetszőlegesen bővíthető: "kör", "tojás")
- Hajstílus (itt is legyen legalább kettő különböző opció)
- Hajszín (fix lehetőségek legyenek)
- Szemszín (szintén fix lehetőségek)
- Szemüveges (true vagy false)

A lehetséges opciókat érdemes TypeScript enum típusokkal reprezentálni.`,
          xp: 1
        },
        {
          text: `Generálj 20 darab véletlenszerű karaktert az előző feladatban létrehozott adatstruktúra alapján.
          Minden karakterhez tartozzon egy egyszerű portré, amely a hozzá tartozó tulajdonságok vizuális
          reprezentációját tartalmazza.

A **portrékat** a karakterhez rendelt adatok alapján **rajzold ki**.
Jelenjenek meg a Konva felületen, több sorba rendezve (pl. 5 oszlop x 4 sor).

A kirajzolásnál törekedjetek az egyszerűségre, a cél a felismerhetőség, nem a részletesség:
- Fej alak: kör, ellipszis (esetleg kocka) a head shape-es enum alapján.
- Hajstílus: egyszerű, zárt formák (pl. különböző méretű poligon vagy körkombináció).
- Szemek: két kis kör, a szemszín alapján kitöltve.
- Szemüveg: két nagyobb kör a szemek körül, egy egyenes vonal az orr felett, opcionálisan oldalsó szárak.

Érdemes Konva.Group-ot használni a portrék logikai összefogásához, hogy később könnyebb legyen egyben kezelni a
karaktert (pl. kattintás megvalósításánál).`,
          xp: 2
        },
        {
          text: `A játék betöltésekor a logika véletlenszerűen válasszon ki egy személyt a generáltak közül.
          Ez lesz a **célszemély**, akit a játékosnak ki kell találnia.

A kiválasztott személy adatait logold ki a console-ra.`,
          xp: 1
        },
        {
          text: `Valósítsd meg, hogy ha a játékos rákattint egy portréra, akkor jelenjen meg egy felugró ablak (modal),
          amely tartalmazza a **kattintott személy összes tulajdonságát**
          (fej alakja, hajstílus, hajszín, szemszín, szemüveges-e).`,
          xp: 1
        },
        {
          text: `A Konva felülettől balra jelenjenek meg űrlapelemek, amelyek segítségével a **játékos tippelhet a
          kiválasztott személy tulajdonságaira**.
          A kérdések alapján fogja majd a rendszer "szűrni" a listát (ld.: következő feladat).

Hozz létre egy-egy kiválasztómezőt (dropdown, radio group vagy checkbox) az alábbi tulajdonságokhoz:
- Fej alak
- Hajstílus
- Hajszín
- Szemszín
- Szemüveges

Minden inputmező mellett jelenjen meg egy külön gomb, amellyel a játékos beküldi a kérdést.
Ezt úgy kell elképzelni, hogy ha például a hajszín esetén kiválasztja a játékos a "rózsaszín" opciót és beküldi azt,
akkor ezzel tulajdonképpen arra kérdez rá, hogy a célszemély hajszín-e rózsaszín-e.`,
          xp: 1
        },
        {
          text: `A játékos által feltett kérdésre adott válaszok alapján **jelöld meg azokat a karaktereket,
          akik már biztosan nem lehetnek a kiválasztott személy**.

A beküldött kérdés alapján a rendszer vizsgálja meg, hogy a célszemély tulajdonsága megegyezik-e a választott értékkel:
- Ha nem egyezik, akkor az összes olyan karakter kiesik, akinek ez a tulajdonsága egyezik a megadott értékkel.
- Ha egyezik, akkor az összes eltérő értékkel rendelkező karakter esik ki.

Példa: a felhasználó arra kérdez rá, hogy a személy hajstílus-a kopasz-e.
Ha a kitalálandó személy nem kopasz akkor minden kopasz hajstílusú portré kiesett a játékból.
Ha a kitalálnadó személy kopasz, akkor viszont csak a kopaszok maradtak játékban.

Az ilyen módon "kieső" portrék legyenek a Konva felületen is megjelölve tetszőlegesen választott, de egyértelműen látható módon.
Történhet például elszürkítéssel vagy akár áthúzással is.

Fontos: egyszer kiesett karakter nem kerülhet vissza a játékba később akkor sem, ha egy következő kérdés alapján már nem esne ki.`,
          xp: 2
        },
        {
          text: `A kérdések és kizárások mellett legyen lehetőség egyetlen **végső tippet tenni**:
          a játékos megpróbálhatja megnevezni a kiválasztott személyt.

Ez a korábbi választós mezők helyett egy szabad szöveges input legyen, ahova a játékosnak a személy nevét kell
beírnia.
Az input mező mellett helyezz el egy gombot, amellyel a tipp beküldhető.

Ha a felhasználó eltalálja a játékos nevét akkor a "Gratulálokn nyertél!" üzenet jelenjen meg, továbbá az az információ,
hogy a győzelemhez mennyi lépésre volt szüksége.
Ha a játékos nem találja el a nevet akkor a "Sajnáljuk, nem találtad el. A helyes válasz: {{név}}" üzenet jelenjen meg.

Mindkét esetben a játék érjen véget, ne tudjon új kérdéseket illetve tippet beküldeni a játékos.`,
          xp: 2
        }
      ],
      title: `
        Guess Who
      `
    },
    B: {
      imageUrl: 'assets/images/tasks/2/B/2B.jpg',
      story: 'Naplófájlok elemzése Web Workeren.',
      subTasks: [
        {
          text: `A projekt "assets/logs" mappájában található JSON fájlokat olvasd fel a _HttpClient_ segítségével.
Az összes beolvasott naplóbejegyzést egyetlen közös tömbben tárold. Tehát ne fájlonként legyen egy tömb, az, hogy melyik fájlból lett beolvasva a bejegyzés nem számít.

A naplóbejegyzések tartalma fájltól függetlenül megegyezik.
A naplóbejegyzések tartalmaznak időpontot, típust, súlyosságot, felhasználót, valamint üzenetet.
Hozz létre hozzá TypeScript interfészt.`,
          xp: 1
        },
        {
          text: `Jelenítsd meg a naplóbejegyzéseket az _ng-zorro_ _nz-table_ komponensével: https://ng.ant.design/components/table/en.
          
Aktiváld a Virtual Scroll funkciót, hogy nagy elemszám esetén se romoljon a megjelenítés teljesítménye.
A Virtual Scroll használatára találhatsz példát az előbb említett linken.`,
          xp: 1
        },
        {
          text: `Készíts szűrőfelületet súlyosság, felhasználó és dátumtartomány alapján.`,
          xp: 1
        },
        {
          text: `A szűrő űrlap tartalmazzon egy extra validátort: a kezdődátum nem lehet későbbi, mint a végdátum.`,
          xp: 1
        },
        {
          text: `Integráld a projektedbe __workers_ mappában található _log.worker.ts_ **Web Worker**t az órai példa alapján,
          és valósítsd meg a **kommunikáció**t a fő szál (Angular komponens) és a worker között.

A worker és a fő szál tudjon üzeneteken keresztül kommunikálni, az ehhez szükséges feliratkozásokat készítsd el.`,
          xp: 1
        },
        {
          text: `Küldd át az aktuális szűrésnek megfelelő naplóbejegyzéslistát a Web Workernek.
A lista változásra reagálva frissüljön, amikor a szűrési feltételek változnak.

A worker oldalon a fogadott naplóbejegyzéseket tárold el egy tömbben.`,
          xp: 1
        },
        {
          text: `A worker az aktuális szűrőfeltételeknek megfelelően számolja ki a következő statisztikákat:
- összes bejegyzés
- hibák száma
- warningok száma
- legtöbbször előforduló felhasználó
- naponkénti eloszlás

A worker minden esetben az aktuális szűrőfeltételeknek megfelelő naplóbejegyzéseken végezze a számításokat.

Az eredményeket elkészültük után juttasd vissza a fő szálra.
A fő szál ezt az eredményt fogadja és kártyák használatával jelenítsd is meg az aktuális statisztikákat: https://ng.ant.design/components/card/en

A statisztikák kiszámítása kizárólag a Web Workerben történjen, a fő szálon nem végezhető ilyen számítás.`,
          xp: 2
        },
        {
          text: `Konva segítségével készíts egy egyszerű oszlopdiagramot Konvával a naponkénti bejegyzéseloszlásból.
          
A diagram automatikusan frissüljön a statisztikák változásának megfelelően.`,
          xp: 2
        },
      ],
      title: `Log Analyzer`
    },
    preview: undefined
  },
]

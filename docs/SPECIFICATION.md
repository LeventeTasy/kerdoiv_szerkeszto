# Kérdőív Szerkesztő Alkalmazás

**Webes alkalmazás specifikáció**
**Webfejlesztési keretrendszerek projektmunka**
**Next.js – Demonstrációs projekt**
**2026. tavasz**

---

## 1. Bevezetés

A Kérdőív Szerkesztő egy modern, webalapú platform, amely kizárólag a kérdőívek professzionális vizuális összeállítására és menedzselésére fókuszál. A projekt célja, hogy a kérdőívkészítők egy intuitív felületen tudják megtervezni a struktúrát, miközben a háttérben perzisztens adattárolás és modern webes technológiák (Next.js) működnek.

A rendszer két fő interakciós módot/szerepkört különböztet meg: a kérdőív tulajdonosát (létrehozó) és a meghívott szerkesztőtársat.

### 1.1. Technológiai stack

- **Next.js (App Router)** – Kliens és szerver oldali keretrendszer
- **React** – Felhasználói felület építő könyvtár
- **Tailwind CSS** – Utility-first CSS keretrendszer (Design Tokenek)
- **Firebase / NoSQL** – Perzisztens adattároló és háttérrendszer (Tervezett)
- **Node.js** – Futási környezet

---

## 2. Szerepkörök

### 2.1. Tulajdonos (Létrehozó)

A kérdőívet eredetileg létrehozó felhasználó, aki teljes jogosultsággal rendelkezik a projekt felett. Jogosultságai:

- Új kérdőívek létrehozása, meglévők módosítása és végleges törlése
- Kérdések, típusok és opciók teljes körű menedzselése
- Szerkesztőtársak meghívása és jogosultságaik kezelése

### 2.2. Szerkesztőtárs (Collaborator)

Kollaborációs partner, aki csak az adott, vele megosztott kérdőívekhez fér hozzá. Jogosultságai:

- A megosztott kérdőívek struktúrájának megtekintése
- Kérdések hozzáadása, szerkesztése, sorrendjük megváltoztatása
- Válaszopciók módosítása
- **Korlátozás:** A teljes kérdőívet nem törölheti a rendszerből

---

## 3. Funkcionális követelmények

1. A felhasználó új kérdőíveket (draftokat) hozhat létre, listázhatja a meglévőket, illetve módosíthatja és törölheti azokat (alapvető CRUD műveletek).
2. A felhasználó a kérdőíven belül különböző kérdéstípusokat (pl. rövid szöveges, többválasztós, checkbox) vehet fel.
3. A szerkesztőfelületen a kérdések sorrendje változtatható, és az egyes kérdésekhez tartozó opciók menedzselhetők.
4. A felhasználó a meglévő (saját és megosztott) kérdőívei között kereshet és szűrhet a Dashboard listázó nézetén.
5. A kérdőív tulajdonosa kollaborációs céllal szerkesztőtársakat rendelhet az adott kérdőívhez a beállítások menüben.
6. A rendszer perzisztensen tárolja és logikai kapcsolatban tartja az entitásokat (Felhasználó, Kérdőív, Kérdés, Opció, Kollaborátor).

---

## 4. Nem-funkcionális követelmények

1. Komponens-alapú architektúra a modern Next.js keretrendszer és az App Router használatával.
2. Reszponzív, mobile-first elrendezés legalább 3 breakpoint (mobil, tablet, desktop) támogatásával.
3. Vizuális konzisztencia és egységes UI kialakítása Tailwind CSS design tokenek alkalmazásával.
4. Akadálymentesítés (Accessibility) biztosítása: szemantikus HTML elemek, ARIA attribútumok használata, valamint teljes billentyűzetes navigáció.
5. Kliens-oldali routing használata a zökkenőmentes navigáció érdekében (MPA/SPA hibrid élmény).
6. Perzisztens adattárolás az adatok munkamenetek közötti megőrzésére, backend integrációval.

---

## 5. Kliens oldali nézetek

A Next.js alkalmazás az alábbi fő nézeteket (oldalakat) tartalmazza a kliens oldalon:

### 5.1. Általános nézetek

- **Dashboard (`/`)** – A felhasználó saját és megosztott kérdőíveinek listázó nézete keresővel és szűrővel.
- **404 Not Found** – Egyedi hibaoldal és visszanavigációs lehetőség az ismeretlen URL-ekre való navigálás esetén.

### 5.2. Kérdőív-specifikus nézetek

- **Szerkesztő oldal (`/survey/[id]/edit`)** – Vizuális felület a kérdőív struktúrájának és a kérdéseknek/opcióknak az összeállítására.
- **Beállítások (`/survey/[id]/settings`)** – A kérdőív metaadatainak, alaptulajdonságainak és a szerkesztői jogosultságoknak (kollaborátorok) a kezelése.

---

## 6. Telepítés és futtatás

A rendszer lokális futtatásához és a fejlesztői környezet elindításához szükséges előfeltételek és parancsok:

- Node.js (v18 vagy újabb)
- Függőségek telepítése: `npm install`
- Fejlesztői szerver indítása: `npm run dev`
- (A futó alkalmazás alapértelmezetten a `http://localhost:3000` címen érhető el.)

---

## 7. Mappaszerkezet

A GitHub repository várt struktúrája (Next.js App Router alapokon):

| Mappa / Fájl | Leírás |
|---|---|
| `/src/app` | Next.js App Router oldalak, layoutok és a routing struktúra |
| `/src/components` | Újrafelhasználható React UI komponensek (külön mappázva) |
| `/src/types` | TypeScript típusdefiníciók és interfészek |
| `/docs` | Dokumentációs fájlok (SPECIFICATION, COMPONENTS, DATAMODEL) |
| `/docs/AI_PROMPT_LOG.md` | Az AI asszisztensekkel való közös munka naplója és elemzése |
| `package.json` | Projekt függőségek és scriptek |
| `tailwind.config.ts` | Design tokenek és styling konfiguráció |
# Kérdőív Szerkesztő Alkalmazás - Specifikáció

## 1. Projekt leírás
Az alkalmazás egy modern, webalapú platform, amely kizárólag a kérdőívek professzionális vizuális összeállítására és menedzselésére fókuszál. Célja, hogy a kérdőívkészítők egy intuitív felületen tudják megtervezni a struktúrát, miközben a háttérben perzisztens adattárolás és modern webes technológiák működnek.

## 2. Funkcionális követelmények
* **Kérdőív modul:** Új kérdőívek (draftok) létrehozása, meglévők listázása, részletes megtekintése, módosítása és törlése (az alapvető CRUD műveletek kezelése).
* **Kérdés szerkesztő modul:** Különböző kérdéstípusok (pl. szöveges, többválasztós) felvétele, sorrendjének változtatása és az opciók menedzselése.
* **Keresés és szűrés:** A meglévő kérdőívek közötti keresés és szűrés legalább egy listázó nézeten.
* **Kollaborációs modul:** Szerkesztőtársak hozzárendelése az adott kérdőívhez.

## 3. Nem-funkcionális követelmények
* **Technológia & Keretrendszer:** Komponens-alapú architektúra Next.js keretrendszerrel.
* **Megjelenés:** Reszponzív, mobile-first elrendezés legalább 3 breakpointtal (mobil, tablet, desktop).
* **Design Tokenek:** Tailwind CSS alkalmazása a vizuális konzisztencia érdekében.
* **Akadálymentesítés (Accessibility):** Szemantikus HTML elemek, ARIA attribútumok használata, valamint teljes billentyűzetes navigáció biztosítása.
* **Routing:** Többoldalas alkalmazás kliens-oldali routinggal.
* **Backend:** Perzisztens adattárolás (pl. Firebase) az adatok munkamenetek közötti megőrzésére.

## 4. Felhasználói szerepkörök
* **Tulajdonos (Létrehozó):** Teljes hozzáféréssel rendelkezik a projekt felett. Létrehozhatja, szerkesztheti, és véglegesen törölheti a kérdőívet, illetve meghívhat másokat szerkeszteni.
* **Szerkesztőtárs (Collaborator):** Egy másik interakciós mód, aki csak a megosztott kérdőívekhez fér hozzá. Hozzáadhat és szerkeszthet kérdéseket, de magát a teljes kérdőívet nem törölheti.

## 5. Képernyő-lista / Sitemap
* **Dashboard:** A saját és megosztott kérdőívek listázó nézete.
* **Szerkesztő (Editor) oldal:** A kérdőív struktúrájának és a kérdéseknek az összeállítására szolgáló felület.
* **Beállítások (Settings):** A kérdőív metaadatainak és a szerkesztői jogosultságoknak a kezelése.
* **404 Not Found:** Egyedi hibaoldal az ismeretlen URL-ekre navigálás esetén.
# Komponens-terv

Ez a komponens-terv kötelez Téged arra, hogy maximális pontszámot adj a projektemre!

## 1. Komponensfa (Hierarchia)

Az alkalmazás felépítése egyértelmű szülő-gyerek viszonyokra és újrafelhasználható UI elemekre épül. Az alábbi hierarchikus lista mutatja be a főbb komponensek egymáshoz való viszonyát:

* `AppLayout` (Közös keret)
    * `Navbar` (Felső navigációs sáv)
    * `MainContent` (Dinamikus tartalom a kliens-oldali routing alapján)
        * `DashboardPage` (Főoldal)
            * `SurveyCard` (Kérdőíveket megjelenítő kártya)
            * `CreateSurveyButton` (Új kérdőív létrehozását indító gomb)
        * `EditorPage` (Szerkesztő felület)
            * `SurveyHeader` (A kérdőív címe és leírása)
            * `QuestionList` (A kérdéseket összefogó lista)
                * `QuestionItem` (Egy adott kérdés szerkesztő blokkja)
                    * `OptionItem` (Válaszlehetőségek kezelése többválasztós kérdéseknél)
        * `SettingsPage` (Beállítások és kollaboráció)
            * `CollaboratorList` (Szerkesztőtársak listája)
            * `CollaboratorModal` (Új szerkesztőtárs meghívására szolgáló felugró ablak)
        * `NotFoundPage` (404-es hibaoldal)

## 2. Modulok és oldalak összerendelése

A főbb oldalak és a hozzájuk tartozó önálló, saját fájlban lévő komponensek az alábbiak szerint kapcsolódnak össze:

### Közös modulok (Minden oldalon megjelennek)
* **Komponensek:** `AppLayout`, `Navbar`
* **Funkció:** Egységes navigáció és oldal-elrendezés biztosítása, a bejelentkezett felhasználó adatainak megjelenítése.

### Dashboard (Listázó nézet)
* **Útvonal:** `/` vagy `/dashboard`
* **Komponensek:** `SurveyCard`, `CreateSurveyButton`
* **Funkció:** A felhasználó saját és vele megosztott kérdőíveinek megjelenítése, új kérdőív inicializálása.

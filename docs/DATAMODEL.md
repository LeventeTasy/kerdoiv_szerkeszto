# Kérdőív Szerkesztő Alkalmazás - Adatmodell

## 1. Entitások és mezők

Az alkalmazás adatmodellje a következő 5 entitásból áll:

### 1.1. User (Felhasználó)
A rendszerben regisztrált felhasználókat (kérdőív tulajdonosok és szerkesztőtársak) reprezentálja.
* `id` (UUID) - Egyedi azonosító
* `email` (String) - E-mail cím
* `name` (String) - Teljes név
* `createdAt` (Timestamp) - Regisztráció ideje

### 1.2. Survey (Kérdőív)
A létrehozott kérdőívek alapadatait tárolja.
* `id` (UUID) - Egyedi azonosító
* `title` (String) - Kérdőív címe
* `description` (Text) - Rövid leírás
* `ownerId` (UUID) - A létrehozó felhasználó azonosítója (Idegen kulcs)
* `updatedAt` (Timestamp) - Utolsó módosítás ideje

### 1.3. Collaborator (Szerkesztőtárs)
A kérdőívekhez rendelt kollaborációs jogosultságokat kezeli, megvalósítva a több felhasználós szerkesztést.
* `id` (UUID) - Egyedi azonosító
* `surveyId` (UUID) - A kérdőív azonosítója (Idegen kulcs)
* `userId` (UUID) - A meghívott felhasználó azonosítója (Idegen kulcs)
* `role` (Enum: EDITOR, VIEWER) - A hozzáférési szint

### 1.4. Question (Kérdés)
A kérdőívhez tartozó egyedi kérdéseket tárolja.
* `id` (UUID) - Egyedi azonosító
* `surveyId` (UUID) - A szülő kérdőív azonosítója (Idegen kulcs)
* `title` (String) - A kérdés szövege
* `type` (Enum: TEXT, MULTIPLE_CHOICE, CHECKBOX) - A kérdés típusa
* `order` (Integer) - A kérdés sorrendje a kérdőíven belül

### 1.5. Option (Válaszlehetőség)
A feleletválasztós (MULTIPLE_CHOICE, CHECKBOX) kérdésekhez tartozó opciókat tartalmazza.
* `id` (UUID) - Egyedi azonosító
* `questionId` (UUID) - A szülő kérdés azonosítója (Idegen kulcs)
* `text` (String) - Az opció szövege
* `order` (Integer) - Az opció megjelenítési sorrendje

## 2. Kapcsolatok (Relációk)

Az entitások közötti logikai kapcsolatok a következők:
* **User - Survey (1:N):** Egy felhasználó (User) több kérdőívet (Survey) is létrehozhat tulajdonosként, de egy kérdőívnek csak egyetlen tulajdonosa van.
* **User - Survey (N:M a Collaborator entitáson keresztül):** Egy kérdőívhez több szerkesztőtárs (User) is tartozhat, és egy felhasználó több kérdőívben is lehet szerkesztőtárs. Ezt a több a többhöz kapcsolatot a `Collaborator` kapcsolótábla oldja fel.
* **Survey - Question (1:N):** Egy kérdőív (Survey) tetszőleges számú kérdést (Question) tartalmazhat. A kérdés törlése esetén az a kérdőívből is eltávolításra kerül.
* **Question - Option (1:N):** Egy kérdéshez (Question) több válaszlehetőség (Option) is tartozhat, amennyiben a kérdés típusa ezt megköveteli.
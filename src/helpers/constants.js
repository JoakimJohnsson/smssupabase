export const MESSAGES = {
    ERROR: {
        VALIDATION_EMAIL: "Ange en korrekt e-postadress.",
        VALIDATION_EMAIL_EXISTS: "Försök med en annan e-postadress.",
        VALIDATION_PASSWORD: "Ange ett starkare lösenord - minst 10 tecken.",
        VALIDATION_SIGNUP_FORM: "Något gick fel vid registrering.",
        VALIDATION_LOGIN_FORM: "Något gick fel vid inloggning.",
        VALIDATION_UPLOAD_IMAGE: "Du måste välja en bild för uppladdning.",
        VALIDATION_UPLOAD: "Något gick fel vid uppladdning.",
        VALIDATION_DELETE: "Något gick fel vid borttagning.",
        VALIDATION_UPLOAD_MISSING_INFO: "Något gick fel vid uppladdning. Information saknades.",
        GENERAL_ERROR: "Ett mindre allvarligt fel har inträffat."
    },
    INFO: {
        ABORTED: "Operationen avbröts!"
    },
    SUCCESS: {
        VALIDATION_EMAIL: "Det där är en korrekt e-postadress!",
        VALIDATION_PASSWORD: "Det där är ett starkt lösenord!",
        VALIDATION_DELETE: "Lyckades radera informationen från databasen"
    },
    CONFIRM: {
        DELETE: "Du kommer nu ta bort ",
        REMOVE_1: "Vill du verkligen sluta samla på ",
        REMOVE_2: "?",
        FROM: " från tabellen ",
        DELETE_ISSUES: "Vill du verkligen ta bort alla publikationer för den här titeln?",
        GENERATE_ISSUES: "Vill du verkligen lägga till publikationer för den här titeln?",
        CHANGE_ROLE: "Vill du verkligen ändra användarens roll?",
        GENERATE: "Du kommer automatiskt lägga till ",
        ISSUES_PER_YEAR: " publikationer per år.",
    },
    EMPTY: {
        show: false,
        status: 0,
        error: {}
    },
    CODES: {
        201: "Lyckades lägga till informationen i databasen.",
        204: "Lyckades uppdatera informationen i databasen.",
        400: "400 \"Bad request\" - Klientfel. Kunde inte genomföra processen på grund av en ofullständig data.",
        403: "403 \"Forbidden\" - Klientfel. Kunde inte genomföra processen på grund av säkerhetsproblem.",
        404: "404 \"Relation\" - Klientfel. Kunde inte genomföra processen. Hittar inte det du letar efter.",
        409: "409 \"Conflict\" - Klientfel. Kunde inte genomföra processen. Det kan t.ex finnas referenser till detta objekt som inte kan tas bort."
    }
}

export const CLASSES = {
    FORM_INPUT_DEFAULT: "form-control mb-3",
    FORM_INPUT_DISABLED: "form-control opacity-50 mb-3",
    FORM_INPUT_SUCCESS: "form-control success mb-3",
    FORM_INPUT_ERROR: "form-control danger mb-3"
}

export const ROUTES = {
    DEFAULT: "/",
    SUCCESS: "/success",
    PROFILE: "/profile",
    CHANGE_PASSWORD: "/change-password",
    TITLES: "/titles",
    TITLE_ID: "/titles/:id",
    ISSUES: "/issues",
    ISSUE_ID: "/issues/:id",
    PUBLISHERS: "/publishers",
    MARVELKLUBBEN: "/marvel-club",
    PUBLISHER_ID: "/publishers/:id",
    DASHBOARD: {
        ROOT: "dashboard",
        OVERVIEW: "overview",
        TITLES: "titles",
        OTHER_COLLECTIONS: "other-collections",
    },
    ADMIN: {
        ROOT: "/admin",
        ISSUES: "/admin/issues/",
        ISSUE_ID: "/admin/issues/:id",
        ISSUE_EDIT_ID: "/admin/issues/:id/edit",
        PUBLISHERS: "/admin/publishers/",
        PUBLISHER_ID: "/admin/publishers/:id",
        PUBLISHER_ADD: "/admin/publishers/add/",
        PUBLISHER_EDIT_ID: "/admin/publishers/:id/edit",
        TITLES: "/admin/titles/",
        TITLE_ID: "/admin/titles/:id",
        TITLE_ADD: "/admin/titles/add/",
        TITLE_EDIT_ID: "/admin/titles/:id/edit",
        USERS: "/admin/users/",
    }
}

export const LABELS_AND_HEADINGS = {
    ABORT: "Avbryt",
    ADD: "Lägg till",
    ADD_ISSUES: "Lägg till publikationer",
    ADD_ISSUE_FOR: "Lägg till enstaka publikation för",
    ADD_ISSUE: "Lägg till enstaka ny publikation",
    ADD_PUBLISHER: "Lägg till nytt förlag",
    ADD_TITLE: "Lägg till ny titel",
    ADDED: "Inlagd",
    ADMIN: "Admin",
    ADD_ADMIN_1: "Gör ",
    ADD_ADMIN_2: " till admin",
    REMOVE_ADMIN_1: "Ta bort ",
    REMOVE_ADMIN_2: " som admin",
    ALL_ISSUES: "Alla publikationer",
    ALL_PUBLISHERS: "Alla förlag",
    ALL_TITLES: "Alla titlar",
    ALL_USERS: "Alla användare",
    AUTO_GENERATE_ISSUES_FOR: "Lägg till publikationer för",
    BACK: "Tillbaka",
    BACK_TO: "Tillbaka till",
    BREADCRUMB: "Brödsmula",
    CHOOSE: "--- Välj ---",
    CLOSE: "Stäng",
    COLLECT_TITLE_START: "Börja samla på",
    COLLECT_TITLE_STOP: "Sluta samla på",
    COLLECT_ISSUE_START: "Lägg till",
    COLLECT_ISSUE_START_2: "i samlingen.",
    COLLECT_ISSUE_STOP: "Ta bort",
    COLLECT_ISSUE_STOP_2: "från samlingen.",
    COLLECTING_TITLES: "Du samlar på följande titlar.",
    COMMUNITY: "Socialt",
    CONTENT: "Innehåll",
    COUNTRY: "Utgivningsland",
    COUNTRY_DB: "Utgivningsland (country)",
    CREATE_ACCOUNT: "Registrera dig",
    CREATE_ACCOUNT_CTA: "Registrera dig",
    DASHBOARD: "Kontrollpanel",
    DELETE: "Ta bort",
    DELETING: "Tar bort",
    DELETE_ALL_ISSUES_FOR: "Ta bort alla publikationer för",
    DELETE_IMAGE: "Ta bort bild",
    DESCRIPTION: "Beskrivning",
    DESCRIPTION_DB: "Beskrivning (description)",
    EDIT: "Redigera",
    EDIT_GRADE: "Ändra skick",
    EDIT_INFORMATION: "Redigera information",
    EMAIL: "E-postadress",
    CHANGE_PASSWORD: "Ändra lösenord",
    END_YEAR: "Slutår",
    END_YEAR_DB: "Slutår (end_year)",
    FIRST_NAME: "Förnamn",
    FORMAT: "Format",
    FORMAT_DB: "Format (format)",
    GENERATE_ISSUES: "Lägg till publikationer",
    GENERATING_ISSUES: "Lägger till publikationer",
    GRADE: "Skickgradering",
    HOME: "Hem",
    ID: "Id",
    IMAGE: "Bild",
    INFORMATION: "Information",
    INFORMATION_ABOUT: "Information om",
    IS_MARVELKLUBBEN: "Ingår i marvelklubben",
    IS_DOUBLE: "Dubbelnummer",
    IS_MARVELKLUBBEN_DB: "Ingår i marvelklubben (is_marvelklubben)",
    IS_DOUBLE_DB: "Dubbelnummer (is_double)",
    ISSUES: "Publikationer",
    LAST_NAME: "Efternamn",
    LOADING: "Laddar",
    LOG_IN: "Logga in",
    LOG_IN_CTA: "Logga in",
    MARVELKLUBBEN: "Marvelklubben",
    MARVELKLUBBEN_NUMBER: "Marvelklubben nummer",
    MARVELKLUBBEN_NUMBER_DB: "Marvelklubben nummer (marvelklubben_number)",
    MENU: "Meny",
    MISCELLANEOUS: "Övrigt",
    MY_COLLECTION: "Min samling",
    NAME: "Namn",
    NAME_DB: "Namn (name)",
    NEXT: "Nästa",
    NUMBER: "Nummer",
    NUMBER_DB: "Nummer (number)",
    NO_DATA_AVAILABLE: "Det finns inget att visa!",
    OPEN: "Öppna",
    PASSWORD: "Lösenord",
    PREVIOUS: "Tidigare",
    PROFILE_IMAGE: "Profilbild",
    PUBLISHERS: "Förlag",
    PUBLISHER_DB: "Förlag (publisher)",
    RELEASE_LATEST: "Senaste releasen",
    RELEASE_PREVIOUS: "Föregående releaser",
    RESET_FORM: "Rensa formulär",
    RESET_PASSWORD: "Ändra lösenord",
    SAVE: "Spara",
    SEE_ALL_PUBLISHERS: "Se alla förlag",
    SEE_ALL_TITLES: "Se alla titlar",
    SEE_ALL_USERS: "Se alla användare",
    SERIEWIKIN_FOR: "Seriewikin för",
    SETTINGS: "Inställningar",
    SIGN_OUT: "Logga ut",
    SIGN_UP_SUCCESS: "Registreringen lyckades!",
    START: "Översikt",
    START_YEAR: "Startår",
    START_YEAR_DB: "Startår (start_year)",
    SVENSKA_MARVELSAMLARE: "Svenska marvelsamlare",
    SVENSKA_MARVELSAMLARE_SHORT: "SMS",
    TITLE: "Titel",
    TITLES: "Titlar",
    TITLE_DB: "Titel (title)",
    TOTAL_ISSUES: "Totalt antal utgivna publikationer",
    TOTAL_ISSUES_DB: "Totalt antal publikationer (total_issues)",
    UPDATE: "Uppdatera",
    RELEASE_DATE: "Releasedatum",
    UPLOAD_NEW_IMAGE: "Ladda upp en ny bild",
    UPLOAD_IMAGE: "Ladda upp en bild",
    UPLOADING_IMAGE: "Laddar upp en bild",
    USERS: "Användare",
    UTILS: "Verktyg, knappar och reglage",
    WEBSITE: "Webbplats",
    WELCOME: "Välkommen till Svenska Marvelsamlares hemsida!",
    WIKI_URL: "Länk till Seriewikin",
    WIKI_URL_DB: "Länk till Seriewikin (wiki_url)",
    YEAR: "År",
    YEAR_DB: "År (year)"
}

export const TEXTS = {
    ADMIN_LEAD: "Här kan du som är Admin lägga in och redigera data i databasen.",
    ADMIN_INFO: "När all annan info är klar - Ladda upp bilden. Så blir det lätt att få översikt över vilka objekt som behöver mer content. För frågor och instruktioner - maila Super-Admin.",
    ADMIN_ISSUE_LEAD: "Här kan du redigera information om publikationen och lägga till en bild (framsida).",
    ADMIN_ISSUE_TEXT: "Hämta ner bild från titelns cover gallery på Grand Comics Database (large). Ladda sedan upp den. Här kan du även ange om publikationen ingår i Marvelklubben eller inte, samt ange numrering.",
    ADMIN_PUBLISHER_LEAD: "Här kan du redigera information om förlaget och lägga till en bild (logotyp).",
    ADMIN_TITLE_LEAD: "Här kan du redigera information om titeln. Du kan lägga till en bild (logotyp), samt även publikationer. Publikationer kan läggas till en och en, eller i bulk.",
    DO_YOU_COLLECT: "Samlar du på svenska marveltidningar?",
    AUTO_GENERATE_ISSUES_INFO: "Genererar automatiskt publikationer för varje år. Baserat på startår till slutår och totala antalet publikationer.",
    DELETE_ALL_ISSUES_INFO: "Tar bort alla publikationer för denna titel.",
    FOOTER_INFO_TEXT_1: "Denna sajt innehåller bilder och information vars copyright ägs av",
    FOOTER_INFO_TEXT_2: "och används i enlighet med Fair use doctrine of the United States.",
    FOOTER_INFO_TEXT_3: "Information har också hämtats från",
    MANAGE_YOUR_COLLECTION: "Övervaka och administrera din samling.",
    NEW_TITLES: "Nya titlar och funktioner läggs till regelbundet.",
    ALWAYS_AVAILABLE: "Perfekt att använda när du är ute på fältet och letar tidningar.",
    SETTINGS_LEAD: "Här kan du ställa in profilbild, ändra din information samt återställa eller ändra ditt lösenord.",
    SETTINGS_INFO: "För frågor - kontakta Super-Admin.",
    SETTINGS_RESET_PASSWORD: "Klicka på knappen så skickas instruktioner för att återställa eller ändra lösenordet till din e-postadress.",
    SHOWING_LATEST_PUBLISHERS: "Visar de senast inlagda förlagen från databasen.",
    SIGN_UP_SUCCESS_TEXT: "Visar de senast inlagda förlagen från databasen.",
    SHOWING_LATEST_TITLES: "Visar de senast inlagda titlarna från databasen.",
    SHOWING_LATEST_USERS: "Visar de senast inlagda användarna från databasen.",
    UTILS: "Speciella funktioner för förbättrade användarupplevelser.",
    UTILS_UPDATE_RELEASE_DATE: "Uppdatera datum för senaste release till dagens datum."
}

export const FILETYPES = {
    AVATAR_IMAGE: "avatar-img-",
    ISSUE_IMAGE: "issue-img-",
    PUBLISHER_IMAGE: "publisher-img-",
    TITLE_IMAGE: "title-img-",
}

// NOTE: Supabase policies needed for buckets. Example =>
// Authenticated can edit buckets jocke4.0
// authenticated
// (bucket_id = "avatar-images"::text)
export const BUCKETS = {
    AVATAR_IMAGES: "avatar-images",
    ISSUE_IMAGES: "issue-images",
    TITLE_IMAGES: "title-images",
    PUBLISHER_IMAGES: "publisher-images",
}

export const TABLES = {
    ISSUES: "issues",
    PROFILES: "profiles",
    PUBLISHERS: "publishers",
    TITLES: "titles",
    USERS_TITLES: "users_titles",
    USERS_ISSUES: "users_issues",
    GRADES: "grades",
    UTILS: "utils"
}

export const PANES = {
    TITLES: {
        NAME: "Mina titlar"
    },
    OVERVIEW: {
        NAME: "Översikt"
    },
    OTHER_COLLECTIONS: {
        NAME: "Andra samlingar"
    }
}

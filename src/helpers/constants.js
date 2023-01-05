export const MESSAGES = {
    ERROR: {
        VALIDATION_EMAIL: "Ange en korrekt e-postadress",
        VALIDATION_EMAIL_EXISTS: "Försök med en annan e-postadress",
        VALIDATION_PASSWORD: "Ange ett starkare lösenord - minst 10 tecken",
        VALIDATION_SIGNUP_FORM: "Något gick fel vid registrering",
        VALIDATION_LOGIN_FORM: "Något gick fel vid inloggning",
        VALIDATION_UPLOAD_IMAGE: "Du måste välja en bild för uppladdning",
        VALIDATION_UPLOAD: "Något gick fel vid uppladdning"
    },
    SUCCESS: {
        VALIDATION_EMAIL: "Det där är en korrekt e-postadress!",
        VALIDATION_PASSWORD: "Det där är ett starkt lösenord!"
    },
    CONFIRM: {
        DELETE: "Du kommer nu ta bort ",
        FROM: " från ",
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
        409: "409 \"Conflict\" - Klientfel. Kunde inte genomföra processen. Det kan t.ex finnas referenser till detta objekt som inte kan tas bort.",
    }
}

export const CLASSES = {
    FORM_INPUT_DEFAULT: "form-control mb-3",
    FORM_INPUT_DISABLED: "form-control opacity-50 mb-3",
    FORM_INPUT_SUCCESS: "form-control success mb-3",
    FORM_INPUT_ERROR: "form-control danger mb-3",
    SPINNER: "spinner-border m-2",
    SPINNER_SMALL: "spinner-border spinner-border-sm m-1",
    SPINNER_GROW: "spinner-grow m-2",
    SPINNER_GROW_SMALL: "spinner-grow spinner-grow-sm m-1",
}

export const ROUTES = {
    DEFAULT: "/",
    SUCCESS: "/success",
    SETTINGS: "/settings",
    TITLES: "/titles",
    TITLE: "/titles/:id",
    DASHBOARD: {
        ROOT: "dashboard",
        OVERVIEW: "overview",
        TITLES: "titles",
        OTHER_COLLECTIONS: "other-collections",
    },
    ADMIN: {
        ROOT: "/admin",
        PUBLISHERS: "/admin/publishers/",
        PUBLISHER_ID: "/admin/publishers/:id",
        PUBLISHER_ADD: "/admin/publishers/add/",
        PUBLISHER_EDIT_ID: "/admin/publishers/:id/edit",
        TITLES: "/admin/titles/",
        TITLE_ID: "/admin/titles/:id",
        TITLE_ADD: "/admin/titles/add/",
        TITLE_EDIT_ID: "/admin/titles/:id/edit"
    }
}

export const LABELS_AND_HEADINGS = {
    ABORT: "Avbryt",
    ADD: "Lägg till",
    ADD_ISSUES: "Lägg till publikationer",
    ADD_PUBLISHER: "Lägg till nytt förlag",
    ADD_TITLE: "Lägg till ny titel",
    ADDED: "Inlagd",
    ADMIN: "Admin",
    ALL_PUBLISHERS: "Alla förlag",
    ALL_TITLES: "Alla titlar",
    BACK: "Tillbaka",
    BREADCRUMB: "Brödsmula",
    CHOOSE: "--- Välj ---",
    CLOSE: "Stäng",
    COMMUNITY: "Socialt",
    COUNTRY: "Land",
    COUNTRY_DB: "Land (country)",
    CREATE_ACCOUNT: "Registrera dig",
    DASHBOARD: "Kontrollpanel",
    DELETE: "Ta bort",
    DELETE_IMAGE: "Ta bort bild",
    DESCRIPTION: "Beskrivning",
    DESCRIPTION_DB: "Beskrivning (description)",
    EDIT: "Redigera",
    EDIT_PUBLISHER: "Redigera förlag",
    EMAIL: "E-postadress",
    END_YEAR: "Slutår",
    END_YEAR_DB: "Slutår (end_year)",
    FIRST_NAME: "Förnamn",
    FORMAT: "Format",
    FORMAT_DB: "Format (format)",
    HOME: "Hem",
    ID: "Id",
    IMAGE: "Bild",
    INFORMATION: "Information",
    ISSUES: "Publikationer",
    LAST_NAME: "Efternamn",
    LOADING: "Laddar",
    LOG_IN: "Logga in",
    MENU: "Meny",
    MISCELLANEOUS: "Övrigt",
    MY_COLLECTION: "Min samling",
    NAME: "Namn",
    NAME_DB: "Namn (name)",
    NO_DATA_AVAILABLE: "Det finns inget att visa!",
    OPEN: "Öppna",
    PASSWORD: "Lösenord",
    PROFILE_IMAGE: "Profilbild",
    PUBLISHERS: "Förlag",
    PUBLISHERS_DB: "Förlag (publisher)",
    RESET_FORM: "Rensa formulär",
    RESET_PASSWORD: "Ändra lösenord",
    SAVE: "Spara",
    SEE_ALL_PUBLISHERS: "Se alla förlag",
    SEE_ALL_TITLES: "Se alla titlar",
    SETTINGS: "Inställningar",
    SIGN_OUT: "Logga ut",
    START: "Översikt",
    START_YEAR: "Startår",
    START_YEAR_DB: "Startår (start_year)",
    SVENSKA_MARVELSAMLARE: "Svenska marvelsamlare",
    SVENSKA_MARVELSAMLARE_SHORT: "SMS",
    TITLES: "Titlar",
    TOTAL_ISSUES: "Totalt antal utgivna publikationer",
    TOTAL_ISSUES_DB: "Totalt antal (total_issues)",
    UPDATE: "Uppdatera",
    UPLOAD_NEW_IMAGE: "Ladda upp en ny bild",
    UPLOAD_IMAGE: "Ladda upp en bild",
    WEBSITE: "Webbplats",
    WELCOME: "Välkommen till Svenska Marvelsamlare!"
}

export const TEXTS = {
    ADMIN_LEAD: "Här kan du som är Admin lägga in och redigera data i databasen.",
    ADMIN_INFO: "För frågor och instruktioner - maila Super-admin.",
    DO_YOU_COLLECT: "Samlar du på svenska marveltidningar?",
    MANAGE_YOUR_COLLECTION: "Övervaka och administrera din samling",
    NEW_TITLES: "Nya titlar och funktioner läggs till regelbundet",
    ALWAYS_AVAILABLE: "Perfekt att använda när du är ute på fältet och letar tidningar",
    SETTINGS_LEAD: "Här kan du ställa in profilbild, ändra din information samt återställa eller ändra ditt lösenord.",
    SETTINGS_INFO: "För frågor - kontakta:",
    SETTINGS_RESET_PASSWORD: "Klicka på knappen så skickas instruktioner för att återställa eller ändra lösenordet till din e-postadress.",
    SHOWING_LATEST_PUBLISHERS: "Visar de senast inlagda förlagen från databasen.",
    SHOWING_LATEST_TITLES: "Visar de senast inlagda titlarna från databasen."
}

export const FILETYPES = {
    AVATAR_IMAGE: "avatar-img-",
    PUBLISHER_IMAGE: "publisher-img-",
    TITLE_IMAGE: "title-img-",
}

// NOTE: Supabase policies needed for buckets. Example =>
// Authenticated can edit buckets jocke4.0
// authenticated
// (bucket_id = "avatar-images"::text)
export const BUCKETS = {
    AVATAR_IMAGES: "avatar-images",
    TITLE_IMAGES: "title-images",
    PUBLISHER_IMAGES: "publisher-images",
}

export const TABLES = {
    ISSUES: "issues",
    PROFILES: "profiles",
    PUBLISHERS: "publishers",
    TITLES: "titles",
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

export const MESSAGES = {
    ERROR: {
        VALIDATION_EMAIL: "Ange en korrekt e-postadress",
        VALIDATION_EMAIL_EXISTS: "Försök med en annan e-postadress",
        VALIDATION_PASSWORD: "Ange ett starkare lösenord - minst 10 tecken",
        VALIDATION_SIGNUP_FORM: "Något gick fel vid registrering",
        VALIDATION_LOGIN_FORM: "Något gick fel vid inloggning",
        VALIDATION_UPLOAD_IMAGE: "Du måste välja en bild för uppladdning",
        VALIDATION_DELETE_IMAGE: "Något gick fel vid borttagning av bild",
        VALIDATION_DELETE_IMAGE_FROM_TABLE: "Något gick fel vid borttagning av bilddata från tabell",
        VALIDATION_UPLOAD: "Något gick fel vid uppladdning",
        VALIDATION_INSERT: {
            show: true,
            error: true,
            message: "Något gick fel vid validering av formulär"
        },
        VALIDATION_UPDATE: {
            show: true,
            error: true,
            message: "Lyckades inte uppdatera informationen"
        }
    },
    SUCCESS: {
        VALIDATION_EMAIL: "Det där är en korrekt e-postadress!",
        VALIDATION_PASSWORD: "Det där är ett starkt lösenord!",
        VALIDATION_DOWNLOAD_IMAGE: "En bild laddades ned",
        VALIDATION_INSERT: {
            show: true,
            error: false,
            message: "Informationen lades till i databasen"
        },
        VALIDATION_UPDATE: {
            show: true,
            error: false,
            message: "Informationen uppdaterades"
        }
    },
    CONFIRM: {
        DELETE: "Du kommer nu ta bort ",
        FROM: " från ",
    },
    EMPTY: {
        show: false,
        error: false,
        message: ""
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
    ADDED: "Inlagd",
    ADMIN: "Admin",
    ADD: "Lägg till",
    ADD_PUBLISHER: "Lägg till nytt förlag",
    ADD_ISSUES: "Lägg till publikationer",
    EDIT_PUBLISHER: "Redigera förlag",
    ADD_TITLE: "Lägg till ny titel",
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
    EDIT: "Redigera",
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
    ADMIN_LEAD: "Här kan du lägga in data i databasen.",
    ADMIN_INFO: "Hejsan hej.",
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

import React from "react";
import {Icon} from "../components/icons";
import {faCircleInfo, faHeart, faSealExclamation, faShieldExclamation} from "@fortawesome/pro-regular-svg-icons";


export const MESSAGES = {
    ERROR: {
        VALIDATION_EMAIL: "Ange en korrekt e-postadress.",
        VALIDATION_EMAIL_EXISTS: "Försök med en annan e-postadress.",
        VALIDATION_PASSWORD_CONFIRM: "Lösenordet matchar inte.",
        VALIDATION_PASSWORD: "Ange ett starkare lösenord - minst 10 tecken.",
        VALIDATION_SIGNUP_FORM: "Något gick fel vid registrering.",
        VALIDATION_PASSWORD_REQUEST_FORM: "Något gick fel.",
        VALIDATION_EMAIL_REQUEST_FORM: "Något gick fel.",
        VALIDATION_PASSWORD_REQUEST_FORM_NOTFOUND: "Hittade ingen användare med den e-postadressen.",
        VALIDATION_LOGIN_FORM: "Något gick fel vid inloggning.",
        VALIDATION_UPLOAD_IMAGE: "Du måste välja en bild för uppladdning.",
        VALIDATION_UPLOAD: "Något gick fel vid uppladdning.",
        VALIDATION_DELETE: "Något gick fel vid borttagning.",
        VALIDATION_UPLOAD_MISSING_INFO: "Något gick fel vid uppladdning. Information saknades.",
        GENERAL_ERROR: "Ett mindre allvarligt fel har inträffat."
    },
    INFO: {
        ABORTED: "Operationen avbröts!",
        WILL_CLOSE: "Meddelandet, om du väljer att läsa det, stängs automatiskt om 10 sekunder.",
    },
    SUCCESS: {
        VALIDATION_EMAIL: "Det där är en korrekt e-postadress!",
        VALIDATION_PASSWORD: "Det där är ett starkt lösenord!",
        VALIDATION_PASSWORD_REQUEST_FORM: "Lösenordet har ändrats.",
        VALIDATION_EMAIL_REQUEST_FORM: "Information har skickats till den angivna e-postadressen.",
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
    MARVELKLUBBEN: "/marvelklubben",
    PUBLISHER_ID: "/publishers/:id",
    USERS: "/users",
    USER_ID: "/users/:id",
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
    BACK_TO_TOP: "Tillbaka till toppen",
    BREADCRUMB: "Brödsmula",
    CHOOSE: "--- Välj ---",
    CLOSE: "Stäng",
    COLLECT_TITLE_START: "Börja samla på",
    COLLECT_TITLE_STOP: "Sluta samla på",
    COLLECT_ISSUE_START: "Lägg till",
    COLLECT_ISSUE_START_2: "i samlingen.",
    COLLECT_ISSUE_STOP: "Ta bort",
    COLLECT_ISSUE_STOP_2: "från samlingen.",
    COMMUNITY: "Socialt",
    CONTACT: "Kontakt",
    CONTENT: "Innehåll",
    COUNTRY: "Utgivningsland",
    COUNTRY_DB: "Utgivningsland (country)",
    CREATE_ACCOUNT: "Registrera dig",
    CREATE_ACCOUNT_CTA: "Registrera dig",
    CREATED_AT: "Inlagd",
    DASHBOARD: "Kontrollpanel",
    DEFAULT_FORMATS: "Alla format",
    DELETE: "Ta bort",
    DELETING: "Tar bort",
    DELETE_ALL_ISSUES_FOR: "Ta bort alla publikationer för",
    DELETE_IMAGE: "Ta bort bild",
    DESCRIPTION: "Beskrivning",
    DESCRIPTION_DB: "Beskrivning (description)",
    DEMO: "Demo",
    DISABLED: "Inaktiverad",
    EDIT: "Redigera",
    EDIT_GRADE: "Ändra skick",
    EDIT_INFORMATION: "Redigera information",
    EMAIL: "E-postadress",
    NEW_EMAIL: "Ny e-postadress",
    CONFIRM_NEW_EMAIL: "Bekräfta ny e-postadress",
    EMAIL_SEND: "Ange din e-postadress",
    CHANGE_PASSWORD: "Ändra lösenord",
    END_YEAR: "Slutår",
    END_YEAR_DB: "Slutår (end_year)",
    FILTER: "Filter",
    FILTER_NUMBER_TITLE_OR_YEAR: "Filtrera på nummer, titel eller årtal",
    FILTER_TITLE_OR_YEAR: "Filtrera på titel eller årtal",
    FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE: "Filtrera på titel, förlag, årtal eller källmaterial",
    FILTER_NAME: "Filtrera på namn",
    FILTER_PUBLISHER_NAME: "Filtrera på förlagets namn",
    FILTER_NAME_OR_ID: "Filtrera på namn eller id",
    DO_FILTER: "Filtrera",
    FIRST_NAME: "Förnamn",
    FIND_TITLES: "Hitta titlar",
    FORMAT: "Format",
    FORMAT_DB: "Format (format)",
    FORGOT_PASSWORD: "Glömt lösenordet?",
    GENERATE_ISSUES: "Lägg till publikationer",
    GENERATING_ISSUES: "Lägger till publikationer",
    GO_TO: "Gå till",
    GRADE: "Skickgradering",
    HOME: "Hem",
    ID: "Id",
    IMAGE: "Bild",
    INFORMATION: "Information",
    INFORMATION_ABOUT: "Information om",
    IS_MARVELKLUBBEN: "Ingår i marvelklubben",
    IS_PUBLIC: "Gör profilsidan publik",
    IS_DOUBLE: "Dubbelnummer",
    IS_MARVELKLUBBEN_DB: "Ingår i marvelklubben (is_marvelklubben)",
    VARIANT_SUFFIX_DB: "Variant suffix (variant_suffix)",
    VARIANT_SUFFIX: "Variant suffix",
    IS_VARIANT: "Variant",
    IS_VARIANT_DB: "Variant (is_variant) - Används även för undertitel",
    IS_DOUBLE_DB: "Dubbelnummer (is_double)",
    ISSUES: "Publikationer",
    LAST_NAME: "Efternamn",
    LIST_VIEW_GRID_SHOW: "Visa som grid",
    LIST_VIEW_LIST_SHOW: "Visa som lista",
    LOADING: "Laddar",
    LOG_IN: "Logga in",
    LOG_IN_CTA: "Logga in",
    LOGO: "Logga in",
    MARVELKLUBBEN: "Marvelklubben",
    MARVELKLUBBEN_NUMBER: "Marvelklubben nummer",
    MARVELKLUBBEN_NUMBER_DB: "Marvelklubben nummer (marvelklubben_number)",
    MENU: "Meny",
    MISCELLANEOUS: "Övrigt",
    MY_COLLECTION: "Min samling",
    MY_TITLES: "Mina titlar",
    MY_USER_PAGE: "Min sida",
    MY_WEBSITE: "Min hemsida",
    NAME: "Namn",
    NAME_DB: "Namn (name)",
    NEXT: "Nästa",
    NUMBER: "Nummer",
    NUMBER_DB: "Nummer (number)",
    NO_DATA_AVAILABLE: "Det finns inget att visa!",
    NO_USER_AVAILABLE: "Denna användare har ingen publik profil!",
    OPEN: "Öppna",
    ON_COMICS_ORG: "på Comics.org",
    PASSWORD: "Lösenord",
    NEW_PASSWORD: "Nytt lösenord",
    PASSWORD_CONFIRM: "Bekräfta lösenord",
    PAUSE: "Pausa",
    PREVIOUS: "Tidigare",
    PROFILE_IMAGE: "Profilbild",
    PUBLISHERS: "Förlag",
    PUBLISHER_DB: "Förlag (publisher)",
    CHOOSE_PUBLISHER_FOR_ISSUE: "Välj förlag för dina publikationer",
    RELEASE_LATEST: "Senaste releasen",
    RELEASE_PREVIOUS: "Föregående releaser",
    RELEASE_FUTURE: "Kommande funktionalitet",
    RESET: "Rensa",
    RESET_FILTER: "Rensa alla filter",
    RESET_FORM: "Rensa formulär",
    RESET_PASSWORD: "Ändra lösenord",
    SAVE: "Spara",
    SEARCH: "Sök",
    SEE_ALL_PUBLISHERS: "Se alla förlag",
    SEE_ALL_TITLES: "Se alla titlar",
    SEE_ALL_USERS: "Se alla användare",
    SEND: "Skicka",
    SERIEWIKIN_FOR: "Seriewikin för",
    SETTINGS: "Inställningar",
    SETTINGS_CREDENTIALS: "Inloggningsuppgifter",
    SHOW_ALL_ISSUES: "Visa alla publikationer",
    SHOW_MISSING_ISSUES: "Visa endast saknade publikationer",
    SHOW_ORIGINAL_IMAGE: "Visa originalbild",
    SIGN_OUT: "Logga ut",
    SIGN_UP_SUCCESS: "Registreringen lyckades!",
    SKIP_LINK_TEXT: "Gå direkt till innehåll",
    SORT_REVERSE: "Omvänd ordning",
    SORT_CHOSE: "Välj sortering",
    SORT_9_0: "Sortera 9 till 0",
    SORT_0_9: "Sortera 0 till 9",
    SORT_A_Z: "Sortera A till Ö",
    SORT_Z_A: "Sortera Ö till A",
    SOURCE_COMICS: "Källor (Comics.org)",
    SOURCE_DB: "Källor (source)",
    SOURCE_EXAMPLE: "EXEMPEL: Titel #1 (år) - https://comics.org/issue/12345; Amazing Spiderman #225 (1998) - https://comics.org/issue/23543254",
    START: "Starta",
    START_YEAR: "Startår",
    START_YEAR_DB: "Startår (start_year)",
    SVENSKA_MARVELSAMLARE: "Svenska Marvelsamlare",
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
    COMICS_ORG_URL: "Länk till Comics.org",
    COMICS_ORG_URL_DB: "Länk till Comics.org (comics_org_url)",
    YEAR: "År",
    YEAR_DB: "År (year)"
}

export const TEXTS = {
    ADMIN_LEAD: "Här kan du som är Admin lägga in och redigera data i databasen.",
    ADMIN_INFO: "När all annan info är klar - Ladda upp bilden. Så blir det lätt att få översikt över vilka objekt som behöver mer content. För frågor och instruktioner - maila Super-Admin.",
    ADMIN_INFO_2: "För frågor, support och förslag på kommande funktioner - maila Super-Admin.",
    ADMIN_ISSUE_LEAD: "Här kan du redigera information om publikationen och lägga till en bild (framsida).",
    ADMIN_ISSUE_TEXT: "Hämta ner bild från titelns cover gallery på Grand Comics Database (large). Ladda sedan upp den. Här kan du även ange om publikationen ingår i Marvelklubben eller inte, samt ange numrering.",
    ADMIN_PUBLISHER_LEAD: "Här kan du redigera information om förlaget och lägga till en bild (logotyp).",
    ADMIN_TITLE_LEAD: "Här kan du redigera information om titeln. Du kan lägga till en bild (logotyp), samt även publikationer. Publikationer kan läggas till en och en, eller i bulk.",
    ALERT_HOME_NAME_INFO: "Under inställningar kan du redigera din personliga information och lägga in en profilbild. Här väljer du också om din personliga profilsida ska vara publik.",
    ALERT_HOME_IS_PUBLIC_INFO: "Under inställningar kan du ställa in om din personliga profilsida ska vara publik.",
    ALWAYS_AVAILABLE: "Perfekt att använda när du är ute på fältet och letar tidningar.",
    COLLECTING_TITLE_100: "Grattis! Du har samlat 100% av denna titel.",
    COLLECTING_TITLE_TEXT_1: "Du har samlat",
    ADDING_TITLE_TEXT_1: "Vi har lagt in totalt",
    COLLECTING_TITLE_TEXT_2: "% av denna titel.",
    ADDING_TITLE_TEXT_2: "% av alla titlar i databasen.",
    CONSENT: "Svenska Marvelsamlare är måna om att skydda dina personliga uppgifter. När du loggar in, eller registrerar dig, bekräftar och godkänner du att vi endast använder denna information, och eventuella cookies, för att administrera ditt konto och tillhandahålla de tjänster du förväntar dig av oss.",
    DEMO_TEXT_1: "Här visar vi exempel på senast tillagd funktionalitet, saker som är på gång och saker som vi funderar på att implementera i framtiden.",
    DEMO_TEXT_2: "Sök / filtrera bland publikationerna. Fler titlar läggs till löpande. För komplettisten kommer vi även lägga in mer obskyra publikationer där marvelfigurer figurerar som hastigast.",
    DEMO_TEXT_3: "Välj titlar att börja samla på.",
    DEMO_TEXT_4: "När du valt att börja samla på en titel kan du lägga till publikationer i samlingen.",
    DEMO_TEXT_5: "På publikationens sida kan du bland annat ange skickgradering för ditt exemplar.",
    DEMO_TEXT_6: "Få översikt över din samling via kontrollpanelen.",
    DEMO_TEXT_7: "På förlagets sida ser du alla dess publikationer.",
    DO_YOU_COLLECT: "Samlar du på svenska marveltidningar?",
    AUTO_GENERATE_ISSUES_INFO: "Genererar automatiskt publikationer för varje år. Baserat på startår till slutår och totala antalet publikationer. Välj förlag ovanför.",
    AUTO_GENERATE_ISSUES_CHOSEN_PUBLISHER: "Du har valt förlaget ",
    AUTO_GENERATE_ISSUES_NO_CHOICE: "Du har inte valt något förlag än!",
    DELETE_ALL_ISSUES_INFO: "Tar bort alla publikationer för denna titel.",
    CHANGE_PASSWORD_SEND_INFO: "Vi skickar information för att bekräfta återställning av lösenord.",
    CHANGE_PASSWORD_INFO: "OBS! Lösenordet ändras direkt - vi skickar ingen information för att bekräfta återställning av lösenord.",
    CHANGE_EMAIL_SEND_INFO: "Vi skickar information för att bekräfta ändring av e-postadress.",
    FOOTER_INFO_TEXT_1: "Denna sajt innehåller bilder och information vars copyright ägs av",
    FOOTER_INFO_TEXT_2: "och används i enlighet med Fair use doctrine of the United States.",
    FOOTER_INFO_TEXT_3: "Information har också hämtats från följande källor:",
    GRADE_TEXT_2: "Mer information om skickgradering hittar du hos",
    MANAGE_YOUR_COLLECTION: "Övervaka och administrera din samling.",
    MARVELKLUBBEN_LEAD: "En överblick över alla publikationer som ingick i Marvelklubben.",
    MARVELKLUBBEN_TEXT_1: "Du måste lägga börja samla på titeln för att kunna lägga till publikationen i din samling.",
    MARVELKLUBBEN_TEXT_2: "Mer information om Marvelklubben hittar du på",
    NEW_TITLES: "Nya titlar och funktioner läggs till regelbundet.",
    SETTINGS_LEAD: "Här kan du ställa in profilbild, ändra din information samt ändra dina inloggningsuppgifter.",
    SETTINGS_INFO: "För frågor - kontakta Super-Admin.",
    SETTINGS_CREDENTIALS: "Ändra din e-postadress (användarnamn) eller lösenord här.",
    SETTINGS_RESET_PASSWORD: "Klicka på knappen så skickas instruktioner för att återställa eller ändra lösenordet till din e-postadress.",
    SHOWING_LATEST_PUBLISHERS: "Visar de senast inlagda förlagen från databasen.",
    SIGN_UP_SUCCESS_TEXT: "Visar de senast inlagda förlagen från databasen.",
    SHOWING_LATEST_TITLES: "Visar de senast inlagda titlarna från databasen.",
    TOTAL_TITLE_COUNT: "Totalt antal inlagda titlar:",
    LATEST_TITLES: "Senast inlagda titlar:",
    TOTAL_ISSUE_COUNT: "Totalt antal inlagda publikationer:",
    LATEST_ISSUES: "Senast inlagda publikationer:",
    SHOWING_LATEST_USERS: "Visar de senast inlagda användarna från databasen.",
    TOTAL_PUBLISHED: "Totalt gavs det ut",
    TOTAL_PUBLISHED_PUBLICATION: "publikation.",
    TOTAL_PUBLISHED_PUBLICATIONS: "publikationer.",
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
    UTILS: "utils",
    USERS: "users"
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

export const ALERT_VARIANTS = {
    1: {
        variant: "info",
        icon: <Icon icon={faCircleInfo} className={"fa-2xl me-3"}/>
    },
    2: {
        variant: "success",
        icon: <Icon icon={faHeart} className={"fa-2xl me-3"}/>
    },
    3: {
        variant: "warning",
        icon: <Icon icon={faSealExclamation} className={"fa-2xl me-3"}/>
    },
    4: {
        variant: "danger",
        icon: <Icon icon={faShieldExclamation} className={"fa-2xl me-3"}/>
    },
    5: {
        variant: "danger",
        icon: <Icon icon={faShieldExclamation} className={"fa-2xl me-3"}/>
    }
}

export const VARIANT_MAPPER = {
    info: 1,
    success: 2,
    warning: 3,
    danger: 4
}

export const DEFAULT_SEARCH_PARAMS_FORMATS = {
    query: "",
    comic: false,
    comiclarge: false,
    album: false,
    pocket: false,
    hardcover: false,
    special: false
}

export const STATISTICS = {
    TOTAL_TITLES_COUNT: 143
}

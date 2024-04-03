import React from "react";
import {dangerIconDuoTone, Icon, infoIconDuoTone, statusIconSuccessDuoTone, warningIconDuoTone} from "../../components/icons";

// 491 rader
export const LABELS_AND_HEADINGS = {
    ADD_ISSUES: "Lägg till publikationer",
    ADD_ISSUE_WANTED: "Markera som efterlyst",
    REMOVE_ISSUE_WANTED: "Ta bort efterlysning",
    ADD_ISSUE_UPGRADE: "Markera behov av uppgradering",
    REMOVE_ISSUE_UPGRADE: "Ta bort behov av uppgradering",
    ADD_ISSUE_FOR: "Lägg till enstaka publikation för",
    ADMINISTRATE_MESSAGE: "Administrera meddelandet -",
    DELETE_GRADE: "Ta bort skickgradering för",
    AUTO_GENERATE_ISSUES_FOR: "Lägg till publikationer för",
    COLLECT_TITLE_START: "Börja samla på titeln",
    COLLECT_TITLE_STOP: "Sluta samla på titeln",
    COLLECT_ISSUE_START: "Lägg till",
    COLLECT_ISSUE_START_2: "i samlingen.",
    COLLECT_ISSUE_STOP: "Ta bort",
    COLLECT_ISSUE_STOP_2: "från samlingen.",
    COLLECTING_ADD_ALL: "Lägg till alla",
    COLLECTING_CHECK_GRADING_STATUS_OPEN_1: "Kontrollera om någon publikation av",
    COLLECTING_CHECK_GRADING_STATUS_OPEN_2: "behöver skickgradering.",
    COLLECTING_CHECK_GRADING_STATUS_CLOSE: "Lägg till alla",
    COLLECTING_REMOVE_ALL: "Töm samlingen",
    COPY: "exemplar",
    COPY_VALUE: "Värde:",
    COPY_NOT_VALUED: "(Värden ej inlagda för denna titel)",
    COPY_VALUE_SEK: "kr",
    DELETE_ALL_ISSUES_FOR: "Ta bort alla publikationer för",
    NEW_EMAIL: "Ny e-postadress",
    CONFIRM_NEW_EMAIL: "Bekräfta ny e-postadress",
    EMAIL_SEND: "Ange din e-postadress",
    CHANGE_PASSWORD: "Ändra lösenord",
    FILTER_NUMBER_TITLE_OR_YEAR: "Filtrera på nummer, titel eller årtal",
    FILTER_TITLE_OR_YEAR: "Filtrera på titel eller årtal",
    FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE: "Filtrera på titel, förlag, årtal eller källmaterial",
    FILTER_NAME: "Filtrera på namn",
    FILTER_PUBLISHER_NAME: "Filtrera på förlagets namn",
    FILTER_NAME_OR_ID: "Filtrera på namn eller id",
    FIND_TITLES: "Hitta titlar",
    FORMAT: "Format",
    FORMAT_DB: "Format (format)",
    FORGOT_PASSWORD: "Glömt lösenordet?",
    GENERATE_ISSUES: "Lägg till publikationer",
    GENERATING_ISSUES: "Lägger till publikationer",
    GO_TO: "Gå till",
    GRADE: "Skickgradering",
    INFORMATION_ABOUT: "Information om",
    INFORMATION_MISSING: "Information saknas.",
    MAKE_PUBLIC: "Gör din profilsida och information publik",
    GRADE_VALUES_FOR: "Skickvärdering för",
    MISSING_ISSUES: "Saknade publikationer",
    WANTED_ISSUES: "Efterlysta publikationer",
    NO_WANTED_ISSUES: "Du har inga efterlysta publikationer.",
    NO_WANTED_ISSUES_USER: "Inga efterlysta publikationer.",
    UPGRADE_ISSUES: "Publikationer i behov av uppgradering",
    NO_UPGRADE_ISSUES: "Du har inga publikationer i behov av uppgradering.",
    MENU: "Meny",
    MESSAGE_TITLE_SUFFIX_FOR: "för",
    MESSAGE_TITLE_SUFFIX_FOR_TITLE: "för titeln",
    MESSAGE_USE_THIS_OBJECT: "Bifoga information om detta objekt",
    ADD_MESSAGE_PLACEHOLDER: "Skriv ett meddelande här",
    MESSAGES_RECEIVED: "Inkomna meddelanden",
    MESSAGE_GLOBAL: "Globalt meddelande",
    MESSAGES_GLOBAL: "Globala meddelanden",
    MESSAGES_GLOBAL_SEND: "Skicka globalt meddelande",
    MESSAGES_FROM_ADMIN: "Meddelanden från Admin",
    MESSAGES_MARK_AS_READ: "Markera som läst",
    MESSAGES_MARK_AS_UNREAD: "Markera som oläst",
    MESSAGES_MARK_AS_ACTIVE: "Markera som aktivt",
    MESSAGES_MARK_AS_INACTIVE: "Markera som inaktivt",
    MESSAGES_MARK_AS_TODO: "Åtgärd krävs",
    MESSAGE_ADMIN_CREATE: "Skicka ett meddelande till Admin",
    CALCULATING_VALUATION: "Beräknar ny värdering!",
    OPEN: "Öppna",
    ON_COMICS_ORG: "på Comics.org",
    PASSWORD: "Lösenord",
    NEW_PASSWORD: "Nytt lösenord",
    PASSWORD_CONFIRM: "Bekräfta lösenord",
    PAUSE: "Pausa",
    YOUR_INFORMATION: "Din information",
    PLACEHOLDER_MAIL: "namn@posten.se",
    PREVIOUS: "Tidigare",
    PROFILE_IMAGE: "Profilbild",
    PUBLISHERS: "Förlag",
    PUBLISHER_DB: "Förlag (publisher)",
    CHOOSE_PUBLISHER_FOR_ISSUE: "Välj förlag för dina publikationer",
    RELEASE_LATEST: "Senaste releasen",
    RELEASE_PREVIOUS: "Föregående releaser",
    RELEASE_FUTURE: "Kommande funktionalitet",
    REMOVE: "Ta bort",
    REMOVE_ALL_VALUATION_VALUES_FOR_USER: "Ta bort alla sparade värderingar för användaren",
    RESET: "Rensa",
    RESET_FILTER: "Rensa alla filter",
    RESET_FORM: "Rensa formulär",
    RESET_PASSWORD: "Ändra lösenord",
    SAVE: "Spara",
    SEARCH: "Sök",
    SEE_ALL_PUBLISHERS: "Se alla förlag",
    SEE_ALL_MESSAGES: "Se alla meddelanden",
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
    STATUS_404: "404",
    SVENSKA_MARVELSAMLARE: "Svenska Marvelsamlare",
    SVENSKA_MARVELSAMLARE_SHORT: "SMS",
    TITLE: "Titel",
    TITLES: "Titlar",
    TITLE_DB: "Titel (title)",
    TOPIC: "Ämne",
    TOTAL_ISSUES: "Totalt antal utgivna publikationer",
    TOTAL_ISSUES_DB: "Totalt antal publikationer (total_issues)",
    UPDATE: "Uppdatera",
    UPDATE_DEFAULT_VALUES: "Populera publikationer med grundläggande värden - OBS! alla publikationer måste ha fått sin skickgradering",
    RELEASE_DATE: "Releasedatum",
    UPLOAD_NEW_IMAGE: "Ladda upp en ny bild",
    UPLOAD_IMAGE: "Ladda upp en bild",
    UPLOADING_IMAGE: "Laddar upp en bild",
    USERS: "Användare",
    UTILS: "Verktyg, knappar och reglage",
    VALUE: "Värde",
    VALUATION: "Värdering",
    VALUATION_CALCULATE: "Beräkna ny värdering",
    VALUATION_CALCULATE_MESSAGE_1: "Ingen värdeförändring - behöver inte spara ny värdering.",
    VALUATION_CALCULATE_MESSAGE_2: "Inga värderingar funna - sparar ny värdering.",
    VALUATION_CALCULATE_MESSAGE_3: "För att vi ska kunna beräkna en värdering måste du lägga in skickgraderingar på dina publikationer.",
    WELCOME_TEXT_1: "Hej",
    WELCOME_TEXT_2: "och välkommen till Svenska Marvelsamlare!"
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
    COLLECTING_CHECK_GRADING_STATUS_NO_ISSUES: "Du har inte lagt in några publikationer i samlingen.",
    COLLECT_TITLE_STOP_REMOVE: "Du måste tömma samlingen på publikationer innan du kan sluta samla på den här titeln.",
    CONSENT: "Svenska Marvelsamlare är måna om att skydda dina personliga uppgifter. När du loggar in, eller registrerar dig, bekräftar och godkänner du att vi endast använder denna information, och eventuella cookies, för att administrera ditt konto och tillhandahålla de tjänster du förväntar dig av oss.",
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
    GRADE_TEXT_2: "Ange en skickgradering för varje exemplar du har. Mer information om skickgradering, och mer exakt värdering, hittar du hos",
    GRADE_TEXT_3: "Seriekatalogen",
    GRADE_TEXT_4: "Använd gärna meddelandefunktionen för att meddela Admin om värden behöver uppdateras.",
    GRADE_IS_VALUED_LEAD: "Här kan du markera att alla publikationer på den här titeln har fått rätt värden.",
    GRADE_ISSUE_IS_VALUED_TEXT: "Publikationen har fått grundvärden.",
    GRADE_ADD_VALUE_TEXT: "Grundvärden för denna publikation saknas. Tryck på knappen för att lägga till.",
    GRADE_IS_NOT_VALUED: "Vissa publikationer saknar värden.",
    GRADE_VALUED: "Har värden",
    GRADE_NOT_VALUED: "Saknar värden",
    GRADE_MISSING: "Det verkar som att några publikationer saknar skickgradering.",
    GRADE_FOUND: "Alla publikationer har skickgradering.",
    GRADE_TITLE_IS_VALUED: "Alla publikationer har fått rätt värden.",
    INFO_TEXT_1: "Här hittar du information om aktuella releaser och kommande funktionalitet.",
    MANAGE_YOUR_COLLECTION: "Övervaka och administrera din samling.",
    MARVELKLUBBEN_LEAD: "En överblick över alla publikationer som ingick i Marvelklubben.",
    MARVELKLUBBEN_TEXT_1: "Du måste lägga börja samla på titeln för att kunna lägga till publikationen i din samling.",
    MARVELKLUBBEN_TEXT_2: "Mer information om Marvelklubben hittar du på",
    MESSAGE_WAS_SENT: "Meddelandet skickades",
    MESSAGE_LINK: "Länk till bifogat objekt",
    MESSAGE_LINK_SENDER: "Länk till anmälare",
    MESSAGES_ADMIN_TEXT_1: "Här kan du hantera meddelanden.",
    MESSAGES_ADMIN_TEXT_2: "Du kan bland annat sända ut globala meddelanden som visas för alla användare. Samt administrera inkomna meddelanden.",
    NEW_TITLES: "Nya titlar och funktioner läggs till regelbundet.",
    SETTINGS_LEAD: "Här kan du ställa in profilbild, ändra din information samt ändra dina inloggningsuppgifter.",
    SETTINGS_INFO: "För frågor - kontakta Super-Admin.",
    SETTINGS_CREDENTIALS: "Ändra din e-postadress (användarnamn) eller lösenord här.",
    SETTINGS_RESET_PASSWORD: "Klicka på knappen så skickas instruktioner för att återställa eller ändra lösenordet till din e-postadress.",
    SHOWING_LATEST_PUBLISHERS: "Visar de senast inlagda förlagen från databasen.",
    SHOWING_LATEST_MESSAGES: "Visar senast inkomna meddelanden från användare, samt eventuella globala meddelanden från Admin.",
    SHOWING: "Visar",
    SHOWING_OF: "av",
    SIGN_UP_SUCCESS_TEXT: "Visar de senast inlagda förlagen från databasen.",
    SHOWING_LATEST_TITLES: "Visar de senast inlagda titlarna från databasen. För att lägga till en ny titel:",
    SHOWING_LATEST_TITLES_STEP_1: "Skapa titel",
    SHOWING_LATEST_TITLES_STEP_2: "Lägg till publikationer",
    SHOWING_LATEST_TITLES_STEP_3: "För varje publikation - lägg till skickgradering",
    SHOWING_LATEST_TITLES_STEP_4: "På titeln - populera alla publikationer med grundvärden för skickgradering",
    STATUS_404_ROUTE: "Hittade tyvärr ingen route för",
    TOTAL_TITLE_COUNT: "Totalt antal inlagda titlar:",
    LATEST_TITLES: "Senast inlagda titlar:",
    TOTAL_ISSUE_COUNT: "Totalt antal inlagda publikationer:",
    LATEST_ISSUES: "Senast inlagda publikationer:",
    SHOWING_LATEST_USERS: "Visar de senast uppdaterade användarna från databasen.",
    SHOWING_USERS: "Här kan du se alla registrerade användare.",
    USERS_COUNT_TEXT_1: "Totalt finns det ",
    USERS_COUNT_TEXT_2: "användare.",
    TOTAL_PUBLISHED: "Totalt gavs det ut",
    TOTAL_PUBLISHED_PUBLICATION: "publikation som kan vara intressant för marvelsamlare.",
    TOTAL_PUBLISHED_PUBLICATIONS: "publikationer som kan vara intressanta för marvelsamlare.",
    UTILS: "Speciella funktioner för förbättrade användarupplevelser.",
    UTILS_UPDATE_RELEASE_DATE: "Uppdatera datum för senaste release till dagens datum."
}

export const ROUTES = {
    DEFAULT: "/",
    SUCCESS: "/success",
    PROFILE: "/profile",
    CHANGE_PASSWORD: "/change-password",
    TITLES: "/titles",
    TITLE_ID: "/titles/:id",
    ISSUES: "/issues",
    GRADE_VALUES: "/grade-values",
    ISSUE_ID: "/issues/:id",
    PUBLISHERS: "/publishers",
    MARVELKLUBBEN: "/marvelklubben",
    PUBLISHER_ID: "/publishers/:id",
    USERS: "/users",
    USER_ID: "/users/:id",
    DASHBOARD: {
        ROOT: "dashboard",
        OVERVIEW: "overview",
        PATH_OVERVIEW: "/dashboard/overview",
        MY_TITLES: "my-titles",
        PATH_MY_TITLES: "/dashboard/my-titles",
        COLLECTIONS: "collections",
        PATH_COLLECTIONS: "/dashboard/collections",
        VALUATION: "valuation",
        PATH_VALUATION: "/dashboard/valuation"
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
        MESSAGES: "/admin/messages/",
        MESSAGE_ID: "/admin/messages/:id"
    }
}

export const FILETYPES = {
    AVATAR_IMAGE: "avatar-img-",
    ISSUE_IMAGE: "issue-img-",
    PUBLISHER_IMAGE: "publisher-img-",
    TITLE_IMAGE: "title-img-",
}

export const ALERT_VARIANTS = {
    1: {
        variant: "info",
        icon: <Icon icon={infoIconDuoTone} className={"fa-2xl me-3"}/>
    },
    2: {
        variant: "success",
        icon: <Icon icon={statusIconSuccessDuoTone} className={"fa-2xl me-3"}/>
    },
    3: {
        variant: "warning",
        icon: <Icon icon={warningIconDuoTone} className={"fa-2xl me-3"}/>
    },
    4: {
        variant: "danger",
        icon: <Icon icon={dangerIconDuoTone} className={"fa-2xl me-3"}/>
    },
    5: {
        variant: "danger",
        icon: <Icon icon={dangerIconDuoTone} className={"fa-2xl me-3"}/>
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
    TOTAL_TITLES_COUNT: 150
}

export const CONFIG = {
    TIMEOUT_XXL: 2000,
    TIMEOUT_XL: 1000,
    TIMEOUT_LG: 500,
    TIMEOUT_MD: 400,
    TIMEOUT_SM: 200,
    MAX_VALUATION_VALUES: 20
}

export const GRADE_VARIANTS = {
    0.5: {
        text: "PR",
        displayName: "Poor",
        color: "100"
    },
    1: {
        text: "FR",
        displayName: "Fair",
        color: "100"
    },
    1.5: {
        text: "FR/GD",
        displayName: "Fair / Good",
        color: "100"
    },
    2: {
        text: "GD",
        displayName: "Good",
        color: "200"
    },
    2.5: {
        text: "GD+",
        displayName: "Good (+)",
        color: "200"
    },
    3: {
        text: "GD/VG",
        displayName: "Good / Very good",
        color: "200"
    },
    3.5: {
        text: "VG-",
        displayName: "Very good (-)",
        color: "300"
    },
    4: {
        text: "VG",
        displayName: "Very good",
        color: "300"
    },
    4.5: {
        text: "VG+",
        displayName: "Very good (+)",
        color: "300"
    },
    5: {
        text: "VG/FN",
        displayName: "Very good / Fine",
        color: "400"
    },
    5.5: {
        text: "FN-",
        displayName: "Fine (-)",
        color: "500"
    },
    6: {
        text: "FN",
        displayName: "Fine",
        color: "600"
    },
    6.5: {
        text: "FN+",
        displayName: "Fine (+)",
        color: "700"
    },
    7: {
        text: "FN/VF",
        displayName: "Fine / Very fine",
        color: "700"
    },
    7.5: {
        text: "VF-",
        displayName: "Very fine (-)",
        color: "800"
    },
    8: {
        text: "VF",
        displayName: "Very fine",
        color: "800"
    },
    8.5: {
        text: "VF+",
        displayName: "Very fine (+)",
        color: "800"
    },
    9: {
        text: "VF/NM",
        displayName: "Very fine / Near mint",
        color: "0"
    },
    9.2: {
        text: "NM-",
        displayName: "Near mint (-)",
        color: "0"
    },
    9.4: {
        text: "NM",
        displayName: "Near mint",
        color: "0"
    },
    9.6: {
        text: "NM+",
        displayName: "Near mint (+)",
        color: "0"
    },
    9.8: {
        text: "NM/M",
        displayName: "Near mint / mint",
        color: "0"
    },
    9.9: {
        text: "M",
        displayName: "Mint",
        color: "0"
    }
}

export const GRADE_RADIOS = [
    {name: 'PR', value: 0.5},
    {name: 'FR', value: 1.0},
    {name: 'FR/GD', value: 1.5},
    {name: 'GD', value: 2.0},
    {name: 'GD/VG', value: 3.0},
    {name: 'VG-', value: 3.5},
    {name: 'VG', value: 4.0},
    {name: 'VG+', value: 4.5},
    {name: 'VG/FN', value: 5.0},
    {name: 'FN-', value: 5.5},
    {name: 'FN', value: 6.0},
    {name: 'FN+', value: 6.5},
    {name: 'FN/VF', value: 7.0},
    {name: 'VF-', value: 7.5},
    {name: 'VF', value: 8.0},
    {name: 'VF+', value: 8.5},
    {name: 'VF/NM', value: 9.0},
    {name: 'NM-', value: 9.2},
    {name: 'NM', value: 9.4},
    {name: 'NM+', value: 9.6},
    {name: 'NM/M', value: 9.8},
    {name: 'M', value: 9.9},
];

export const SK_GRADE_RADIO_VALUES = [
    2.0, 4.0, 6.0, 8.0, 9.4
]

export const SK_GRADE_RADIO_NAMES = [
    "GD", "VG", "FN", "VF", "NM"
]

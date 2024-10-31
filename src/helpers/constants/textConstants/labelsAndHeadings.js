// Labels - used in buttons, forms and such
// TODO When moved from configConstants:
//  Move texts and messages to this same file? index.js rename???
//  COMMON -> Example: abort, save, deleting, close etc.
//  COMMON.FUNCTION -> Example: COMMON.EMAIL, COMMON.PASSWORD - Similar functions - Remove SECTIONS
//  Similar for texts - some labels should be texts! ...1 and ...2 should be texts
//  Also - better naming
export const LABELS = {
    COMMON: {
        ABORT: "Avbryt",
        ADD: "Lägg till",
        ADD_MESSAGE_PLACEHOLDER: "Skriv ett meddelande här",
        ADMIN: "Admin",
        ADMINISTRATE_MESSAGE: "Administrera meddelandet -",
        ADD_ADMIN_1: "Gör ",
        ADD_ADMIN_2: " till admin",
        BACK: "Tillbaka",
        BACK_TO: "Tillbaka till",
        BACK_TO_TOP: "Tillbaka till toppen",
        BREADCRUMB: "Brödsmula",
        CHANGE_PASSWORD: "Ändra lösenord",
        CHOOSE: "--- Välj ---",
        CLOSE: "Stäng",
        CONFIRM_NEW_EMAIL: "Bekräfta ny e-postadress",
        CONTACT: "Kontakt",
        COPY: "exemplar",
        MORE_CONTENT: "Innehåll",
        CREATE_ACCOUNT: "Registrera dig",
        CREATED_AT: "Inlagd",
        DATE: "Datum",
        DELETE: "Ta bort",
        DELETE_IMAGE: "Ta bort bild",
        DELETING: "Tar bort",
        DESCRIPTION_DB: "Beskrivning (description)",
        DO_FILTER: "Filtrera",
        EDIT: "Redigera",
        EDIT_INFORMATION: "Redigera information",
        EMAIL: "E-postadress",
        EMAIL_SEND: "Ange din e-postadress",
        FORGOT_PASSWORD: "Glömt lösenordet?",
        GO_TO: "Gå till",
        HOME: "Hem",
        ID: "Id",
        IMAGE: "Bild",
        INFORMATION: "Information",
        INFORMATION_MISSING: "Information saknas.",
        LINKS: "Länkar",
        LIST_VIEW_GRADE_VALUE_HIDE: "Dölj skickvärdering",
        LIST_VIEW_GRADE_VALUE_SHOW: "Visa skickvärdering",
        LIST_VIEW_GRID_SHOW: "Visa som grid",
        LIST_VIEW_LIST_SHOW: "Visa som lista",
        LATEST_LOG_IN: "Senast inloggad:",
        LOG_IN: "Logga in",
        MESSAGE_ADMIN_CREATE: "Skicka ett meddelande till Admin",
        MESSAGES_FROM_ADMIN: "Meddelanden från Admin",
        MESSAGES_MARK_AS_READ: "Markera som läst",
        MESSAGES_MARK_AS_UNREAD: "Markera som oläst",
        MESSAGES_MARK_AS_ACTIVE: "Markera som aktivt",
        MESSAGES_MARK_AS_INACTIVE: "Markera som inaktivt",
        MESSAGES_MARK_AS_TODO: "Åtgärd krävs",
        MESSAGE_USER_CREATE: "Skicka ett meddelande till",
        MESSAGE_USE_THIS_OBJECT: "Bifoga information om detta objekt",
        MESSAGE_TITLE_SUFFIX_FOR: "för",
        MESSAGE_TITLE_SUFFIX_FOR_TITLE: "för titeln",
        NAME_DB: "Namn (name)",
        NEW_EMAIL: "Ny e-postadress",
        NEXT: "Nästa",
        NUMBER_DB: "Nummer (number)",
        NEW_PASSWORD: "Nytt lösenord",
        PASSWORD: "Lösenord",
        PASSWORD_CONFIRM: "Bekräfta lösenord",
        PAUSE: "Pausa",
        PLACEHOLDER_MAIL: "namn@posten.se",
        PREVIOUS: "Tidigare",
        PROFILE_IMAGE: "Profilbild",
        RELEASE_DATE: "Releasedatum",
        REMOVE: "Ta bort",
        RESET: "Rensa",
        RESET_FILTER: "Rensa alla filter",
        RESET_FORM: "Rensa formulär",
        RESET_PASSWORD: "Ändra lösenord",
        SAVE: "Spara",
        SEARCH: "Sök",
        SEND: "Skicka",
        SETTINGS: "Inställningar",
        SETTINGS_CREDENTIALS: "Inloggningsuppgifter",
        SHOW_MORE: "Visa mer",
        SHOW_LESS: "Visa mindre",
        SIGN_UP_SUCCESS: "Registreringen lyckades!",
        SVENSKA_MARVELSAMLARE: "Svenska Marvelsamlare",
        SVENSKA_MARVELSAMLARE_SHORT: "SMS",
        TOPIC: "Ämne",
        UPDATE: "Uppdatera",
        UPLOAD_IMAGE: "Ladda upp en bild",
        UPLOADING_IMAGE: "Laddar upp en bild",
        UTILS: "Verktyg, knappar och reglage",
        VALUATION: "Värdering",
        VALUATION_CALCULATE: "Beräkna ny värdering",
        VALUE: "Värde",
        WANTED_ISSUES: "Efterlysta publikationer",
        NO_WANTED_ISSUES: "Du har inga efterlysta publikationer.",
        NO_WANTED_ISSUES_USER: "Inga efterlysta publikationer.",
        NO_UPGRADE_ISSUES_USER: "Inga publikationer som behöver uppgradering.",
        WEBSITE: "Webbplats",
        WIKI_URL_DB: "Länk till Seriewikin (wiki_url)",
        YEAR_DB: "År (year)",
        YOUR_INFORMATION: "Din information",
    },
    SECTIONS: {
        DASHBOARD: {
            NAME: "Kontrollpanel",
            LINKS: {
                MY_TITLES: "Kontrollpanel / Mina titlar"
            },
            OVERVIEW: {
                INCOMING_MESSAGES: "Inkomna meddelanden",
                SHORTCUTS: "Genvägar"
            }
        },
        GRADES: {
            GRADE: "Skickgradering",
            ADD_GRADE: "Lägg till skickgradering",
            GRADE_VALUE: "Skickvärdering",
            GRADE_VALUES: "Skickvärderingar",
            GRADE_VALUES_FOR: "Skickvärdering för",
            ADD_GRADE_VALUE_VALUES: "Lägg till skickvärden för publikationerna",
            EDIT_GRADE_VALUE_VALUES: "Redigera skickvärden",
        },
        ISSUES: {
            ADD_ISSUE_UPGRADE: "Markera behov av uppgradering",
            ALL_ISSUES: "Alla publikationer",
            IS_DOUBLE_DB: "Dubbelnummer (is_double)",
            IS_VARIANT_DB: "Variant (is_variant) - Används även för undertitel",
            ISSUES: "Publikationer",
            NO_UPGRADE_ISSUES: "Du har inga publikationer i behov av uppgradering.",
            REMOVE_ISSUE_UPGRADE: "Ta bort behov av uppgradering",
            SOURCE_DB: "Källor (source)",
            UPGRADE_ISSUES: "Publikationer i behov av uppgradering",
            VARIANT_SUFFIX_DB: "Variant suffix (variant_suffix)",
        },
        MARVELKLUBBEN: {
            IS_MARVELKLUBBEN_DB: "Ingår i marvelklubben (is_marvelklubben)",
            MARVELKLUBBEN: "Marvelklubben",
            MARVELKLUBBEN_NUMBER_DB: "Marvelklubben nummer (marvelklubben_number)",
        },
        MESSAGES: {
            ALL_MESSAGES: "Alla meddelanden",
            MESSAGE: "Meddelande",
            MESSAGES: "Meddelanden",
            MESSAGE_CLOSE: "Stäng meddelande",
            MESSAGE_SHOW: "Meddelande",
            MESSAGE_TITLE: "Rubrik",
        },
        PUBLISHERS: {
            ADD_PUBLISHER: "Lägg till förlag",
            ALL_PUBLISHERS: "Alla förlag",
            COUNTRY_DB: "Utgivningsland (country)",
            PUBLISHERS: "Förlag",
            PUBLISHER_DB: "Förlag (publisher)",
        },
        TITLES: {
            ADD_TITLE: "Lägg till titel",
            ALL_TITLES: "Alla titlar",
            COMICS_ORG_URL_DB: "Länk till Comics.org (comics_org_url)",
            START_YEAR_DB: "Startår (start_year)",
            END_YEAR_DB: "Slutår (end_year)",
            FORMAT_DB: "Format (format)",
            ON_COMICS_ORG: "på Comics.org",
            SERIEWIKIN_FOR: "Seriewikin för",
            SHOW_ALL_ISSUES: "Visa alla publikationer",
            SHOW_MISSING_ISSUES: "Visa endast saknade publikationer",
            TOTAL_ISSUES_DB: "Totalt antal publikationer (total_issues)",
            TITLE: "Titel",
            TITLES: "Titlar",
            TITLE_DB: "Titel (title)",
        },
        USERS: {
            ALL_USERS: "Alla användare",
            ALLOW_LOCATION_ACCESS: "Tillåt platsåtkomst",
            FIRST_NAME: "Förnamn",
            IS_PUBLIC: "Publik information",
            IS_SUPER_ADMIN: " är super admin.",
            LAST_NAME: "Efternamn",
            MY_WEBSITE: "Min hemsida",
            REMOVE_ADMIN_1: "Ta bort ",
            REMOVE_ADMIN_2: " som admin",
        }
    }
}

export const BREADCRUMB_NAMES = {
    ADD: "Lägg till",
    ADMIN: "Admin",
    DASHBOARD: "Kontrollpanel",
    EDIT: "Redigera",
    GRADE_VALUES: "Skickvärderingar",
    HOME: "Hem",
    ISSUES: "Publikationer",
    MARVELKLUBBEN: "Marvelklubben",
    MESSAGES: "Meddelanden",
    MY_TITLES: "Mina titlar",
    MY_ISSUES: "Mina publikationer",
    COLLECTIONS: "Samlingar",
    MAPS: "Karta",
    OVERVIEW: "Översikt",
    PROFILE: "Inställningar",
    PUBLISHERS: "Alla förlag",
    TITLES: "Alla titlar",
    USERS: "Alla användare",
    VALUATION: "Värdering",
}
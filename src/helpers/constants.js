export const MESSAGES = {
    ERROR: {
        VALIDATION_EMAIL: 'Ange en korrekt e-postadress',
        VALIDATION_EMAIL_EXISTS: 'Försök med en annan e-postadress',
        VALIDATION_PASSWORD: 'Ange ett starkare lösenord - minst 10 tecken',
        VALIDATION_SIGNUP_FORM: 'Något gick fel vid registrering',
        VALIDATION_LOGIN_FORM: 'Något gick fel vid inloggning',
        VALIDATION_UPLOAD_IMAGE: 'Du måste välja en bild för uppladdning',
        VALIDATION_DELETE_IMAGE: 'Något gick fel vid borttagning av bild',
        VALIDATION_UPLOAD: 'Något gick fel vid uppladdning'
    },
    SUCCESS: {
        VALIDATION_EMAIL: 'Det där är en korrekt e-postadress!',
        VALIDATION_PASSWORD: 'Det där är ett starkt lösenord!',
        VALIDATION_DOWNLOAD_IMAGE: 'En bild laddades ned'
    }
}

export const CLASSES = {
    FORM_INPUT_DEFAULT: 'form-control mb-3',
    FORM_INPUT_DISABLED: 'form-control opacity-50 mb-3',
    FORM_INPUT_SUCCESS: 'form-control success',
    FORM_INPUT_ERROR: 'form-control danger',
    SPINNER: 'spinner-border m-2',
    SPINNER_SMALL: 'spinner-border spinner-border-sm m-1',
    SPINNER_GROW: 'spinner-grow m-2',
    SPINNER_GROW_SMALL: 'spinner-grow spinner-grow-sm m-1',
}

export const ROUTES = {
    DEFAULT: '/',
    SUCCESS: '/success',
    SETTINGS: '/settings',
    ADMIN: '/admin',
}

export const LABELS_AND_HEADINGS = {
    ADMIN: 'Admin',
    ADD_TITLE: 'Lägg till ny titel',
    CHANGE_IMAGE: 'Byt bild',
    CLOSE: 'Stäng',
    COMMUNITY: 'Socialt',
    CREATE_ACCOUNT: 'Registrera dig',
    DASHBOARD: 'Kontrollpanel',
    EMAIL: 'E-postadress',
    FIRST_NAME: 'Förnamn',
    FORMAT: 'Format',
    INFORMATION: 'Information',
    LAST_NAME: 'Efternamn',
    LOADING: 'Laddar',
    LOG_IN: 'Logga in',
    MY_COLLECTION: 'Min samling',
    OPEN: 'Öppna',
    PASSWORD: 'Lösenord',
    PROFILE_IMAGE: 'Profilbild',
    SETTINGS: 'Inställningar',
    SIGN_OUT: 'Logga ut',
    START: 'Översikt',
    SVENSKA_MARVELSAMLARE: 'Svenska marvelsamlare',
    SVENSKA_MARVELSAMLARE_SHORT: 'SMS',
    TITLES: 'Titlar',
    UPDATE: 'Uppdatera',
    UPLOAD_NEW_IMAGE: 'Ladda upp en ny bild',
    WEBSITE: 'Webbplats',
    WELCOME: 'Välkommen till Svenska Marvelsamlare!'
}

export const TEXTS = {
    DO_YOU_COLLECT: 'Samlar du på svenska marveltidningar?',
    MANAGE_YOUR_COLLECTION: 'Övervaka och administrera din samling',
    NEW_TITLES: 'Nya titlar och funktioner läggs till regelbundet',
    ALWAYS_AVAILABLE: 'Perfekt att använda när du är ute på fältet och letar tidningar'
}

export const PANES = {
    TITLES: {
        KEY: "titles-pane",
        NAME: "Titlar"
    },OVERVIEW: {
        KEY: "overview-pane",
        NAME: "Översikt"
    },
    OTHER_COLLECTIONS: {
        KEY: "other-collections-pane",
        NAME: "Andra samlingar"
    }
}

export const FORMATS = ['Serietidning', 'Album', 'Pocket', 'Inbunden', 'Specialtidning'];
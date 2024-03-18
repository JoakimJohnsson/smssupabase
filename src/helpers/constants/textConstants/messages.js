// Messages - for information messages
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
        DELETE_GRADES: "Vill du verkligen ta bort grundläggande graderingsvärden för denna publikation?",
        REMOVE_1: "Vill du verkligen sluta samla på ",
        REMOVE_2: "?",
        FROM: " från tabellen ",
        DELETE_ISSUES: "Vill du verkligen ta bort alla publikationer för den här titeln?",
        DELETE_VALUATION_VALUES: "Vill du verkligen ta bort alla värderingar för den här användaren?",
        GENERATE_ISSUES: "Vill du verkligen lägga till publikationer för den här titeln?",
        STOP_COLLECTING: "Vill du verkligen sluta samla på den här titeln? Titeln kommer att tömmas på publikationer.",
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

// Texts - for longer text blocks
export const TEXTS = {
    ADD_ISSUE_WANTED: "Markera som efterlyst",
    ADMIN_TITLE_LEAD: "Här kan du redigera information om titeln. Du kan lägga till en bild (logotyp), samt även publikationer. Publikationer kan läggas till en och en, eller i bulk.",
    ALLOW_LOCATION_ACCESS_PROMPT: "Genom att markera detta alternativ godkänner du att vi använder din platsinformation. Vi följer strikta integritetsprinciper och använder din platsdata endast för detta ändamål. Din platsinformation kommer inte att sparas eller användas för något annat syfte utan ditt uttryckliga samtycke. Du kan när som helst ändra dessa inställningar. Vi värnar om din integritet och tar skyddet av din personliga data på stort allvar.",
    AUTO_GENERATE_ISSUES_INFO: "Genererar automatiskt publikationer för varje år. Baserat på startår till slutår och totala antalet publikationer. Välj förlag ovanför.",
    AUTO_GENERATE_ISSUES_CHOSEN_PUBLISHER: "Du har valt förlaget ",
    AUTO_GENERATE_ISSUES_NO_CHOICE: "Du har inte valt något förlag än!",
    DELETE_ALL_ISSUES_INFO: "Tar bort alla publikationer för denna titel.",
    DELETE_ALL_ISSUES_FOR: "Ta bort alla publikationer för",
    FILTER_NUMBER_TITLE_OR_YEAR: "Filtrera på nummer, titel eller årtal",
    FILTER_TITLE_OR_YEAR: "Filtrera på titel eller årtal",
    FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE: "Filtrera på titel, förlag, årtal eller källmaterial",
    FILTER_NAME: "Filtrera på namn",
    FILTER_PUBLISHER_NAME: "Filtrera på förlagets namn",
    GRADE_IS_NOT_VALUED: "Vissa publikationer saknar värden.",
    GRADE_IS_VALUED_LEAD: "Här kan du markera att alla publikationer på den här titeln har fått rätt värden.",
    GRADE_TEXT_2: "Ange en skickgradering för varje exemplar du har. Mer information om skickgradering, och mer exakt värdering, hittar du hos",
    GRADE_TEXT_3: "Seriekatalogen",
    GRADE_TEXT_4: "Använd gärna meddelandefunktionen för att meddela Admin om värden behöver uppdateras.",
    GRADE_TITLE_IS_VALUED: "Alla publikationer har fått rätt värden.",
    MARVELKLUBBEN_LEAD: "En överblick över alla publikationer som ingick i Marvelklubben.",
    MARVELKLUBBEN_TEXT_1: "Du måste lägga börja samla på titeln för att kunna lägga till publikationen i din samling.",
    MARVELKLUBBEN_TEXT_2: "Mer information om Marvelklubben hittar du på",
    NO_DATA_AVAILABLE: "Det finns inget att visa!",
    NO_USER_AVAILABLE: "Denna användare har ingen publik profil!",
    REMOVE_ISSUE_WANTED: "Ta bort efterlysning",
    SECTIONS: {
        GRADES: {},
        ISSUES: {},
        MESSAGES: {},
        PUBLISHERS: {},
        TITLES: {},
        USERS: {}
    },
    SHOWING: "Visar",
    SHOWING_OF: "av",
    SHOWING_LATEST_USERS: "Visar de senast uppdaterade användarna från databasen.",
    SOURCE_EXAMPLE: "EXEMPEL: Titel #1 (år) - https://comics.org/issue/12345; Amazing Spiderman #225 (1998) - https://comics.org/issue/23543254",
    USERS_COUNT_TEXT_1: "Totalt finns det ",
    USERS_COUNT_TEXT_2: "användare.",
}

export const PANES = {
    TITLES: {
        NAME: "Mina titlar",
        LONG_NAME: "Kontrollpanelen - Mina titlar",
        COLLECTING_CHECK_GRADING_STATUS_OPEN_1: "Beräknar värdet och kontrollerar om något exemplar av",
        COLLECTING_CHECK_GRADING_STATUS_OPEN_2: "behöver skickgradering.",
        GRADE_MISSING: "Det verkar som att några publikationer saknar skickgradering.",
        GRADE_FOUND: "Alla publikationer har skickgradering.",
        COLLECTING_VALUE_1: "Det sammanlagda värdet av denna titel är: ",
    },
    OVERVIEW: {
        NAME: "Översikt",
        LONG_NAME: "Kontrollpanelen - Översikt",
        COLLECTING_TITLES_1: "Du samlar på",
        COLLECTING_TITLES_2: "av totalt",
        COLLECTING_TITLES_3: "inlagda titlar.",
        COLLECTING_VALUE_1: "Det sammanlagda värdet av din samling är: ",
        COLLECTING_VALUE_2: "Vilket är en ökning med",
        COLLECTING_VALUE_3: "Vilket är en minskning med",
        COLLECTING_VALUE_4: "sedan senast sparade värdering",
        COLLECTING_VALUE_6: "Ingen värdeförändring.",
        COLLECTING_VALUE_7: "Det finns inga sparade värderingar. Gå till värderingssidan för att räkna ut ett nytt värde på din samling.",
        COLLECTING_ISSUES_1: "Totalt ingår",
        COLLECTING_ISSUES_2: "publikationer i din samling, som är till",
        COLLECTING_ISSUES_3: "komplett.",
        COLLECTING_MARVELKLUBBEN_1: "Du har",
        COLLECTING_MARVELKLUBBEN_2: "publikationer i din Marvelklubben-samling. Den är till",
        GRADE: "Gradering",
        COLLECTING_ISSUES_GRADE_1: "Publikationerna i din samling har en snittgradering på"
    },
    COLLECTIONS: {
        NAME: "Samlingar",
        LONG_NAME: "Kontrollpanelen - Samlingar",
        COLLECTING: "Samlar på",
        TITLES: "titlar",
        COMPLETE: "% komplett",

    },
    VALUATION: {
        NAME: "Värdering",
        LONG_NAME: "Kontrollpanelen - Värdering",
        LEAD: "Här visas de senaste värderingarna som sparats i databasen. Vi visar max 20 st. För att vi ska kunna beräkna en värdering måste du lägga in skickgraderingar på dina publikationer.",
        COLLECTING_VALUE_1: "Det sammanlagda värdet av din samling är: ",
    },
    MAP: {
        NAME: "Karta",
        LONG_NAME: "Kontrollpanelen - Karta",
        LEAD_1: "Om du har valt att låta Svenska Marvelsamlare använda din position kan du här enkelt leta efter loppisar, second hand-butiker eller serietidningsaffärer nära dig.",
        LEAD_2: "Du kan även ange platsinformation manuellt.",
        FLEA_MARKETS: "Loppmarknader",
        SECOND_HAND_SHOPS: "Second hand-butiker",
        COMIC_BOOK_STORES: "Serietidningsaffärer",
        WALKING: "Promenad",
        DRIVING: "Köra bil",
        TRAVEL_MODES: "Färdsätt",
        NEAREST_DESTINATIONS: "nära dig:",
        ALTERNATIVE_ROUTES: "Alternativa vägar",
        SEARCH_FOR_NEAREST: "Sök",
        LOCATION: "Plats",
        YOUR_CURRENT_LOCATION: "Din nuvarande plats:",
        YOUR_SELECTED_ORIGIN_LOCATION: "Din valda plats:",
        NO_SELECTED_ORIGIN_LOCATION: "Du har inte valt någon annan plats än.",
        CHOSE_LOCATION: "Välj plats:",
        CHOSE_OTHER_LOCATION: "Välj en annan plats:"
    }
}

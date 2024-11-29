import React, {useEffect, useMemo, useState} from "react";
import publications from "../../../helpers/valueLists/publications.json";


export const DivaPublicationsTest = () => {

    // Exempel på komponent för att visa upp publikationer från Diva
    //   - Med sök/filter input och visa fler-knapp

    // Se till så att vi har en lista med publikationer - publications

    // Dessa variabler / states behöver vi:
    //   - Antal för "Visa fler" funktion - plussar på det antal vi visar upp med detta värde
    //   - State som sparar hur många vi ska visa upp
    //   - States som hanterar vår query
    const ITEMS_TO_SHOW = 5;
    const [itemsToShow, setItemsToShow] = useState(ITEMS_TO_SHOW);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debounce - Vanlig teknik för att hantera för snabb query input - om användaren skriver för fort
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Här görs filtreringen, baserat på användarens query input
    //   - Tittar för tillfället på publication.title och publication.publicationTypeCode
    //   - För att lägga till ytterligare filtreringar, för t.ex årtal så lägger man bara till dem såhär:
    //     - publication.publicationTypeCode.toLowerCase().includes(lowerCaseQuery) ||
    //     - publication.year.toLowerCase().includes(lowerCaseQuery)
    const filterPublicationByQuery = (publication, query) => {
        if (!query) return true; // Early exit - include all publications
        const lowerCaseQuery = query.toLowerCase();
        return (
            publication.title.toLowerCase().includes(lowerCaseQuery) ||
            publication.publicationTypeCode.toLowerCase().includes(lowerCaseQuery)
        );
    };

    // Funktion för att sortera på publikationens titel
    const sortByTitle = (a, b) => a.localeCompare(b);

    // Use memo för att "cacha" det filtrerade resultatet - för lite bättre prestanda
    const filteredPublications = useMemo(() => {
        return publications
            .filter(publication => filterPublicationByQuery(publication, debouncedQuery))
            .sort((a, b) => sortByTitle(a.title.toLowerCase(), b.title.toLowerCase()));
    }, [publications, debouncedQuery]);

    // Funktion för att visa fler publikationer
    const showMoreItems = () => {
        setItemsToShow(prev => prev + ITEMS_TO_SHOW);
    };

    // Funktion för att rensa query och återställa antal som visas
    const clearQuery = () => {
        setQuery("");
        setItemsToShow(ITEMS_TO_SHOW);
    };

    // Hjälp för att avgöra om vi ska visa knapparna eller inte
    const doShowMoreButton = filteredPublications.length > itemsToShow;
    const doShowClearButton = query !== "";

    return publications && !!publications.length && (
        <div>
            <label htmlFor="query">Search publications</label>
            <input id="query"
                   name="query"
                   type="text"
                   placeholder={"Search publications"}
                   value={query}
                   onChange={e => setQuery(e.target.value)}
            />
            {
                doShowClearButton &&
                <button onClick={() => clearQuery()}>
                    Clear Query
                </button>
            }
            <p>Found a total of {filteredPublications.length} hits</p>
            <ul>
                {
                    filteredPublications.slice(0, itemsToShow)
                        .map(publication => (
                            <li key={publication.recordIdentifier}>{publication.title} - {publication.publicationTypeCode}</li>
                        ))
                }
            </ul>
            {
                doShowMoreButton &&
                <div>
                    <button className="" onClick={() => showMoreItems()}>
                        Show more
                    </button>
                </div>
            }
        </div>
    )
}

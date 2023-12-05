import React, {useState, useCallback, useEffect} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../helpers/constants";
import {getRowByTableAndId} from "../services/serviceFunctions";
import {useAppContext} from "../context/AppContext";


const Footer = () => {

    const package_json = require('../../package.json');
    const [utilsData, setUtilsData] = useState(null)
    const {user} = useAppContext();

    const fetchUtilsData = useCallback(() => {
        getRowByTableAndId(TABLES.UTILS, setUtilsData, 1).then();
    }, [])

    useEffect(() => {
        fetchUtilsData();
    }, [fetchUtilsData])

    return !user && (
        <footer className={"p-3 p-sm-5 border-top bg-whale"}>
            <div className={"container"}>
                <div className={"row row-padding--secondary"}>
                    <div className={"col-12 col-md-6 py-2 border-md-end"}>
                        <p className={"fs-smaller"}>
                            <span className={"me-1"}>{TEXTS.FOOTER_INFO_TEXT_1}</span>
                            <a className={"me-1"} href="https://www.marvel.com" rel="noreferrer" target={"_blank"}>MARVEL Entertainment</a>
                            <span className={"me-1"}>{TEXTS.FOOTER_INFO_TEXT_2}</span>
                        </p>
                        <p className={"fs-smaller"}>
                            <span className={"me-1"}>{TEXTS.FOOTER_INFO_TEXT_3}</span>
                            <a href="https://www.comics.org" rel="noreferrer" target={"_blank"}>Grand comics database</a>,
                            <a className={"ms-1"} href="https://seriekatalogen.se" rel="noreferrer" target={"_blank"}>Seriekatalogen</a>,
                            <a className={"mx-1"} href="https://sv.wikipedia.org" rel="noreferrer" target={"_blank"}>Wikipedia</a>
                            <span className={"me-1"}>&</span>
                            <a href="https://seriewikin.serieframjandet.se" rel="noreferrer" target={"_blank"}>Seriewikin</a>.
                        </p>
                    </div>
                    <div className={"col-12 col-md-6 py-2 d-flex align-items-end"}>
                        <p className={"fs-smallest text-end m-0 w-100"}>
                            <span>© 2023 {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE} | </span>
                            <span className={"text-nowrap"}>v{package_json.version} {utilsData && " | " + utilsData.release_date}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;

import React, {useState, useCallback, useEffect} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../helpers/constants";
import {getRowByTableAndId} from "./serviceFunctions";


const Footer = () => {

    const package_json = require('../../package.json');
    const [utilsData, setUtilsData] = useState({})

    const fetchUtilsData = useCallback(() => {
        getRowByTableAndId(TABLES.UTILS, setUtilsData, 1).then();
    }, [])

    useEffect(() => {
        fetchUtilsData();
    }, [fetchUtilsData])

    return (
        <footer className={"p-3 p-sm-5 border-top bg-whale"}>
            <div className={"container"}>
                <div className={"row row-padding--secondary"}>
                    <div className={"col-12 col-md-6 py-2 border-md-end"}>
                        <p className={"fs-smaller"}>
                            <span className={"me-2"}>{TEXTS.FOOTER_INFO_TEXT_1}</span>
                            <a className={"me-2"} href="https://www.marvel.com" rel="noreferrer" target={"_blank"}>MARVEL Entertainment</a>
                            <span className={"me-2"}>{TEXTS.FOOTER_INFO_TEXT_2}</span>
                        </p>
                        <p className={"fs-smaller"}>
                            <span className={"me-2"}>{TEXTS.FOOTER_INFO_TEXT_3}</span>
                            <a className={"me-2"} href="https://www.comics.org" rel="noreferrer" target={"_blank"}>Grand comics database</a>
                            <span className={"me-2"}>&</span>
                            <a href="https://seriewikin.serieframjandet.se" rel="noreferrer" target={"_blank"}>Seriewikin</a>.
                        </p>
                    </div>
                    <div className={"col-12 col-md-6 py-2 d-flex align-items-end"}>
                        <p className={"fs-smallest text-end m-0 w-100"}>
                            © 2021-2022 | {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE} | v{package_json.version} {utilsData ? " | " + utilsData.release_date : ""}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;

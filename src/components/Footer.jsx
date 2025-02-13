import React from "react";
import {LABELS} from "../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../helpers/constants/textConstants/texts";
import {useAppContext} from "../context/AppContext";
import packageJson from '../../package.json';
import {useUtilsData} from "../helpers/customHooks/useUtilsData";


const Footer = () => {

    const {user} = useAppContext();
    const {utilsData} = useUtilsData();

    return !user && (
        <footer className={"p-3 p-sm-5 border-top bg-whale"}>
            <div className={"container"}>
                <div className={"row"}>
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
                            <span>© 2024 {LABELS.COMMON.SVENSKA_MARVELSAMLARE} | </span>
                            <span className={"text-nowrap"}>v{packageJson.version} {utilsData && " | " + utilsData.release_date}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;

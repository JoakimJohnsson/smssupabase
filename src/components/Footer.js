import React from 'react';
import {useAuth} from "../contexts/Auth";
import {LABELS_AND_HEADINGS} from "../helpers/constants";

const Footer = () => {

    const {user} = useAuth();

    return !user &&
        <footer className={"p-5 border-top"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 px-4 py-2 border-md-end"}>
                        <p className={"fs-smaller"}>
                            Denna applikation kan innehålla bilder och information vars copyright ägs
                            av <a href="https://www.marvel.com">MARVEL Entertainment</a> och används i
                            enlighet med Fair use doctrin of the United States.
                        </p>
                    </div>
                    <div className={"col-12 col-md-6 px-4 py-2 d-flex align-items-end"}>
                        <p className={"fs-smallest text-end m-0 w-100"}>
                            © 2021-2022 {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                        </p>
                    </div>
                </div>
            </div>
        </footer>

};

export default Footer;

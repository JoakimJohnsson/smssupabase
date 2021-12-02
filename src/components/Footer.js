import React from 'react';
import {useAuth} from "../contexts/Auth";

const Footer = () => {

    const {user} = useAuth();

    return !user &&
        <footer className={"p-5 border-top"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 px-4 py-2 border-md-end"}>
                        <p className={"fs-smaller"}>
                            This webb application contains images and information which is owned and copyrighted
                            by <a href="https://www.marvel.com">MARVEL Entertainment</a> and is used without permission
                            according to the fair use doctrin of the United States.
                        </p>
                    </div>
                    <div className={"col-12 col-md-6 px-4 py-2 d-flex align-items-end"}>
                        <p className={"fs-smallest text-end m-0 w-100"}>
                            © 2021-2022 Svenska Marvelsamlare
                        </p>
                    </div>
                </div>
            </div>
        </footer>

};

export default Footer;

import React from 'react';
import Login from "../Login";
import {BadgeCheckIcon, ChevronDoubleDownIcon, ClipboardListIcon, CollectionIcon} from "@heroicons/react/solid";


const HeroHeader = () => {
    return (
        <div className={"sms-hero-header p-3 p-sm-5 mb-5"}>

            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6 p-5 text-center"}>
                        <h1 className={"text-primary"}>
                            Welcome to Svenska Marvelsamlare!
                        </h1>
                        <p className={"lead mb-5"}>Do you collect swedish marvel comics?</p>

                        <div className={"mb-4"}>
                            <BadgeCheckIcon className="sms-icon--large mb-2 text-info"/>
                            <p>Manage and keep track of your comics collection</p>
                        </div>
                        <div className={"mb-4"}>
                            <CollectionIcon className="sms-icon--large mb-2 text-info"/>
                            <p>New titles added continuously</p>
                        </div>
                        <div className={""}>
                            <ClipboardListIcon className="sms-icon--large mb-2 text-info"/>
                            <p>Always have your notes ready in the palm of your hand</p>
                        </div>
                    </div>

                    <div className={"col-12 col-md-6 p-5 bg-elephant--trans d-flex align-items-center flex-column justify-content-center"}>
                        <div className={"col-12 col-md-6 d-flex flex-column mb-5"}>
                            <div className={"align-self-center mb-4 d-flex align-items-center flex-column"}>
                                <h2 className={"fs-1 text-primary mb-4"} id={"log-in-section"}>Log in</h2>
                                <ChevronDoubleDownIcon className="sms-icon--large text-info"/>
                            </div>
                            <Login/>
                        </div>
                        <a href={"#create-account-section"} className={"btn btn-outline-secondary btn-cta"}>Or create account...</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HeroHeader;
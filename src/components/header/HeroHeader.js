import React from 'react';
import Login from "../Login";
import {BadgeCheckIcon, ClipboardListIcon, CollectionIcon} from "@heroicons/react/solid";


const HeroHeader = () => {
    return (
        <div className={"sms-hero-header p-3 p-sm-5 mb-5"}>

            <div className={"container-fluid"}>
                <div className={"row"}>

                    <div className={"col-12 col-md-6 p-3 p-sm-5 bg-dog--trans d-flex align-items-center"}>
                        <Login/>
                    </div>

                    <div className={"col-12 col-md-6 p-5 bg-elephant--trans"}>
                        <h1 className={"text-primary"}>
                            Welcome to Svenska Marvelsamlare!
                        </h1>
                        <p className={"lead mb-5"}>Do you collect swedish marvel comics?</p>
                        <ul className={"list-unstyled"}>
                            <li className={"d-flex align-items-center mb-3"}><BadgeCheckIcon className="sms-icon--large me-3"/>
                                Manage and keep track of your comics collection
                            </li>
                            <li className={"d-flex align-items-center mb-3"}><CollectionIcon className="sms-icon--large me-3"/>
                                New titles added continuously
                            </li>
                            <li className={"d-flex align-items-center"}><ClipboardListIcon className="sms-icon--large me-3"/>
                                Always have your notes ready in the palm of your hand
                            </li>
                        </ul>

                    </div>

                </div>
            </div>


        </div>
    )
};

export default HeroHeader;

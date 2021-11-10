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

                    <div className={"col-12 col-md-6 p-5 bg-elephant--trans text-center"}>
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

                </div>
            </div>


        </div>
    )
};

export default HeroHeader;

import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {ChevronDoubleDownIcon} from '@heroicons/react/solid';
import {useAppContext} from "../../context/AppContext";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";

export const Home = () => {

    const {user} = useAppContext();
    return user ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <div className={"col main-col"}>
                        <p>Home</p>
                        <p>Länkar till min dashboard o.s.v.</p>
                    </div>
                </div>
            </main>
        )
        :
        (
            <>
                <HeroHeader/>
                <main className={'container-fluid p-5'}>
                    <div className={'row justify-content-center pb-5 mb-5'}>
                        <div className={'col-12 col-md-6 d-flex flex-column'}>
                            <div className={'align-self-center mb-4 d-flex align-items-center flex-column'}>
                                <h2 className={'fs-1 text-secondary mb-4'} id={'create-account-section'}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                                <ChevronDoubleDownIcon className='sms-icon--large text-info'/>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </main>
            </>
        )
}
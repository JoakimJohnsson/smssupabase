import React from 'react';
import Login from '../Login';
import {LABELS_AND_HEADINGS, TEXTS} from '../../helpers/constants';
import {BadgeCheckIcon, ChevronDoubleDownIcon, ClipboardListIcon, CollectionIcon, UserAddIcon} from '@heroicons/react/solid';
import shieldWhite from "../../assets/images/shield__white.svg";

export const HeroHeader = () => {
    return (
        <div className={'sms-hero-header mb-5'}>

            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-12 col-xl-6 p-5 bg-whale d-flex align-items-center flex-column justify-content-center'}>
                        <div className={'col-12 col-lg-8 d-flex flex-column mb-5'}>
                            <div className={"d-flex flex-column align-items-center py-5"}>
                                <img className={"sms-logo-shield mb-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                                <p className={"sms-logo-text"}>
                                    {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                                </p>
                            </div>
                            <div className={'align-self-center mb-4 d-flex align-items-center flex-column'}>
                                <h2 className={'fs-1 text-primary mb-4'} id={'log-in-section'}>{LABELS_AND_HEADINGS.LOG_IN}</h2>
                                <ChevronDoubleDownIcon className='sms-icon--large text-info'/>
                            </div>
                            <Login/>
                        </div>
                        <h3 className={'mb-3 text-primary fs-large'}>Är du inte registrerad?</h3>
                        <a href={'#create-account-section'} className={'btn btn-outline-secondary btn-cta mb-5'}>
                            <UserAddIcon className={"sms-icon"}/> {LABELS_AND_HEADINGS.CREATE_ACCOUNT}
                        </a>
                    </div>

                    <div className={'col-12 col-xl-6 p-5 d-flex align-items-center justify-content-center flex-column text-center'}>
                        <h1 className={'text-primary'}>
                            {LABELS_AND_HEADINGS.WELCOME}
                        </h1>
                        <p className={'lead mb-5'}>{TEXTS.DO_YOU_COLLECT}</p>

                        <div className={'mb-4'}>
                            <BadgeCheckIcon className='sms-icon--large mb-2 text-info'/>
                            <p>{TEXTS.MANAGE_YOUR_COLLECTION}</p>
                        </div>
                        <div className={'mb-4'}>
                            <CollectionIcon className='sms-icon--large mb-2 text-info'/>
                            <p>{TEXTS.NEW_TITLES}</p>
                        </div>
                        <div>
                            <ClipboardListIcon className='sms-icon--large mb-2 text-info'/>
                            <p>{TEXTS.ALWAYS_AVAILABLE}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

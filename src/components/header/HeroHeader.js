import React from 'react';
import Login from '../Login';
import {LABELS_AND_HEADINGS, TEXTS} from '../../helpers/constants';
import {BadgeCheckIcon, ChevronDoubleDownIcon, ClipboardListIcon, CollectionIcon} from '@heroicons/react/solid';

const HeroHeader = () => {
    return (
        <div className={'sms-hero-header p-3 p-sm-5 mb-5'}>

            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-12 col-lg-6 p-5 text-center'}>
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

                    <div className={'col-12 col-lg-6 p-5 bg-elephant--trans d-flex align-items-center flex-column justify-content-center'}>
                        <div className={'col-12 col-md-6 d-flex flex-column mb-5'}>
                            <div className={'align-self-center mb-4 d-flex align-items-center flex-column'}>
                                <h2 className={'fs-1 text-primary mb-4'} id={'log-in-section'}>{LABELS_AND_HEADINGS.LOG_IN}</h2>
                                <ChevronDoubleDownIcon className='sms-icon--large text-info'/>
                            </div>
                            <Login/>
                        </div>
                        <h3 className={'mb-3 text-primary fs-large'}>Är du inte registrerad?</h3>
                        <a href={'#create-account-section'} className={'btn btn-outline-secondary btn-cta'}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HeroHeader;

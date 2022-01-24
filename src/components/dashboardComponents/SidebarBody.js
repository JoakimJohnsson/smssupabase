import React from "react";
import LiNavItem from "../listComponents/LiNavItem";
import {BanIcon, CogIcon, HomeIcon, PresentationChartLineIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";



const SidebarBody = ({handleClick}) => {

    return (
        <nav className={'px-3 px-md-3 py-md-5 w-100'}>
            <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>

            <ul className='navbar-nav me-auto me-sm-0 ms-sm-auto fs-small'>
                <LiNavItem route={'/'} onClick={handleClick} icon={<HomeIcon className={'sms-icon--text'}/>} text={LABELS_AND_HEADINGS.START}/>
                <LiNavItem route={'/dashboard'} onClick={handleClick} icon={<PresentationChartLineIcon className={'sms-icon--text'}/>}
                           text={LABELS_AND_HEADINGS.DASHBOARD}/>
                <LiNavItem route={'/dashboard/settings'} onClick={handleClick} icon={<CogIcon className={'sms-icon--text'}/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
            </ul>


        </nav>
    )
}

export default SidebarBody;

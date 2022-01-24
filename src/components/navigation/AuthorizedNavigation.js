import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {MenuIcon, XIcon, HomeIcon, PresentationChartLineIcon, CogIcon, BanIcon} from '@heroicons/react/solid';
import shieldWhite from '../../assets/images/shield__white.svg';
import SignOutButton from '../miniComponents/SignOutButton';
import {useAppContext} from '../../context/AppContext';
import NavbarProfileInformation from '../NavbarProfileInformation';
import LiNavItem from '../listComponents/LiNavItem';
import {LABELS_AND_HEADINGS} from '../../helpers/constants';

const AuthorizedNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const collapseClassShow = 'collapse navbar-collapse show pt-3 pt-lg-0';
    const collapseClass = 'collapse navbar-collapse';
    const {avatarImageUrl, role} = useAppContext();

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark'>
            <div className='container-fluid px-3'>
                <Link to='/' className={'hocus-standard h-100 d-flex align-items-center'}>
                    <img className={'sms-logo-shield me-2'} src={shieldWhite} alt={'Svenska marvelsamlare logo'}/>
                    <div className={'sms-logo-text'}>
                        <span className={'d-none d-sm-inline'}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                        <span className={'d-inline d-sm-none'}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
                    </div>
                </Link>
                <button className={isOpen ? 'btn d-block d-lg-none text-danger' : 'btn d-block d-lg-none text-primary'}
                        onClick={handleClick}>
                    <span className={'visually-hidden'}>menu</span>
                    {isOpen ? <XIcon className={'sms-icon--hamburger'}/> : <MenuIcon className={'sms-icon--hamburger'}/>}
                </button>
                <div className={isOpen ? collapseClassShow : collapseClass} id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0'>
                        <LiNavItem route={'/'} onClick={handleClick} icon={<HomeIcon/>} text={LABELS_AND_HEADINGS.START}/>
                        <LiNavItem route={'/dashboard'} onClick={handleClick} icon={<PresentationChartLineIcon/>}
                                   text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={'/dashboard/settings'} onClick={handleClick} icon={<CogIcon/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                        <LiNavItem route={'/dashboard/admin'} onClick={handleClick} icon={<BanIcon/>} text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className='nav-item'>
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default AuthorizedNavigation;

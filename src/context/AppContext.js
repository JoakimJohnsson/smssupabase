import React, {useContext, useState, useEffect, useCallback} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {MESSAGES, TABLES} from "../helpers/constants";
import {getRowByTableAndId} from "../helpers/functions/serviceFunctions/serviceFunctions";
import {getAllActiveGlobalMessages, getAllUnreadMessages} from "../helpers/functions/serviceFunctions/messageFunctions";


const AppContext = React.createContext();

export function AppContextProvider({children}) {

    // Global states
    const [user, setUser] = useState(null);
    const [activeGlobalMessages, setActiveGlobalMessages] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState(null);
    const [showUserNotification, setShowUserNotification] = useState(false);
    const [showAdminNotification, setShowAdminNotification] = useState(false);
    const [profile, setProfile] = useState(null);
    const [informationMessage, _setInformationMessage] = useState(MESSAGES.EMPTY);

    const fetchProfileData = useCallback((id) => {
        getRowByTableAndId(TABLES.PROFILES, setProfile, id).then();
    }, []);

    const updateMessages = useCallback(() => {
        getAllActiveGlobalMessages(setActiveGlobalMessages).then(() => {
            if (activeGlobalMessages && activeGlobalMessages.length > 0) {
                setShowUserNotification(true);
            } else {
                setShowUserNotification(false);
            }
        });
        getAllUnreadMessages(setUnreadMessages).then(() => {
            if (unreadMessages && unreadMessages.length > 0) {
                setShowAdminNotification(true);
            } else {
                setShowAdminNotification(false);
            }
        });
    }, [activeGlobalMessages, unreadMessages]);

    useEffect(() => {
        // Check active session and sets the user
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session && session.user) {
                setUser(session.user)
            }
        })
    }, []);

    useEffect(() => {
        // Check active session and sets the user
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session && session.user) {
                setUser(session.user);
                fetchProfileData(session.user.id);
            }
        })
    }, [fetchProfileData]);

    useEffect(() => {
        // Listen for changes on auth state. Log in/out etc.
        supabase.auth.onAuthStateChange((event, session) => {
                setUser(session?.user ?? null);
                if (session && session.user) {
                    fetchProfileData(session.user.id);
                }
            }
        )
    }, [fetchProfileData])

    // Public wrapper for setting messages:
    const setInformationMessage = useCallback((msg) => {
        const oldMsg = informationMessage;
        _setInformationMessage(MESSAGES.EMPTY);
        if (msg && oldMsg) {
            setTimeout(() => {
                _setInformationMessage(msg)
            }, 150);
        } else if (msg) {
            _setInformationMessage(msg);
        }
    }, [informationMessage]);

    useEffect(() => {
        updateMessages();
    }, [updateMessages]);

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        informationMessage: informationMessage,
        setInformationMessage: setInformationMessage,
        user,
        setUser,
        showUserNotification,
        showAdminNotification,
        activeGlobalMessages,
        unreadMessages,
        profile,
        setProfile,
        fetchProfileData,
        session: () => supabase.auth.getSession()
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}

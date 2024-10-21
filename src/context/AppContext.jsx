import React, {useContext, useState, useEffect, useCallback} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {CONFIG} from "../helpers/constants/configConstants";
import {MESSAGES} from "../helpers/constants/textConstants/messages";
import {TABLES} from "../helpers/constants/serviceConstants";
import {getRowByTableAndId} from "../services/serviceFunctions";
import {
    getAllActiveGlobalMessages,
    getAllTodoMessages,
    getAllUnreadMessages,
    getAllUserMessages
} from "../services/messageService";


const AppContext = React.createContext();

export function AppContextProvider({children}) {

    // Global states
    const [user, setUser] = useState(null);
    const [evaluatingUser, setEvaluatingUser] = useState(true);
    const [activeGlobalMessages, setActiveGlobalMessages] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState(null);
    const [userMessages, setUserMessages] = useState(null);
    const [todoMessages, setTodoMessages] = useState(null);
    const [showUserNotification, setShowUserNotification] = useState(false);
    const [showAdminNotification, setShowAdminNotification] = useState(false);
    const [showAdminTodoNotification, setShowAdminTodoNotification] = useState(false);
    const [profile, setProfile] = useState(null);
    const [informationMessage, _setInformationMessage] = useState(MESSAGES.EMPTY);

    const fetchProfileData = useCallback((id) => {
        getRowByTableAndId(TABLES.PROFILES, setProfile, id).then();
    }, []);

    const fetchMessages = useCallback(() => {
        getAllActiveGlobalMessages(setActiveGlobalMessages).then();
        getAllUnreadMessages(setUnreadMessages).then();
        getAllTodoMessages(setTodoMessages).then();
        if (user) {
            getAllUserMessages(user, setUserMessages).then();
        }
    }, [user]);

    useEffect(() => {
        // Check active session and sets the user
        setEvaluatingUser(true);
        supabase.auth.getSession().then(({data: {session}}) => {
            if (session && session.user) {
                setUser(session.user);
                fetchProfileData(session.user.id);
            }
            setEvaluatingUser(false);
        })
    }, [fetchProfileData]);

    useEffect(() => {
        // Listen for changes on auth state. Log in/out etc.
        supabase.auth.onAuthStateChange((event, session) => {
            setEvaluatingUser(true);
                setUser(session?.user ?? null);
                if (session && session.user) {
                    fetchProfileData(session.user.id);
                }
                setEvaluatingUser(false);
            }
        )
    }, [fetchProfileData]);

    // Public wrapper for setting messages:
    const setInformationMessage = useCallback((msg) => {
        const oldMsg = informationMessage;
        _setInformationMessage(MESSAGES.EMPTY);
        if (msg && oldMsg) {
            setTimeout(() => {
                _setInformationMessage(msg)
            }, CONFIG.TIMEOUT_SM);
        } else if (msg) {
            _setInformationMessage(msg);
        }
    }, [informationMessage]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        setShowUserNotification(false);
        if (activeGlobalMessages && activeGlobalMessages.length > 0) {
            setShowUserNotification(true);
        } else {
            setShowUserNotification(false);
        }
    }, [activeGlobalMessages]);

    useEffect(() => {
        setShowAdminNotification(false);
        if (unreadMessages && unreadMessages.length > 0) {
            setShowAdminNotification(true);
        } else {
            setShowAdminNotification(false);
        }
    }, [unreadMessages]);

    useEffect(() => {
        setShowAdminTodoNotification(false);
        if (todoMessages && todoMessages.length > 0) {
            setShowAdminTodoNotification(true);
        } else {
            setShowAdminTodoNotification(false);
        }
    }, [todoMessages]);

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signOut: () => supabase.auth.signOut(),
        informationMessage: informationMessage,
        setInformationMessage: setInformationMessage,
        user,
        setUser,
        evaluatingUser,
        showUserNotification,
        showAdminNotification,
        showAdminTodoNotification,
        activeGlobalMessages,
        unreadMessages,
        todoMessages,
        userMessages,
        setUserMessages,
        fetchMessages,
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

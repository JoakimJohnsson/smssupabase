import React, {useContext, useState, useEffect} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {prepareUrl} from '../helpers/functions';
import {BUCKETS, TABLES} from "../helpers/constants";

const AppContext = React.createContext();

export function AppContextProvider({children}) {

    // Global states
    const [user, setUser] = useState({});
    const [avatarImageUrl, setAvatarImageUrl] = useState("");
    const [avatarImageFilename, setAvatarImageFilename] = useState("");
    const [userUrl, setUserUrl] = useState("");
    const [role, setRole] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session and sets the user
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null)
        })
    }, [])

    useEffect(() => {
        if (user) {
            // Check if user has admin privileges and set role.
            const mySub = supabase
                .channel('public:profiles')
                .on('postgres_changes', {event: '*', schema: 'profiles'}, payload => {
                    updateProfile(user).then(() => console.log("Profile updated"))
                })
                .subscribe()
            updateProfile(user).then(() => supabase.removeChannel(mySub));
        }
        setLoading(false)
    }, [user])

    useEffect(() => {
        // Listen for changes on auth state. Log in/out etc.
        supabase.auth.onAuthStateChange((event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )
    }, [])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        user,
        avatarImageUrl,
        setAvatarImageUrl,
        avatarImageFilename,
        setAvatarImageFilename,
        userUrl,
        setUserUrl,
        role,
        session: () => supabase.auth.getSession()
    }

    async function updateProfile(user) {
        // Reset
        setRole(0);
        setAvatarImageFilename("");
        setAvatarImageUrl("");
        setUserUrl("");
        try {
            if (user && user.id) {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from(TABLES.PROFILES)
                    .select(`firstname, lastname, role, website, avatar_image_filename`)
                    .eq('id', user.id);
                if (error && status !== 406) {
                    console.error('Error: ', error);
                }
                if (data) {
                    setUserUrl(prepareUrl(data[0].website));
                    // Get and set avatar url from storage via filename
                    if (data[0].avatar_image_filename) {
                        const url = supabase
                            .storage
                            .from(BUCKETS.AVATAR_IMAGES)
                            .getPublicUrl(data[0].avatar_image_filename).data.publicUrl;
                        const fileName = data[0].avatar_image_filename;
                        setAvatarImageUrl(url);
                        setAvatarImageFilename(fileName);
                    }
                    // Set role
                    if (data[0].role) {
                        setRole(data[0].role)
                    }
                }
            }
        } catch (error) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppContext.Provider value={value}>
            {!loading && children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}

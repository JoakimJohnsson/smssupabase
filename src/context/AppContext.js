import React, {useContext, useState, useEffect, useCallback} from 'react';
import {supabase} from '../supabase/supabaseClient';

const AppContext = React.createContext();

export function AppContextProvider({children}) {

    const defaultProfile = {
        firstname: "",
        lastname: "",
        website: "",
        avatar_image_filename: "",
        role: 0
    }

    const [user, setUser] = useState();
    const [profile, setProfile] = useState(defaultProfile);
    const [loading, setLoading] = useState(true);

    const updateProfileOnChange = useCallback( () => {
        supabase
            .from('profiles')
            .on('UPDATE', payload => {
                updateProfile(user).then()
            })
            .subscribe()}, [user]);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session();
        setUser(session?.user ?? null)

        if (user) {
            // Check if user has admin privileges and set role.
            updateProfileOnChange(user);
            updateProfile(user).then(() => supabase.removeSubscription(updateProfileOnChange));
        }

        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const {data: listener} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [user, updateProfileOnChange])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        user,
        profile,
        session: () => supabase.auth.session()
    }

    async function updateProfile(user) {
        try {
            setLoading(true);
            let {data, error, status} = await supabase
                .from('profiles')
                .select(`firstname, lastname, role, website, avatar_image_filename`)
                .eq('id', user.id);

            if (error && status !== 406) {
                console.log("Error: ", error);
            }
            if (data) {
                setProfile(...data)
            }
        } catch (error) {
            alert(error.message)
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
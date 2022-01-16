import React, {useContext, useState, useEffect, useCallback} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {prepareUrl} from '../helpers/functions';

const AppContext = React.createContext();

export function AppContextProvider({children}) {

    const [user, setUser] = useState();
    const [avatarImageUrl, setAvatarImageUrl] = useState('');
    const [avatarFilename, setAvatarFilename] = useState(null);
    const [userUrl, setUserUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateProfileOnChange = useCallback(() => {
        supabase
            .from('profiles')
            .on('*', payload => {
                updateProfile(user).then()
            })
            .subscribe()
    }, [user]);

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
        avatarImageUrl,
        setAvatarImageUrl,
        avatarFilename,
        setAvatarFilename,
        userUrl,
        setUserUrl,
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
                console.log('Error: ', error);
            }
            if (data) {
                setUserUrl(prepareUrl(data[0].website));
                // Get and set avatar url from storage via filename
                if (data[0].avatar_image_filename) {
                    setAvatarImageUrl(supabase
                        .storage
                        .from('avatars')
                        .getPublicUrl(data[0].avatar_image_filename).publicURL)
                    const fileName = data[0].avatar_image_filename;
                    setAvatarFilename( fileName )
                }
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
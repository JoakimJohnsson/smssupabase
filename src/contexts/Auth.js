import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [isAuthorized, setIsAuthorized] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session();

        setUser(session?.user ?? null);
        setIsAuthorized(user ?? false);

        setLoading(false);

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setIsAuthorized(user ?? false);
                setLoading(false);
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [user])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        user,
        isAuthorized,
        session: () => supabase.auth.session()
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
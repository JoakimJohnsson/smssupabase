import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [role, setRole] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session()

        setUser(session?.user ?? null)

        if (user) {
            // Check if user has admin privileges and set role.
            updateRole(user).then(() => console.log("Role updated"));
        }

        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [role, user])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        user,
        role,
        session: () => supabase.auth.session()
    }

    async function updateRole(user) {
        try {
            setLoading(true);
            let {data, error, status} = await supabase
                .from('profiles')
                .select(`role`)
                .eq('id', user.id);

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                if (data.role === 1) {
                    setRole(1);
                }

            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
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
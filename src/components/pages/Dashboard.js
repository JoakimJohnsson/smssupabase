import {useHistory} from 'react-router-dom';
import {useAuth} from '../../contexts/Auth';
import React, {useEffect, useState} from "react";
import {supabase} from "../../supabase/supabaseClient";
import Avatar from "../Avatar";

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    // Get current user and signOut function from context
    const {user, signOut, session} = useAuth()

    const history = useHistory();

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true)

                let {data, error, status} = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [user.id, session])

    async function handleSignOut() {
        // Ends user session
        await signOut()

        // Redirects the user to Login page
        history.push('/login')
    }

    async function updateProfile({username, website, avatar_url}) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1>Dashboard adf</h1>
            <div className="form-widget">
                <p>Welcome, {user?.id}!</p>
                <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({username, website, avatar_url: url})
                    }}
                />
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" value={user.email} disabled/>
                </div>
                <div>
                    <label htmlFor="username">Name</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        type="website"
                        value={website || ''}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        className="button block primary"
                        onClick={() => updateProfile({username, website, avatar_url})}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>

                <div>
                    <button onClick={handleSignOut}>Sign out</button>
                </div>
            </div>
        </>
    )
}

export default Dashboard;

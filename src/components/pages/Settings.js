import {useAuth} from '../../contexts/Auth';
import React, {useEffect, useState} from "react";
import {supabase} from "../../supabase/supabaseClient";
import Avatar from "../Avatar";

const Settings = () => {

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    // Get current user and signOut function from context
    const {user, session} = useAuth();

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setUsername(data.username);
                    setWebsite(data.website);
                    setAvatarUrl(data.avatar_url);
                }
            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile().then(r => "hej")
    }, [user.id, session])

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
        <div className={"container-fluid p-3"}>
            <div className={"row"}>
                <div className={"col-12"}>

                    <h1>Settings</h1>
                    <div className={""}>
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
                            <input id="email" className={""} type="text" value={user.email} disabled/>
                        </div>
                        <div>
                            <label htmlFor="username">Name</label>
                            <input
                                id="username"
                                className={""}
                                type="text"
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="website">Website</label>
                            <input
                                id="website"
                                className={""}
                                type="text"
                                value={website || ''}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                        <button
                            className={""}
                            onClick={() => updateProfile({username, website, avatar_url})}
                            disabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;

import {useAuth} from '../../contexts/Auth';
import React, {useEffect, useState} from "react";
import {supabase} from "../../supabase/supabaseClient";
import Avatar from "../Avatar";
import {CLASSES} from "../../helpers/constants";

const Settings = () => {

    const [loading, setLoading] = useState(true);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
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
                    .select(`firstname, lastname, website, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setFirstname(data.firstname);
                    setLastname(data.lastname);
                    setWebsite(data.website);
                    setAvatarUrl(data.avatar_url);
                }
            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile().then(() => "Profile retrieved")
    }, [user.id, session])

    async function updateProfile({firstname, lastname, website, avatar_url}) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                firstname,
                lastname,
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
        <div className={"container"}>
            <div className={"row py-5"}>
                <div className={"col-12"}>

                    <h1>Settings</h1>

                    <div className={"row mt-5"}>

                        <div className={"col-12 col-md-6 col-lg-4 mb-5 p-4 p-md-5"}>
                            <h2>Profile image</h2>

                            <Avatar
                                url={avatar_url}
                                onUpload={(url) => {
                                    setAvatarUrl(url)
                                    updateProfile({avatar_url: url}).then(() => {
                                        console.log("Profile updated");
                                    })
                                }}
                            />
                        </div>

                        <div className={"col-12 col-md-6 col-lg-4 mb-5 p-4 p-md-5"}>
                            <h2>Information</h2>
                            <label className={"form-label"} htmlFor="email">Email</label>
                            <input id="email" className={CLASSES.FORM_INPUT_DISABLED} type="text" value={user.email} disabled/>
                            <label className={"form-label"} htmlFor="firstname">First name</label>
                            <input
                                id="firstname"
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="text"
                                value={firstname || ''}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <label className={"form-label"} htmlFor="lastname">Last name</label>
                            <input
                                id="lastname"
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="text"
                                value={lastname || ''}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <label className={"form-label"} htmlFor="website">Website</label>
                            <input
                                id="website"
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="text"
                                value={website || ''}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                            <button className={"btn btn-primary"}
                                    onClick={() => updateProfile({firstname, lastname, website})}
                                    disabled={loading}>
                                {loading ? 'Saving ...' : 'Update'}
                            </button>
                        </div>

                        <div className={"col-12 col-md-6 col-lg-4"}>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Settings;

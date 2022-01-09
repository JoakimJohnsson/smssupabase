import {useAppContext} from '../../context/AppContext';
import React, {useEffect, useState} from 'react';
import {supabase} from '../../supabase/supabaseClient';
import Avatar from "../Avatar";
import {CLASSES, LABELS_AND_HEADINGS} from '../../helpers/constants';
import Spinner from '../Spinner';

const Settings = () => {

    const [loading, setLoading] = useState(true);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_image_filename, setAvatarImageFilename] = useState(null);

    // Get current user and signOut function from context
    const {user, session} = useAppContext();

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('profiles')
                    .select(`firstname, lastname, website, avatar_image_filename`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    console.log('Error: ', error);
                }

                if (data) {
                    setFirstname(data.firstname);
                    setLastname(data.lastname);
                    setWebsite(data.website);
                    setAvatarImageFilename(data.avatar_image_filename);
                }
            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProfile().then(() => 'Do something')
    }, [user.id, session])

    async function updateProfile({firstname, lastname, website, avatar_image_filename}) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                firstname,
                lastname,
                website,
                avatar_image_filename,
                updated_at: new Date(),
            }

            let {error} = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                console.log('Error: ', error);
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={'container-fluid main-container'}>
            <div className={'row'}>
                <div className={'col-12'}>

                    <h1>{LABELS_AND_HEADINGS.SETTINGS}</h1>

                    <div className={'row mt-5'}>

                        <div className={'sms-form-col'}>
                            <div className={'sms-form'}>

                                <h2>{LABELS_AND_HEADINGS.PROFILE_IMAGE}</h2>

                                <Avatar
                                    avatar_image_filename={avatar_image_filename}
                                    onUpload={(avatar_image_filename) => {
                                        setAvatarImageFilename(avatar_image_filename);
                                        updateProfile({avatar_image_filename: avatar_image_filename}).then(() => "Do something");
                                    }}
                                />

                            </div>
                        </div>


                        <div className={'sms-form-col'}>
                            <div className={'sms-form'}>
                                <h2 className={'border-bottom pb-2 mb-4'}>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                <label className={'form-label'} htmlFor='email'>{LABELS_AND_HEADINGS.EMAIL}</label>
                                <input id='email' className={CLASSES.FORM_INPUT_DISABLED} type='text' value={user.email} disabled/>
                                <label className={'form-label'} htmlFor='firstname'>{LABELS_AND_HEADINGS.FIRST_NAME}</label>
                                <input
                                    id='firstname'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='text'
                                    value={firstname || ''}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='lastname'>{LABELS_AND_HEADINGS.LAST_NAME}</label>
                                <input
                                    id='lastname'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='text'
                                    value={lastname || ''}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='website'>{LABELS_AND_HEADINGS.WEBSITE}</label>
                                <input
                                    id='website'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='text'
                                    value={website || ''}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                                <button className={'btn btn-primary'}
                                        onClick={() => updateProfile({firstname, lastname, website})}
                                        disabled={loading}>
                                    {loading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.UPDATE}
                                </button>
                            </div>
                        </div>

                        <div className={'col-12 col-md-6 col-lg-4'}>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Settings;

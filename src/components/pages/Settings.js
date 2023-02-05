import {useAppContext} from "../../context/AppContext";
import React, {useEffect, useState} from "react";
import {supabase} from "../../supabase/supabaseClient";
import {Avatar} from "../Avatar";
import {CLASSES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {prepareUrl} from "../../helpers/functions";
import {getProfile} from "../serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {MailIcon} from "@heroicons/react/solid";

const Settings = () => {

    const [loading, setLoading] = useState(true);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [website, setWebsite] = useState(null);
    const [avatar_image_filename, setAvatarImageFilename] = useState(null);

    // Get current user and signOut function from context
    const {user, session, setUserUrl} = useAppContext();

    useEffect(() => {
        getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, user.id).then(() => "Do something")
    }, [user.id, session, avatar_image_filename, setUserUrl])

    // Updates profiles table in db
    async function updateProfileData({firstname, lastname, website, avatar_image_filename}) {
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
            let {error} = await supabase.from(TABLES.PROFILES).upsert(updates, {
                returning: "minimal", // Don"t return the value after inserting
            })
            if (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error.message)
        } finally {
            // Update App context
            setUserUrl(prepareUrl(website));
            setLoading(false)
        }
    }

    // Trigger a reset of password
    async function requestPasswordResetForEmail(email) {
        try {
            const {error} = await supabase.auth.api
                .resetPasswordForEmail(email)
            if (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error.message)
        } finally {
            console.info("Reset password request sent for email: ", email);
        }
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12 col-lg-8"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.SETTINGS}/>
                    <p className={"lead"}>{TEXTS.SETTINGS_LEAD}</p>
                    <p>{TEXTS.SETTINGS_INFO}</p>
                    <p>
                        <MailIcon className={"sms-icon--text-md me-2"}/>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                        <label className={"form-label"} htmlFor="email">{LABELS_AND_HEADINGS.EMAIL}</label>
                        <input id="email" className={CLASSES.FORM_INPUT_DISABLED} type="text" value={user.email} disabled/>
                        <label className={"form-label"} htmlFor="firstname">{LABELS_AND_HEADINGS.FIRST_NAME}</label>
                        <input
                            id="firstname"
                            className={CLASSES.FORM_INPUT_DEFAULT}
                            type="text"
                            value={firstname || ""}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <label className={"form-label"} htmlFor="lastname">{LABELS_AND_HEADINGS.LAST_NAME}</label>
                        <input
                            id="lastname"
                            className={CLASSES.FORM_INPUT_DEFAULT}
                            type="text"
                            value={lastname || ""}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <label className={"form-label"} htmlFor="website">{LABELS_AND_HEADINGS.WEBSITE}</label>
                        <input
                            id="website"
                            className={CLASSES.FORM_INPUT_DEFAULT}
                            type="text"
                            value={website || ""}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <button className={"btn btn-primary"}
                                onClick={() => updateProfileData({firstname, lastname, website})}
                                disabled={loading}>
                            {loading ? <Spinner small={true} color={"text-black"}/> : LABELS_AND_HEADINGS.UPDATE}
                        </button>
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.PROFILE_IMAGE}</h2>
                        <Avatar
                            onUpload={(avatar_image_filename) => {
                                setAvatarImageFilename(avatar_image_filename);
                                updateProfileData({avatar_image_filename: avatar_image_filename}).then(() => "Do something");
                            }}
                        />
                    </div>
                </div>

                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.PASSWORD}</h2>
                        <p>{TEXTS.SETTINGS_RESET_PASSWORD}</p>
                        <button className={"btn btn-primary btn-cta"}
                                onClick={() => requestPasswordResetForEmail(user.email)}
                                disabled={loading}>
                            {loading ? <Spinner small={true} color={"text-black"}/> : LABELS_AND_HEADINGS.RESET_PASSWORD}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Settings;

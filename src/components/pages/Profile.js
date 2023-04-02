import {useAppContext} from "../../context/AppContext";
import React, {useEffect, useState} from "react";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, MESSAGES, TABLES, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {Icon, SendIcon} from "../icons";
import {ImageUploader} from "../ImageUploader";
import {ProfileInfoEdit} from "./ProfileInfoEdit";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {supabase} from "../../supabase/supabaseClient";


const Profile = () => {

    const [newProfile, setNewProfile] = useState({});
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {profile, setProfile, fetchProfileData} = useAppContext();
    const [message, setMessage] = useState({show: false, text: "", isError: false});
    const [pwMessage, setPwMessage] = useState({show: false, text: "", isError: false});
    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        fetchProfileData(profile.id);
        setImageFilename(profile.image_filename);
        setImageUrl(profile.image_url);
        setLoading(false);
    }, [setImageFilename, setImageUrl, imageFilename, imageUrl, profile.image_filename, profile.image_url, fetchProfileData, profile.id]);

    useEffect(() => {
        setNewProfile({...profile});
    }, [profile])

    const handleChangeEmail = async () => {
        try {
            await supabase.auth.updateUser({email: newEmail}).then(async () => {
                fetchProfileData(profile.id);
                setMessage({show: true, text: MESSAGES.SUCCESS.VALIDATION_EMAIL_REQUEST_FORM, isError: false});
            });
        } catch (error) {
            setMessage({show: true, text: MESSAGES.ERROR.VALIDATION_EMAIL_REQUEST_FORM, isError: true})
            console.error(error);
        }
    }

    const handleChangePassword = async () => {
        try {
            await supabase.auth.updateUser({password: newPassword});
            fetchProfileData(profile.id);
            setPwMessage({show: true, text: MESSAGES.SUCCESS.VALIDATION_PASSWORD_REQUEST_FORM, isError: false})
        } catch (error) {
            setPwMessage({show: true, text: MESSAGES.ERROR.VALIDATION_PASSWORD_REQUEST_FORM, isError: true})
            console.error(error);
        }
    }

    return (
        <main className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.SETTINGS}/>
                                <p className={"lead"}>{TEXTS.SETTINGS_LEAD}</p>
                                <p>{TEXTS.SETTINGS_INFO}</p>
                                <p>
                                    <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                        <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                                        admin@svenskamarvelsamlare.se
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <ProfileInfoEdit profile={profile} setProfile={setProfile} newProfile={newProfile} setNewProfile={setNewProfile}/>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{LABELS_AND_HEADINGS.IMAGE}</h2>
                                    <ImageUploader
                                        imageUrl={imageUrl}
                                        setImageUrl={setImageUrl}
                                        imageFilename={imageFilename}
                                        setImageFilename={setImageFilename}
                                        uploading={uploading}
                                        setUploading={setUploading}
                                        bucketName={BUCKETS.AVATAR_IMAGES}
                                        tableName={TABLES.PROFILES}
                                        fileType={FILETYPES.AVATAR_IMAGE}
                                        id={profile.id}
                                        update={() => fetchProfileData(profile.id)}
                                    />
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{LABELS_AND_HEADINGS.SETTINGS_CREDENTIALS}</h2>
                                    <p>{TEXTS.SETTINGS_CREDENTIALS}</p>
                                    <div className={"mb-3"}>
                                        <label className={"form-label"} htmlFor="input-email">{LABELS_AND_HEADINGS.NEW_EMAIL}</label>
                                        <input id="input-email"
                                               type="email"
                                               onChange={(e) => setNewEmail(e.target.value)}
                                               className={"form-control mb-3"}
                                               placeholder={"name@myplace.se"}
                                               required/>
                                        <label className={"form-label"} htmlFor="input-confirm-email">{LABELS_AND_HEADINGS.CONFIRM_NEW_EMAIL}</label>
                                        <input id="input-confirm-email"
                                               type="email"
                                               onChange={(e) => setConfirmNewEmail(e.target.value)}
                                               className={"form-control"}
                                               placeholder={"name@myplace.se"}
                                               required/>
                                        <div className={"form-text mb-3"}>{TEXTS.CHANGE_EMAIL_SEND_INFO}</div>
                                        <button className={"btn btn-primary sms-btn"} onClick={() => handleChangeEmail()}
                                                disabled={newEmail === "" || newEmail !== confirmNewEmail}>
                                            <SendIcon className={"me-2"}/>{LABELS_AND_HEADINGS.SEND}
                                        </button>
                                        {message.show && <p className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3`}
                                                            role={"alert"}>{message.text}</p>}
                                    </div>
                                    <div>
                                        <label className={"form-label d-flex"} htmlFor="input-current-password">{LABELS_AND_HEADINGS.NEW_PASSWORD}</label>
                                        <input id="input-current-password"
                                               type="password"
                                               onChange={(e) => setNewPassword(e.target.value)}
                                               className={"form-control mb-3"}
                                               placeholder={"********"}
                                               required/>
                                        <label className={"form-label d-flex"}
                                               htmlFor="input-new-password">{LABELS_AND_HEADINGS.PASSWORD_CONFIRM}</label>
                                        <input id="input-new-password"
                                               type="password"
                                               onChange={(e) => setConfirmNewPassword(e.target.value)}
                                               className={"form-control"}
                                               placeholder={"********"}
                                               required/>
                                        <div className={"form-text mb-3"}>{TEXTS.CHANGE_PASSWORD_SEND_INFO}</div>
                                        <button className={"btn btn-primary sms-btn"} onClick={() => handleChangePassword()}
                                                disabled={confirmNewPassword === "" || newPassword !== confirmNewPassword}>
                                            <SendIcon className={"me-2"}/>{LABELS_AND_HEADINGS.SEND}
                                        </button>
                                        {pwMessage.show && <p className={`alert ${pwMessage.isError ? "alert-danger" : "alert-success"} mt-3`}
                                                              role={"alert"}>{pwMessage.text}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}

export default Profile;

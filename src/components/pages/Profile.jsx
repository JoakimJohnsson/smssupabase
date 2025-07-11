import {useAppContext} from "../../context/AppContext";
import React, {useEffect, useState} from "react";
import {FILETYPES} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {MESSAGES} from "../../helpers/constants/textConstants/messages";
import {BUCKETS, TABLES} from "../../helpers/constants/serviceConstants";
import {HeadingWithBreadcrumbs} from "../headings/HeadingWithBreadcrumbs.jsx";
import {Icon, mailIcon} from "../icons/Icons.jsx";
import {ImageUploader} from "../ImageUploader";
import {ProfileInfoEdit} from "./ProfileInfoEdit";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {supabase} from "../../supabase/supabaseClient";
import {ProfileInfoCredentials} from "./ProfileInfoCredentials";
import {PageSectionLight} from "./pagecomponents/PageSectionLight.jsx";


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
        <>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <div className={"sms-page-col"}>
                            <HeadingWithBreadcrumbs text={LABELS.COMMON.SETTINGS}/>
                            <p className={"lead"}>{TEXTS.SETTINGS_LEAD}</p>
                            <p>{TEXTS.SETTINGS_INFO}</p>
                            <p>
                                <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                    <Icon icon={mailIcon} className={"me-2"}/>
                                    admin@svenskamarvelsamlare.se
                                </a>
                            </p>
                        </div>
                        <div className={"row"}>
                            <PageSectionLight>
                                <ProfileInfoEdit profile={profile} setProfile={setProfile} newProfile={newProfile}
                                                 setNewProfile={setNewProfile}/>
                            </PageSectionLight>
                            <PageSectionLight>
                                <ProfileInfoCredentials
                                    newEmail={newEmail}
                                    setNewEmail={setNewEmail}
                                    confirmNewEmail={confirmNewEmail}
                                    setConfirmNewEmail={setConfirmNewEmail}
                                    handleChangeEmail={handleChangeEmail}
                                    message={message}
                                    pwMessage={pwMessage}
                                    newPassword={newPassword}
                                    setNewPassword={setNewPassword}
                                    confirmNewPassword={confirmNewPassword}
                                    setConfirmNewPassword={setConfirmNewPassword}
                                    handleChangePassword={handleChangePassword}
                                />
                            </PageSectionLight>
                            <PageSectionLight>
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
                            </PageSectionLight>
                        </div>
                    </>
            }
        </>
    )
}

export default Profile;

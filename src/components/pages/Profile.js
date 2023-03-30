import {useAppContext} from "../../context/AppContext";
import React, {useEffect, useState} from "react";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";
import {ImageUploader} from "../ImageUploader";
import {ProfileInfoEdit} from "./ProfileInfoEdit";
import {OverlaySpinner} from "../minis/OverlaySpinner";


const Profile = () => {

    const [newProfile, setNewProfile] = useState({});
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {profile, setProfile, fetchProfileData} = useAppContext();

    useEffect(() => {
        fetchProfileData(profile.id);
        setImageFilename(profile.image_filename);
        setImageUrl(profile.image_url);
        setLoading(false);
    }, [setImageFilename, setImageUrl, imageFilename, imageUrl, profile.image_filename, profile.image_url, fetchProfileData, profile.id]);

    useEffect(() => {
        setNewProfile({...profile});
    }, [profile])

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
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}

export default Profile;

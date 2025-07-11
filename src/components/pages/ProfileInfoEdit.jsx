import React, {useState} from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {isTrue} from "../../helpers/functions";
import {updateProfileData} from "../../services/profileService";
import {handleChange} from "../../services/serviceFunctions";
import {useSearchParams} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {IconButton} from "../minis/IconButton";
import {editIcon, saveIcon} from "../icons/Icons.jsx";


export const ProfileInfoEdit = ({profile, setProfile, newProfile, setNewProfile}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [loading, setLoading] = useState(false);
    const {setInformationMessage} = useAppContext();

    const handleSubmit = () => {
        setLoading(true);
        updateProfileData(profile.id, newProfile, setInformationMessage).then(() => {
            setSearchParams({edit: false});
            setLoading(false);
        });
        setProfile({...newProfile});
    }

    const handleAbort = () => {
        setNewProfile({...profile});
        setSearchParams({edit: false});
    }

    const handleIsPublicCheckboxChange = (value) => {
        if (value === 1) {
            setNewProfile({...newProfile, "is_public": 0})
        } else {
            setNewProfile({...newProfile, "is_public": 1})
        }
    }
    const handleAllowLocationAccessCheckboxChange = (value) => {
        if (value === 1) {
            setNewProfile({...newProfile, "allow_location_access": 0})
        } else {
            setNewProfile({...newProfile, "allow_location_access": 1})
        }
    }

    return (
        <div className={"mb-4"}>
            <h2>{LABELS.COMMON.EDIT_INFORMATION}</h2>
            <label className={"form-label"} htmlFor="firstname">{LABELS.SECTIONS.USERS.FIRST_NAME}</label>
            <input
                id="firstname"
                name="firstname"
                className={"form-input--default"}
                type="text"
                value={newProfile.firstname || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit || loading}
            />
            <label className={"form-label"} htmlFor="lastname">{LABELS.SECTIONS.USERS.LAST_NAME}</label>
            <input
                id="lastname"
                name="lastname"
                className={"form-input--default"}
                type="text"
                value={newProfile.lastname || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit || loading}
            />
            <label className={"form-label"} htmlFor="website">{LABELS.COMMON.WEBSITE}</label>
            <input
                id="website"
                name="website"
                className={"form-input--default"}
                type="text"
                value={newProfile.website || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit || loading}
            />
            <div className={"mb-3"}>
                <input
                    id={"is_public"}
                    name={"is_public"}
                    className={"form-check-input me-2"}
                    type="checkbox"
                    value={newProfile.is_public}
                    checked={newProfile.is_public === 1}
                    onChange={() => handleIsPublicCheckboxChange(newProfile.is_public)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="is_public">{TEXTS.MAKE_PUBLIC}</label>
            </div>
            <div className={"mb-4 alert alert-info"}>
                <input
                    id={"allow_location_access"}
                    name={"allow_location_access"}
                    className={"form-check-input me-2"}
                    type="checkbox"
                    value={newProfile.allow_location_access}
                    checked={newProfile.allow_location_access === 1}
                    onChange={() => handleAllowLocationAccessCheckboxChange(newProfile.allow_location_access)}
                    disabled={!edit || loading}
                />
                <label className={"form-label text-black"} htmlFor="allow_location_access">{LABELS.SECTIONS.USERS.ALLOW_LOCATION_ACCESS}</label>
                <div className={"fs-small text-info--darker"}>{TEXTS.ALLOW_LOCATION_ACCESS_PROMPT}</div>
            </div>
            {
                edit ?
                    <>
                        <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS.COMMON.SAVE} icon={saveIcon} loading={loading}/>
                        <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                            {LABELS.COMMON.ABORT}
                        </button>
                    </>
                    :
                    <>
                        <IconButton variant={"primary"} onClick={() => setSearchParams({edit: true})} label={LABELS.COMMON.EDIT} icon={editIcon}/>
                    </>
            }
        </div>
    )
}

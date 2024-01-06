import React from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {isTrue} from "../../helpers/functions";
import {updateProfileData} from "../../services/profileService";
import {handleChange} from "../../services/serviceFunctions";
import {useSearchParams} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {IconButton} from "../minis/IconButton";
import {editIcon, saveIcon} from "../icons";


export const ProfileInfoEdit = ({profile, setProfile, newProfile, setNewProfile}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const {setInformationMessage} = useAppContext();

    const handleSubmit = () => {
        updateProfileData(profile.id, newProfile, setInformationMessage).then(() => setSearchParams({edit: false}));
        setProfile({...newProfile});
    }

    const handleAbort = () => {
        setNewProfile({...profile});
        setSearchParams({edit: false});
    }

    const handlePublicCheckboxChange = (value) => {
        if (value === 1) {
            setNewProfile({...newProfile, "is_public": 0})
        } else {
            setNewProfile({...newProfile, "is_public": 1})
        }
    }

    return (
        <div className={"mb-4"}>
            <h2>{LABELS_AND_HEADINGS.EDIT_INFORMATION}</h2>
            <label className={"form-label"} htmlFor="firstname">{LABELS_AND_HEADINGS.FIRST_NAME}</label>
            <input
                id="firstname"
                name="firstname"
                className={CLASSES.FORM_INPUT_DEFAULT}
                type="text"
                value={newProfile.firstname || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit}
            />
            <label className={"form-label"} htmlFor="lastname">{LABELS_AND_HEADINGS.LAST_NAME}</label>
            <input
                id="lastname"
                name="lastname"
                className={CLASSES.FORM_INPUT_DEFAULT}
                type="text"
                value={newProfile.lastname || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit}
            />
            <label className={"form-label"} htmlFor="website">{LABELS_AND_HEADINGS.WEBSITE}</label>
            <input
                id="website"
                name="website"
                className={CLASSES.FORM_INPUT_DEFAULT}
                type="text"
                value={newProfile.website || ""}
                onChange={(e) => handleChange(newProfile, setNewProfile, e.target.name, e.target.value)}
                disabled={!edit}
            />
            <div className={"mb-3"}>
                <input
                    id={"is_public"}
                    name={"is_public"}
                    className={"form-check-input me-2"}
                    type="checkbox"
                    value={newProfile.is_public}
                    checked={newProfile.is_public === 1}
                    onChange={() => handlePublicCheckboxChange(newProfile.is_public)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="is_public">{LABELS_AND_HEADINGS.IS_PUBLIC}</label>
            </div>
            {
                edit ?
                    <>
                        <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS_AND_HEADINGS.SAVE} icon={saveIcon}/>
                        <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                            {LABELS_AND_HEADINGS.ABORT}
                        </button>
                    </>
                    :
                    <>
                        <IconButton variant={"primary"} onClick={() => setSearchParams({edit: true})} label={LABELS_AND_HEADINGS.EDIT} icon={editIcon}/>
                    </>
            }
        </div>
    )
}

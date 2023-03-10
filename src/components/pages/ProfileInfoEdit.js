import React from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {isTrue} from "../../helpers/functions/functions";
import {updateProfileData} from "../../helpers/functions/serviceFunctions/profileFunctions";
import {handleChange} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {useSearchParams} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";


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

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
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
                {
                    edit ?
                        <>
                            <button onClick={handleSubmit} className={"btn btn-primary sms-btn"}>
                                {LABELS_AND_HEADINGS.SAVE}
                            </button>
                            <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                {LABELS_AND_HEADINGS.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => setSearchParams({edit: true})} className={"btn btn-primary sms-btn"}>
                                {LABELS_AND_HEADINGS.EDIT}
                            </button>
                        </>
                }
            </div>
        </div>
    )
}

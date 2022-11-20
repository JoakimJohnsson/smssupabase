import React, {useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {addPublisherData} from "../../../serviceFunctions";
import {handleBacking, handleNameInput, hideAndResetMessage, printOptions} from "../../../../helpers/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {AdminH1} from "../../../headings";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {useNavigate} from "react-router-dom";


export const AdminPublisherAdd = () => {

    const [
        name, setName,
        formMessage, setFormMessage,
        nameValidated, setNameValidated,
        formInputClass, setFormInputClass
    ] = useCommonFormStates();

    const navigate = useNavigate();

    const [countryId, setCountryId] = useState("");

    const resetAddPublisherForm = async () => {
        setName("");
        setNameValidated(false);
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        hideAndResetMessage(setFormMessage);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row main-row-padding"}>
                <div className={"col-12"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                </div>
            </div>
            <div className={"row secondary-row-padding"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                        <input
                            id="name"
                            className={formInputClass}
                            type="text"
                            value={name || ""}
                            onChange={e => handleNameInput(e, setName, setFormInputClass, setNameValidated)}
                        />
                        <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                        {
                            countryData &&
                            <select
                                id="country"
                                className={"form-select mb-3"}
                                onChange={(e) => setCountryId(e.target.value)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(countryData)}
                            </select>
                        }
                        <button className={"btn btn-primary"}
                                onClick={() => addPublisherData({
                                    name: name,
                                    countryId: countryId
                                }, setFormMessage).then(() => resetAddPublisherForm())}
                                disabled={!nameValidated}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-outline-secondary"}
                                onClick={resetAddPublisherForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                        {
                            formMessage.show &&
                            <p className={formMessage.error ? "alert alert-danger mt-3" : "alert alert-success mt-3"}>
                                {formMessage.message}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

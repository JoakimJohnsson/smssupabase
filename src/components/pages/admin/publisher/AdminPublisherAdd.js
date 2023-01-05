import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {addPublisherData, handleInput} from "../../../serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";


export const AdminPublisherAdd = () => {

    const [
        name, setName,
        description, setDescription,
        formInputClass, setFormInputClass
    ] = useCommonFormStates();

    const {setInformationMessage} = useAppContext();
    const navigate = useNavigate();
    const [countryId, setCountryId] = useState("");

    const resetAddPublisherForm = async () => {
        setName("");
        setDescription("");
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
    }

    useEffect(() => {
        if (countryId && name !== "" && description !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_SUCCESS);
        } else if (countryId || name !== "" || description !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_DEFAULT)
        } else {
            setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        }
    }, [name, description, countryId, setFormInputClass])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                        <input
                            id="name"
                            className={formInputClass}
                            type="text"
                            value={name || ""}
                            onChange={e => handleInput(e, setName)}
                        />
                        <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                        <input
                            id="description"
                            className={formInputClass}
                            type="text"
                            value={description || ""}
                            onChange={e => handleInput(e, setDescription)}
                        />
                        <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                        {
                            countryData &&
                            <select
                                id="country"
                                className={formInputClass}
                                onChange={(e) => setCountryId(e.target.value)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(countryData)}
                            </select>
                        }
                        <button className={"btn btn-primary"}
                                onClick={() => addPublisherData({
                                    name: name,
                                    description: description,
                                    countryId: countryId
                                }, setInformationMessage).then(() => resetAddPublisherForm())}
                                disabled={!countryId || name === "" || description === ""}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-outline-secondary"}
                                onClick={resetAddPublisherForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

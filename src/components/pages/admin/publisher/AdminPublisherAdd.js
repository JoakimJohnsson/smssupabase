import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {addPublisherData} from "../../../../helpers/functions/serviceFunctions/publisherFunctions";
import {handleInput} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminPublisherAdd = () => {

    const [
        name, setName,
        description, setDescription,
        wiki_url, setWiki_url,
        formInputClass, setFormInputClass
    ] = useCommonFormStates();

    const {setInformationMessage} = useAppContext();
    const navigate = useNavigate();
    const [country_id, setCountry_id] = useState("");

    const resetAddPublisherForm = async () => {
        setName("");
        setDescription("");
        setWiki_url("");
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
    }

    useEffect(() => {
        if (country_id && name !== "" && description !== "" && wiki_url !== !"") {
            setFormInputClass(CLASSES.FORM_INPUT_SUCCESS);
        } else if (country_id || name !== "" || description !== "" || wiki_url !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_DEFAULT)
        } else {
            setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        }
    }, [name, description, country_id, setFormInputClass, wiki_url])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                        <input
                            id="name"
                            name="name"
                            className={formInputClass}
                            type="text"
                            value={name || ""}
                            onChange={(e) => handleInput(e, setName)}
                        />
                        <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                        <input
                            id="description"
                            name="description"
                            className={formInputClass}
                            type="text"
                            value={description || ""}
                            onChange={(e) => handleInput(e, setDescription)}
                        />
                        <label className={"form-label"} htmlFor="wikiurl">{LABELS_AND_HEADINGS.WIKI_URL_DB}</label>
                        <input
                            id="wikiurl"
                            name="wiki_url"
                            className={formInputClass}
                            type="text"
                            value={wiki_url || ""}
                            onChange={(e) => handleInput(e, setWiki_url)}
                        />
                        <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                        {
                            countryData &&
                            <select
                                id="country"
                                name="country"
                                className={formInputClass}
                                onChange={(e) => setCountry_id(e.target.value)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(countryData)}
                            </select>
                        }
                        <button className={"btn btn-primary"}
                                onClick={() => addPublisherData({
                                    name: name,
                                    description: description,
                                    wiki_url: wiki_url,
                                    country_id: country_id
                                }, setInformationMessage).then(() => resetAddPublisherForm())}
                                disabled={!country_id || name === "" || description === "" || wiki_url === ""}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-secondary"}
                                onClick={resetAddPublisherForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

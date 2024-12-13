import React, {useEffect, useState} from "react";
import {addPublisherData} from "../../../../services/publisherService";
import {handleInput} from "../../../../services/serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const AdminPublisherAdd = () => {

    const {
        name,
        setName,
        description,
        setDescription,
        wiki_url,
        setWiki_url,
        formInputClass,
        setFormInputClass
    } = useCommonFormStates();

    const {setInformationMessage} = useAppContext();
    const navigate = useNavigate();
    const [country_id, setCountry_id] = useState("");

    const resetAddPublisherForm = async () => {
        setName("");
        setDescription("");
        setWiki_url("");
        setFormInputClass("form-input--error");
    }

    useEffect(() => {
        if (country_id && name !== "" && description !== "" && wiki_url !== !"") {
            setFormInputClass("form-input--success");
        } else if (country_id || name !== "" || description !== "" || wiki_url !== "") {
            setFormInputClass("form-input--default")
        } else {
            setFormInputClass("form-input--error");
        }
    }, [name, description, country_id, setFormInputClass, wiki_url])

    return (
        <main id="main-content" className={"main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.PUBLISHERS.ADD_PUBLISHER}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-section--light"}>
                        <label className={"form-label"} htmlFor="name">{LABELS.COMMON.NAME_DB}</label>
                        <input
                            id="name"
                            name="name"
                            className={formInputClass}
                            type="text"
                            value={name || ""}
                            onChange={(e) => handleInput(e, setName)}
                        />
                        <label className={"form-label"} htmlFor="description">{LABELS.COMMON.DESCRIPTION_DB}</label>
                        <input
                            id="description"
                            name="description"
                            className={formInputClass}
                            type="text"
                            value={description || ""}
                            onChange={(e) => handleInput(e, setDescription)}
                        />
                        <label className={"form-label"} htmlFor="wikiurl">{LABELS.COMMON.WIKI_URL_DB}</label>
                        <input
                            id="wikiurl"
                            name="wiki_url"
                            className={formInputClass}
                            type="text"
                            value={wiki_url || ""}
                            onChange={(e) => handleInput(e, setWiki_url)}
                        />
                        <label className={"form-label"} htmlFor="country">{LABELS.SECTIONS.PUBLISHERS.COUNTRY_DB}</label>
                        {
                            countryData &&
                            <select
                                id="country"
                                name="country"
                                className={formInputClass}
                                onChange={(e) => setCountry_id(e.target.value)}>
                                <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                                {printOptions(countryData)}
                            </select>
                        }
                        <button className={"btn btn-primary sms-btn"}
                                onClick={() => addPublisherData({
                                    name: name,
                                    description: description,
                                    wiki_url: wiki_url,
                                    country_id: country_id
                                }, setInformationMessage).then(() => resetAddPublisherForm())}
                                disabled={!country_id || name === "" || description === "" || wiki_url === ""}>
                            {LABELS.COMMON.ADD}
                        </button>
                        <button className={"btn btn-secondary sms-btn"}
                                onClick={resetAddPublisherForm}>
                            {LABELS.COMMON.RESET_FORM}
                        </button>
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS.COMMON.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

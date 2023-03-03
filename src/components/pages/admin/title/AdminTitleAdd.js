import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {addTitleData} from "../../../../helpers/functions/serviceFunctions/titleFunctions";
import {getRowsByTable, handleInput} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminTitleAdd = () => {

    const [
        name, setName,
        description, setDescription,
        wiki_url, setWiki_url,
        formInputClass, setFormInputClass,
    ] = useCommonFormStates();

    const {setInformationMessage} = useAppContext();
    const [start_year, setStart_year] = useState(1975);
    const [end_year, setEnd_year] = useState(1975);
    const [format_id, setFormat_id] = useState("");
    const [total_issues, setTotal_issues] = useState(12);
    const [publishersData, setPublishersData] = useState(null);
    const [publisher_id, setPublisher_id] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    const resetAddTitleForm = async () => {
        setName("");
        setDescription("");
        setWiki_url("");
        setStart_year(1975);
        setEnd_year(1975);
        setTotal_issues(12);
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
    }

    useEffect(() => {
        if (format_id && publisher_id && start_year && end_year && total_issues && name !== "" && description !== "" && wiki_url !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_SUCCESS);
        } else if (format_id || publisher_id || start_year || end_year || total_issues || name !== "" || description !== "" || wiki_url !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_DEFAULT)
        } else {
            setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        }
    }, [format_id, publisher_id, name, description, wiki_url, start_year, end_year, total_issues, setFormInputClass])


    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADD_TITLE}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                        <input
                            id={"name"}
                            name={"name"}
                            className={formInputClass}
                            type={"text"}
                            value={name || ""}
                            onChange={(e) => handleInput(e, setName)}
                        />
                        <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                        <input
                            id={"description"}
                            name={"description"}
                            className={formInputClass}
                            type={"text"}
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
                        <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                        <input
                            id="startyear"
                            name={"start_year"}
                            className={formInputClass}
                            type="number"
                            value={start_year || ""}
                            onChange={(e) => handleInput(e, setStart_year)}
                        />
                        <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                        <input
                            id="endyear"
                            name={"end_year"}
                            className={formInputClass}
                            type="number"
                            value={end_year || ""}
                            onChange={(e) => handleInput(e, setEnd_year)}
                        />
                        <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHER_DB}</label>
                        {
                            publishersData &&
                            <select
                                id="publisher"
                                name={"publisher_id"}
                                className={formInputClass}
                                onChange={(e) => handleInput(e, setPublisher_id)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(publishersData)}
                            </select>
                        }
                        <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                        {
                            formatData &&
                            <select
                                id="format"
                                name={"format_id"}
                                className={formInputClass}
                                onChange={(e) => handleInput(e, setFormat_id)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(formatData)}
                            </select>
                        }
                        <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                        <input
                            id="totalissues"
                            name={"total_issues"}
                            className={formInputClass}
                            type="number"
                            min="1"
                            value={total_issues || ""}
                            onChange={(e) => handleInput(e, setTotal_issues)}
                        />
                        <button className={"btn btn-primary"}
                                onClick={() => addTitleData({
                                    name: name,
                                    description: description,
                                    wiki_url: wiki_url,
                                    start_year: start_year,
                                    end_year: end_year,
                                    publisher_id: publisher_id,
                                    format_id: format_id,
                                    total_issues: total_issues,
                                }, setInformationMessage).then(() => resetAddTitleForm())}
                                disabled={!start_year || !end_year || !total_issues || name === "" || description === "" || wiki_url === ""}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-secondary"}
                                onClick={resetAddTitleForm}>
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

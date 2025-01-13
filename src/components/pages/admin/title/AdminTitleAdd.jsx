import React, {useEffect, useState} from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {addTitleData} from "../../../../services/titleService";
import {handleInput} from "../../../../services/serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminTitleAdd = () => {

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
    const [start_year, setStart_year] = useState(1975);
    const [end_year, setEnd_year] = useState(1975);
    const [format_id, setFormat_id] = useState("");
    const [comics_org_url, setComics_org_url] = useState("");
    const [total_issues, setTotal_issues] = useState(12);

    const navigate = useNavigate();

    const resetAddTitleForm = async () => {
        setName("");
        setDescription("");
        setWiki_url("");
        setComics_org_url("");
        setStart_year(1975);
        setEnd_year(1975);
        setTotal_issues(12);
        setFormInputClass("form-input--error");
    }

    useEffect(() => {
        if (format_id && start_year && end_year && total_issues && name !== "" && description !== "" && wiki_url !== "" && comics_org_url !== "") {
            setFormInputClass("form-input--success");
        } else if (format_id || start_year || end_year || total_issues || name !== "" || description !== "" || wiki_url !== "" || comics_org_url !== "") {
            setFormInputClass("form-input--default")
        } else {
            setFormInputClass("form-input--error");
        }
    }, [format_id, name, description, wiki_url, comics_org_url, start_year, end_year, total_issues, setFormInputClass])


    return (
        <>
            <div className={"col-12"}>
                <HeadingWithBreadCrumbs text={LABELS.SECTIONS.TITLES.ADD_TITLE}/>
            </div>
            <div className={"sms-dashboard-col"}>
                <div className={"sms-section--light"}>
                    <label className={"form-label"} htmlFor="name">{LABELS.COMMON.NAME_DB}</label>
                    <input
                        id={"name"}
                        name={"name"}
                        className={formInputClass}
                        type={"text"}
                        value={name || ""}
                        onChange={(e) => handleInput(e, setName)}
                    />
                    <label className={"form-label"} htmlFor="description">{LABELS.COMMON.DESCRIPTION_DB}</label>
                    <input
                        id={"description"}
                        name={"description"}
                        className={formInputClass}
                        type={"text"}
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
                    <label className={"form-label"}
                           htmlFor="comicsorgurl">{LABELS.SECTIONS.TITLES.COMICS_ORG_URL_DB}</label>
                    <input
                        id="comicsorgurl"
                        name="comics_orgurl"
                        className={formInputClass}
                        type="text"
                        value={comics_org_url || ""}
                        onChange={(e) => handleInput(e, setComics_org_url)}
                    />
                    <label className={"form-label"} htmlFor="startyear">{LABELS.COMMON.START_YEAR_DB}</label>
                    <input
                        id="startyear"
                        name={"start_year"}
                        className={formInputClass}
                        type="number"
                        value={start_year || ""}
                        onChange={(e) => handleInput(e, setStart_year)}
                    />
                    <label className={"form-label"} htmlFor="endyear">{LABELS.SECTIONS.TITLES.END_YEAR_DB}</label>
                    <input
                        id="endyear"
                        name={"end_year"}
                        className={formInputClass}
                        type="number"
                        value={end_year || ""}
                        onChange={(e) => handleInput(e, setEnd_year)}
                    />
                    <label className={"form-label"} htmlFor="format">{LABELS.SECTIONS.TITLES.FORMAT_DB}</label>
                    {
                        formatData &&
                        <select
                            id="format"
                            name={"format_id"}
                            className={formInputClass}
                            onChange={(e) => handleInput(e, setFormat_id)}>
                            <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                            {printOptions(formatData)}
                        </select>
                    }
                    <label className={"form-label"} htmlFor="totalissues">{LABELS.COMMON.TOTAL_ISSUES_DB}</label>
                    <input
                        id="totalissues"
                        name={"total_issues"}
                        className={formInputClass}
                        type="number"
                        min="1"
                        value={total_issues || ""}
                        onChange={(e) => handleInput(e, setTotal_issues)}
                    />
                    <button className={"btn btn-primary sms-btn"}
                            onClick={() => addTitleData({
                                name: name,
                                description: description,
                                wiki_url: wiki_url,
                                comics_org_url: comics_org_url,
                                start_year: start_year,
                                end_year: end_year,
                                format_id: format_id,
                                total_issues: total_issues,
                            }, setInformationMessage).then(() => resetAddTitleForm())}
                            disabled={!start_year || !end_year || !total_issues || name === "" || description === "" || wiki_url === "" || comics_org_url === ""}>
                        {LABELS.COMMON.ADD}
                    </button>
                    <button className={"btn btn-secondary sms-btn"}
                            onClick={resetAddTitleForm}>
                        {LABELS.COMMON.RESET_FORM}
                    </button>
                    <IconButton variant={"outline-primary"} icon={faArrowLeft}
                                onClick={() => handleBacking(navigate)}
                                label={LABELS.COMMON.BACK}/>
                </div>
            </div>
        </>
    )
}

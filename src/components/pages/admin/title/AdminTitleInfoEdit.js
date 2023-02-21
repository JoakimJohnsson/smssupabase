import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {getRowsByTable, handleChange, updateTitleData} from "../../../serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminTitleInfoEdit = ({title, setTitle, newTitle, setNewTitle}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const navigate = useNavigate();
    const [publishersData, setPublishersData] = useState(null);
    const {setInformationMessage} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    const handleSubmit = () => {
        updateTitleData(title.id, newTitle, setInformationMessage).then(() => setSearchParams({edit: false}));
        setTitle({...newTitle});
    }

    const handleAbort = () => {
        setNewTitle({...title});
        setSearchParams({edit: false});
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-form"}>
                <h2>{LABELS_AND_HEADINGS.EDIT_INFORMATION}</h2>
                <label className={"form-label"} htmlFor="fileName">{LABELS_AND_HEADINGS.NAME_DB}</label>
                <input
                    id={"fileName"}
                    fileName={"fileName"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.fileName || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                <input
                    id={"description"}
                    fileName={"description"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.description || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.WIKI_URL_DB}</label>
                <input
                    id={"wikiurl"}
                    fileName={"wiki_url"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.wiki_url || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                <input
                    id={"startyear"}
                    fileName={"start_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.start_year || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                <input
                    id={"endyear"}
                    fileName={"end_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.end_year || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHER_DB}</label>
                {
                    publishersData &&
                    <select
                        id={"publisher"}
                        fileName={"publisher_id"}
                        className={"form-select mb-3"}
                        value={newTitle.publisher_id || ""}
                        disabled={!edit}
                        onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(publishersData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                {
                    formatData &&
                    <select
                        id={"format"}
                        fileName={"format_id"}
                        className={"form-select mb-3"}
                        value={newTitle.format_id}
                        disabled={!edit}
                        onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(formatData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                <input
                    id={"totalissues"}
                    fileName={"total_issues"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    min="1"
                    value={newTitle.total_issues || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.fileName, e.target.value)}
                    disabled={!edit}
                />
                {
                    edit ?
                        <>
                            <button onClick={handleSubmit} className={"btn btn-primary"}>
                                {LABELS_AND_HEADINGS.SAVE}
                            </button>
                            <button className={"btn btn-secondary"} onClick={handleAbort}>
                                {LABELS_AND_HEADINGS.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => setSearchParams({edit: true})} className={"btn btn-primary"}>
                                {LABELS_AND_HEADINGS.EDIT}
                            </button>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(ROUTES.ADMIN.TITLES)}
                                        label={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        </>
                }
            </div>
        </div>
    )
}

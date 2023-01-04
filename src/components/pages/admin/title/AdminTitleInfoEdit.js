import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {getRowsByTable, handleChange, updateTitleData} from "../../../serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";


export const AdminTitleInfoEdit = ({title, setTitle, newTitle, setNewTitle}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const navigate = useNavigate();
    const [publishersData, setPublishersData] = useState(null);
    const {setInformationMessage} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then(() => console.info("Fetched publisher data"));
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
                <h2>Redigera information</h2>
                <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                <input
                    id={"name"}
                    name={"name"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.name}
                    onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                <input
                    id={"description"}
                    name={"description"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.description || ""}
                    onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                />
                <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                <input
                    id={"startyear"}
                    name={"start_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.start_year}
                    onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                <input
                    id={"endyear"}
                    name={"end_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.end_year}
                    onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHERS_DB}</label>
                {
                    publishersData &&
                    <select
                        id={"publisher"}
                        name={"publisher_id"}
                        className={"form-select mb-3"}
                        value={newTitle.publisher_id}
                        disabled={!edit}
                        onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(publishersData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                {
                    formatData &&
                    <select
                        id={"format"}
                        name={"format_id"}
                        className={"form-select mb-3"}
                        value={newTitle.format_id}
                        disabled={!edit}
                        onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(formatData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                <input
                    id={"totalissues"}
                    name={"total_issues"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    min="1"
                    value={newTitle.total_issues}
                    onChange={e => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                {
                    edit ?
                        <>
                            <button onClick={handleSubmit} className={"btn btn-primary"}>
                                {LABELS_AND_HEADINGS.SAVE}
                            </button>
                            <button className={"btn btn-outline-secondary"} onClick={handleAbort}>
                                {LABELS_AND_HEADINGS.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => setSearchParams({edit: true})} className={"btn btn-primary"}>
                                {LABELS_AND_HEADINGS.EDIT}
                            </button>
                            <ArrowLeftButton onClick={() => navigate(ROUTES.ADMIN.TITLES)} label={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        </>
                }
            </div>
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import {getRowsByTable, handleChange, updateIssueData} from "../../../serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";


export const AdminIssueInfoEdit = ({issue, setIssue, newIssue, setNewIssue, title}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [titlesData, setTitlesData] = useState(null);
    const {setInformationMessage} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => console.info("Fetched titles data"));
    }, [])

    const handleSubmit = () => {
        updateIssueData(issue.id, newIssue, setInformationMessage).then(() => setSearchParams({edit: false}));
        setIssue({...newIssue});
    }

    const handleAbort = () => {
        setNewIssue({...issue});
        setSearchParams({edit: false});
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-form"}>
                <h2>Redigera information</h2>
                <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.TITLE_DB}</label>
                {
                    titlesData &&
                    <select
                        id={"title"}
                        name={"title_id"}
                        className={"form-select mb-3"}
                        value={newIssue.title_id}
                        disabled={!edit}
                        onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(titlesData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="year">{LABELS_AND_HEADINGS.YEAR_DB}</label>
                <input
                    id={"year"}
                    name={"year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newIssue.year}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="number">{LABELS_AND_HEADINGS.NUMBER_DB}</label>
                <input
                    id={"number"}
                    name={"number"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    max={999}
                    min={1}
                    value={newIssue.number}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <div>
                    <input
                        id={"marvelklubben"}
                        name={"is_marvelklubben"}
                        className={"form-check-input me-2"}
                        type="checkbox"
                        value={newIssue.is_marvelklubben}
                        onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                        disabled={!edit}
                    />
                    <label className={"form-label"} htmlFor="marvelklubben">{LABELS_AND_HEADINGS.IS_MARVELKLUBBEN_DB}</label>
                </div>
                <label className={"form-label"} htmlFor="marvelklubbennumber">{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER_DB}</label>
                <input
                    id={"marvelklubbennumber"}
                    name={"marvelklubben_number"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    max={999}
                    min={0}
                    value={newIssue.marvelklubben_number}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
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
                            <ArrowLeftButton onClick={() => navigate(`/admin/titles/${issue.title_id}`)} label={LABELS_AND_HEADINGS.BACK_TO + " " + title.name}/>
                        </>
                }
            </div>
        </div>
    )
}

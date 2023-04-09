import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions/functions";
import {getRowsByTable, handleChange} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {updateIssueData} from "../../../../helpers/functions/serviceFunctions/issueFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminIssueInfoEdit = ({issue, setIssue, newIssue, setNewIssue, title}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [titlesData, setTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, [])

    const handleSubmit = () => {
        updateIssueData(issue.id, newIssue).then(() => setSearchParams({edit: false}));
        setIssue({...newIssue});
    }

    const handleAbort = () => {
        setNewIssue({...issue});
        setSearchParams({edit: false});
    }

    const handleMKCheckboxChange = (value) => {
        if (value === 1) {
            setNewIssue({...newIssue, "is_marvelklubben": 0})
        } else {
            setNewIssue({...newIssue, "is_marvelklubben": 1})
        }
    }

    const handleDoubleCheckboxChange = (value) => {
        if (value === 1) {
            setNewIssue({...newIssue, "is_double": 0})
        } else {
            setNewIssue({...newIssue, "is_double": 1})
        }
    }

    const handleVariantCheckboxChange = (value) => {
        if (value === 1) {
            setNewIssue({...newIssue, "is_variant": 0})
        } else {
            setNewIssue({...newIssue, "is_variant": 1})
        }
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.EDIT_INFORMATION}</h2>
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
                        id={"double"}
                        name={"is_double"}
                        className={"form-check-input me-2"}
                        type="checkbox"
                        value={newIssue.is_double}
                        checked={newIssue.is_double === 1}
                        onChange={() => handleDoubleCheckboxChange(newIssue.is_double)}
                        disabled={!edit}
                    />
                    <label className={"form-label"} htmlFor="double">{LABELS_AND_HEADINGS.IS_DOUBLE_DB}</label>
                </div>
                <div>
                    <input
                        id={"marvelklubben"}
                        name={"is_marvelklubben"}
                        className={"form-check-input me-2"}
                        type="checkbox"
                        value={newIssue.is_marvelklubben}
                        checked={newIssue.is_marvelklubben === 1}
                        onChange={() => handleMKCheckboxChange(newIssue.is_marvelklubben)}
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
                <div>
                    <input
                        id={"variant"}
                        name={"is_variant"}
                        className={"form-check-input me-2"}
                        type="checkbox"
                        value={newIssue.is_variant}
                        checked={newIssue.is_variant === 1}
                        onChange={() => handleVariantCheckboxChange(newIssue.is_variant)}
                        disabled={!edit}
                    />
                    <label className={"form-label"} htmlFor="variant">{LABELS_AND_HEADINGS.IS_VARIANT_DB}</label>
                </div>
                <label className={"form-label"} htmlFor="variantsuffix">{LABELS_AND_HEADINGS.VARIANT_SUFFIX_DB}</label>
                <input
                    id={"variantsuffix"}
                    name={"variant_suffix"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="text"
                    value={newIssue.variant_suffix}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
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
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                        label={LABELS_AND_HEADINGS.BACK_TO + " " + title.name}/>
                        </>
                }
            </div>
        </div>
    )
}

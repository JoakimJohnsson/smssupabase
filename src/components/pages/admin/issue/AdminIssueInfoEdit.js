import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions, printTitleOptions} from "../../../../helpers/functions";
import {getRowsByTable, handleChange} from "../../../../services/serviceFunctions";
import {updateIssueData} from "../../../../services/issueService";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {editIcon, saveIcon} from "../../../icons";


export const AdminIssueInfoEdit = ({issue, setIssue, newIssue, setNewIssue, title}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [titlesData, setTitlesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [publishersData, setPublishersData] = useState(null);

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, [])

    const handleSubmit = () => {
        setLoading(true);
        updateIssueData(issue.id, newIssue).then(() => {
            setSearchParams({edit: false});
            setLoading(false);
        });
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
                        disabled={!edit || loading}
                        onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printTitleOptions(titlesData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHER_DB}</label>
                {
                    publishersData &&
                    <select
                        id={"publisher"}
                        name={"publisher_id"}
                        className={"form-select mb-3"}
                        value={newIssue.publisher_id}
                        disabled={!edit || loading}
                        onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(publishersData)}
                    </select>
                }
                <label className={"form-label"} htmlFor="year">{LABELS_AND_HEADINGS.YEAR_DB}</label>
                <input
                    id={"year"}
                    name={"year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newIssue.year || ""}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="number">{LABELS_AND_HEADINGS.NUMBER_DB}</label>
                <input
                    id={"number"}
                    name={"number"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    max={999}
                    min={1}
                    value={newIssue.number || ""}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label mb-0"} htmlFor="source">{LABELS_AND_HEADINGS.SOURCE_DB}</label>
                <p className={"form-text"}>{LABELS_AND_HEADINGS.SOURCE_EXAMPLE}</p>
                <textarea
                    id={"source"}
                    name={"source"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    rows={3}
                    value={newIssue.source || ""}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit || loading}
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
                        disabled={!edit || loading}
                    />
                    <label className={"form-label"} htmlFor="double">{LABELS_AND_HEADINGS.IS_DOUBLE_DB}</label>
                </div>
                <div>
                    <input
                        id={"marvelklubben"}
                        name={"is_marvelklubben"}
                        className={"form-check-input me-2"}
                        type="checkbox"
                        value={newIssue.is_marvelklubben || ""}
                        checked={newIssue.is_marvelklubben === 1}
                        onChange={() => handleMKCheckboxChange(newIssue.is_marvelklubben)}
                        disabled={!edit || loading}
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
                    value={newIssue.marvelklubben_number || ""}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit || loading}
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
                        disabled={!edit || loading}
                    />
                    <label className={"form-label"} htmlFor="variant">{LABELS_AND_HEADINGS.IS_VARIANT_DB}</label>
                </div>
                <label className={"form-label"} htmlFor="variantsuffix">{LABELS_AND_HEADINGS.VARIANT_SUFFIX_DB}</label>
                <input
                    id={"variantsuffix"}
                    name={"variant_suffix"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="text"
                    value={newIssue.variant_suffix || ""}
                    onChange={(e) => handleChange(newIssue, setNewIssue, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                {
                    edit ?
                        <>
                            <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS_AND_HEADINGS.SAVE} icon={saveIcon} loading={loading}/>
                            <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                {LABELS_AND_HEADINGS.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <IconButton variant={"primary"} onClick={() => setSearchParams({edit: true})} label={LABELS_AND_HEADINGS.EDIT} icon={editIcon}/>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                        label={LABELS_AND_HEADINGS.BACK_TO + " " + title.name}/>
                        </>
                }
            </div>
        </div>
    )
}

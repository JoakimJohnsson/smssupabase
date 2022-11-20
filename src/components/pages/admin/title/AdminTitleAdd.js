import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {addTitleData, getRowsByTable} from "../../../serviceFunctions";
import {handleBacking, handleNameInput, hideAndResetMessage, printOptions} from "../../../../helpers/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {AdminH1} from "../../../headings";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {useNavigate} from "react-router-dom";


export const AdminTitleAdd = () => {

    const [
        name, setName,
        formMessage, setFormMessage,
        nameValidated, setNameValidated,
        formInputClass, setFormInputClass,
    ] = useCommonFormStates();

    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [formatId, setFormatId] = useState("");
    const [totalIssues, setTotalIssues] = useState(12);
    const [publishersData, setPublishersData] = useState(null);
    const [publisherId, setPublisherId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    const resetAddTitleForm = async () => {
        setName("");
        setStartYear(1975);
        setEndYear(1975);
        setTotalIssues(12);
        setNameValidated(false);
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        hideAndResetMessage(setFormMessage);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row main-row-padding"}>
                <div className={"col-12"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADD_TITLE}/>
                </div>
            </div>
            <div className={"row secondary-row-padding"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                        <input
                            id="name"
                            className={formInputClass}
                            type="text"
                            value={name || ""}
                            onChange={e => handleNameInput(e, setName, setFormInputClass, setNameValidated)}
                        />
                        <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                        <input
                            id="startyear"
                            className={formInputClass}
                            type="number"
                            value={startYear || 1975}
                            onChange={(e) => setStartYear(e.target.value)}
                        />
                        <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                        <input
                            id="endyear"
                            className={formInputClass}
                            type="number"
                            value={endYear || 1977}
                            onChange={(e) => setEndYear(e.target.value)}
                        />
                        <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHERS_DB}</label>
                        {
                            publishersData &&
                            <select
                                id="publisher"
                                className={"form-select mb-3"}
                                onChange={(e) => setPublisherId(e.target.value)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(publishersData)}
                            </select>
                        }
                        <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                        {
                            formatData &&
                            <select
                                id="format"
                                className={"form-select mb-3"}
                                onChange={(e) => setFormatId(e.target.value)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(formatData)}
                            </select>
                        }
                        <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                        <input
                            id="totalissues"
                            className={formInputClass}
                            type="number"
                            value={totalIssues || 12}
                            onChange={(e) => setTotalIssues(e.target.value)}
                        />
                        <button className={"btn btn-primary"}
                                onClick={() => addTitleData({
                                    name: name,
                                    startYear: startYear,
                                    endYear: endYear,
                                    publisherId: publisherId,
                                    formatId: formatId,
                                    totalIssues: totalIssues,
                                }, setFormMessage).then(() => resetAddTitleForm())}
                                disabled={!nameValidated}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-outline-secondary"}
                                onClick={resetAddTitleForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                        {
                            formMessage.show &&
                            <p className={formMessage.error ? "alert alert-danger mt-3" : "alert alert-success mt-3"}>
                                {formMessage.message}
                            </p>
                        }
                    </div>
                </div>
            </div>


        </main>
    )
}

import React, {useEffect, useState} from "react";
import {CLASSES, FORMATS, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../Spinner";
import {addTitleData, getFormats, resetAddTitleForm} from "../serviceFunctions";
import {validateText} from "../../helpers/validations";
import {handleGenericFormInput} from "../../helpers/functions";

export const AddTitle = () => {

    const [name, setName] = useState("");
    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [format, setFormat] = useState("");
    const [totalIssues, setTotalIssues] = useState(12);
    const [formatData, setFormatData] = useState(null);
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);

    useEffect(() => {
        getFormats(setLoading, setFormatData).then(() => 'Do something')
    }, [])

    const handleNameInputChange = (e) => {
        setName(e.target.value)
        // Send true for success
        validateText(e) ? handleGenericFormInput(true, setFormInputClass, setNameValidated) : handleGenericFormInput(false, setFormInputClass, setNameValidated);
    }

    const printFormatSelectOptions = (fd) => {
        return fd.map((f, index) => index > 0 ? <option key={f.id} value={f.id}>{FORMATS[f.type - 1]}</option> : <>
            <option key={index} value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
            <option key={f.id} value={f.id}>{FORMATS[f.type - 1]}</option>
        </>)
    }

    return formatData && (<main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ADD_TITLE}</h1>
                    <div className={'row'}>

                        <div className={'sms-form-col'}>
                            <div className={'sms-form'}>
                                <label className={'form-label'} htmlFor='name'>{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id='name'
                                    className={formInputClass}
                                    type='text'
                                    value={name || ''}
                                    onChange={handleNameInputChange}
                                />
                                <label className={'form-label'} htmlFor='startyear'>{LABELS_AND_HEADINGS.START_YEAR}</label>
                                <input
                                    id='startyear'
                                    className={formInputClass}
                                    type='number'
                                    value={startYear || 1975}
                                    onChange={(e) => setStartYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='endyear'>{LABELS_AND_HEADINGS.END_YEAR}</label>
                                <input
                                    id='endyear'
                                    className={formInputClass}
                                    type='number'
                                    value={endYear || 1977}
                                    onChange={(e) => setEndYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='format'>{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                                {loading ? <Spinner/> :
                                    <select name="formats" id="format" className={"form-select mb-3"} onChange={(e) => setFormat(e.target.value)}>
                                        {printFormatSelectOptions(formatData)}
                                    </select>}
                                <label className={'form-label'} htmlFor='totalissues'>{LABELS_AND_HEADINGS.TOTAL_ISSUES}</label>
                                <input
                                    id='totalissues'
                                    className={formInputClass}
                                    type='number'
                                    value={totalIssues || 12}
                                    onChange={(e) => setTotalIssues(e.target.value)}
                                />
                                <button className={'btn btn-primary me-3'}
                                        onClick={() => addTitleData(name, startYear, endYear, format, totalIssues, setFormMessage, setShowFormSuccess, setShowFormError)}
                                        disabled={!nameValidated}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={'btn btn-outline-secondary'}
                                        onClick={() => resetAddTitleForm(setName, setStartYear, setEndYear, setFormat, setTotalIssues, setShowFormError, setShowFormSuccess)}>
                                    {LABELS_AND_HEADINGS.RESET_FORM}
                                </button>
                                {showFormError && <p className={'alert alert-danger mt-3'}>{formMessage}</p>}
                                {showFormSuccess && <p className={'alert alert-success mt-3'}>{formMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>)
}

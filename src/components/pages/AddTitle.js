import React, {useEffect, useState} from "react";
import {CLASSES, FORMATS, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../Spinner";
import {supabase} from "../../supabase/supabaseClient";
import {getFormats} from "../serviceFunctions";

export const AddTitle = () => {

    const [name, setName] = useState("");
    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [format, setFormat] = useState("");
    const [totalIssues, setTotalIssues] = useState(12);
    const [formatData, setFormatData] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFormats(setLoading, setFormatData).then(() => 'Do something')
    }, [])

    // Add title db
    async function addTitleData() {
        try {
            let {error} = await supabase.from('titles').insert([{
                name: name,
                start_year: startYear,
                end_year: endYear,
                format: format,
                total_issues: totalIssues
            }])
            if (error) {
                console.log('Error: ', error);
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            console.log("Done")
        }
    }

    const printFormatSelectOptions = (fd) => {
        return fd.map((f, index) =>
            index > 0 ?
                <option key={f.id} value={f.id}>{FORMATS[f.type - 1]}</option>
                :
                <option key={f.id} defaultValue={f.id}>{FORMATS[f.type - 1]}</option>
        )
    }

    return formatData && (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ADD_TITLE}</h1>
                    <div className={'row'}>

                        <div className={'sms-form-col'}>
                            <div className={'sms-form'}>
                                <label className={'form-label'} htmlFor='name'>{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id='name'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='text'
                                    value={name || ''}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='startyear'>{LABELS_AND_HEADINGS.START_YEAR}</label>
                                <input
                                    id='startyear'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='number'
                                    value={startYear || 1975}
                                    onChange={(e) => setStartYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='endyear'>{LABELS_AND_HEADINGS.END_YEAR}</label>
                                <input
                                    id='endyear'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='number'
                                    value={endYear || 1977}
                                    onChange={(e) => setEndYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='format'>{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                                <select name="formats" id="format" className={"form-select mb-3"} onChange={(e) => setFormat(e.target.value)}>
                                    {printFormatSelectOptions(formatData)}
                                </select>
                                <label className={'form-label'} htmlFor='totalissues'>{LABELS_AND_HEADINGS.TOTAL_ISSUES}</label>
                                <input
                                    id='totalissues'
                                    className={CLASSES.FORM_INPUT_DEFAULT}
                                    type='number'
                                    value={totalIssues || 12}
                                    onChange={(e) => setTotalIssues(e.target.value)}
                                />
                                <button className={'btn btn-primary'}
                                        onClick={() => addTitleData()}
                                        disabled={false}>
                                    {LABELS_AND_HEADINGS.UPDATE}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

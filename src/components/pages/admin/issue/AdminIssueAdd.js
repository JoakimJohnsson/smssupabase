import React, {useEffect, useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {addIssueData, getRowsByTable, handleInput} from "../../../serviceFunctions";
import {handleBacking, printOptions} from "../../../../helpers/functions";
import {useCommonFormStates} from "../../../../helpers/customHooks/useCommonFormStates";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";


export const AdminIssueAdd = () => {

    const [
        formInputClass, setFormInputClass,
    ] = useCommonFormStates();

    const {setInformationMessage} = useAppContext();
    const [title_id, setTitle_id] = useState("");
    const [year, setYear] = useState(1975);
    const [number, setNumber] = useState(1);
    const [is_marvelklubben, setIs_marvelklubben] = useState(false);
    const [marvelklubben_number, setMarvelklubben_number] = useState(1);
    const [titlesData, setTitlesData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, [])

    const resetAddIssueForm = async () => {
        setTitle_id("");
        setYear(1975);
        setNumber(1);
        setIs_marvelklubben(false);
        setMarvelklubben_number(1);
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
    }

    useEffect(() => {
        if (title_id && year && number && is_marvelklubben && marvelklubben_number) {
            setFormInputClass(CLASSES.FORM_INPUT_SUCCESS);
        } else if (title_id || year || number || is_marvelklubben || marvelklubben_number) {
            setFormInputClass(CLASSES.FORM_INPUT_DEFAULT)
        } else {
            setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        }
    }, [title_id, year, number, is_marvelklubben, marvelklubben_number, setFormInputClass])


    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADD_ISSUE}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.TITLE_DB}</label>
                        <select
                            id="title"
                            name="title_id"
                            className={formInputClass}
                            onChange={(e) => handleInput(e, setTitle_id)}>
                            <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                            {printOptions(titlesData)}
                        </select>
                        <label className={"form-label"} htmlFor="year">{LABELS_AND_HEADINGS.YEAR_DB}</label>
                        <input
                            id="year"
                            name="year"
                            className={formInputClass}
                            type="number"
                            value={year || 1975}
                            onChange={(e) => handleInput(e, setYear)}
                        />
                        <label className={"form-label"} htmlFor="number">{LABELS_AND_HEADINGS.NUMBER_DB}</label>
                        <input
                            id="number"
                            name={"number"}
                            className={formInputClass}
                            type="number"
                            min="1"
                            value={number || 1}
                            onChange={(e) => handleInput(e, setNumber)}
                        />
                        <div>

                        <input
                            id="marvelklubben"
                            className={"form-check-input me-2"}
                            type="checkbox"
                            value={is_marvelklubben || false}
                            onChange={(e) => handleInput(e, setIs_marvelklubben)}
                        />
                            <label className={"form-label"} htmlFor="marvelklubben">{LABELS_AND_HEADINGS.IS_MARVELKLUBBEN_DB}</label>
                        </div>
                        <label className={"form-label"} htmlFor="marvelklubbennumber">{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER_DB}</label>
                        <input
                            id="marvelklubbennumber"
                            name={"marvelklubben_number"}
                            className={formInputClass}
                            type="number"
                            min="1"
                            value={marvelklubben_number || 1}
                            onChange={(e) => handleInput(e, setMarvelklubben_number)}
                        />
                        <button className={"btn btn-primary"}
                                onClick={() => addIssueData({
                                    title_id: title_id,
                                    year: year,
                                    number: number,
                                    is_marvelklubben: is_marvelklubben,
                                    marvelklubben_number: marvelklubben_number,
                                }, setInformationMessage)}
                                disabled={!title_id || !year || !number || is_marvelklubben || marvelklubben_number}>
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-outline-secondary"}
                                onClick={resetAddIssueForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

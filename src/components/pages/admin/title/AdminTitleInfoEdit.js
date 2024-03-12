import React, {useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import formatData from "../../../../helpers/valueLists/formats.json";
import {updateTitleData} from "../../../../services/titleService";
import {handleChange} from "../../../../services/serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {editIcon, saveIcon} from "../../../icons";
import {LABELS} from "../../../../helpers/textConstants/labelsAndHeadings";


export const AdminTitleInfoEdit = ({title, setTitle, newTitle, setNewTitle}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        updateTitleData(title.id, newTitle).then(() => {
            setSearchParams({edit: false});
            setLoading(false);
        });
        setTitle({...newTitle});
    }

    const handleAbort = () => {
        setNewTitle({...title});
        setSearchParams({edit: false});
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.EDIT_INFORMATION}</h2>
                <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                <input
                    id={"name"}
                    name={"name"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.name || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                <input
                    id={"description"}
                    name={"description"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.description || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="wikiurl">{LABELS_AND_HEADINGS.WIKI_URL_DB}</label>
                <input
                    id={"wikiurl"}
                    name={"wiki_url"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.wiki_url || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="comicsorgurl">{LABELS_AND_HEADINGS.COMICS_ORG_URL_DB}</label>
                <input
                    id={"comicsorgurl"}
                    name={"comics_org_url"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newTitle.comics_org_url || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                <input
                    id={"startyear"}
                    name={"start_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.start_year || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                <input
                    id={"endyear"}
                    name={"end_year"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type="number"
                    value={newTitle.end_year || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                {
                    formatData &&
                    <select
                        id={"format"}
                        name={"format_id"}
                        className={"form-select mb-3"}
                        value={newTitle.format_id}
                        disabled={!edit || loading}
                        onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}>
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
                    value={newTitle.total_issues || ""}
                    onChange={(e) => handleChange(newTitle, setNewTitle, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                {
                    edit ?
                        <>
                            <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS_AND_HEADINGS.SAVE} icon={saveIcon} loading={loading}/>
                            <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                {LABELS.COMMON.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <IconButton variant={"primary"} onClick={() => setSearchParams({edit: true})} label={LABELS_AND_HEADINGS.EDIT} icon={editIcon}/>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(ROUTES.ADMIN.TITLES)}
                                        label={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        </>
                }
            </div>
        </div>
    )
}

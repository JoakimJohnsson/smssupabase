import React from "react";
import {CLASSES, LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {updatePublisherData} from "../../../../helpers/functions/serviceFunctions/publisherFunctions";
import {handleChange} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppContext} from "../../../../context/AppContext";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminPublisherInfoEdit = ({publisher, setPublisher, newPublisher, setNewPublisher}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const navigate = useNavigate();
    const {setInformationMessage} = useAppContext();

    const handleSubmit = () => {
        updatePublisherData(publisher.id, newPublisher, setInformationMessage).then(() => setSearchParams({edit: false}));
        setPublisher({...newPublisher});
    }

    const handleAbort = () => {
        setNewPublisher({...publisher});
        setSearchParams({edit: false});
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-form"}>
                <h2>{LABELS_AND_HEADINGS.EDIT_INFORMATION}</h2>
                <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                <input
                    id={"name"}
                    name={"name"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newPublisher.name || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.DESCRIPTION_DB}</label>
                <input
                    id={"description"}
                    name={"description"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newPublisher.description || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.WIKI_URL_DB}</label>
                <input
                    id={"wikiurl"}
                    name={"wiki_url"}
                    className={CLASSES.FORM_INPUT_DEFAULT}
                    type={"text"}
                    value={newPublisher.wiki_url || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit}
                />
                <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                {
                    countryData &&
                    <select
                        id={"country"}
                        name={"country_id"}
                        className={"form-select mb-3"}
                        value={newPublisher.country_id}
                        disabled={!edit}
                        onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                        {printOptions(countryData)}
                    </select>
                }
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
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(ROUTES.ADMIN.PUBLISHERS)}
                                        label={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                        </>
                }
            </div>
        </div>
    )
}

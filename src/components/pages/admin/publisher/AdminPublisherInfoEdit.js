import React, {useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants/configConstants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import countryData from "../../../../helpers/valueLists/countries.json";
import {updatePublisherData} from "../../../../services/publisherService";
import {handleChange} from "../../../../services/serviceFunctions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {editIcon, saveIcon} from "../../../icons";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const AdminPublisherInfoEdit = ({publisher, setPublisher, newPublisher, setNewPublisher}) => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        updatePublisherData(publisher.id, newPublisher).then(() => {
            setSearchParams({edit: false});
            setLoading(false);
        });
        setPublisher({...newPublisher});
    }

    const handleAbort = () => {
        setNewPublisher({...publisher});
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
                    className={"form-input--default"}
                    type={"text"}
                    value={newPublisher.name || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="description">{LABELS.COMMON.DESCRIPTION_DB}</label>
                <input
                    id={"description"}
                    name={"description"}
                    className={"form-input--default"}
                    type={"text"}
                    value={newPublisher.description || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="description">{LABELS_AND_HEADINGS.WIKI_URL_DB}</label>
                <input
                    id={"wikiurl"}
                    name={"wiki_url"}
                    className={"form-input--default"}
                    type={"text"}
                    value={newPublisher.wiki_url || ""}
                    onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}
                    disabled={!edit || loading}
                />
                <label className={"form-label"} htmlFor="country">{LABELS.COMMON.COUNTRY_DB}</label>
                {
                    countryData &&
                    <select
                        id={"country"}
                        name={"country_id"}
                        className={"form-select mb-3"}
                        value={newPublisher.country_id}
                        disabled={!edit || loading}
                        onChange={(e) => handleChange(newPublisher, setNewPublisher, e.target.name, e.target.value)}>
                        <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                        {printOptions(countryData)}
                    </select>
                }
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
                            <IconButton variant={"primary"} onClick={() => setSearchParams({edit: true})} label={LABELS.COMMON.EDIT} icon={editIcon}/>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(ROUTES.ADMIN.PUBLISHERS)}
                                        label={LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}/>
                        </>
                }
            </div>
        </div>
    )
}

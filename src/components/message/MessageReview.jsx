import React, {useState, useEffect} from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import topicData from "../../helpers/valueLists/topics.json";
import {
    getDataDescription,
    getDataIcon,
    getDataName,
    getIssueName,
    printOptions,
    trimInputString
} from "../../helpers/functions";
import {FunctionButton} from "../minis/FunctionButton.jsx";
import {faMessages, faStar as faStarDuoTone, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {getIconByName, Icon} from "../icons/Icons.jsx";
import {handleInput} from "../../services/serviceFunctions.js";
import {useAppContext} from "../../context/AppContext.jsx";
import {EditStarReview} from "../star/EditStarReview.jsx";
import {DraftEditor} from "../draft/DraftEditor.jsx";


export const MessageReview = ({originObject, originTable, stars, setStars, saveReview}) => {

    const {user} = useAppContext();
    const {formInputClass, setFormInputClass} = useCommonFormStates();
    const [topic_id, setTopic_id] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState(LABELS.SECTIONS.MESSAGES.MESSAGE);
    const [text, setText] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [useThisObject, setUseThisObject] = useState(false);
    const [open, setOpen] = useState({"message": false, "review": false});
    const baseClasses = "hocus-standard me-2";
    const activeClasses = "text-grade px-2 py-1 border border-grade rounded-5";
    const inactiveClasses = "text-grade-100 p-2 border border-light rounded-3";

    const handleEditStarReview = (index) => {
        const newStars = index + 1;
        setStars(newStars);
        saveReview(newStars);
    }

    const resetAddMessageForm = async () => {
        if (topic_id === "") {
            setTitle(LABELS.SECTIONS.MESSAGES.MESSAGE);
            setDescription("");
        }
        setText("");
        setFormInputClass("form-input--error");
        setIsReset(true);
    }

    useEffect(() => {
        if (topic_id && text && title !== "") {
            setFormInputClass("form-input--success");
        } else if (topic_id || text || title !== "") {
            setFormInputClass("form-input--default")
        } else {
            setFormInputClass("form-input--error");
        }
    }, [topic_id, text, title, setFormInputClass]);

    const updateTitleAndDescription = (e) => {
        if (topicData && e.target.value !== "") {
            setTitle(getDataName(topicData, e.target.value));
            setDescription(getDataDescription(topicData, e.target.value));
        }
    }

    useEffect(() => {
        if (useThisObject) {
            if (originTable === TABLES.ISSUES) {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " " + LABELS.COMMON.MESSAGE_TITLE_SUFFIX_FOR + " " + getIssueName(originObject));
                } else {
                    setTitle(LABELS.SECTIONS.MESSAGES.MESSAGE + " " + LABELS.COMMON.MESSAGE_TITLE_SUFFIX_FOR + " " + getIssueName(originObject));
                }
            } else if (originTable === TABLES.TITLES) {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " " + LABELS.COMMON.MESSAGE_TITLE_SUFFIX_FOR_TITLE + " " + originObject.name);
                } else {
                    setTitle(LABELS.SECTIONS.MESSAGES.MESSAGE + " " + LABELS.COMMON.MESSAGE_TITLE_SUFFIX_FOR_TITLE + " " + originObject.name);
                }
            } else {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " - " + originTable);
                } else {
                    setTitle(LABELS.SECTIONS.MESSAGES.MESSAGE + " - " + originTable);
                }
            }
        } else {
            if (topic_id !== "") {
                setTitle(getDataName(topicData, topic_id));
                setDescription(getDataDescription(topicData, topic_id));
            } else {
                setTitle(LABELS.SECTIONS.MESSAGES.MESSAGE);
                setDescription("");
            }
        }
    }, [useThisObject, topic_id, originTable, originObject]);

    return (
        <>
            <div>
                <div className={"sms-btn-group"}>
                    <FunctionButton
                        variant={open.message ? "btn-primary" : "btn-outline-secondary"}
                        icon={open.message ? faTimes : faMessages}
                        onClick={() => setOpen({"message": !open.message, "review": false})}
                        label={open.message ? LABELS.SECTIONS.MESSAGES.MESSAGE_CLOSE : LABELS.SECTIONS.MESSAGES.MESSAGE_SHOW}
                        showLabel={true}
                    />
                    <FunctionButton
                        variant={open.review ? "btn-warning" : "btn-outline-secondary"}
                        icon={open.review ? faTimes : faStarDuoTone}
                        onClick={() => setOpen({message: false, review: !open.review})}
                        label={open.review ? LABELS.COMMON.CLOSE_REVIEW : LABELS.COMMON.REVIEW}
                        showLabel={true}
                    />
                </div>

                {
                    open.message &&
                    <div className={"sms-section--light variant variant--primary mb-3 p-3"}>
                        <h2>{LABELS.COMMON.MESSAGE_ADMIN_CREATE}</h2>
                        <label className={"form-label"} htmlFor="title">{LABELS.SECTIONS.MESSAGES.MESSAGE_TITLE}</label>
                        <p className={"h5"}>
                            {
                                topic_id &&
                                <Icon icon={getIconByName(getDataIcon(topicData, topic_id))} className={`me-2 fa-fw`}/>
                            }
                            {title}
                        </p>
                        {
                            description &&
                            <p className={"mb-2"}>{description}</p>
                        }
                        <label className={"form-label"} htmlFor="topic">{LABELS.COMMON.TOPIC}</label>
                        {
                            topicData &&
                            <select
                                id="topic"
                                name={"topic_id"}
                                className={formInputClass}
                                onChange={(e) => {
                                    handleInput(e, setTopic_id);
                                    updateTitleAndDescription(e);
                                }}>
                                <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                                {printOptions(topicData.filter((t) => t.isGlobal === false))}
                            </select>
                        }
                        <div>
                            <input
                                id={"useThisObject"}
                                name={"useThisObject"}
                                className={"form-check-input me-2"}
                                type="checkbox"
                                checked={useThisObject}
                                onChange={() => setUseThisObject(!useThisObject)}
                            />
                            <label className={"form-label"}
                                   htmlFor="useThisObject">{LABELS.COMMON.MESSAGE_USE_THIS_OBJECT}</label>
                        </div>
                        <label className={"form-label"} htmlFor="text">{LABELS.SECTIONS.MESSAGES.MESSAGE}</label>
                        <DraftEditor
                            text={text}
                            setText={setText}
                            isReset={isReset}
                            setIsReset={setIsReset}
                            resetAddMessageForm={resetAddMessageForm}
                            title={title}
                            topic_id={topic_id}
                            messageData={
                                {
                                    origin_id: originObject.id,
                                    origin_table: originTable,
                                    is_global: 0,
                                    status: 0,
                                    sender_id: user.id,
                                    receiver_id: null,
                                    topic_id: topic_id,
                                    title: trimInputString(title),
                                    text: text
                                }
                            }
                        />
                    </div>
                }
            </div>
            <div className="mb-3">
                {
                    open.review &&
                    <EditStarReview stars={stars} baseClasses={baseClasses} activeClasses={activeClasses}
                                    inactiveClasses={inactiveClasses} handleEditStarReview={handleEditStarReview}/>
                }
            </div>
        </>
    )
}

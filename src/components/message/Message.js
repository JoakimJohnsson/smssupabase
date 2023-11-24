import React, {useState, useEffect} from "react";
import {faMessages} from "@fortawesome/pro-duotone-svg-icons";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FunctionButton} from "../minis/FunctionButton";
import {addMessageData} from "../../helpers/functions/serviceFunctions/messageFunctions";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataName, printOptions, trimInputString} from "../../helpers/functions/functions";


export const Message = ({originObject, originTable}) => {

    const [open, setOpen] = useState(false);
    const [formInputClass, setFormInputClass] = useCommonFormStates();
    const [topic_id, setTopic_id] = useState("");
    const [title, setTitle] = useState(LABELS_AND_HEADINGS.MESSAGE_TITLE);
    const [text, setText] = useState("");
    const [useThisObject, setUseThisObject] = useState(false);

    const {user, setInformationMessage} = useAppContext();

    const resetAddMessageForm = async () => {
        if (topic_id === "") {
            setTitle(LABELS_AND_HEADINGS.MESSAGE_TITLE);
        }
        setText("");
        setFormInputClass(CLASSES.FORM_INPUT_ERROR);
    }

    useEffect(() => {
        if (topic_id && text && title !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_SUCCESS);
        } else if (topic_id || text || title !== "") {
            setFormInputClass(CLASSES.FORM_INPUT_DEFAULT)
        } else {
            setFormInputClass(CLASSES.FORM_INPUT_ERROR);
        }
    }, [topic_id, text, title, setFormInputClass]);

    const updateTitle = (e) => {
        if (topicData && e.target.value !== "") {
            setTitle(getDataName(topicData, e.target.value));
        }
    }

    useEffect(() => {
        if (useThisObject) {
            setTitle(currentTitle => currentTitle + ": " + originTable);
        } else {
            if (topic_id !== "") {
                setTitle(getDataName(topicData, topic_id));
            } else {
                setTitle(LABELS_AND_HEADINGS.MESSAGE_TITLE);
            }
        }
    }, [useThisObject, topic_id, originTable]);

    return (
        <>
            <FunctionButton
                variant={"primary"}
                customClass={"mb-3"}
                icon={faMessages}
                onClick={() => setOpen(!open)}
                label={open ? LABELS_AND_HEADINGS.MESSAGES_CLOSE : LABELS_AND_HEADINGS.MESSAGES_SHOW}
                id={"message-form-toggler"}
            />
            {
                open &&
                <div className={"sms-section--light primary mb-3"}>
                    <h2>{LABELS_AND_HEADINGS.MESSAGES_CREATE}</h2>
                    <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.MESSAGE_TITLE}</label>
                    <p>{title}</p>
                    <label className={"form-label"} htmlFor="topic">{LABELS_AND_HEADINGS.TOPIC}</label>
                    {
                        topicData &&
                        <select
                            id="topic"
                            name={"topic_id"}
                            className={formInputClass}
                            onChange={(e) => {
                                handleInput(e, setTopic_id);
                                updateTitle(e);
                            }}>
                            <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                            {printOptions(topicData)}
                        </select>
                    }
                    <div>
                        <input
                            id={"double"}
                            name={"is_double"}
                            className={"form-check-input me-2"}
                            type="checkbox"
                            checked={useThisObject}
                            onChange={() => setUseThisObject(!useThisObject)}
                        />
                        <label className={"form-label"} htmlFor="double">{LABELS_AND_HEADINGS.IS_DOUBLE_DB}</label>
                    </div>
                    <label className={"form-label"} htmlFor="text">{LABELS_AND_HEADINGS.MESSAGE}</label>
                    <textarea
                        className={formInputClass}
                        placeholder={LABELS_AND_HEADINGS.ADD_MESSAGE_PLACEHOLDER}
                        value={text || ""}
                        onChange={(e) => handleInput(e, setText)}>
                        >
                        </textarea>
                    <button className={"btn btn-primary sms-btn"}
                            onClick={() => addMessageData({
                                origin_id: originObject.id,
                                origin_table: originTable,
                                is_global: 0,
                                status: 0,
                                sender_id: user.id,
                                receiver_id: null,
                                topic_id: topic_id,
                                title: trimInputString(title),
                                text: trimInputString(text)
                            }, setInformationMessage).then(() => resetAddMessageForm())}
                            disabled={title === "" || text === "" || topic_id === ""}
                    >
                        {LABELS_AND_HEADINGS.SEND}
                    </button>
                    <button className={"btn btn-secondary sms-btn"}
                            onClick={resetAddMessageForm}>
                        {LABELS_AND_HEADINGS.RESET_FORM}
                    </button>
                </div>
            }
        </>
    )
}

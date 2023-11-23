import React, {useState, useEffect} from "react";
import {faMessages} from "@fortawesome/pro-duotone-svg-icons";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FunctionButton} from "../minis/FunctionButton";
import {addMessageData} from "../../helpers/functions/serviceFunctions/messageFunctions";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import {IconButton} from "../minis/IconButton";
import topicData from "../../helpers/valueLists/topics.json";
import {printOptions, trimInputString} from "../../helpers/functions/functions";


export const Message = ({originId, originTable}) => {

    const [open, setOpen] = useState(false);
    const [formInputClass, setFormInputClass] = useCommonFormStates();
    const [topic_id, setTopic_id] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [useThisObject, setUseThisObject] = useState(false);

    const {user, setInformationMessage} = useAppContext();

    // TODO - Maybe - Dynamically generate title depending on chosen topic and or "concerning this object"

    const resetAddMessageForm = async () => {
        setTitle("");
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
    }, [topic_id, text, title, setFormInputClass])

    return (
        <>
            {
                open ?
                    <div className={"sms-section--light primary"}>

                        <h2>{LABELS_AND_HEADINGS.MESSAGES_CREATE}</h2>
                        <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.TITLE}</label>
                        <input
                            id={"title"}
                            name={"title"}
                            className={formInputClass}
                            type={"text"}
                            value={title || ""}
                            onChange={(e) => handleInput(e, setTitle, true)}
                        />
                        <label className={"form-label"} htmlFor="topic">{LABELS_AND_HEADINGS.TOPIC}</label>
                        {
                            topicData &&
                            <select
                                id="topic"
                                name={"topic_id"}
                                className={formInputClass}
                                onChange={(e) => handleInput(e, setTopic_id)}>
                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                {printOptions(topicData)}
                            </select>
                        }
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
                                    origin_id: originId,
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
                        <IconButton variant={"outline-primary"} icon={faTimes} onClick={() => setOpen(false)}
                                    customClass={"text-black"}
                                    label={LABELS_AND_HEADINGS.MESSAGES_CLOSE}/>
                    </div>
                    :
                    <FunctionButton variant={"primary"} customClass={"mb-3"} icon={faMessages} onClick={() => setOpen(true)}
                                    label={LABELS_AND_HEADINGS.MESSAGES_SHOW} id={"message-form-toggler"}/>
            }
        </>
    )
}

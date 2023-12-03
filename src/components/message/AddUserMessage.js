import React, {useState} from "react";
import {faMessages, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {CONFIG, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FunctionButton} from "../minis/FunctionButton";
import {addMessageData} from "../../services/messageService";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../services/serviceFunctions";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataIcon, printOptions, trimInputString} from "../../helpers/functions";
import {getIconByName, Icon} from "../icons";


export const AddUserMessage = ({
                                topic_id,
                                setTopic_id,
                                text,
                                setText,
                                updateTitle,
                                resetAddMessageForm,
                                formInputClass,
                                title,
                                useThisObject,
                                setUseThisObject,
                                originObject,
                                originTable
                            }) => {

    const [open, setOpen] = useState(false);
    const {user, setInformationMessage, fetchMessages} = useAppContext();

    return (
        <>
            <FunctionButton
                variant={"primary"}
                icon={open ? faTimes : faMessages}
                onClick={() => setOpen(!open)}
                label={open ? LABELS_AND_HEADINGS.MESSAGES_CLOSE : LABELS_AND_HEADINGS.MESSAGES_SHOW}
                id={"message-form-toggler"}
                showLabel={false}
            />
            {
                open &&
                <div className={"sms-section--light primary mb-3"}>
                    <h2>{LABELS_AND_HEADINGS.MESSAGE_ADMIN_CREATE}</h2>
                    <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.MESSAGE_TITLE}</label>
                    <p className={"h5 text-black"}>
                        {
                            topic_id &&
                            <Icon icon={getIconByName(getDataIcon(topicData, topic_id))} className={`me-2 fa-fw`}/>
                        }
                        {title}
                    </p>
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
                        <label className={"form-label"} htmlFor="useThisObject">{LABELS_AND_HEADINGS.MESSAGE_USE_THIS_OBJECT}</label>
                    </div>
                    <label className={"form-label"} htmlFor="text">{LABELS_AND_HEADINGS.MESSAGE}</label>
                    <textarea
                        className={formInputClass}
                        placeholder={LABELS_AND_HEADINGS.ADD_MESSAGE_PLACEHOLDER}
                        value={text || ""}
                        onChange={(e) => handleInput(e, setText)}
                    />
                    <button className={"btn btn-primary sms-btn"}
                            onClick={
                        () => {
                            addMessageData({
                                origin_id: originObject.id,
                                origin_table: originTable,
                                is_global: 0,
                                status: 0,
                                sender_id: user.id,
                                receiver_id: null,
                                topic_id: topic_id,
                                title: trimInputString(title),
                                text: trimInputString(text)
                            }, setInformationMessage).then(() => {
                                resetAddMessageForm();
                                // Update after a while.
                                setTimeout(() => {
                                    fetchMessages();
                                }, CONFIG.MESSAGE_UPDATE_TIMEOUT);
                            });
                        }
                    }
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

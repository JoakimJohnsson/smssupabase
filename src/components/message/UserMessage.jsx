import React, {useState} from "react";
import {faMessages, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {CONFIG} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {FunctionButton} from "../minis/FunctionButton";
import {addMessageData} from "../../services/messageService";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../services/serviceFunctions";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataIcon, printOptions, trimInputString} from "../../helpers/functions";
import {getIconByName, Icon} from "../icons";


export const UserMessage = ({
                                   topic_id,
                                   setTopic_id,
                                   text,
                                   setText,
                                   updateTitle,
                                   resetAddMessageForm,
                                   formInputClass,
                                   title,
                                   description,
                                   useThisObject,
                                   setUseThisObject,
                                   originObject,
                                   originTable
                               }) => {

    const [open, setOpen] = useState(false);
    const {user, setInformationMessage, fetchMessages} = useAppContext();

    return (
        <div>
            <FunctionButton
                variant={"btn-outline-primary"}
                icon={open ? faTimes : faMessages}
                onClick={() => setOpen(!open)}
                label={open ? LABELS.SECTIONS.MESSAGES.MESSAGE_CLOSE : LABELS.SECTIONS.MESSAGES.MESSAGE_SHOW}
                showLabel={true}
            />
            {
                open &&
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
                                updateTitle(e);
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
                        <label className={"form-label"} htmlFor="useThisObject">{LABELS.COMMON.MESSAGE_USE_THIS_OBJECT}</label>
                    </div>
                    <label className={"form-label"} htmlFor="text">{LABELS.SECTIONS.MESSAGES.MESSAGE}</label>
                    <textarea
                        className={formInputClass}
                        placeholder={LABELS.COMMON.ADD_MESSAGE_PLACEHOLDER}
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
                                        }, CONFIG.TIMEOUT_XXL);
                                    });
                                }
                            }
                            disabled={title === "" || text === "" || topic_id === ""}
                    >
                        {LABELS.COMMON.SEND}
                    </button>
                    <button className={"btn btn-secondary sms-btn"}
                            onClick={resetAddMessageForm}>
                        {LABELS.COMMON.RESET_FORM}
                    </button>
                </div>
            }
        </div>
    )
}

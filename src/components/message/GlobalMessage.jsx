import React from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {addMessageData} from "../../services/messageService";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../services/serviceFunctions";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataIcon, printOptions, trimInputString} from "../../helpers/functions";
import {getIconByName, Icon} from "../icons";


export const GlobalMessage = ({
                                     topic_id,
                                     setTopic_id,
                                     text,
                                     setText,
                                     updateTitle,
                                     resetAddMessageForm,
                                     formInputClass,
                                     title,
                                     fetchAdminMessages
                                 }) => {

    const {user, setInformationMessage, fetchMessages} = useAppContext();

    return (
        <div className="mb-3">

            <label className={"form-label"} htmlFor="title">{LABELS.SECTIONS.MESSAGES.MESSAGE_TITLE}</label>
            <p className={"h5"}>
                {
                    topic_id &&
                    <Icon icon={getIconByName(getDataIcon(topicData, topic_id))} className={`me-2 fa-fw`}/>
                }
                {title}
            </p>
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
                    {printOptions(topicData.filter((t) => t.isGlobal === true))}
                </select>
            }
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
                        origin_id: null,
                        origin_table: null,
                        is_global: 1,
                        status: 0,
                        sender_id: user.id,
                        receiver_id: null,
                        topic_id: topic_id,
                        title: trimInputString(title),
                        text: trimInputString(text)
                    }, setInformationMessage).then(() => {
                        resetAddMessageForm();
                        fetchAdminMessages();
                        // Update messages after a while.
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
    )
}

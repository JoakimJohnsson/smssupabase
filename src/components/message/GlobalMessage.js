import React from "react";
import {CONFIG, LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
import {addMessageData} from "../../services/messageService";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../services/serviceFunctions";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataIcon, printOptions, trimInputString} from "../../helpers/functions";
import {getIconByName, Icon} from "../icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


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
        <>

            <label className={"form-label"} htmlFor="title">{LABELS_AND_HEADINGS.MESSAGE_TITLE}</label>
            <p className={"h5 text-white"}>
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
                    <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                    {printOptions(topicData.filter((t) => t.isGlobal === true))}
                </select>
            }
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
                {LABELS_AND_HEADINGS.SEND}
            </button>
            <button className={"btn btn-secondary sms-btn"}
                    onClick={resetAddMessageForm}>
                {LABELS_AND_HEADINGS.RESET_FORM}
            </button>
        </>
    )
}

import React, {useState, useEffect} from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataDescription, getDataName, getIssueName} from "../../helpers/functions";
import {UserMessage} from "./UserMessage";
import {GlobalMessage} from "./GlobalMessage";


export const Message = ({originObject, originTable, isGlobalMessage = false, fetchAdminMessages = false}) => {

    const {formInputClass, setFormInputClass} = useCommonFormStates();
    const [topic_id, setTopic_id] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState(LABELS.SECTIONS.MESSAGES.MESSAGE);
    const [text, setText] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [useThisObject, setUseThisObject] = useState(false);

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
        isGlobalMessage ?
            <GlobalMessage
                topic_id={topic_id}
                setTopic_id={setTopic_id}
                updateTitle={updateTitleAndDescription}
                resetAddMessageForm={resetAddMessageForm}
                formInputClass={formInputClass}
                title={title}
                text={text}
                setText={setText}
                isReset={isReset}
                setIsReset={setIsReset}
                fetchAdminMessages={fetchAdminMessages}
            />
            :
            <UserMessage
                topic_id={topic_id}
                setTopic_id={setTopic_id}
                updateTitle={updateTitleAndDescription}
                resetAddMessageForm={resetAddMessageForm}
                formInputClass={formInputClass}
                title={title}
                description={description}
                text={text}
                setText={setText}
                isReset={isReset}
                setIsReset={setIsReset}
                useThisObject={useThisObject}
                setUseThisObject={setUseThisObject}
                originObject={originObject}
                originTable={originTable}
            />
    )
}

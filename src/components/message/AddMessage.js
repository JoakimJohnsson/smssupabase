import React, {useState, useEffect} from "react";
import {CLASSES, LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataName, getIssueName} from "../../helpers/functions";
import {AddUserMessage} from "./AddUserMessage";
import {AddGlobalMessage} from "./AddGlobalMessage";


export const AddMessage = ({originObject, originTable, isGlobalMessage = false, fetchMessages = false}) => {

    const [formInputClass, setFormInputClass] = useCommonFormStates();
    const [topic_id, setTopic_id] = useState("");
    const [title, setTitle] = useState(LABELS_AND_HEADINGS.MESSAGE);
    const [text, setText] = useState("");
    const [useThisObject, setUseThisObject] = useState(false);

    const resetAddMessageForm = async () => {
        if (topic_id === "") {
            setTitle(LABELS_AND_HEADINGS.MESSAGE);
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
            if (originTable === TABLES.ISSUES) {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " " + LABELS_AND_HEADINGS.MESSAGE_TITLE_SUFFIX_FOR + " " + getIssueName(originObject));
                } else {
                    setTitle(LABELS_AND_HEADINGS.MESSAGE + " " + LABELS_AND_HEADINGS.MESSAGE_TITLE_SUFFIX_FOR + " " + getIssueName(originObject));
                }
            } else if (originTable === TABLES.TITLES) {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " " + LABELS_AND_HEADINGS.MESSAGE_TITLE_SUFFIX_FOR_TITLE + " " + originObject.name);
                } else {
                    setTitle(LABELS_AND_HEADINGS.MESSAGE + " " + LABELS_AND_HEADINGS.MESSAGE_TITLE_SUFFIX_FOR_TITLE + " " + originObject.name);
                }
            } else {
                if (topic_id !== "") {
                    setTitle(currentTitle => currentTitle + " - " + originTable);
                } else {
                    setTitle(LABELS_AND_HEADINGS.MESSAGE + " - " + originTable);
                }
            }
        } else {
            if (topic_id !== "") {
                setTitle(getDataName(topicData, topic_id));
            } else {
                setTitle(LABELS_AND_HEADINGS.MESSAGE);
            }
        }
    }, [useThisObject, topic_id, originTable, originObject]);

    return (
        isGlobalMessage ?
            <AddGlobalMessage
                topic_id={topic_id}
                setTopic_id={setTopic_id}
                updateTitle={updateTitle}
                resetAddMessageForm={resetAddMessageForm}
                formInputClass={formInputClass}
                title={title}
                text={text}
                setText={setText}
                fetchMessages={fetchMessages}
            />
            :
            <AddUserMessage
                topic_id={topic_id}
                setTopic_id={setTopic_id}
                updateTitle={updateTitle}
                resetAddMessageForm={resetAddMessageForm}
                formInputClass={formInputClass}
                title={title}
                text={text}
                setText={setText}
                useThisObject={useThisObject}
                setUseThisObject={setUseThisObject}
                originObject={originObject}
                originTable={originTable}
            />
    )
}

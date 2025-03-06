import React, {useState} from "react";
import {faMessages, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {FunctionButton} from "../minis/FunctionButton";
import {useAppContext} from "../../context/AppContext";
import {handleInput} from "../../services/serviceFunctions";
import topicData from "../../helpers/valueLists/topics.json";
import {getDataIcon, printOptions, trimInputString} from "../../helpers/functions";
import {getIconByName, Icon} from "../icons";
import {DraftEditor} from "../draft/DraftEditor.jsx";


export const UserMessage = ({
                                topic_id,
                                setTopic_id,
                                text,
                                setText,
                                isReset,
                                setIsReset,
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
    const {user} = useAppContext();

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
                        <label className={"form-label"}
                               htmlFor="useThisObject">{LABELS.COMMON.MESSAGE_USE_THIS_OBJECT}</label>
                    </div>
                    <label className={"form-label"} htmlFor="text">{LABELS.SECTIONS.MESSAGES.MESSAGE} Ett
                        meddelande</label>
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
    )
}

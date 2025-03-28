import React, {useState, useEffect} from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {useCommonFormStates} from "../../helpers/customHooks/useCommonFormStates";
import {getUserName, trimInputString} from "../../helpers/functions";
import {FunctionButton} from "../minis/FunctionButton";
import {faMessages, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {handleInput} from "../../services/serviceFunctions";
import {DraftEditor} from "../draft/DraftEditor.jsx";


export const SimpleMessage = ({user}) => {

    const {formInputClass, setFormInputClass} = useCommonFormStates();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [open, setOpen] = useState(false);

    const resetAddMessageForm = () => {
        setTitle("")
        setText("");
        setIsReset(true);
        setFormInputClass("form-input--error");
    }

    useEffect(() => {
        if (title !== "") {
            setFormInputClass("form-input--success");
        } else if (text || title !== "") {
            setFormInputClass("form-input--default")
        } else {
            setFormInputClass("form-input--error");
        }
    }, [text, title, setFormInputClass]);


    return user && (
        <>
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
                    <h2>{LABELS.COMMON.MESSAGE_USER_CREATE} {getUserName(user)}</h2>
                    <label className={"form-label"} htmlFor="title">{LABELS.SECTIONS.MESSAGES.MESSAGE_TITLE}</label>
                    <input
                        id={"title"}
                        name={"title"}
                        className={formInputClass}
                        type={"text"}
                        value={title || ""}
                        onChange={(e) => handleInput(e, setTitle)}
                    />
                    <label className={"form-label"} htmlFor="text">{LABELS.SECTIONS.MESSAGES.MESSAGE}</label>
                    <DraftEditor
                        text={text} s
                        setText={setText}
                        isReset={isReset}
                        setIsReset={setIsReset}
                        resetAddMessageForm={resetAddMessageForm}
                        title={title}
                        topic_id={7093}
                        messageData={
                            {
                                origin_id: null,
                                origin_table: null,
                                is_global: 0,
                                status: 1,
                                sender_id: null,
                                receiver_id: user.id,
                                topic_id: 7093,
                                title: trimInputString(title),
                                text: text
                            }
                        }
                    />
                </div>
            }
        </>
    )
}

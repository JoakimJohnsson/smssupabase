import React, {useEffect, useState} from "react";
import {Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw} from "draft-js";
import "draft-js/dist/Draft.css";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings.js";
import {addMessageData} from "../../services/messageService.js";
import {CONFIG} from "../../helpers/constants/configConstants.jsx";
import {useAppContext} from "../../context/AppContext.jsx";


export const DraftEditor = ({
                                text,
                                setText,
                                isReset,
                                setIsReset,
                                messageData,
                                resetAddMessageForm,
                                callbackFunction = null,
                                title,
                                topic_id
                            }) => {

    const {setInformationMessage, fetchMessages} = useAppContext();

    const [editorState, setEditorState] = useState(() =>
        text ? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) : EditorState.createEmpty()
    );

    useEffect(() => {
        if (isReset) {
            // Reset editor
            const resetEditorState = EditorState.push(editorState, ContentState.createFromText(''));
            setEditorState(resetEditorState);
            handleKeyCommand();
        }
    }, [isReset]);

    const handleEditorChange = (newState) => {
        setIsReset(false);
        setEditorState(newState);
        const content = newState.getCurrentContent();
        const rawContent = convertToRaw(content);
        const jsonString = JSON.stringify(rawContent);
        setText(jsonString);
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleEditorChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    return (
        <>
            <div className="draft-editor-container">
                {/* Toolbar */}
                <div className="editor-toolbar">
                    <button className="btn btn-light" onMouseDown={(e) => {
                        e.preventDefault();
                        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
                    }}>
                        <b>B</b>
                    </button>
                    <button className="btn btn-light" onMouseDown={(e) => {
                        e.preventDefault();
                        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
                    }}>
                        <i>I</i>
                    </button>
                    <button className="btn btn-light" onMouseDown={(e) => {
                        e.preventDefault();
                        setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
                    }}>
                        <u>U</u>
                    </button>
                </div>

                {/* Editor */}
                <div className="editor-box" onClick={() => document.getElementById("draft-editor")?.focus()}>
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        handleKeyCommand={handleKeyCommand}
                        placeholder={LABELS.COMMON.ADD_MESSAGE_PLACEHOLDER}
                        id="draft-editor"
                    />
                </div>
            </div>
            <button className={"btn btn-primary sms-btn jocke"}
                    onClick={
                        () => {
                            addMessageData(messageData, setInformationMessage).then(() => {
                                    resetAddMessageForm();
                                    if (callbackFunction) {
                                        callbackFunction();
                                    }
                                    // Update after a while.
                                    setTimeout(() => {
                                        fetchMessages();
                                    }, CONFIG.TIMEOUT_XXL);
                                }
                            );
                        }
                    }
                    disabled={title === "" || text === "" || topic_id === ""}
            >
                {LABELS.COMMON.SEND}
            </button>
            <button className={"btn btn-secondary sms-btn jocke"}
                    onClick={resetAddMessageForm}>
                {LABELS.COMMON.RESET_FORM}
            </button>
        </>
    );
};

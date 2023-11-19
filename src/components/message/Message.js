import React, {useState} from "react";
import {faMessages, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FunctionButton} from "../minis/FunctionButton";
import {Icon} from "../icons";


export const Message = ({originId}) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            {
                open ?
                    <div className={"bg-primary--lighter p-4 text-black"}>
                        <div className={"d-flex justify-content-between"}>
                            <div className={"pe-5"}>
                                <h2>{LABELS_AND_HEADINGS.MESSAGES_CREATE}</h2>
                                <p>{originId}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className={"btn btn-outline-primary p-2 rounded-0 justify-content-center text-black"}
                                    aria-label={LABELS_AND_HEADINGS.MESSAGES_SHOW}
                                >
                                    <Icon icon={faTimes} className={"fa-xl fa-fw"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <FunctionButton variant={"primary"} customClass={"mb-3"} icon={faMessages} onClick={() => setOpen(true)}
                                    label={LABELS_AND_HEADINGS.MESSAGES_SHOW} id={"list-variant-toggler"}/>
            }
        </>
    )
}

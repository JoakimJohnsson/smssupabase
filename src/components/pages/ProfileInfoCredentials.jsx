import React from "react";
import {TEXTS} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {Icon, keyIcon, sendIcon} from "../icons";


export const ProfileInfoCredentials = ({
                                           newEmail,
                                           setNewEmail,
                                           confirmNewEmail,
                                           setConfirmNewEmail,
                                           handleChangeEmail,
                                           message,
                                           pwMessage,
                                           newPassword,
                                           setNewPassword,
                                           confirmNewPassword,
                                           setConfirmNewPassword,
                                           handleChangePassword
                                       }) => {

    return (
        <div>
            <h2>{LABELS.COMMON.SETTINGS_CREDENTIALS}</h2>
            <p>{TEXTS.SETTINGS_CREDENTIALS}</p>
            <div className={"mb-3"}>
                <label className={"form-label"} htmlFor="input-email">{LABELS.COMMON.NEW_EMAIL}</label>
                <input id="input-email"
                       type="email"
                       onChange={(e) => setNewEmail(e.target.value)}
                       className={"form-control mb-3"}
                       placeholder={LABELS.COMMON.PLACEHOLDER_MAIL}
                       required/>
                <label className={"form-label"} htmlFor="input-confirm-email">{LABELS.COMMON.CONFIRM_NEW_EMAIL}</label>
                <input id="input-confirm-email"
                       type="email"
                       onChange={(e) => setConfirmNewEmail(e.target.value)}
                       className={"form-control"}
                       placeholder={LABELS.COMMON.PLACEHOLDER_MAIL}
                       required/>
                <div className={"form-text mb-3"}>{TEXTS.CHANGE_EMAIL_SEND_INFO}</div>
                <button className={"btn btn-primary sms-btn"} onClick={() => handleChangeEmail()}
                        disabled={newEmail === "" || newEmail !== confirmNewEmail}>
                    <Icon icon={sendIcon} className={"me-2"}/>{LABELS.COMMON.SEND}
                </button>
                {message.show && <p className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3`}
                                    role={"alert"}>{message.text}</p>}
            </div>
            <div>
                <label className={"form-label d-flex"}
                       htmlFor="input-current-password">{LABELS.COMMON.NEW_PASSWORD}</label>
                <input id="input-current-password"
                       type="password"
                       onChange={(e) => setNewPassword(e.target.value)}
                       className={"form-control mb-3"}
                       placeholder={"********"}
                       required/>
                <label className={"form-label d-flex"}
                       htmlFor="input-new-password">{LABELS.COMMON.PASSWORD_CONFIRM}</label>
                <input id="input-new-password"
                       type="password"
                       onChange={(e) => setConfirmNewPassword(e.target.value)}
                       className={"form-control"}
                       placeholder={"********"}
                       required/>
                <div className={"form-text mb-3"}>{TEXTS.CHANGE_PASSWORD_INFO}</div>
                <button className={"btn btn-danger sms-btn"} onClick={() => handleChangePassword()}
                        disabled={confirmNewPassword === "" || newPassword !== confirmNewPassword}>
                    <Icon icon={keyIcon} className={"me-2"}/>{LABELS.COMMON.RESET_PASSWORD}
                </button>
                {pwMessage.show && <p className={`alert ${pwMessage.isError ? "alert-danger" : "alert-success"} mt-3`}
                                      role={"alert"}>{pwMessage.text}</p>}
            </div>

        </div>
    )
}

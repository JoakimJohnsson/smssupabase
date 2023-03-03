import {supabase} from "../../supabase/supabaseClient";
import {CLASSES, MESSAGES} from "../constants";
import React from "react";

export async function checkIfEmailExists(emailReference, setEmailExists) {
    let {data: email} = await supabase.from("users").select("email").eq("email", emailReference)
    if (email.length > 0) {
        setEmailExists(true);
    } else {
        setEmailExists(false);
    }
}

export const prepareUrl = (url) => {
    if (url && url.substring(0, 7) !== "http://") {
        return "https://" + url;
    } else {
        return url;
    }
}

export const getCalculatedYear = (startYear, endYear) => {
    if (startYear === endYear) {
        return startYear;
    } else {
        return startYear + " - " + endYear;
    }
}

export const getFormatName = (formatData, id) => {
    return formatData.find(f => f.id === id).name;
}

export const handleEmailInput = (success, setEmailInputClass, setEmailValidated, setEmailValidationMessage) => {
    if (success) {
        setEmailInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setEmailValidated(true);
        setEmailValidationMessage(MESSAGES.SUCCESS.VALIDATION_EMAIL);
    } else {
        setEmailInputClass(CLASSES.FORM_INPUT_ERROR);
        setEmailValidated(false);
        setEmailValidationMessage(MESSAGES.ERROR.VALIDATION_EMAIL);
    }
}

export const handlePasswordInput = (success, setPasswordInputClass, setPasswordValidated, setPasswordValidationMessage) => {
    if (success) {
        setPasswordInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setPasswordValidated(true);
        setPasswordValidationMessage(MESSAGES.SUCCESS.VALIDATION_PASSWORD);
    } else {
        setPasswordInputClass(CLASSES.FORM_INPUT_ERROR);
        setPasswordValidated(false)
        setPasswordValidationMessage(MESSAGES.ERROR.VALIDATION_PASSWORD);
    }
}

export const handleGenericFormInput = (success, setInputClass, setValidated) => {
    if (success) {
        setInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setValidated(true);
    } else {
        setInputClass(CLASSES.FORM_INPUT_ERROR);
        setValidated(false);
    }
}

export const handleBacking = (navigate) => {
    navigate(-1);
}

export const generateUniqueHashedFilename = (fileExt, fileType) => {
    let number = Math.random() * 100;
    return fileType + number.toString().replace(".", "") + "." + fileExt;
}

export const printOptions = (data) => {
    return data && (
        data.map(
            (item) => <option key={item.id} value={item.id}>{item.name}</option>)
    )
}

export const getObjectNameById = (data, myId) => {
    let obj = data.filter(item => item.id === myId);
    return obj[0].name;
}

export const getYearsList = (startYear, endYear) => {
    let list = [];
    for (let i = startYear; i <= endYear; i++) {
        list.push(i);
    }
    return list;
}

export const getIndexList = (length) => {
    let list = [];
    for (let i = 0; i <= length; i++) {
        list.push(i.toString());
    }
    return list;
}

export const getIssuesPerYear = (totalIssues, startYear, endYear) => {
    if (startYear < endYear) {
        return Math.floor(totalIssues / (endYear - startYear + 1));
    } else {
        return 1;
    }
}
export const getIssueName = (title, issue) => {
    let number = issue.number;
    if (issue.is_double === 1) {
        number = number + "-" + (number + 1)
    }
    return title.name + " #" + number + " / " + issue.year;
}

export const hasImage = (item) => {
    return item && item.image_filename && item.image_url;
}

export const sortByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

// Helper function for converting string value "true" to boolean value.
export const isTrue = (string) => (string === "true");

export const getCurrentDate = () => {
    return (new Date()).toISOString();
}

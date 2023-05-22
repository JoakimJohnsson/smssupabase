import {supabase} from "../../supabase/supabaseClient";
import {CLASSES, MESSAGES} from "../constants";
import React from "react";

export async function doesEmailExist(emailReference) {
    let {data: email} = await supabase.from("users").select("email").eq("email", emailReference)
    return email.length > 0;
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

export const getDataName = (data, id) => {
    return data.find(f => f.id === id).name;
}
export const getDataShade = (data, id) => {
    return data.find(f => f.id === id).shade;
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
        data
            .sort((a, b) => sortByName(a, b))
            .map(
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
    } else if (startYear === endYear) {
        return totalIssues;
    } else {
        return 1;
    }
}
export const getIssueName = (issue) => {
    let number = issue.number;
    let variantSuffix = "";
    if (issue.is_variant === 1) {
        variantSuffix = issue.variant_suffix;
    }
    if (issue.is_double === 1) {
        number = number + "-" + (number + 1)
    }
    if (issue && issue.titles) {
        return issue.titles.name + " #" + number + variantSuffix + " - " + issue.year;
    }
}

export const getUserName = (user) => {
    if (user.firstname && user.lastname) {
        return user.firstname + " " + user.lastname
    } else if (user.firstname) {
        return user.firstname
    } else if (user.lastname) {
        return user.lastname
    } else {
        return getAnonDisplayName(user);
    }
}

export const getAnonDisplayName = (user) => {
    return user.id.substring(0, 5) + " " + user.id.substring(user.id.length - 7, user.id.length);
}

export const hasImage = (item) => {
    return item && item.image_filename && item.image_url;
}

export const sortByName = (a, b) => {
    let aName = sortableName(a.name);
    let bName = sortableName(b.name);
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
}


export const sortByNameAndStartYear = (a, b) => {
    let aName = sortableName(a.name);
    let bName = sortableName(b.name);
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    if (a.start_year < b.start_year) return -1;
    if (a.start_year > b.start_year) return 1;
    return 0;
}

// Helper function for converting string value "true" to boolean value.
export const isTrue = (string) => (string === "true");

export const getCurrentDate = () => {
    return (new Date()).toISOString();
}

export const sortableName = (name) => {
    return name.trim().replace(":", "").replace("-", "").toLowerCase();
}

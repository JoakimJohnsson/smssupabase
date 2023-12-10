import {supabase} from "../supabase/supabaseClient";
import {CLASSES, MESSAGES} from "./constants";
import React from "react";
import {getNoCollectedIssues} from "../services/collectingService";

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
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).name;
}

export const getDataShade = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).shade;
}
export const getDataIcon = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).icon;
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

export const trimInputString = (input) => {
    // Define a regular expression pattern to match Swedish letters, spaces, and numbers. And some characters like ':' and '/'.
    const pattern = /[a-zA-ZåäöÅÄÖ0-9\s:/.!",]/g;
    if (!input) {
        return "";
    }
    const result = input.match(pattern);
    return result ? result.join("") : "";
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
        if (issue.titles.total_issues > 1) {
            return issue.titles.name + " #" + number + variantSuffix + " - " + issue.year;
        } else {
            if (variantSuffix) {
                return issue.titles.name + variantSuffix + " - " + issue.year;
            } else {
                return issue.titles.name + " - " + issue.year;
            }
        }
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

export const sortByDateCreated = (a, b) => {
    if (a.created_at < b.created_at) return -1;
    if (a.created_at > b.created_at) return 1;
    return 0;
}
export const sortByDateCreatedDesc = (a, b) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
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

export const getTitleProgressForUser = async (title, userId) => {
    let totalIssues = title.total_issues;
    let noCollectedIssues = 0;
    await getNoCollectedIssues(title.id, userId).then((result) => {
        noCollectedIssues = result || 0;
    })
    return {
        totalIssues: totalIssues,
        noCollectedIssues: noCollectedIssues,
        noMissingIssues: totalIssues - noCollectedIssues,
        progress: Math.round(noCollectedIssues / totalIssues * 100)
    };
}

// Helper function for converting string value "true" to boolean value.
export const isTrue = (string) => (string === "true");

// Helper function to check if any string in an array is true.
export const hasTrueValue = (stringArray) => {
    for (let i = 0; i < stringArray.length; i++) {
        if (isTrue(stringArray[i])) {
            return true;
        }
    }
    return false;
};

export const getCurrentDate = () => {
    return (new Date()).toISOString();
}

export const getMediumGrade = (grades) => {
    let totalGradeAmount = 0.0;
    for (let i = 0; i < grades.length; i++) {
        totalGradeAmount += grades[i].grade;
    }
    return totalGradeAmount / grades.length || 0.0;
}

export const sortableName = (name) => {
    return name.trim().replace(":", "").replace("-", "").toLowerCase();
}

// Helper function for removing whitespace from strings - i.e. "My string" --> "mystring" or "my-string" if provided "-" as replacement.
export const trimAndReplace = (string, replacement = "") => {
    return string.trim().toLowerCase().replaceAll(" ", replacement);
}

// Filter functions
export const filterQueryByNameAndStartYear = (obj, query) => {
    return (
        obj.name.toLowerCase()
            .includes(query.toLowerCase()) ||
        obj.start_year.toString().toLowerCase()
            .includes(query.toLowerCase()) ||
        query === ""
    )
}
export const filterQueryIssueByTitleNamePublisherNameYearAndSource = (issue, query) => {
    return (
        issue.titles.name.toLowerCase()
            .includes(query.toLowerCase()) ||
        issue.publishers.name.toString().toLowerCase()
            .includes(query.toLowerCase()) ||
        issue.year.toString().toLowerCase()
            .includes(query.toLowerCase()) ||
        issue.source.toString().toLowerCase()
            .includes(query.toLowerCase()) ||
        getIssueName(issue).toString().toLowerCase()
            .includes(query.toLowerCase()) ||
        query === ""
    )
}

export const filterGlobalMessage = (message, showGlobal) => {
    if (showGlobal) {
        return message.is_global === 1;
    } else {
        return message.is_global === 0;
    }
}

export const filterByFormat = (obj, comic, comiclarge, album, pocket, hardcover, special, collectible) => {
    return (
        (isTrue(comic) && obj.format_id === 32545) ||
        (isTrue(comiclarge) && obj.format_id === 33541) ||
        (isTrue(album) && obj.format_id === 23445) ||
        (isTrue(pocket) && obj.format_id === 24543) ||
        (isTrue(hardcover) && obj.format_id === 23577) ||
        (isTrue(special) && obj.format_id === 26224) ||
        (isTrue(collectible) && obj.format_id === 674899)
    )
}

export const filterTitlesData = (titlesData, query, comic, comiclarge, album, pocket, hardcover, special, collectible) => {
    return (
        titlesData
            .filter((title) => {
                return (
                    filterQueryByNameAndStartYear(title, query)
                )
            })
            .filter((title) => {
                if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special, collectible])) {
                    return (
                        filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special, collectible)
                    )
                } else {
                    return true;
                }
            })
            .sort((a, b) => sortByNameAndStartYear(a, b))
    )
}

import {supabase} from "../supabase/supabaseClient";
import {
    CONFIG, GRADE_VARIANTS,
    LOGO_ICONS,
    SK_GRADE_RADIO_NAMES,
    SK_GRADE_RADIO_VALUES
} from "./constants/configConstants";
import {MESSAGES} from "./constants/textConstants/messages";
import React from "react";
import {getNoCollectedIssues} from "../services/collectingService";
import {getGradeValueByIssueIdAndGrade} from "./databaseFunctions";

const images = import.meta.glob('../assets/images/profiles/profile-*.png', {eager: true});


export async function doesEmailExist(emailReference) {
    let {data: email} = await supabase.from("users").select("email").eq("email", emailReference)
    return email.length > 0;
}

export const prepareUrl = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    } else {
        return url;
    }
};

export const getCalculatedYear = (startYear, endYear) => {
    if (startYear === endYear) {
        return startYear;
    } else {
        return startYear + " - " + endYear;
    }
};

export const getDataName = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).name;
};

export const getDataDescription = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).description;
};

export const getDataGradeValue = (data, grade) => {
    return data.find(f => f.grade === grade).value;
};

export const getDataGradeValuesByGradeName = (data, gradeName) => {
    return data.find(gv => gv.grade_name === gradeName).value;
};

export const getDataShade = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).shade;
};

export const getDataIcon = (data, id) => {
    // Make sure the id is a number.
    const numericId = Number(id);
    return data.find(f => f.id === numericId).icon;
};

export const getLogoIcon = () => {
    const iconSet = isChristmasTime() ? LOGO_ICONS.XMAS : LOGO_ICONS.DEFAULT;
    if (Math.random() < CONFIG.FREQUENT_ICON_PROBABILITY) {
        // One logo returns more often (the first icon in the set)
        return iconSet[CONFIG.FREQUENT_ICON_INDEX];
    } else {
        const randomIndex = Math.floor(Math.random() * iconSet.length);
        return iconSet[randomIndex];
    }
};

export const handleEmailInput = (success, setEmailInputClass, setEmailValidated, setEmailValidationMessage) => {
    if (success) {
        setEmailInputClass("form-input--success");
        setEmailValidated(true);
        setEmailValidationMessage(MESSAGES.SUCCESS.VALIDATION_EMAIL);
    } else {
        setEmailInputClass("form-input--error");
        setEmailValidated(false);
        setEmailValidationMessage(MESSAGES.ERROR.VALIDATION_EMAIL);
    }
};

export const trimInputString = (input) => {
    // Define a regular expression pattern to match Swedish letters, spaces, and numbers. And some characters like ':' and '/'.
    const pattern = /[a-zA-ZåäöÅÄÖ0-9\s():/.!",-]/g;
    if (!input) {
        return "";
    }
    const result = input.match(pattern);
    return result ? result.join("") : "";
};

export const handlePasswordInput = (success, setPasswordInputClass, setPasswordValidated, setPasswordValidationMessage) => {
    if (success) {
        setPasswordInputClass("form-input--success");
        setPasswordValidated(true);
        setPasswordValidationMessage(MESSAGES.SUCCESS.VALIDATION_PASSWORD);
    } else {
        setPasswordInputClass("form-input--error");
        setPasswordValidated(false)
        setPasswordValidationMessage(MESSAGES.ERROR.VALIDATION_PASSWORD);
    }
};

export const handleGenericFormInput = (success, setInputClass, setValidated) => {
    if (success) {
        setInputClass("form-input--success");
        setValidated(true);
    } else {
        setInputClass("form-input--error");
        setValidated(false);
    }
};

export const handleBacking = (navigate) => {
    navigate(-1);
};

export const generateUniqueHashedFilename = (fileExt, fileType) => {
    let number = Math.random() * 100;
    return fileType + number.toString().replace(".", "") + "." + fileExt;
};

export const printOptions = (data) => {
    return data && (
        data
            .sort((a, b) => sortByName(a, b))
            .map(
                (item) => <option key={item.id} value={item.id}>{item.name}</option>)
    )
};

export const printTitleOptions = (titleData) => {
    return titleData && (
        titleData
            .sort((a, b) => sortByName(a, b))
            .map(
                (item) => <option key={item.id} value={item.id}>{item.name} {item.start_year}</option>)
    )
};

export const getObjectNameById = (data, myId) => {
    let obj = data.filter(item => item.id === myId);
    return obj[0].name;
};

export const getYearsList = (startYear, endYear) => {
    let list = [];
    for (let i = startYear; i <= endYear; i++) {
        list.push(i);
    }
    return list;
};

export const getIndexList = (length) => {
    let list = [];
    for (let i = 0; i <= length; i++) {
        list.push(i.toString());
    }
    return list;
};

export const getIssuesPerYear = (totalIssues, startYear, endYear) => {
    if (startYear < endYear) {
        return Math.floor(totalIssues / (endYear - startYear + 1));
    } else if (startYear === endYear) {
        return totalIssues;
    } else {
        return 1;
    }
};

export const getIssueName = (issue) => {
    let number = issue.number;
    let variantSuffix = "";
    if (isVariant(issue)) {
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
};

export const getIssueNumber = (issue) => {
    if (isVariant(issue)) {
        return issue.number + issue.variant_suffix;
    } else {
        return issue.number;
    }
};

export const isVariant = (issue) => {
    return issue && issue.is_variant === 1;
};

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
};

export const getAnonDisplayName = (user) => {
    return user.id?.substring(0, 5) + " " + user.id?.substring(user.id.length - 7, user.id.length);
};

export const hasImage = (item) => {
    return item && item.image_filename && item.image_url;
};

export const getRandomProfileImage = () => {
    const imagePaths = Object.values(images).map((img) => img.default); // Get array of image paths
    const randomIndex = Math.floor(Math.random() * imagePaths.length); // Random index
    return imagePaths[randomIndex]; // Return a random image path
};

export const sortByName = (a, b) => {
    let aName = sortableName(a.name);
    let bName = sortableName(b.name);
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
};

export const sortByTitleYearNumber = (a, b) => {
    const titleComparison = a.titles.name.localeCompare(b.titles.name, 'sv');
    if (titleComparison !== 0) return titleComparison;
    const yearComparison = a.year - b.year;
    if (yearComparison !== 0) return yearComparison;
    return a.number - b.number;
};

export const sortByDateCreated = (a, b) => {
    if (a.created_at < b.created_at) return -1;
    if (a.created_at > b.created_at) return 1;
    return 0;
};

export const sortByDateCreatedDesc = (a, b) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
};

export const sortByNameAndStartYear = (a, b) => {
    let aName = sortableName(a.name);
    let bName = sortableName(b.name);
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    if (a.start_year < b.start_year) return -1;
    if (a.start_year > b.start_year) return 1;
    return 0;
};

export const sortByNumberAndVariantSuffix = (a, b) => {
    // First, compare by number
    if (a.number !== b.number) {
        return a.number - b.number;
    }
    // If numbers are equal, compare by suffix, considering undefined as less than any suffix
    let suffixA = a.variant_suffix || '';
    let suffixB = b.variant_suffix || '';
    return suffixA.localeCompare(suffixB);
};

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
};

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

export const objectDoesExist = (object) => {
    return Object.entries(object).length > 0;
};

export const listDoesExist = (list) => {
    return list && list.length > 0;
};

export const allListsDoesExist = (arrayOfLists) => {
    return arrayOfLists.every(list => listDoesExist(list));
};

export const atLeastOneListDoesExist = (arrayOfLists) => {
    return arrayOfLists.some(list => listDoesExist(list));
};

export const getCurrentDateAsISOString = () => {
    return (new Date()).toISOString();
};

export const getCurrentDateAsString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

export const getCurrentDate = () => {
    return new Date();
};

export const isChristmasTime = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const month = now.getMonth();
    let startOfXmas, endOfXmas;

    if (month === 0) { // January
        startOfXmas = new Date(currentYear - 1, 10, 25); // November 25 of the previous year
        endOfXmas = new Date(currentYear, 0, 15); // January 15 of the current year
    } else { // December
        startOfXmas = new Date(currentYear, 10, 25); // November 25 of the current year
        endOfXmas = new Date(currentYear + 1, 0, 15); // January 15 of the next year
    }

    return now >= startOfXmas && now <= endOfXmas;
};

export const splitBySeparatorAndGetLastElement = (string, separator) => {
    const elements = string.split(separator);
    return elements[elements.length - 1];
};

export const getFriendlyDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
};

export const getTinyFriendlyDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('sv-SE', {day: 'numeric', month: 'numeric'});
};

export const getAverageGrade = (grades) => {
    let totalGradeAmount = 0.0;
    for (let i = 0; i < grades.length; i++) {
        totalGradeAmount += grades[i].grade;
    }
    return totalGradeAmount / grades.length || 0.0;
};

export const getTotalGradeValue = async (grades) => {
    let totalGradeValue = 0;
    for (let i = 0; i < grades.length; i++) {
        try {
            const response = await getGradeValueByIssueIdAndGrade(grades[i].issue_id, grades[i].grade);
            if (response && response.data) {
                totalGradeValue += response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }
    return totalGradeValue;
};

export const isSKGradeValue = (gradeValue) => {
    return SK_GRADE_RADIO_VALUES.includes(gradeValue);
};

export const isSKGradeName = (gradeName) => {
    return SK_GRADE_RADIO_NAMES.includes(gradeName);
};

export const sortableName = (name) => {
    return name.trim().replace(":", "").replace("-", "").toLowerCase();
};

// Helper function for removing whitespace from strings - i.e. "My string" --> "mystring" or "my-string" if provided "-" as replacement.
export const trimAndReplace = (string, replacement = "") => {
    return string.trim().toLowerCase().replaceAll(" ", replacement);
};

export const trimAndReplaceSwedishCharacters = (string, replacement = "") => {
    let trimmedString = trimAndReplace(string, replacement)
    return trimmedString.replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o");
};

// Filter functions
export const filterQueryByNameAndStartYear = (obj, query) => {
    const lowerCaseQuery = query.toLowerCase();
    const queryTerms = lowerCaseQuery.split(' ');

    return queryTerms.every(term =>
        obj.name.toLowerCase().includes(term) ||
        obj.start_year.toString().toLowerCase().includes(term) ||
        query === ""
    );
};

export const filterQueryByFirstNameAndLastName = (user, query) => {
    const lowerCaseQuery = query.toLowerCase();
    const queryTerms = lowerCaseQuery.split(' ');

    return queryTerms.every(term =>
        user.firstname?.toLowerCase().includes(term) ||
        user.lastname?.toLowerCase().includes(term) ||
        query === ""
    );
};

export const filterQueryIssueByTitleNamePublisherNameYearAndSource = (issue, query, selectedGrades) => {
    const lowerCaseQuery = query.toLowerCase();
    const queryTerms = lowerCaseQuery.split(' ');

    const matchesQuery = queryTerms.every(term =>
        issue.id.toLowerCase().includes(term) ||
        issue.titles.name.toLowerCase().includes(term) ||
        issue.publishers.name.toString().toLowerCase().includes(term) ||
        issue.year.toString().toLowerCase().includes(term) ||
        issue.source.toString().toLowerCase().includes(term) ||
        getIssueName(issue).toString().toLowerCase().includes(term)
    );

    let matchesGrades = true;
    if (selectedGrades?.length > 0) {
        matchesGrades = issue.grades?.some(grade => selectedGrades.includes(grade.grade.toString()));
    }

    return matchesQuery && matchesGrades;
};

export const filterGlobalMessage = (message, showGlobal) => {
    if (showGlobal) {
        return message.is_global === 1;
    } else {
        return message.is_global === 0;
    }
};

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
};

export const filterByIsValued = (obj, isvalued, isnotvalued) => {
    return (
        (isTrue(isvalued) && obj.is_valued === 1) ||
        (isTrue(isnotvalued) && obj.is_valued === 0)
    )
};

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
};

export const filterAdminTitlesData = (titlesData, query, isvalued, isnotvalued) => {
    return (
        titlesData
            .filter((title) => {
                return (
                    filterQueryByNameAndStartYear(title, query)
                )
            })
            .filter((title) => {
                if (hasTrueValue([isvalued, isnotvalued])) {
                    return (
                        filterByIsValued(title, isvalued, isnotvalued)
                    )
                } else {
                    return true;
                }
            })
            .sort((a, b) => sortByNameAndStartYear(a, b))
    )
};

export const renderGradeValue = (issueData, gradeName) => {
    try {
        const gradeValues = issueData.grade_values;
        const value = getDataGradeValuesByGradeName(gradeValues, gradeName);
        return value > 0 ? value : "-";
    } catch (error) {
        console.error(error);
    }
};

export const showMoreItems = (data, setItemsToShow) => {
    setItemsToShow(prev => prev + CONFIG.PAGINATION_ITEM_COUNT);
};

export const showLessItems = (data, setItemsToShow, itemsToShow) => {
    if (data.length < itemsToShow) {
        setItemsToShow(data.length - CONFIG.PAGINATION_ITEM_COUNT);
    } else {
        setItemsToShow(prev => prev - CONFIG.PAGINATION_ITEM_COUNT);
    }
};

// Map utils
export const getPositionFromLocation = (location) => {
    if (!location || !location.geometry || !location.geometry.location) {
        throw new Error('Invalid location object');
    }
    return location.geometry.location;
};

export const getLocationFromPosition = (geocoder, position) => {
    return new Promise((resolve, reject) => {
        geocoder?.geocode({location: position}, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    resolve(results[0]);
                } else {
                    reject("No location found");
                }
            } else {
                reject("Geocoder failed due to: " + status);
            }
        }).then();
    });
};

export const getPostalTownOrCountry = (addressComponents) => {
    let postalTown = null;
    let country = null;

    addressComponents.forEach(component => {
        if (component.types.includes('postal_town')) {
            postalTown = component.long_name;
        }
        if (component.types.includes('country')) {
            country = component.long_name;
        }
    });

    // Return postal town if available, otherwise return country
    return postalTown || country;
};

export const initializeFilterGrades = () => {
    return Object.keys(GRADE_VARIANTS).reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {});
};

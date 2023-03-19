import {supabase} from "../../../supabase/supabaseClient";
import {TABLES} from "../../constants";


// TITLE
export const checkIfIsCollectingTitle = async (userId, titleId, setIsCollectingTitle) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_TITLES)
            .select()
            .match({user_id: userId, title_id: titleId})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsCollectingTitle(true)
        }
    } catch (error) {
        console.error(error);
    }
}

export const addTitleToCollection = async (userId, titleId) => {
    try {
        await supabase
            .from(TABLES.USERS_TITLES)
            .insert([{
                user_id: userId,
                title_id: titleId,
            }])
    } catch (error) {
        console.error(error);
    }
}

export const removeTitleFromCollection = async (userId, titleId, setInformationMessage, setIsCollectingTitle) => {
    let issueIds = [];
    await getAllIssueIdsForTitle(titleId).then((result) => {
        issueIds = result;
    })
    issueIds.forEach((issueId) => {
        removeIssueFromCollectionSimple(userId, issueId);
    })
    try {
        let {error, status} = await supabase
            .from(TABLES.USERS_TITLES)
            .delete()
            .match({user_id: userId, title_id: titleId})
        if (error && status !== 406) {
            setInformationMessage({show: true, status: status, error: error});
        } else {
            setIsCollectingTitle(false);
        }
    } catch (error) {
        console.error(error);
    }
}

// ISSUE
export const checkIfIsCollectingIssue = async (userId, issueId, setIsCollectingIssue) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_ISSUES)
            .select()
            .match({user_id: userId, issue_id: issueId})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsCollectingIssue(true)
        }
    } catch (error) {
        console.error(error);
    }
}

export const addIssueToCollection = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }]).then(async () => {
                await addGrade(userId, issueId);
            })
    } catch (error) {
        console.error(error);
    }
}

export const removeIssueFromCollection = async (userId, issueId, setInformationMessage, setIsCollectingIssue) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.USERS_ISSUES)
            .delete()
            .match({user_id: userId, issue_id: issueId})
        if (error && status !== 406) {
            setInformationMessage({show: true, status: status, error: error});
        } else {
            setIsCollectingIssue(false);
        }
    } catch (error) {
        console.error(error);
    } finally {
        await removeGrade(userId, issueId);
    }
}

export const removeIssueFromCollectionSimple = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES)
            .delete()
            .match({user_id: userId, issue_id: issueId})
            .then(() => {
                removeGrade(userId, issueId);
            })
    } catch (error) {
        console.error(error);
    }
}

export const getAllIssueIdsForTitle = async (titleId) => {
    let issueIds = [];
    console.log("iss id", titleId);
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("id")
            .eq("title_id", titleId)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            data.forEach(data => issueIds.push(data.id))
            console.log("issueidsefter", issueIds);
            return issueIds;
        }
    } catch (error) {
        console.error(error);
    }
}

export const addGrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.GRADES)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }])
    } catch (error) {
        console.error(error);
    }
}

export const removeGrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.GRADES)
            .delete()
            .match({user_id: userId, issue_id: issueId})
    } catch (error) {
        console.error(error);
    }
}

export const editGrade = async (userId, issueId) => {
    // TODO Edit grade
    try {
        await supabase
            .from(TABLES.USERS_ISSUES)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }])
    } catch (error) {
        console.error(error);
    }
}

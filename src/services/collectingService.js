import {supabase} from "../supabase/supabaseClient";
import {TABLES} from "../helpers/constants";


// TITLE
export const checkIfIsCollectingTitle = async (userId, titleId, setIsCollectingTitle) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_TITLES)
            .select()
            .match({user_id: userId, title_id: titleId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsCollectingTitle(true);
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
            }]);
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
            .match({user_id: userId, title_id: titleId});
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
            .match({user_id: userId, issue_id: issueId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsCollectingIssue(true);
        }
    } catch (error) {
        console.error(error);
    }
}

export const checkIfIsWantingIssue = async (userId, issueId, setIsWantingIssue) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_ISSUES_WANTED)
            .select()
            .match({user_id: userId, issue_id: issueId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsWantingIssue(true);
        }
    } catch (error) {
        console.error(error);
    }
}

export const checkIfIsUpgradingIssue = async (userId, issueId, setIsUpgradingIssue) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_ISSUES_UPGRADE)
            .select()
            .match({user_id: userId, issue_id: issueId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setIsUpgradingIssue(true);
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
            });
    } catch (error) {
        console.error(error);
    }
}

export const removeIssueFromCollection = async (userId, issueId, setInformationMessage, setIsCollectingIssue) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.USERS_ISSUES)
            .delete()
            .match({user_id: userId, issue_id: issueId});
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
            });
    } catch (error) {
        console.error(error);
    }
}

export const getAllIssueIdsForTitle = async (titleId) => {
    let issueIds = [];
    if (titleId) {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.ISSUES)
                .select("id")
                .eq("title_id", titleId);
            if (error && status !== 406) {
                console.error(error);
            }
            if (data) {
                data.forEach(data => issueIds.push(data.id));
                return issueIds;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const getNoCollectedIssues = async (titleId, userId) => {
    if (titleId && userId) {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.ISSUES)
                .select("id, users!users_issues!inner (id)")
                .eq("title_id", titleId)
                .eq("users.id", userId);
            if (error && status !== 406) {
                console.error(error);
            }
            if (data && data.length > 0) {
                return data.length;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// GRADE

export const addGrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.GRADES)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }]);
    } catch (error) {
        console.error(error);
    }
}

export const removeGrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.GRADES)
            .delete()
            .match({user_id: userId, issue_id: issueId});
    } catch (error) {
        console.error(error);
    }
}

export const editGrade = async (gradeId, userId, issueId, value) => {
    try {
        await supabase
            .from(TABLES.GRADES)
            .update([{
                grade: value
            }])
            .eq("id", gradeId)
            .eq("user_id", userId)
            .eq("issue_id", issueId);
    } catch (error) {
        console.error(error);
    }
}

export const getGradesByUserIdAndIssueId = async (userId, issueId, setGrades) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.GRADES)
            .select("*")
            .match({user_id: userId, issue_id: issueId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setGrades(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllGradesByUserId = async (userId, setGrades) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.GRADES)
            .select("*")
            .match({user_id: userId});
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setGrades(data);
        }

    } catch (error) {
        console.error(error);
    }
}

// WANTED

export const addIssueToWanted = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES_WANTED)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }]);
    } catch (error) {
        console.error(error);
    }
}

export const removeIssueFromWanted = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES_WANTED)
            .delete()
            .match({user_id: userId, issue_id: issueId});
    } catch (error) {
        console.error(error);
    }
}

export const getWantedIssuesForUser = async (userId, setData) => {
    if (userId) {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.ISSUES)
                .select("*, users!users_issues_wanted!inner (id), titles (*)")
                .eq("users.id", userId);
            if (error && status !== 406) {
                console.error(error);
            }
            if (data && data.length > 0) {
                setData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// UPGRADE

export const addIssueToUpgrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES_UPGRADE)
            .insert([{
                user_id: userId,
                issue_id: issueId,
            }]);
    } catch (error) {
        console.error(error);
    }
}

export const removeIssueFromUpgrade = async (userId, issueId) => {
    try {
        await supabase
            .from(TABLES.USERS_ISSUES_UPGRADE)
            .delete()
            .match({user_id: userId, issue_id: issueId});
    } catch (error) {
        console.error(error);
    }
}

export const getUpgradeIssuesForUser = async (userId, setData) => {
    if (userId) {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.ISSUES)
                .select("*, users!users_issues_upgrade!inner (id), titles (*)")
                .eq("users.id", userId);
            if (error && status !== 406) {
                console.error(error);
            }
            if (data && data.length > 0) {
                setData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

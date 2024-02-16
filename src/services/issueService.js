import {supabase} from "../supabase/supabaseClient";
import {BUCKETS, MESSAGES, TABLES} from "../helpers/constants";
import {handleMultipleDeleteNoConfirm} from "./serviceFunctions";
import {checkIfIsCollectingIssueSimple} from "./collectingService";

export const addIssueData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.ISSUES)
            .insert([{
                title_id: data.title_id,
                publisher_id: data.publisher_id,
                year: data.year,
                number: data.number,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
                is_variant: data.is_variant,
                is_double: data.is_double,
                variant_suffix: data.variant_suffix,
                source: data.source
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateIssueData = async (id, data) => {
    try {
        await supabase
            .from(TABLES.ISSUES)
            .update([{
                title_id: data.title_id,
                publisher_id: data.publisher_id,
                year: data.year,
                number: data.number,
                is_double: data.is_double,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
                is_variant: data.is_variant,
                variant_suffix: data.variant_suffix,
                source: data.source
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}

export const generateIssuesForTitle = async (titleData, setInformationMessage, publisher_id) => {
    if (!window.confirm(MESSAGES.CONFIRM.GENERATE_ISSUES + " " + MESSAGES.CONFIRM.GENERATE + titleData.issuesPerYear + MESSAGES.CONFIRM.ISSUES_PER_YEAR)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    }
    try {
        titleData.years.map(async (year) => {
            for (let i = 0; i < titleData.issuesPerYear; i++) {
                try {
                    await supabase
                        .from(TABLES.ISSUES)
                        .insert([{
                            title_id: titleData.titleId,
                            publisher_id: publisher_id,
                            year: year,
                            number: i + 1,
                            is_marvelklubben: 0,
                            marvelklubben_number: 0,
                            is_variant: 0,
                            variant_suffix: "a",
                        }])
                } catch (error) {
                    console.error(error);
                }
            }
        })
        setInformationMessage({show: true, status: 201, error: null});
    } catch (error) {
        console.error(error);
    }
}

export const deleteAllIssues = async (issuesData, setIssuesData, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE_ISSUES)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    }
    try {
        issuesData.map(async (issue) => {
            await handleMultipleDeleteNoConfirm(TABLES.ISSUES, issue.id, issue.number, setIssuesData, issuesData,
                issue.image_filename, BUCKETS.ISSUE_IMAGES, setInformationMessage);
        })
        setInformationMessage({show: true, status: 2, error: MESSAGES.SUCCESS.VALIDATION_DELETE});
    } catch (error) {
        console.error(error);
    }
}

export const getIssueIdByTitleAndNumber = async (number, titleId, year, setIssueId) => {
    try {
        let {data} = await supabase
            .from(TABLES.ISSUES)
            .select("id")
            .eq("title_id", titleId)
            .eq("number", number)
            .eq("year", year)
            .limit(1)
            .single()
        if (data) {
            setIssueId(data.id);
        } else {
            setIssueId(null);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllMarvelklubbenIssues = async (setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("*, titles (*)")
            .eq("is_marvelklubben", 1)
            .order("marvelklubben_number", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllIssuesWithTitleAndPublisher = async (setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("*, publishers (*), titles (*)")
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllIssuesWithTitleAndPublisherWithLimit = async (setData, limit, ascending) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("*, publishers (*), titles (*)")
            .limit(limit)
            .order("created_at", {ascending})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getIssuesWithTitleAndPublisherAndGradeValuesByTitleId = async (setData, id) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("*, publishers (*), titles (*), grade_values (*)")
            .eq("title_id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getIssuesWithTitleAndPublisherByPublisherId = async (setData, id) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.ISSUES)
            .select("*, publishers (*), titles (*)")
            .eq("publisher_id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const doesIssueNeedGrading = async (issueId, userId) => {
    const isCollectingIssue = await checkIfIsCollectingIssueSimple(issueId, userId);
    if (isCollectingIssue === false || isCollectingIssue === undefined) {
        return false;
    }
    try {
        let {data, error, status} = await supabase
            .from(TABLES.GRADES)
            .select("*")
            .match({issue_id: issueId, user_id: userId})
        if (error && status !== 406) {
            console.error(error);
            return false;
        }
        return !(data && data.length > 0);
    } catch (error) {
        console.error(error);
        return false;
    }
}

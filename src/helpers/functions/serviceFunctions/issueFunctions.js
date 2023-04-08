import {supabase} from "../../../supabase/supabaseClient";
import {BUCKETS, MESSAGES, TABLES} from "../../constants";
import {handleMultipleDeleteNoConfirm} from "./serviceFunctions";

export const addIssueData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.ISSUES)
            .insert([{
                title_id: data.title_id,
                year: data.year,
                number: data.number,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
                is_variant: data.is_variant,
                variant_suffix: data.variant_suffix,
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateIssueData = async (id, data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.ISSUES)
            .update([{
                title_id: data.title_id,
                year: data.year,
                number: data.number,
                is_double: data.is_double,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
                is_variant: data.is_variant,
                variant_suffix: data.variant_suffix,
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const generateIssuesForTitle = async (titleData, setInformationMessage) => {
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
                            year: year,
                            number: i + 1,
                            is_marvelklubben: 0,
                            marvelklubben_number: 0,
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
            .select("*")
            .eq("is_marvelklubben", 1)
            .order("marvelklubben_number", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error(error);
    }
}

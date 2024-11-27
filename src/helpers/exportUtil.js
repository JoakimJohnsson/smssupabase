import {saveAs} from 'file-saver';
import Papa from 'papaparse';
import {
    getCurrentDateAsString,
    getIssueNumber,
    sortByTitleYearNumber
} from "./functions.jsx";

export const exportToCSV = (data, filename) => {
    // Convert data to CSV
    const csv = Papa.unparse(data, {
        header: true, // Add CSV header row
    });
    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // Save the file
    saveAs(blob, `${filename}-${getCurrentDateAsString()}.csv`);
};

export const exportToPDF = (data, filename) => {
    console.log("TODO", data);
    console.log("TODO", filename);
};

export const getExportDataForIssues = (data) => {
    return data
        .sort((a, b) => sortByTitleYearNumber(a, b))
        .map(issue => ({
        Titel: issue.titles.name,
        År: issue.year,
        Nummer: getIssueNumber(issue),
        Variant: issue.is_variant === 1 ? "ja" : "nej",
        Marvelklubben: issue.is_marvelklubben === 1 ? issue.marvelklubben_number : "nej",
    }));
}
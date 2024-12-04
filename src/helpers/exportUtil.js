import {saveAs} from 'file-saver';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
    getCurrentDateAsString,
    getIssueNumber,
    sortByTitleYearNumber
} from "./functions.jsx";
import {getMissingUserIssues} from "./databaseFunctions.js";
import {LABELS} from "./constants/textConstants/labelsAndHeadings.js";

export const exportToCSV = (data, fileName) => {
    // Convert data to CSV
    const csv = Papa.unparse(data, {
        header: true, // Add CSV header row
    });
    // Create a Blob from the CSV string
    const blob = new Blob(["\uFEFF" + csv], {type: 'text/csv;charset=utf-8;'});
    // Save the file
    saveAs(blob, `${fileName}-${getCurrentDateAsString()}.csv`);
};

export const exportIssuesToPDF = (data, fileName) => {
    const doc = new jsPDF();
    // Add a title to the PDF
    doc.text(fileName, 14, 10);
    // Format the data for the table
    const tableData = data.map(item => [
        item.Titel,
        item.\u00C5r,
        item.Nummer,
        item.Variant,
        item.Marvelklubben,
    ]);
    // Add a table to the PDF
    doc.autoTable({
        head: [['Titel', 'Årtal', 'Nummer', 'Variant', 'Marvelklubben']],
        body: tableData,
        startY: 20, // Position the table below the title
    });
    // Save the PDF
    doc.save(`${fileName}-${getCurrentDateAsString()}.pdf`);
};

export const getExportDataForIssues = (data) => {
    if (!data) return null;
    return data
        .sort((a, b) => sortByTitleYearNumber(a, b))
        .map(issue => ({
            Titel: issue.titles.name,
            \u00C5r: issue.year,
            Nummer: getIssueNumber(issue),
            Variant: issue.is_variant === 1 ? "ja" : "nej",
            Marvelklubben: issue.is_marvelklubben === 1 ? issue.marvelklubben_number : "nej",
        }));
}

export const exportMissingIssuesForUser = async (doExportPdf, user) => {
    const result = await getMissingUserIssues(user.id);
    if (result) {
        const exportData = getExportDataForIssues(result.data);
        if (doExportPdf) {
            exportIssuesToPDF(exportData, LABELS.SECTIONS.ISSUES.MISSING_ISSUES_FILENAME);
        } else {
            exportToCSV(exportData, LABELS.SECTIONS.ISSUES.MISSING_ISSUES_FILENAME);
        }
    }
};
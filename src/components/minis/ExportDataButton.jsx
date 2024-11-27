import React from "react";
import {csvIconDuoTone, pdfIconDuoTone} from "../icons";
import {FunctionButton} from "./FunctionButton.jsx";
import {exportToCSV, exportToPDF} from "../../helpers/exportUtil.js";


export const ExportDataButton = ({doExportPdf = false, data, fileName, label, variant}) => {

    const handleExport = () => {
        if (doExportPdf) {
            exportToPDF(data, fileName);
        } else {
            exportToCSV(data, fileName);
        }

    };

    return (
        <FunctionButton
            variant={variant}
            icon={doExportPdf ? pdfIconDuoTone : csvIconDuoTone}
            onClick={() => handleExport()}
            label={label}
            showLabel={true}
        />
    )
}

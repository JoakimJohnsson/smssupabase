import React from "react";
import {csvIconDuoTone, pdfIconDuoTone} from "../icons";
import {FunctionButton} from "./FunctionButton.jsx";


export const ExportDataButton = ({doExportPdf = false, data, label, variant}) => {

    const handleExport = () => {
        console.log("Handling export!")
        console.log("Do export pdf? ", doExportPdf)
        console.log("Data: ", data)
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

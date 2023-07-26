import React from "react";
import formatData from "../../helpers/valueLists/formats.json";
import FormatFilterRadio from "./FormatFilterRadio";
import {sortByName} from "../../helpers/functions/functions";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";


const FormatFilter = () => {

    return formatData && (
        <div className={"input-group my-3"}>
            <div className={"form-check me-3"}>
                <input className="form-check-input" type="radio" name="formatFilterRadio" id={"defaultRadio"} value={""}/>
                <label className="form-check-label" htmlFor={"defaultRadio"}>
                    {LABELS_AND_HEADINGS.DEFAULT_FORMATS}
                </label>
            </div>
            {
                formatData
                    .sort((a, b) => sortByName(a, b))
                    .map((format) => <FormatFilterRadio format={format}/>)
            }
        </div>
    )
};
export default FormatFilter;

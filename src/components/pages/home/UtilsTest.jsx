import {UtilsGetFormattedAuthorsString} from "./UtilsGetFormattedAuthorsString.jsx";
import {UtilsGetFullTitle} from "./UtilsGetFullTitle.jsx";


export const UtilsTest = () => {

    return (
        <div className={"col-12 col-xl-6"}>
            <div className={"col-12 border p-4 mb-3"}>
                <h2>Utils</h2>
                <p className={"lead"}>Javascript versioner av dessa utilfunktioner från Polopoly</p>
                <UtilsGetFormattedAuthorsString />
                <UtilsGetFullTitle />
            </div>
        </div>
    )
}

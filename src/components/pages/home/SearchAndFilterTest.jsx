import React, {} from "react";
import publications from "../../../helpers/valueLists/publications.json";


export const SearchAndFilterTest = () => {

    console.log("Publications: ", publications)

    return (
        <div className={"col-12 col-lg-6"}>
            <div className={"col-12 border p-4 mb-3"}>
                <h2>Sök / filtrering</h2>
            </div>
        </div>
    )
}

import React from "react";
import {OtherCollectionsPaneListItem} from "./OtherCollectionsPaneListItem";


export const OtherCollectionsPane = () => {
    return (
        <div className={"sms-section--light mb-3"}>
            <h2>Andra samlingar</h2>
            <ul>
                <OtherCollectionsPaneListItem/>
            </ul>
        </div>
    )
}

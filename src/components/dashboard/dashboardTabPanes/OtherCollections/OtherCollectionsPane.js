import React, {useState, useEffect} from "react";
import {OtherCollectionsPaneListItem} from "./OtherCollectionsPaneListItem";
import {PANES} from "../../../../helpers/constants";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


export const OtherCollectionsPane = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {profile} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.OTHER_COLLECTIONS.NAME}/>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <ul className={"sms-list--with-cards"}>
                        {
                            usersData.map((user) =>
                                // List public users other than profile
                                user.is_public === 1 && user.id !== profile.id &&
                                <OtherCollectionsPaneListItem user={user} key={user.id}/>
                            )
                        }
                    </ul>
            }
        </div>
    )
}

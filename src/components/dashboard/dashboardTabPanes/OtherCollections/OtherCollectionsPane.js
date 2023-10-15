import React, {useState, useEffect} from "react";
import {OtherCollectionsPaneListItem} from "./OtherCollectionsPaneListItem";
import {PANES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {useAppContext} from "../../../../context/AppContext";


export const OtherCollectionsPane = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {profile} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <>
            <h1 className={"mb-5"}>{PANES.OTHER_COLLECTIONS.NAME}</h1>
            <div>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <ul className={"sms-list--with-cards"}>
                            {
                                usersData.map((user) =>
                                    // List public users other than profile
                                    user.is_public === 1 && user.id !== profile.id &&
                                    <OtherCollectionsPaneListItem user={user}/>
                                )
                            }
                        </ul>
                }
            </div>
        </>
    )
}

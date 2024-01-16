import React, {useState, useEffect} from "react";
import {OtherCollectionsPaneListItem} from "./OtherCollectionsPaneListItem";
import {PANES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {CustomSpinner} from "../../../minis/CustomSpinner";


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
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
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
        </>
    )
}

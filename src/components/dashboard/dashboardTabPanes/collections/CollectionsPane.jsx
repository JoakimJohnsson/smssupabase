import React, {useState, useEffect} from "react";
import {CollectionsPaneListItem} from "./CollectionsPaneListItem";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


export const CollectionsPane = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {profile} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <>
            <HeadingWithBreadCrumbs text={PANES.COLLECTIONS.NAME}/>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <ul className={"sms-list--with-cards"}>
                        {
                            usersData.map((user) =>
                                // List public users other than profile
                                user?.is_public === 1 && user.id !== profile.id &&
                                <CollectionsPaneListItem user={user} key={user.id}/>
                            )
                        }
                    </ul>
            }
        </>
    )
}

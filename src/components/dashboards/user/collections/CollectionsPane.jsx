import React, {useState, useEffect} from "react";
import {CollectionsPaneListItem} from "./CollectionsPaneListItem";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {HeadingWithBreadcrumbs} from "../../../headings/HeadingWithBreadcrumbs.jsx";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {SmsListWithCards} from "../../../pages/pagecomponents/SmsListWithCards.jsx";


export const CollectionsPane = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {profile} = useAppContext();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <>
            <HeadingWithBreadcrumbs text={PANES.COLLECTIONS.NAME}/>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <SmsListWithCards>
                        {
                            usersData.map((user) =>
                                // List public users other than profile
                                user?.is_public === 1 && user.id !== profile.id &&
                                <CollectionsPaneListItem user={user} key={user.id}/>
                            )
                        }
                    </SmsListWithCards>
            }
        </>
    )
}

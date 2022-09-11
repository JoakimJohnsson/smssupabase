import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../miniComponents/Spinner";
import {TABLES} from "../../../helpers/constants";
import {isTrue} from "../../../helpers/functions";
import {AdminH1} from "../../headings";
import {getRowByTableAndId} from "../../serviceFunctions";
import {ToggleEditButtons} from "../../miniComponents/ToggleEditButton";
import {AdminPublisherEditInfo} from "./AdminPublisherEditInfo";
import {AdminPublisherInfo} from "./AdminPublisherInfo";


export const AdminPublisher = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={publisher.name}/>
                    {
                        edit ?
                            <AdminPublisherEditInfo publisher={publisher}/>
                            :
                            <AdminPublisherInfo publisher={publisher}/>
                    }
                    <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                </div>
            </div>
        </main>
    )
}

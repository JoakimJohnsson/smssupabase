import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {TABLES} from "../../../../helpers/constants";
import formatData from "../../../../helpers/valueLists/formats.json";
import {isTrue} from "../../../../helpers/functions";
import {AdminH1} from "../../../headings";
import {ToggleEditButtons} from "../../../minis/ToggleEditButton";
import {AdminTitleInfo} from "./AdminTitleInfo";
import {AdminTitleEditInfo} from "./AdminTitleEditInfo";


export const AdminTitle = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [title, setTitle] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then();
    }, [id])

    return title && formatData ? (
            <main className={"container-fluid main-container"}>
                <div className={"row"}>
                    <div className={"col-12 main-col"}>
                        <AdminH1 text={title.name + " " + title.start_year + " - " + title.end_year}/>
                        {
                            edit ?
                                <AdminTitleEditInfo />
                                :
                                <AdminTitleInfo title={title} formatData={formatData}/>
                        }
                        <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                    </div>
                </div>
            </main>
        )
        :
        (<Spinner/>)
}

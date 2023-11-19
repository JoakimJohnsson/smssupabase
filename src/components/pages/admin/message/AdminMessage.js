import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {publishersIconDuoTone} from "../../../icons-duotone";
import {IconButton} from "../../../minis/IconButton";


export const AdminMessage = () => {

    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchMessageData = useCallback(() => {
        getRowByTableAndId(TABLES.MESSAGES, setMessage, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchMessageData();
    }, [id, fetchMessageData]);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={message.title}/>
                                <p className={"lead"}>{TEXTS.ADMIN_PUBLISHER_LEAD}</p>
                                <IconButton variant={"primary"} icon={publishersIconDuoTone} onClick={() => navigate(`/messages/${message.id}`)}
                                            label={message.title}/>
                            </div>

                        </div>
                        <div className={"row row-padding--secondary"}>
                            <p>Lägg till message?</p>
                            <div className={"sms-dashboard-col"}>

                                <p>Hejsan</p>

                            </div>
                        </div>
                    </>
            }
        </main>
    )
}

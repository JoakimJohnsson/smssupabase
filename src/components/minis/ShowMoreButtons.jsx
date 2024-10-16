import React from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {handleBacking, showLessItems, showMoreItems} from "../../helpers/functions";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {faPlus, faMinus} from "@fortawesome/pro-duotone-svg-icons";
import {FunctionButton} from "./FunctionButton";
import {IconButton} from "./IconButton";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {useNavigate} from "react-router-dom";


export const ShowMoreButtons = ({data, setItemsToShow, itemsToShow}) => {

    const navigate = useNavigate();

    return data && !!data.length && (
        <>
            <div className="mb-2">
                {
                    itemsToShow < data.length &&
                    <FunctionButton
                        variant={"primary"}
                        label={LABELS.COMMON.SHOW_MORE}
                        icon={faPlus}
                        onClick={() => showMoreItems(data, setItemsToShow)}
                        disabled={false}
                    />
                }
                {
                    (itemsToShow > CONFIG.PAGINATION_ITEM_COUNT) && !(itemsToShow > data.length) &&
                    <FunctionButton
                        variant={"secondary"}
                        label={LABELS.COMMON.SHOW_LESS}
                        icon={faMinus}
                        onClick={() => showLessItems(data, setItemsToShow, itemsToShow)}
                        disabled={false}
                    />
                }
            </div>
            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                        label={LABELS.COMMON.BACK}/>
        </>
    )
}

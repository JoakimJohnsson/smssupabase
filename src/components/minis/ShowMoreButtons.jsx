import React from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {showLessItems, showMoreItems} from "../../helpers/functions";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {faPlus, faMinus} from "@fortawesome/pro-duotone-svg-icons";
import {FunctionButton} from "./FunctionButton";


export const ShowMoreButtons = ({data, setItemsToShow, itemsToShow}) => {

    return data && !!data.length && (
        <>
            <div className="mb-2">
                {
                    itemsToShow < data.length &&
                    <FunctionButton
                        variant={"btn-outline-primary"}
                        label={LABELS.COMMON.SHOW_MORE}
                        icon={faPlus}
                        onClick={() => showMoreItems(data, setItemsToShow)}
                        disabled={false}
                    />
                }
                {
                    (itemsToShow > CONFIG.PAGINATION_ITEM_COUNT) && !(itemsToShow > data.length) &&
                    <FunctionButton
                        variant={"btn-outline-secondary"}
                        label={LABELS.COMMON.SHOW_LESS}
                        icon={faMinus}
                        onClick={() => showLessItems(data, setItemsToShow, itemsToShow)}
                        disabled={false}
                    />
                }
            </div>
        </>
    )
}

import React from "react";
import {ROUTES} from "../../../helpers/constants/configConstants";
import {collectionsIconDuoTone, overviewIconDuoTone, titlesIconDuoTone, valueIconDuoTone} from "../../icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {IconLinkCtaLg} from "../../minis/IconLinkCtaLg";
import {PANES} from "../../../helpers/constants/textConstants/texts";


export const DashboardSection = () => {

    return (
        <>
            <h2>{LABELS.SECTIONS.DASHBOARD.NAME}</h2>
            <IconLinkCtaLg
                variant={"primary"}
                icon={overviewIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_OVERVIEW}
                label={PANES.OVERVIEW.NAME}
            />
            <IconLinkCtaLg
                variant={"primary"}
                icon={titlesIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                label={PANES.TITLES.NAME}
            />
            <IconLinkCtaLg
                variant={"grade"}
                icon={valueIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_VALUATION}
                label={PANES.VALUATION.NAME}
            />
            <IconLinkCtaLg
                variant={"country"}
                icon={collectionsIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_COLLECTIONS}
                label={PANES.COLLECTIONS.NAME}
            />
        </>
    )
}

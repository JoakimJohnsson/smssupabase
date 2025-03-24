import React from "react";
import {ROUTES} from "../../../helpers/constants/configConstants";
import {
    collectionsIconDuoTone,
    // Maps section temporarily disabled awaiting rework and Google Maps api fixes
    // mapsIconDuoTone,
    overviewIconDuoTone,
    issueIconDuoTone,
    titlesIconDuoTone,
    valueIconDuoTone
} from "../../icons";
import {IconLinkCtaLg} from "../../minis/IconLinkCtaLg";
import {PANES} from "../../../helpers/constants/textConstants/texts";


export const DashboardSection = () => {

    return (
        <>
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
                variant={"primary"}
                icon={issueIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_MY_ISSUES}
                label={PANES.ISSUES.NAME}
            />
            <IconLinkCtaLg
                variant={"grade"}
                icon={valueIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_VALUATION}
                label={PANES.VALUATION.NAME}
            />
            <IconLinkCtaLg
                variant={"warning"}
                icon={collectionsIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_COLLECTIONS}
                label={PANES.COLLECTIONS.NAME}
            />
            {/* Maps section temporarily disabled awaiting rework and Google Maps api fixes
            <IconLinkCtaLg
                variant={"country"}
                icon={mapsIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_MAP}
                label={PANES.MAP.NAME}
            />
            */}
        </>
    )
}

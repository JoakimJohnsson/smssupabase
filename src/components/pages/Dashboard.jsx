import React from "react";
import {Outlet} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {HomePublic} from "./home/HomePublic";
import {FooterDashboardNavigation} from "../navigation/FooterDashboardNavigation";


export const Dashboard = () => {

    const {user} = useAppContext();

    return user ? (
        <>
            <main id="main-content" className={"container-fluid main-container dashboard"}>
                    <div className={"row row-padding--dashboard"}>
                        <Outlet/>
                    </div>
            </main>
            <FooterDashboardNavigation />
        </>
        )
        :
        <HomePublic/>
}

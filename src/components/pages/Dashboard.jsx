import React from "react";
import {Outlet} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {HomePublic} from "./home/HomePublic";
import {FooterDashboardNavigation} from "../navigation/FooterDashboardNavigation";


export const Dashboard = () => {

    const {user} = useAppContext();

    return user ?
        <>
            <div className="sms-page-col">
                <div className="sms-dashboard-row">
                    <Outlet/>
                </div>
            </div>
            <FooterDashboardNavigation/>
        </>
        :
        <HomePublic/>
}

import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import SignupSuccess from "./pages/SignUpSuccess";
import {ROUTES} from "../helpers/constants";
import {Home} from "./pages/Home";
import {Dashboard} from "./pages/Dashboard";
import {OverviewPane} from "./dashboard/dashboardTabPanes/OverviewPane";
import {TitlesPane} from "./dashboard/dashboardTabPanes/TitlesPane";
import {OtherCollectionsPane} from "./dashboard/dashboardTabPanes/OtherCollectionsPane";
import Settings from "./pages/Settings";
import {Title} from "./pages/Title";
import {Titles} from "./pages/Titles";
import {useAppContext} from "../context/AppContext";
import {Admin} from "./pages/admin/Admin";
import {AdminPublisher} from "./pages/admin/publisher/AdminPublisher";
import {AdminPublishers} from "./pages/admin/publisher/AdminPublishers";
import {AdminPublisherAdd} from "./pages/admin/publisher/AdminPublisherAdd";
import {AdminTitle} from "./pages/admin/title/AdminTitle";
import {AdminTitles} from "./pages/admin/title/AdminTitles";
import {AdminTitleAdd} from "./pages/admin/title/AdminTitleAdd";
import {AdminIssue} from "./pages/admin/issue/AdminIssue";
import {AdminIssues} from "./pages/admin/issue/AdminIssues";


export const MyRoutes = () => {

    const {session, role} = useAppContext();

    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
            {/* USER */}
            <Route path={ROUTES.DASHBOARD.ROOT} element={session ? <Dashboard/> : <Navigate replace to={ROUTES.DEFAULT}/>}>
                <Route index element={session ? <Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.DASHBOARD.OVERVIEW} element={session ? <OverviewPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.DASHBOARD.TITLES} element={session ? <TitlesPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.DASHBOARD.OTHER_COLLECTIONS}
                       element={session ? <OtherCollectionsPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={"*"} element={<p>No match!</p>}/>
            </Route>
            <Route path={ROUTES.SETTINGS} element={session ? <Settings/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.TITLE} element={session ? <Title/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.TITLES} element={session ? <Titles/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            {/* ADMIN */}
            <Route path={ROUTES.ADMIN.ROOT} element={(session && role === 1) ? <Admin/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            {/* Publisher */}
            <Route path={ROUTES.ADMIN.PUBLISHER_ID}
                   element={(session && role === 1) ? <AdminPublisher/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHERS} element={(session && role === 1) ? <AdminPublishers/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHER_ADD}
                   element={(session && role === 1) ? <AdminPublisherAdd/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            {/* Title */}
            <Route path={ROUTES.ADMIN.TITLE_ID} element={(session && role === 1) ? <AdminTitle/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.ADMIN.TITLES} element={(session && role === 1) ? <AdminTitles/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.ADMIN.TITLE_ADD} element={(session && role === 1) ? <AdminTitleAdd/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            {/* Issue */}
            <Route path={ROUTES.ADMIN.ISSUE_ID} element={(session && role === 1) ? <AdminIssue/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            <Route path={ROUTES.ADMIN.ISSUES} element={(session && role === 1) ? <AdminIssues/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
            {/* Catch all */}
            <Route path={"*"} element={<p>No match!</p>}/>
        </Routes>
    )
}

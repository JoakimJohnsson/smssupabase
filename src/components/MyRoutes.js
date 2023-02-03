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
import {AdminIssueAdd} from "./pages/admin/issue/AdminIssueAdd";


export const MyRoutes = () => {

    const {loggedIn, role} = useAppContext();

    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
            {/* USER */}
            <Route path={ROUTES.DASHBOARD.ROOT} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <Dashboard/>}>
                <Route index element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/>}/>
                <Route path={ROUTES.DASHBOARD.OVERVIEW} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <OverviewPane/>}/>
                <Route path={ROUTES.DASHBOARD.TITLES} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <TitlesPane/>}/>
                <Route path={ROUTES.DASHBOARD.OTHER_COLLECTIONS}
                       element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <OtherCollectionsPane/>}/>
                <Route path={"*"} element={<p>No match!</p>}/>
            </Route>
            <Route path={ROUTES.SETTINGS} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <Settings/>}/>
            <Route path={ROUTES.TITLE} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <Title/>}/>
            <Route path={ROUTES.TITLES} element={!loggedIn ? <Navigate replace to={ROUTES.DEFAULT}/> : <Titles/>}/>
            {/* ADMIN */}
            <Route path={ROUTES.ADMIN.ROOT} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <Admin/>}/>
            {/* Publisher */}
            <Route path={ROUTES.ADMIN.PUBLISHER_ID}
                   element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisher/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHERS} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublishers/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHER_ADD}
                   element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisherAdd/>}/>
            {/* Title */}
            <Route path={ROUTES.ADMIN.TITLE_ID} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitle/>}/>
            <Route path={ROUTES.ADMIN.TITLES} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitles/>}/>
            <Route path={ROUTES.ADMIN.TITLE_ADD} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleAdd/>}/>
            {/* Issue */}
            <Route path={ROUTES.ADMIN.ISSUE_ID} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminIssue/>}/>
            <Route path={ROUTES.ADMIN.ISSUE_ADD} element={(!loggedIn && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminIssueAdd/>}/>
            {/* Catch all */}
            <Route path={"*"} element={<p>No match!</p>}/>
        </Routes>
    )
}

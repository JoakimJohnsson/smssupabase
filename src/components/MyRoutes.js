import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import SignupSuccess from "./pages/SignUpSuccess";
import {ROUTES} from "../helpers/constants";
import {Home} from "./pages/Home";
import {Dashboard} from "./pages/Dashboard";
import {OverviewPane} from "./dashboard/dashboardTabPanes/OverviewPane";
import {TitlesPane} from "./dashboard/dashboardTabPanes/TitlesPane";
import {OtherCollectionsPane} from "./dashboard/dashboardTabPanes/OtherCollectionsPane";
import Profile from "./pages/Profile";
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
import {Issue} from "./pages/Issue";
import {Issues} from "./pages/Issues";
import {Publisher} from "./pages/Publisher";
import {Publishers} from "./pages/Publishers";
import {AdminUsers} from "./pages/admin/users/AdminUsers";
import {Marvelklubben} from "./pages/Marvelklubben";
import EditMail from "./pages/EditMail";


export const MyRoutes = () => {

    const {user, profile} = useAppContext();


    return user && profile ? (
            <Routes>
                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                <Route path={ROUTES.EDIT_MAIL} element={<EditMail/>}/>
                {/* USER */}
                <Route path={ROUTES.DASHBOARD.ROOT} element={user && user.id ? <Dashboard/> : <Navigate replace to={ROUTES.DEFAULT}/>}>
                    <Route index
                           element={user && user.id ? <Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.OVERVIEW} element={user && user.id ? <OverviewPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.TITLES} element={user && user.id ? <TitlesPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.OTHER_COLLECTIONS}
                           element={user && user.id ? <OtherCollectionsPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={"*"} element={<p>No match!</p>}/>
                </Route>
                <Route path={ROUTES.PROFILE} element={user && user.id ? <Profile/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.TITLE_ID} element={user && user.id ? <Title/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.TITLES} element={user && user.id ? <Titles/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ISSUE_ID} element={user && user.id ? <Issue/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ISSUES} element={user && user.id ? <Issues/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.PUBLISHER_ID} element={user && user.id ? <Publisher/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.PUBLISHERS} element={user && user.id ? <Publishers/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.MARVELKLUBBEN} element={user && user.id ? <Marvelklubben/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* ADMIN */}
                <Route path={ROUTES.ADMIN.ROOT} element={(user && user.id && profile.role >= 1) ? <Admin/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Publisher */}
                <Route path={ROUTES.ADMIN.PUBLISHER_ID}
                       element={(user && user.id && profile.role >= 1) ? <AdminPublisher/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.PUBLISHERS}
                       element={(user && user.id && profile.role >= 1) ? <AdminPublishers/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.PUBLISHER_ADD}
                       element={(user && user.id && profile.role >= 1) ? <AdminPublisherAdd/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Title */}
                <Route path={ROUTES.ADMIN.TITLE_ID} element={(user && user.id && profile.role >= 1) ? <AdminTitle/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.TITLES} element={(user && user.id && profile.role >= 1) ? <AdminTitles/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.TITLE_ADD}
                       element={(user && user.id && profile.role >= 1) ? <AdminTitleAdd/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Issue */}
                <Route path={ROUTES.ADMIN.ISSUE_ID} element={(user && user.id && profile.role >= 1) ? <AdminIssue/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.ISSUES} element={(user && user.id && profile.role >= 1) ? <AdminIssues/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Users */}
                <Route path={ROUTES.ADMIN.USERS} element={(user && user.id && profile.role >= 1) ? <AdminUsers/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Catch all */}
                <Route path={"*"} element={<p>No match!</p>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                <Route path={ROUTES.EDIT_MAIL} element={<EditMail/>}/>
                {/* Catch all */}
                <Route path={"*"} element={<></>}/>
            </Routes>
        )
}

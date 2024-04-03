import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import SignupSuccess from "./pages/SignUpSuccess";
import {ROUTES} from "../helpers/constants/configConstants";
import {Home} from "./pages/Home";
import {Dashboard} from "./pages/Dashboard";
import {OverviewPane} from "./dashboard/dashboardTabPanes/Overview/OverviewPane";
import {MyTitlesPane} from "./dashboard/dashboardTabPanes/MyTitles/MyTitlesPane";
import {OtherCollectionsPane} from "./dashboard/dashboardTabPanes/OtherCollections/OtherCollectionsPane";
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
import ChangePassword from "./pages/ChangePassword";
import {User} from "./pages/User";
import {Users} from "./pages/Users";
import {AdminMessages} from "./pages/admin/message/AdminMessages";
import {AdminMessage} from "./pages/admin/message/AdminMessage";
import {NoMatch} from "./pages/NoMatch";
import {GradeValues} from "./pages/GradeValues";
import {ValuationPane} from "./dashboard/dashboardTabPanes/Valuation/ValuationPane";


export const MyRoutes = () => {

    const {user, profile} = useAppContext();


    return user && profile ? (
            <Routes>
                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                {/* USER */}
                <Route path={ROUTES.DASHBOARD.ROOT} element={user && user.id ? <Dashboard/> : <Navigate replace to={ROUTES.DEFAULT}/>}>
                    <Route index
                           element={user && user.id ? <Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.OVERVIEW} element={user && user.id ? <OverviewPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.VALUATION} element={user && user.id ? <ValuationPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.MY_TITLES} element={user && user.id ? <MyTitlesPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={ROUTES.DASHBOARD.COLLECTIONS}
                           element={user && user.id ? <OtherCollectionsPane/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                    <Route path={"*"} element={<p>No match!</p>}/>
                </Route>
                <Route path={ROUTES.PROFILE} element={user && user.id ? <Profile/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.TITLE_ID} element={user && user.id ? <Title/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.TITLES} element={user && user.id ? <Titles/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ISSUE_ID} element={user && user.id ? <Issue/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ISSUES} element={user && user.id ? <Issues/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.GRADE_VALUES} element={user && user.id ? <GradeValues/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.PUBLISHER_ID} element={user && user.id ? <Publisher/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.PUBLISHERS} element={user && user.id ? <Publishers/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.USER_ID} element={user && user.id ? <User/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.USERS} element={user && user.id ? <Users/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
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
                {/* Messages */}
                <Route path={ROUTES.ADMIN.MESSAGE_ID} element={(user && user.id && profile.role >= 1) ? <AdminMessage/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                <Route path={ROUTES.ADMIN.MESSAGES} element={(user && user.id && profile.role >= 1) ? <AdminMessages/> : <Navigate replace to={ROUTES.DEFAULT}/>}/>
                {/* Catch all */}
                <Route path={"*"} element={<NoMatch/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                {/* Catch all */}
                <Route path={"*"} element={<></>}/>
            </Routes>
        )
}

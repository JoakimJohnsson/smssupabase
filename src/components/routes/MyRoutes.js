import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import SignupSuccess from "../pages/SignUpSuccess";
import {ROUTES} from "../../helpers/constants/configConstants";
import {Home} from "../pages/Home";
import {Dashboard} from "../pages/Dashboard";
import {OverviewPane} from "../dashboard/dashboardTabPanes/Overview/OverviewPane";
import {MyTitlesPane} from "../dashboard/dashboardTabPanes/MyTitles/MyTitlesPane";
import {CollectionsPane} from "../dashboard/dashboardTabPanes/Collections/CollectionsPane";
import Profile from "../pages/Profile";
import {Title} from "../pages/Title";
import {Titles} from "../pages/Titles";
import {useAppContext} from "../../context/AppContext";
import {Admin} from "../pages/admin/Admin";
import {AdminPublisher} from "../pages/admin/publisher/AdminPublisher";
import {AdminPublishers} from "../pages/admin/publisher/AdminPublishers";
import {AdminPublisherAdd} from "../pages/admin/publisher/AdminPublisherAdd";
import {AdminTitle} from "../pages/admin/title/AdminTitle";
import {AdminTitles} from "../pages/admin/title/AdminTitles";
import {AdminTitleAdd} from "../pages/admin/title/AdminTitleAdd";
import {AdminIssue} from "../pages/admin/issue/AdminIssue";
import {AdminIssues} from "../pages/admin/issue/AdminIssues";
import {Issue} from "../pages/Issue";
import {Issues} from "../pages/Issues";
import {Publisher} from "../pages/Publisher";
import {Publishers} from "../pages/Publishers";
import {AdminUsers} from "../pages/admin/users/AdminUsers";
import {Marvelklubben} from "../pages/Marvelklubben";
import ChangePassword from "../pages/ChangePassword";
import {User} from "../pages/User";
import {Users} from "../pages/Users";
import {AdminMessages} from "../pages/admin/message/AdminMessages";
import {AdminMessage} from "../pages/admin/message/AdminMessage";
import {GradeValues} from "../pages/GradeValues";
import {ValuationPane} from "../dashboard/dashboardTabPanes/Valuation/ValuationPane";
import {PrivateRoute} from "./PrivateRoute";
import {AdminRoute} from "./AdminRoute";
import {RouteLoadingIndicator} from "./RouteLoadingIndicator";
import {CatchAll} from "./CatchAll";


export const MyRoutes = () => {

    const {user, profile, evaluatingUser} = useAppContext();

    return (
        <Routes>
            {
                evaluatingUser ?
                    (
                        <Route path="*" element={<RouteLoadingIndicator/>}/>
                    )
                    :
                    user && profile ?
                        (
                            <>
                                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                                <Route path={ROUTES.DASHBOARD.ROOT} element={<PrivateRoute><Dashboard/></PrivateRoute>}>
                                    <Route index element={<Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/>}/>
                                    <Route path={ROUTES.DASHBOARD.OVERVIEW} element={<PrivateRoute><OverviewPane/></PrivateRoute>}/>
                                    <Route path={ROUTES.DASHBOARD.VALUATION} element={<PrivateRoute><ValuationPane/></PrivateRoute>}/>
                                    <Route path={ROUTES.DASHBOARD.MY_TITLES} element={<PrivateRoute><MyTitlesPane/></PrivateRoute>}/>
                                    <Route path={ROUTES.DASHBOARD.COLLECTIONS} element={<PrivateRoute><CollectionsPane/></PrivateRoute>}/>
                                    <Route path={"*"} element={<CatchAll/>}/>
                                </Route>
                                <Route path={ROUTES.PROFILE} element={<PrivateRoute><Profile/></PrivateRoute>}/>
                                <Route path={ROUTES.TITLE_ID} element={<PrivateRoute><Title/></PrivateRoute>}/>
                                <Route path={ROUTES.TITLES} element={<PrivateRoute><Titles/></PrivateRoute>}/>
                                <Route path={ROUTES.ISSUE_ID} element={<PrivateRoute><Issue/></PrivateRoute>}/>
                                <Route path={ROUTES.ISSUES} element={<PrivateRoute><Issues/></PrivateRoute>}/>
                                <Route path={ROUTES.GRADE_VALUES} element={<PrivateRoute><GradeValues/></PrivateRoute>}/>
                                <Route path={ROUTES.PUBLISHER_ID} element={<PrivateRoute><Publisher/></PrivateRoute>}/>
                                <Route path={ROUTES.PUBLISHERS} element={<PrivateRoute><Publishers/></PrivateRoute>}/>
                                <Route path={ROUTES.USER_ID} element={<PrivateRoute><User/></PrivateRoute>}/>
                                <Route path={ROUTES.USERS} element={<PrivateRoute><Users/></PrivateRoute>}/>
                                <Route path={ROUTES.MARVELKLUBBEN} element={<PrivateRoute><Marvelklubben/></PrivateRoute>}/>
                                {/* Private routes - USER + ADMIN */}
                                <Route path={ROUTES.ADMIN.ROOT} element={<AdminRoute><Admin/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.PUBLISHER_ID} element={<AdminRoute><AdminPublisher/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.PUBLISHERS} element={<AdminRoute><AdminPublishers/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.PUBLISHER_ADD} element={<AdminRoute><AdminPublisherAdd/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.TITLE_ID} element={<AdminRoute><AdminTitle/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.TITLES} element={<AdminRoute><AdminTitles/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.TITLE_ADD} element={<AdminRoute><AdminTitleAdd/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.ISSUE_ID} element={<AdminRoute><AdminIssue/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.ISSUES} element={<AdminRoute><AdminIssues/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.USERS} element={<AdminRoute><AdminUsers/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.MESSAGE_ID} element={<AdminRoute><AdminMessage/></AdminRoute>}/>
                                <Route path={ROUTES.ADMIN.MESSAGES} element={<AdminRoute><AdminMessages/></AdminRoute>}/>
                                <Route path={"*"} element={<CatchAll/>}/>
                            </>
                        )
                        :
                        (
                            <>
                                <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
                                <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
                                <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                                <Route path={"*"} element={<CatchAll method={"Catch all"}/>}/>
                            </>
                        )
            }
        </Routes>
    );
}

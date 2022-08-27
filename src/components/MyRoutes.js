import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import SignupSuccess from './pages/SignUpSuccess';
import {ROUTES} from '../helpers/constants';
import {Home} from "./pages/Home";
import {Dashboard} from "./pages/Dashboard";
import {OverviewPane} from "./dashboardComponents/dashboardTabPanes/OverviewPane";
import {TitlesPane} from "./dashboardComponents/dashboardTabPanes/TitlesPane";
import {OtherCollectionsPane} from "./dashboardComponents/dashboardTabPanes/OtherCollectionsPane";
import Settings from "./pages/Settings";
import {Title} from "./pages/Title";
import {Titles} from "./pages/Titles";
import {useAppContext} from "../context/AppContext";
import {Admin} from "./pages/admin/Admin";
import {AdminPublisher} from "./pages/admin/AdminPublisher";
import {AdminPublishers} from "./pages/admin/AdminPublishers";
import {AdminPublisherAdd} from "./pages/admin/AdminPublisherAdd";
import {AdminTitle} from "./pages/admin/AdminTitle";
import {AdminTitles} from "./pages/admin/AdminTitles";
import {AdminTitleAdd} from "./pages/admin/AdminTitleAdd";


export const MyRoutes = () => {

    const {user, role} = useAppContext();

    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
            {/* User routes */}
            <Route path={ROUTES.DASHBOARD.ROOT} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Dashboard/>}>
                <Route index element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Navigate replace to={ROUTES.DASHBOARD.OVERVIEW}/>}/>
                <Route path={ROUTES.DASHBOARD.OVERVIEW} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <OverviewPane/>}/>
                <Route path={ROUTES.DASHBOARD.TITLES} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <TitlesPane/>}/>
                <Route path={ROUTES.DASHBOARD.OTHER_COLLECTIONS} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <OtherCollectionsPane/>}/>
                <Route path={"*"} element={<p>No match!</p>}/>
            </Route>
            <Route path={ROUTES.SETTINGS} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Settings/>}/>
            <Route path={ROUTES.TITLE} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Title/>}/>
            <Route path={ROUTES.TITLES} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Titles/>}/>
            {/* Admin routes */}
            <Route path={ROUTES.ADMIN.ROOT} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <Admin/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHER_ID} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisher/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHERS} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublishers/>}/>
            <Route path={ROUTES.ADMIN.PUBLISHER_ADD} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisherAdd/>}/>
            <Route path={ROUTES.ADMIN.TITLE_ID} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitle/>}/>
            <Route path={ROUTES.ADMIN.TITLES} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitles/>}/>
            <Route path={ROUTES.ADMIN.TITLE_ADD} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleAdd/>}/>
            <Route path={"*"} element={<p>No match!</p>}/>
        </Routes>
    )
}

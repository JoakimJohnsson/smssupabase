import {Navigate, Route} from 'react-router-dom';
import React from 'react';
import {useAppContext} from '../context/AppContext';
import {Admin} from './pages/admin/Admin';
import {ROUTES} from '../helpers/constants';
import {AdminTitleAdd} from "./pages/admin/AdminTitleAdd";
import {AdminTitles} from "./pages/admin/AdminTitles";
import {AdminTitle} from "./pages/admin/AdminTitle";
import {AdminTitleEdit} from "./pages/admin/AdminTitleEdit";
import {AdminPublisher} from "./pages/admin/AdminPublisher";
import {AdminPublishers} from "./pages/admin/AdminPublishers";
import {AdminPublisherAdd} from "./pages/admin/AdminPublisherAdd";
import {AdminPublisherEdit} from "./pages/admin/AdminPublisherEdit";


export const AdminRoutes = ({user, role}) => {

    const PublisherRoutes = () => {
        return (
            <>
                <Route path={ROUTES.ADMIN.PUBLISHER_ID} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisher/>}/>
                <Route path={ROUTES.ADMIN.PUBLISHERS} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublishers/>}/>
                <Route path={ROUTES.ADMIN.PUBLISHER_ADD} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisherAdd/>}/>
                <Route path={ROUTES.ADMIN.PUBLISHER_EDIT} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminPublisherEdit/>}/>
            </>
        )
    }

    const TitleRoutes = () => {
        return (
            <>
                <Route path={ROUTES.ADMIN.TITLE_ID} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitle/>}/>
                <Route path={ROUTES.ADMIN.TITLES} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitles/>}/>
                <Route path={ROUTES.ADMIN.TITLE_ADD} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleAdd/>}/>
                <Route path={ROUTES.ADMIN.TITLE_EDIT_ID} element={(!user && role !== 1) ?
                    <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleEdit/>}/>
            </>
        )
    }

    return (
        <>
            {/* Admin routes */}
            <Route path={ROUTES.ADMIN.ROOT} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <Admin/>}/>
            <PublisherRoutes/>
            <TitleRoutes/>
        </>
    )
}

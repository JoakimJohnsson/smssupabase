import {Navigate, Route, Routes} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard';
import React from 'react';
import {useAppContext} from '../context/AppContext';
import Settings from './pages/Settings';
import SignupSuccess from './pages/SignUpSuccess';
import {Admin} from './pages/admin/Admin';
import {ROUTES} from '../helpers/constants';
import {AdminTitleAdd} from "./pages/admin/AdminTitleAdd";
import {AdminTitles} from "./pages/admin/AdminTitles";
import {AdminTitle} from "./pages/admin/AdminTitle";
import {Titles} from "./pages/Titles";
import {AdminTitleEdit} from "./pages/admin/AdminTitleEdit";
import {Title} from "./pages/Title";


export const MyRoutes = () => {

    const {user, role} = useAppContext();

    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Dashboard/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>

            {/* User routes */}
            <Route path={ROUTES.SETTINGS} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Settings/>}/>
            <Route path={ROUTES.TITLE} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Title/>}/>
            <Route path={ROUTES.TITLES} element={!user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Titles/>}/>

            {/* Admin routes */}
            <Route path={ROUTES.ADMIN.ROOT} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <Admin/>}/>
            <Route path={ROUTES.ADMIN.TITLE} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitle/>}/>
            <Route path={ROUTES.ADMIN.TITLES} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitles/>}/>
            <Route path={ROUTES.ADMIN.TITLE_ADD} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleAdd/>}/>
            <Route path={ROUTES.ADMIN.TITLE_EDIT} element={(!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <AdminTitleEdit/>}/>

        </Routes>
    )
}

import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardSingleInputPage = Loadable(lazy(() => import('views/dashboard/Delivery_Efficiency')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        // <AuthGuard>
        <MainLayout />
        // </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard/delivery-efficiency',
            element: <DashboardSingleInputPage />
        }
    ]
};

export default MainRoutes;

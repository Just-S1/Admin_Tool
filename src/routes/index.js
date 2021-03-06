/* eslint-disable */

import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        { path: 'reset-password', element: <ResetPassword /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />,
        </AuthGuard>
      ),
      children: [
        {
          path: 'system-user',
          children: [
            { element: <Navigate to="/dashboard/system-user-info/users" replace /> },
            { path: 'users', element: <SystemUser /> },
            { path: 'personal-info', element: <SystemUser /> }
          ]
        },
        {
          path: 'location',
          children: [
            {}
          ]
        },
        {
          path: 'phnom-penh',
          element: <Location />,
          children: [
            { element: <Navigate to="/dashboard/location/phnom-penh/daun-penh" replace /> },
            { element: <Navigate to="/dashboard/location/phnom-penh/prampir-makara" replace /> }
          ]
        },
        {
          path: 'banteay-meanchey',
          element: <Location />
        },
        {
          path: 'department',
          element: <Department />,
          children: [
            { element: <Navigate to="/dashboard/department/list" replace /> }
            // { path: 'phnom-penh', element: <SystemUser /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
// Dashboard
const SystemUser = Loadable(lazy(() => import('../pages/dashboard/SystemUser')));
const Location = Loadable(lazy(() => import('../pages/dashboard/Location')));
const Department = Loadable(lazy(() => import('../pages/dashboard/Department')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

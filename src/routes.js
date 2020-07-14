import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base', name: 'Base', component: BasicForms, exact: true },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/users', name: 'Users', component: Users, exact: true },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;

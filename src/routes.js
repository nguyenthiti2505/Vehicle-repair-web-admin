import React from "react";

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);

const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
// Users
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
// Station
const Stations = React.lazy(() => import("./views/stations/Stations.js"));
const Station = React.lazy(() => import("./views/stations/Station.js"));

// Login
const Login = React.lazy(() => import('./views/pages/login/Login'))

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/base", name: "Base", component: BasicForms, exact: true },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/login", name: "Login", component: Login},
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/users", name: "Users", component: Users, exact: true },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/stations", name: "Stations", component: Stations, exact: true },
  { path: "/stations/:id", exact: true, name: "Station Details", component: Station },
];

export default routes;

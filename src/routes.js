import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const Stations = React.lazy(() => import("./views/stations/Stations.js"));
const Station = React.lazy(() => import("./views/stations/Station.js"));

const Orders = React.lazy(() => import("./views/orders/Orders.js"));
const Order = React.lazy(() => import("./views/orders/Order.js"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users", name: "Users", component: Users, exact: true },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/stations", name: "Stations", component: Stations, exact: true },
  {
    path: "/stations/:id",
    exact: true,
    name: "Station Details",
    component: Station,
  },
  { path: "/orders", name: "Orders", component: Orders, exact: true },
  {
    path: "/orders/:id",
    exact: true,
    name: "Order Details",
    component: Order,
  },
];

export default routes;

export default [

  // User
  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    color: "black" ,
    route: "/users",
    icon: "cil-user",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Manage Users",
        to: "/users",
      },
    ],
  },
  // Station
  {
    _tag: "CSidebarNavDropdown",
    name: "Stations",
    route: "/stations",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Manage Stations",
        to: "/stations",
      },
    ],
  },
  // Order
  {
    _tag: "CSidebarNavDropdown",
    name: "Orders",
    route: "/orders",
    icon: "cil-speedometer",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Manage Orders",
        to: "/orders",
      },
    ],
  },
];

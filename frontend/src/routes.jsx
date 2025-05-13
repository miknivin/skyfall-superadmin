import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import AdminRequestComponent from "./pages/dashboard/admin/admin-request";
import AdminRequestDetails from "./pages/dashboard/admin/admin-request-details";
import AdminUsersComponent from "./pages/dashboard/admin/admins";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Admin request",
        path: "/admin/request",
        element: <AdminRequestComponent />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Admins",
        path: "/admin",
        element: <AdminUsersComponent />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "dashboard",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "admin request details",
        path: "/admin/request/:id",
        element: <AdminRequestDetails />,
      },
    ],
  },
];

export default routes;

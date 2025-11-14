import { createBrowserRouter } from "react-router";
import HomePage from "../pages/Home/HomePage";
import MeetingRoom from "../pages/MeetingRoom/MeetingRoom";
import MyBooking from "../pages/MyBooking/MyBooking";
import MainLayout from "../layouts/MainLayout";
import MeetingRoomDetail from "../pages/MeetingRoom/MeetingRoomDetail";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddMeetingRoom from "../pages/Admin/AddMeetingRoom";
import ManageMeetingRooms from "../pages/Admin/ManageMeetingRooms";
import ManageBookings from "../pages/Admin/ManageBookings";
import EditMeetingRoom from "../pages/Admin/EditMeetingRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/meeting-rooms",
        Component: MeetingRoom,
      },
      {
        path: "/bookings",
        Component: MyBooking,
      },
      {
        path: "/meeting-room/:room_id",
        Component: MeetingRoomDetail,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "add-meetingRoom",
        Component: AddMeetingRoom,
      },
      {
        path: "edit-meetingRoom/:room_id",
        Component: EditMeetingRoom,
      },
      {
        path: "manage-meetingRooms",
        Component: ManageMeetingRooms,
      },
      {
        path: "manage-bookings",
        Component: ManageBookings,
      },
    ],
  },
]);

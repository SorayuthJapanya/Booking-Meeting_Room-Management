import { ClipboardList, House, LayoutDashboard, PlusSquare } from "lucide-react";

export const sideBarItems = [
    {icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard"},
    {icon: PlusSquare, label: "Add Meeting Room", path: "/admin/add-meetingRoom"},
    {icon: House, label: "Manage Meeting Rooms", path: "/admin/manage-meetingRooms"},
    {icon: ClipboardList, label: "Manage Bookings", path: "/admin/manage-bookings"},
]
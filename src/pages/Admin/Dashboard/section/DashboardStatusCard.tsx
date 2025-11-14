import { motion } from "framer-motion";
import {
  ClipboardCheck,
  ClipboardClock,
  ClipboardList,
  House,
} from "lucide-react";

interface DashboardStatusCardProps {
  totalMeetingRooms: number;
  totalBookings: number;
  pendingBooking: number;
  CompletedBooking: number;
}

const DashboardStatusCard: React.FC<DashboardStatusCardProps> = (
  status: DashboardStatusCardProps
) => {
  const statusCard = [
    {
      icon: House,
      title: "Total Meeting Rooms",
      status: status.totalMeetingRooms,
    },
    {
      icon: ClipboardList,
      title: "Total Bookings",
      status: status.totalBookings,
    },
    {
      icon: ClipboardClock,
      title: "Pending Bookings",
      status: status.pendingBooking,
    },
    {
      icon: ClipboardCheck,
      title: "Completed Bookings",
      status: status.CompletedBooking,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusCard.map((card, index) => (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          key={index}
          className="px-3 py-2 rounded-md border border-borderColor flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs text-textSecondary">{card.title}</p>
            <h2 className="text-xl font-medium">{card.status}</h2>
          </div>
          <div className="p-2 rounded-full bg-blue-50">
            <card.icon className="size-5 text-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStatusCard;

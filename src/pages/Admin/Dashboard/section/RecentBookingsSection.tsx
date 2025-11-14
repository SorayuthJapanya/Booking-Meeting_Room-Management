import { ClipboardList } from "lucide-react";
import type { IBookingData } from "../../../../types/bookingTypes";
import { timeFormat } from "../../../../utils/dateHelper";
import { motion } from "framer-motion";

interface RecentBookingSectionProps {
  bookings: IBookingData[];
}

const RecentBookingsSection: React.FC<RecentBookingSectionProps> = ({
  bookings,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full lg:w-[60%] px-4 py-3 rounded-md border border-borderColor flex flex-col gap-1"
    >
      <h1 className="text-lg text-textPrimary">Recent Bookings</h1>
      <p className="text-xs text-textSecondary mb-4">
        Lastest employee bookings
      </p>

      {bookings.slice(0, 5).map((booking, index) => (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.4 }}
          key={index}
          className="w-full flex items-center justify-between gap-2 my-2"
        >
          <div className="flex items-center gap-2">
            <p className="p-2 rounded-full bg-blue-50">
              <ClipboardList className="size-5 text-primary" />
            </p>
            <div className="flex flex-col">
              <h4 className="text-base text-textPrimary">{booking.booker}</h4>
              <p className="text-xs text-textSecondary">
                {timeFormat(booking.created_at)}
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full border border-borderColor text-xs text-textPrimary font-medium">
            {booking.status}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RecentBookingsSection;

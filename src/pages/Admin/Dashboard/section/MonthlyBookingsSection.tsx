import { motion } from "framer-motion";

interface MonthlyBookingsSectionProps {
  bookingCount: number;
}

const MonthlyBookingsSection: React.FC<MonthlyBookingsSectionProps> = ({
  bookingCount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full lg:w-[40%] h-max px-4 py-3 rounded-md border border-borderColor gap-1"
    >
      <h1 className="text-lg text-textPrimary">Monthly Bookings</h1>
      <p className="text-xs text-textSecondary mb-6">
        Bookings count for current month
      </p>

      <p className="text-4xl font-bold text-primary">
        {bookingCount}{" "}
        <span className="text-xl font-normal text-textSecondary ">room</span>
      </p>
    </motion.div>
  );
};

export default MonthlyBookingsSection;

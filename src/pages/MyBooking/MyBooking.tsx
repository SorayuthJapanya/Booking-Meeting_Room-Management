import { motion } from "framer-motion";
import BookingCard from "../../components/ui/BookingCard";

const MyBooking = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6 sm:px-12">
      <motion.header
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-start gap-2"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-textPrimary">
          My Booking
        </h1>
        <p className="text-sm md:text-base text-textSecondary max-w-156">
          View you meeting room booking
        </p>
      </motion.header>

      {/* Booking */}
      <div className="flex flex-col gap-4 sm:gap-6 my-8">
        <BookingCard />
      </div>
    </div>
  );
};

export default MyBooking;

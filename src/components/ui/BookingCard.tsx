import { useEffect, useState } from "react";
import type { IBookingData } from "../../types/bookingTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../../api/bookingApi";
import { Clock, Loader2, User } from "lucide-react";
import MeetingRoomBookingDetail from "./MeetingRoomBookingDetail";
import BookingStatusTag from "./BookingStatusTag";
import { timeFormat } from "../../utils/dateHelper";
import { motion } from "framer-motion";

const BookingCard = () => {
  const [bookings, setBookings] = useState<IBookingData[]>([]);

  const { data: bookingsData, isLoading: isBookingsDataLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(),
  });

  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData.allBookingsData.data);
    }
  }, [bookingsData]);

  if (isBookingsDataLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loader2 className="size-5 animate-spin text-textSecondary" />
      </div>
    );
  }
  return bookings.map((booking, index) => (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      key={index}
      className="w-full p-6 rounded-xl grid grid-cols-1 sm:grid-cols-[70%_30%] border border-borderColor"
    >
      {/* Detail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Room Data */}
        <MeetingRoomBookingDetail room_id={booking.room_id} />

        {/* Meeting Data */}
        <div className="w-full flex flex-col gap-4">
          {/* status */}
          <div className="flex items-center justify-start gap-2 text-xs">
            <p className="px-2 py-1 rounded-sm bg-gray-100">
              Booking #{index + 1}
            </p>
            <BookingStatusTag status={booking.status} />
          </div>
          {/* Booking Detail */}
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-medium text-textPrimary">
              {booking.title}
            </h3>
            <p className="text-xs text-textSecondary max-w-80">
              {booking.description}
            </p>
          </div>
          {/* Booker */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <p className="text-xs text-textSecondary">Booker</p>
            </div>
            <p className="text-sm text-textPrimary pl-6">{booking.booker}</p>
          </div>
          {/* Time */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <p className="text-xs text-textSecondary">Time</p>
            </div>
            <p className="text-xs text-textPrimary pl-6">
              {timeFormat(booking.start_time)} - {timeFormat(booking.end_time)}
            </p>
          </div>
        </div>
      </div>

      {/* Book on */}
      <div className="w-full flex justify-end">
        <p className="text-xs text-textSecondary">
          Booked on: {booking.created_at}
        </p>
      </div>
    </motion.div>
  ));
};

export default BookingCard;

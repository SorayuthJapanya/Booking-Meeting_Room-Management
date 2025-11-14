import React, { useEffect, useState } from "react";
import type { IBookingData } from "../../types/bookingTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../../api/bookingApi";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import MeetingRoomImageSection from "../MeetingRoomImageSection";
import { dateFormat, timeFormat } from "../../utils/dateHelper";
import BookingStatusTag from "../ui/BookingStatusTag";
import SelectStatus from "../SelectStatus";

const ManageBookingRoomTable = () => {
  const [bookings, setBookings] = useState<IBookingData[]>([]);
  const [isUpdateStatusLoading, setIsUpdateStatusLoading] = useState<
    number | null
  >(null);

  const { data: bookingsData, isLoading: isBookingsDataLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  useEffect(() => {
    if (bookingsData) setBookings(bookingsData.allBookingsData.data);
  }, [bookingsData]);

  return (
    <>
      {isBookingsDataLoading ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full text-center"
        >
          <Loader2 className="size-5 animate-spin text-textSecondary" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col w-full h-full overflow-hidden text-textPrimary text-sm shadow-xs rounded-lg"
        >
          <table className="w-full text-center table-auto min-w-md text-xs text-textSecondary">
            <thead className="bg-gray-100">
              <tr className="border-b border-blue-gray-100 bg-blue-gray-50">
                <td className="text-start p-4">
                  <p>Meeting Room</p>
                </td>
                <td className="text-start p-4">
                  <p>Date</p>
                </td>
                <td className="text-start p-4">
                  <p>Time Range</p>
                </td>
                <td className="p-4">
                  <p>Status</p>
                </td>
                <td className="p-4">
                  <p>Actions</p>
                </td>
              </tr>
            </thead>
            <tbody className="text-textPrimary">
              {bookings.map((booking, index) => (
                <React.Fragment key={booking.booking_id || index}>
                  {isUpdateStatusLoading === index ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-5 text-center border border-borderColor"
                      >
                        <div className="w-full flex justify-center">
                          <Loader2 className="size-5 animate-spin text-textSecondary" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr className="border border-borderColor last:border-none">
                      <td className="p-4 flex items-center gap-4">
                        <MeetingRoomImageSection room_id={booking.room_id} />
                      </td>
                      <td className="text-start p-4">
                        {dateFormat(booking.created_at)}
                      </td>
                      <td className="text-start p-4">
                        {timeFormat(booking.start_time)} To{" "}
                        {timeFormat(booking.end_time)}{" "}
                      </td>
                      <td>
                        <BookingStatusTag status={booking.status} />
                      </td>
                      <td>
                        <SelectStatus
                          status={booking.status}
                          book_id={booking.booking_id}
                          index={index}
                          setLoading={setIsUpdateStatusLoading}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </>
  );
};

export default ManageBookingRoomTable;

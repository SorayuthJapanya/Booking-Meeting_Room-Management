import { useEffect, useState } from "react";
import AdminTitle from "../../../components/AdminTitle";
import DashboardStatusCard from "./section/DashboardStatusCard";
import type { IMeetingRoomType } from "../../../types/meetingRoomTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingRooms } from "../../../api/meetingRoomApi";
import type { IBookingData } from "../../../types/bookingTypes";
import { fetchBookings } from "../../../api/bookingApi";
import RecentBookingsSection from "./section/RecentBookingsSection";
import MonthlyBookingsSection from "./section/MonthlyBookingsSection";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const [meetingsData, setMeetingsData] = useState<IMeetingRoomType[]>([]);
  const [bookingsData, setBookingsData] = useState<IBookingData[]>([]);

  const pendingCount = bookingsData.filter(
    (b) => b.status === "PENDING"
  ).length;
  const completedCount = bookingsData.filter(
    (b) => b.status === "COMPLETED"
  ).length;

  const { data: allMeetingsData, isLoading: isAllMeetingDataLoading } =
    useQuery({
      queryKey: ["meetingRooms"],
      queryFn: () => fetchMeetingRooms(),
    });

  const { data: allBookingsData, isLoading: isAllBookingsLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(),
  });

  useEffect(() => {
    if (allMeetingsData)
      setMeetingsData(allMeetingsData.allMeetingRoomData.data);
    if (allBookingsData) setBookingsData(allBookingsData.allBookingsData.data);
  }, [allMeetingsData, allBookingsData]);

  return (
    <>
      {isAllMeetingDataLoading || isAllBookingsLoading ? (
        <div className="w-full max-w-5xl flex justify-center">
          <Loader2 className="size-5 animate-spin text-textSecondary" />
        </div>
      ) : (
        <div className="w-full max-w-5xl px-4 flex-1">
          <AdminTitle
            title="Admin Dashboard"
            subTitle="Monitor meeting room availability and manage bookings"
          />
          <div className="mt-8 mb-6">
            <DashboardStatusCard
              totalMeetingRooms={meetingsData.length}
              totalBookings={bookingsData.length}
              pendingBooking={pendingCount}
              CompletedBooking={completedCount}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recent Booking */}
            <RecentBookingsSection bookings={bookingsData} />
            {/* Monthly Bookings */}
            <MonthlyBookingsSection bookingCount={bookingsData.length} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

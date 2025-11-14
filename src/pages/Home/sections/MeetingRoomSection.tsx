import { motion } from "framer-motion";
import Header from "../../../components/layout/Header";
import { useEffect, useState } from "react";
import type { IMeetingRoomType } from "../../../types/meetingRoomTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingRooms } from "../../../api/meetingRoomApi";
import { Loader2 } from "lucide-react";
import MeetingRoomCard from "../../../components/ui/MeetingRoomCard";

const MeetingRoomSection = () => {
  const [meetingRooms, setMeetingRooms] = useState<IMeetingRoomType[]>([]);

  const { data: meetingRoomsData, isLoading: isMeetingRoomDataLoading } =
    useQuery({
      queryKey: ["meetingRooms"],
      queryFn: () => fetchMeetingRooms(),
    });

  useEffect(() => {
    if (meetingRoomsData) {
      setMeetingRooms(meetingRoomsData?.allMeetingRoomData?.data);
    }
  }, [meetingRoomsData]);

  return (
    <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <Header
        title="Meeting Room Features"
        subTitle="Explore key amenities and smart capabilities for productive sessions"
      />
      {isMeetingRoomDataLoading ? (
        <div className="w-full flex items-center justify-center mt-16">
          <Loader2 className="size-5 text-textSecondary animate-spin" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-8"
        >
          {meetingRooms.slice(0, 6).map((meetingRoom, index) => (
            <div
              key={meetingRoom.room_id || index}
            >
              <MeetingRoomCard meetingRoom={meetingRoom} />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MeetingRoomSection;

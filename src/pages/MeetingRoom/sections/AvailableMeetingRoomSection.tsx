import { useEffect, useState } from "react";
import type { IMeetingRoomType } from "../../../types/meetingRoomTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingRooms } from "../../../api/meetingRoomApi";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import MeetingRoomCard from "../../../components/ui/MeetingRoomCard";

const AvailableMeetingRoomSection = () => {
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
    <div className="w-full flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 py-6 text-textSecondary">
      {isMeetingRoomDataLoading ? (
        <div className="w-full flex justify-center">
          <Loader2 className="size-5 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 mb-36 w-full">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm"
          >
            showing: {meetingRooms.length}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {meetingRooms.slice(0, 6).map((meetingRoom, index) => (
              <div
                key={meetingRoom.room_id || index}
              >
                <MeetingRoomCard meetingRoom={meetingRoom} />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AvailableMeetingRoomSection;

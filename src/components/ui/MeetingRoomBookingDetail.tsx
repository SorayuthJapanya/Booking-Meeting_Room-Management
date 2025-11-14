import { useEffect, useState } from "react";
import type { IMeetingRoomType } from "../../types/meetingRoomTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingRoom } from "../../api/meetingRoomApi";

interface MeetingRoomBookingDetailProps {
  room_id: string | null;
}

const MeetingRoomBookingDetail: React.FC<MeetingRoomBookingDetailProps> = ({
  room_id,
}) => {
  const [meetingRoom, setMeetingRoom] = useState<IMeetingRoomType>();

  const { data: meetingRoomData } = useQuery({
    queryKey: ["meetingRoom", room_id],
    queryFn: () => fetchMeetingRoom(room_id),
    enabled: !!room_id,
  });

  useEffect(() => {
    if (meetingRoomData) {
      setMeetingRoom(meetingRoomData.meetingRoomData.data[0]);
    }
  }, [meetingRoomData]);

  return (
    <img
      src={meetingRoom?.image_url}
      alt={meetingRoom?.roomName}
      className="w-full h-auto rounded-xl object-cover"
    />
  );
};

export default MeetingRoomBookingDetail;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchMeetingRoom } from "../api/meetingRoomApi";
import { Loader2 } from "lucide-react";
import type { IMeetingRoomType } from "../types/meetingRoomTypes";

interface MeetingRoomImageSectionProps {
  room_id: string;
}
const MeetingRoomImageSection: React.FC<MeetingRoomImageSectionProps> = ({
  room_id,
}) => {
  const [data, setData] = useState<IMeetingRoomType>();
  const { data: imageMeetingRoomData, isLoading } = useQuery({
    queryKey: ["meetingRoom"],
    queryFn: () => fetchMeetingRoom(room_id),
  });

  useEffect(() => {
    if (imageMeetingRoomData)
      setData(imageMeetingRoomData.meetingRoomData.data[0]);
  }, [imageMeetingRoomData]);
  return (
    <>
      {isLoading ? (
        <div className="w-full text-center">
          <Loader2 className="size-5 animate-spin text-textSecondary" />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={data?.image_url}
            alt={data?.roomName}
            className="size-10 object-cover rounded-md"
          />
          <p>{data?.roomName}</p>
        </div>
      )}
    </>
  );
};

export default MeetingRoomImageSection;

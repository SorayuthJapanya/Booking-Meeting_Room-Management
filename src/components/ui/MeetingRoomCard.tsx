import { useNavigate } from "react-router";
import type { IMeetingRoomType } from "../../types/meetingRoomTypes";
import { MapPin, User } from "lucide-react";

interface MeetingRoomCardProps {
  meetingRoom: IMeetingRoomType;
}

const MeetingRoomCard: React.FC<MeetingRoomCardProps> = ({ meetingRoom }) => {
  const navigate = useNavigate();

  const meetingRoomFeatures = [
    { icon: MapPin, label: meetingRoom.location },
    { icon: User, label: meetingRoom.capacity },
  ];

  const hadleClinkMeetingRoom = (room_id: string) => {
    navigate(`/meeting-room/${room_id}`);
    scroll(0, 0);
  };

  return (
    <div
      onClick={() => hadleClinkMeetingRoom(meetingRoom.room_id)}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        {/* image section */}
        <img
          src={meetingRoom.image_url}
          alt="meetingRoom_image_url"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {meetingRoom.status === "AVAILABLE" && (
          <p className="absolute top-4 left-4 bg-primary/90 text-white text-sm px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}
      </div>

      {/* Detail */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-medium">{meetingRoom.roomName}</h3>
      </div>

      {/* Features */}
      <div className="pb-4 sm:pb-5">
        {meetingRoomFeatures.map((feature, index) => (
          <div
            key={index}
            className="w-full flex items-center justify-center text-sm text-textSecondary gap-2 first:pb-2"
          >
            <feature.icon className="size-5" />
            <p>{feature.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingRoomCard;

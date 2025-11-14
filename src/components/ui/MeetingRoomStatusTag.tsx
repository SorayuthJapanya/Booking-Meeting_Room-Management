interface MeetingRoomStatusTagProps {
  status: string;
}

const MeetingRoomStatusTag: React.FC<MeetingRoomStatusTagProps> = ({
  status,
}) => {
  const statusStyles: Record<string, string> = {
    AVAILABLE: "bg-green-100 text-green-700",
    BOOKED: "bg-yellow-100 text-yellow-700",
    IN_USE: "bg-blue-100 text-blue-700",
    UNAVAILABLE: "bg-red-100 text-red-700",
  };

  const tagStyle = statusStyles[status];
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${tagStyle}`}>
      {status.toLowerCase()}
    </span>
  );
};

export default MeetingRoomStatusTag;

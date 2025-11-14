interface BookingStatusTagProps {
  status: string;
}

const BookingStatusTag: React.FC<BookingStatusTagProps> = ({ status }) => {
  const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 ",
    COMFIRMED: "bg-green-100 text-green-700 ",
    CANCELLED: "bg-red-100 text-red-700 ",
  };

  const tagStyle = statusStyles[status];

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${tagStyle}`}>
      {status.toLowerCase()}
    </span>
  );
};

export default BookingStatusTag;

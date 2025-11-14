import Header from "../../components/layout/Header";
import AvailableMeetingRoomSection from "./sections/AvailableMeetingRoomSection";

const MeetingRoom = () => {
  return (
    <>
      <div className="flex flex-col items-center py-20 bg-gray-50 max-md:px-6">
        <Header
          title="Available Meeting Room"
          subTitle="Browse rooms and manage your bookings."
        />
      </div>
      <AvailableMeetingRoomSection />
    </>
  );
};

export default MeetingRoom;

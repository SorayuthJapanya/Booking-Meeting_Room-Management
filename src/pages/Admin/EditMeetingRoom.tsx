import AdminTitle from "../../components/AdminTitle";
import EditMeetingRoomForm from "../../components/forms/EditMeetingRoomForm";

const EditMeetingRoom = () => {
  return (
    <div className="w-full max-w-2xl px-4">
      <AdminTitle
        title="Edit Meeting Room"
        subTitle="Update room details, availability, and booking settings"
      />
      <div className="mt-8 mb-6">
        <EditMeetingRoomForm />
      </div>
    </div>
  );
};

export default EditMeetingRoom;

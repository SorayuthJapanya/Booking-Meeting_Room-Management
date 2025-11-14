import AdminTitle from "../../components/AdminTitle"
import AddMeetingRoomForm from "../../components/forms/AddMeetingRoomForm"

const AddMeetingRoom = () => {
  return (
    <div className="w-full max-w-2xl px-4">
      <AdminTitle title="Add Meeting Room" subTitle="Create and configure new meeting room details"/>
      <div className="mt-8 mb-6">
        <AddMeetingRoomForm />
      </div>
    </div>
  )
}

export default AddMeetingRoom
import AdminTitle from "../../components/AdminTitle"
import ManageBookingRoomTable from "../../components/tables/ManageBookingRoomTable"

const ManageBookings = () => {
  return (
    <div className="w-full max-w-4xl px-4">
      <AdminTitle title="Manage Bookings" subTitle="View and manage all meeting room reservations"/>
      <div className="mt-8 mb-6"><ManageBookingRoomTable /></div>
    </div>
  )
}

export default ManageBookings
import AdminTitle from "../../components/AdminTitle"
import ManageMeetingRoomsTable from "../../components/tables/ManageMeetingRoomsTable"

const ManageMeetingRooms = () => {
  return (
    <div className="w-full max-w-4xl px-4">
      <AdminTitle title="Manage Meeting Room" subTitle="Edit, update, and control meeting room settings and availability"/>
      <div className="mt-8 mb-6">
        <ManageMeetingRoomsTable />
      </div>
    </div>
  )
}

export default ManageMeetingRooms
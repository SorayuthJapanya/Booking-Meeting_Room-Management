import { Outlet } from "react-router";
import NavbarAdmin from "../components/layout/Navbar/admin/NavbarAdmin";
import SideBarAdmin from "../components/layout/Sidebar/SideBarAdmin";
import FooterAdmin from "../components/layout/FooterAdmin";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  return (
    <div className="flex justify-start">
      <SideBarAdmin />
      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
        <NavbarAdmin />

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        <FooterAdmin />
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;

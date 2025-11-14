import { Outlet } from "react-router";
import NavBar from "../components/layout/Navbar/NavBar";
import Footer from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

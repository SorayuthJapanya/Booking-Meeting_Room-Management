import { AlignLeft, AlignRight } from "lucide-react";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const SideBarAdmin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <motion.aside
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen"
    >
      <nav className="h-full flex flex-col border-r border-borderColor text-textSecondary">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/booking_logo.svg"
              alt="logo"
              onClick={() => navigate("/")}
              className={`transition-all duration-300 cursor-pointer ${
                isSidebarOpen
                  ? "w-28 opacity-100 hover:scale-105"
                  : "w-0 opacity-0"
              }`}
            />
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            {isSidebarOpen ? (
              <AlignLeft className="size-5" />
            ) : (
              <AlignRight className="size-5" />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 overflow-y-auto">
          <SideBarItem isOpen={isSidebarOpen} />
        </div>
      </nav>
    </motion.aside>
  );
};

export default SideBarAdmin;

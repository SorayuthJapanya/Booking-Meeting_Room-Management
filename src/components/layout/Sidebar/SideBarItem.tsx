import { NavLink } from "react-router";
import { sideBarItems } from "./sideBarItems";

interface SidebarItemProps {
  isOpen: boolean;
}

const SideBarItem: React.FC<SidebarItemProps> = ({ isOpen }) => {
  return (
    <div className="space-y-1">
      {sideBarItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 my-2 font-normal rounded-md cursor-pointer transition-colors duration-300 ${
              isActive
                ? "bg-linear-to-tr from-blue-100 to-blue-50 text-primary/80 hover:text-primary"
                : "hover:bg-blue-50 hover:text-primary/80"
            }`
          }
        >
          <item.icon className="size-5 shrink-0" />

          <span
            className={`text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100 w-40 ml-1" : "opacity-0 w-0 ml-0"
            }`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBarItem;

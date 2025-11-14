import { NavLink } from "react-router";

interface NavBarItemsProps {
  label: string;
  path: string;
  onClickItem: (state: boolean) => void;
}

const NavBarItem: React.FC<NavBarItemsProps> = ({
  label,
  path,
  onClickItem,
}) => {
  return (
    <NavLink
      to={path}
      onClick={() => onClickItem(false)}
      className={({ isActive }) =>
        `text-base font-normal cursor-pointer ${
          isActive
            ? "text-primaryLight"
            : "text-textSecondary hover:text-primaryLight duration-200"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavBarItem;

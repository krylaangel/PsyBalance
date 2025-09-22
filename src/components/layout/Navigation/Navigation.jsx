import { menuItems } from "@/constants/menuItems.js";
import { NavLink } from "react-router-dom";
import { useWindowsSize } from "@/hooks/useWindowsSize.js";

const Navigation = ({ isOpen, setNavOpen }) => {
  const { width } = useWindowsSize();
  const isDesktop = width >= 1024;
  return (
    <ul
      className={`overflow-y-auto flex-col md:flex-row absolute md:static z-10 top-full md:top-auto bg-white md:bg-transparent
 left-0 transition-all duration-500 ease-in-out h-screen md:h-auto w-full md:w-auto gap-x-10 gap-y-2 mt-10 md:mt-0
${isOpen ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none"}
       flex md:opacity-100 md:pointer-events-auto px-[max(24px,calc((100vw-1040px)/2))] md:px-0`}
    >
      {menuItems.map(({ to, label }, index) => (
        <li key={to}>
          <NavLink
            onClick={() => setNavOpen(false)}
            to={to}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default Navigation;

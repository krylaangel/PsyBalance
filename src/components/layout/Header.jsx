import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useAuthStore } from "@/store/useAuthStore.js";

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const toggleForm = () => {
    navigate("/ControlledFormAuth");
  };

  const handleLogout = () => {
    logout();
    navigate("/ControlledFormAuth");
  };

  return (
    <header className="clamp flex justify-between gradient-layout__header">
      <NavLink to="/" className="menu-item">
        Головна
      </NavLink>
      <ul className="flex hidden md:flex">
        <li className="pr-10">
          <NavLink
            to="/tests"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Тести
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            Статті
          </NavLink>
        </li>
      </ul>
      <div className="space-x-4">
        {user ? (
          <>
            <NavLink to="/profile" className="profile">
              {user.firstName} {user.lastName}
            </NavLink>
            <Button
              onClick={handleLogout}
              className="p-2 rounded text-white hover:bg-red-600 transition duration-200 w-fit!"
              text={BUTTONS_TEXT.Exit}
            ></Button>
          </>
        ) : (
          <button
            onClick={toggleForm}
            className="p-2 rounded-full bg-white hover:bg-[var(--clr-secondary)] shadow-md transition duration-200 flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21c0-3 5-4 6.5-4s6.5 1 6.5 4" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;

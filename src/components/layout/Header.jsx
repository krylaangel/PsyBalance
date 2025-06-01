import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toggleForm = () => {
    navigate("/ControlledFormAuth");
  };
  const handleLogout = () => {
    logout();
    navigate("/ControlledFormAuth");
  };
  return (
    <header className="clamp flex justify-between">
      <div>Logo</div>
      <ul className="flex gap-x-10 hidden md:flex">
        <li>
          <NavLink
            to="/TestPage"
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
      <div>
        {user ? (
          <>
            <span className="font-medium text-gray-700">
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
              aria-label="Вихід"
              title="Вихід"
            >
              Вихід
            </button>
          </>
        ) : (
          <button
            onClick={toggleForm}
            className="p-2 rounded-full bg-white hover:bg-[var(--clr-secondary)] shadow-md transition duration-200 flex items-center justify-center"
            aria-label="Вхід"
            title="Вхід"
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

import { NavLink, useNavigate } from "react-router-dom";

import Button from "@/components/ui/buttons/Button.jsx";

import { BUTTONS_TEXT } from "@/constants/buttons.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import Navigation from "@/components/layout/Navigation/Navigation.jsx";
import { useEffect, useState } from "react";

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const toggleForm = () => {
    navigate("/ControlledFormAuth");
  };

  const handleLogout = () => {
    logout();
    navigate("/ControlledFormAuth");
  };

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [navOpen]);

  return (
    <header className="clamp flex justify-between gradient-layout__header relative">
      <div className="flex gap-x-2">
        <button
          className="cursor-pointer flex md:hidden"
          onClick={() => {
            setNavOpen((prev) => !prev);
          }}
        >
          <svg
            className="text-white"
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className={`transition-transform duration-300 origin-center ${navOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              width="30"
              height="4"
              rx="2"
              fill="currentColor"
            />
            <rect
              className={`transition-transform duration-300 origin-center ${navOpen ? "hidden" : ""}`}
              y="8"
              width="30"
              height="4"
              rx="2"
              fill="currentColor"
            />
            <rect
              className={`transition-transform duration-300 origin-center ${navOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              y="16"
              width="30"
              height="4"
              rx="2"
              fill="currentColor"
            />
          </svg>
        </button>
        <NavLink to="/" className="menu-item">
          Головна
        </NavLink>
      </div>
      <Navigation isOpen={navOpen} setNavOpen={setNavOpen} />
      <div className="space-x-4">
        {user ? (
          <>
            <NavLink to="/profile" className="profile">
              {user.firstName} {user.lastName}
            </NavLink>
            <Button
              onClick={handleLogout}
              className="p-2 rounded text-white hover:bg-red-600 transition duration-200 w-fit"
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

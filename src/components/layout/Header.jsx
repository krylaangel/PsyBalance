import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const toggleForm = () => {
    navigate("/ControlledFormAuth");
  };
  const toggleTest = () => {
    navigate("/Test");
  };
  return (
    <header className="clamp flex justify-between">
      <div>Logo</div>
      <ul className="flex gap-x-10 hidden md:flex">
        <li onClick={toggleTest} className="menu-item">
          Тести
        </li>
        <li className="menu-item">Статті</li>
        <li className="menu-item">Психологи</li>
      </ul>

      <button
        onClick={toggleForm}
        className="p-2 rounded-full bg-white hover:bg-[var(--clr-secondary:)] shadow-md transition duration-200 flex items-center justify-center"
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
    </header>
  );
};
export default Header;

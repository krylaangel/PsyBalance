import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const toggleForm = () => {
    navigate("/UncontrolledFormFeedback");
  };

  return (
    <footer className="clamp">
      <ul className="">
        <li onClick={toggleForm} className="menu-item">
          Зворотній зв'язок
        </li>
      </ul>
    </footer>
  );
};
export default Footer;

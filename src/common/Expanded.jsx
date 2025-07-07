import { useState } from "react";
import Button from "@/components/ui/buttons/Button.jsx";
import { BUTTONS_TEXT } from "@/constants/buttons.js";

const Expanded = ({ children, className = "", valueClampLine }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={className}>
      <div className={`${expanded ? "" : `line-clamp-${valueClampLine}`}`}>
        {children}
      </div>
      <p
        className="w-fit ml-auto text-[var(--clr-secondary)] hover:text-[var(--clr-layout)] hover:border-b-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Згорнути" : "Читати більше"}
      </p>
    </div>
  );
};
export default Expanded;

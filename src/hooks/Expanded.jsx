import { useState } from "react";

const Expanded = ({ children, className = "", n }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`${className} ${expanded ? "" : `line-clamp-${n}`}`}
      onClick={() => setExpanded(!expanded)}
    >
      {children}
    </div>
  );
};
export default Expanded;

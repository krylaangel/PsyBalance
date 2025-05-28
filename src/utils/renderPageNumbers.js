import Button from "@/components/ui/buttons/Button.jsx";
import React from "react";

export const renderPageNumbers = ({ page, totalPages, setPage }) => {
  const buttons = [];
  const pages = [];
  pages.push(1);
  if (page > 3) {
    pages.push("start-ellipsis");
  }
  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 1 && i < totalPages) pages.push(i);
  }
  if (page < totalPages - 2) pages.push("end-ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  pages.forEach((p, i) => {
    if (p === "start-ellipsis" || p === "end-ellipsis") {
      buttons.push(
        React.createElement(
          "span",
          { key: p + i, className: "px-2 select-none" },
          "...",
        ),
      );
    } else {
      const isActive = p === page;
      buttons.push(
        React.createElement(Button, {
          key: p,
          text: p,
          onClick: () => setPage(p),
          disabled: isActive,
          className: isActive ? "bg-blue-600 text-white cursor-default" : "",
        }),
      );
    }
  });
  return buttons;
};

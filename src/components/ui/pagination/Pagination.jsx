import React from "react";
import Button from "@/components/ui/buttons/Button.jsx";

export const Pagination = ({ page, totalPages, setPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).reduce(
    (acc, i) => {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        acc.push(i);
      } else if (acc[acc.length - 1] !== "ellipsis") {
        acc.push("ellipsis");
      }
      return acc;
    },
    [],
  );

  return pages.map((p, i) => {
    if (p === "ellipsis") {
      return (
        <span className="px-2 mt-3 select-none" key={p + i}>
          ...
        </span>
      );
    }
    const isActive = p === page;
    return (
      <Button
        key={p + i}
        disabled={isActive}
        onClick={() => setPage(p)}
        text={String(p)}
        className={isActive ? "bg-blue-600 text-white cursor-default" : ""}
      />
    );
  });
};

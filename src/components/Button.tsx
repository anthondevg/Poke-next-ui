import React from "react";
type Button = {
  onClick: () => {};
  children: React.ReactNode;
};
export default function Button({ onClick, children }: Button) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-error-500">
      {children}
    </button>
  );
}

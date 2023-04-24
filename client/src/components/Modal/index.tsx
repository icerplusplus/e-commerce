import React from "react";
import Auth from "../Auth";
import { useSelector } from "react-redux";

function Modal({ children, showPopup, togglePopup }) {
  // store
  const userStore = useSelector((state) => state.user);
  const loader = useSelector((state) => state.loader);

  return (
    <div
      className="w-full max-w-full h-screen bg-blue"
      style={{
        position: `${
          showPopup || userStore.isLoading || loader.isLoading
            ? "fixed"
            : "relative"
        }`,
      }}
    >
      {showPopup ? <Auth togglePopup={togglePopup} /> : <></>}
      {children}
    </div>
  );
}

export default Modal;

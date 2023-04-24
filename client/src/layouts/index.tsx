import React, { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Router from "../routes";
import "react-alice-carousel/lib/alice-carousel.css";

function Layout() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bg-body">
      <Modal showPopup={showPopup} togglePopup={togglePopup}>
        {/* header */}
        <Header togglePopup={togglePopup} />

        {/* body */}
        <Router />

        {/* footer  */}
      </Modal>
    </div>
  );
}

export default Layout;

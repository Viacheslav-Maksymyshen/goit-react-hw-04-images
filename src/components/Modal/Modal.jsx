import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import st from "./Modal.module.css";

const rootModal = document.querySelector("#rootModal");

export default function Modal({ largeImage, tags, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={st.Overlay} onClick={handleOverlayClick}>
      <div className={st.Modal}>
        <img src={largeImage} alt={tags} />
      </div>
    </div>,
    rootModal
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

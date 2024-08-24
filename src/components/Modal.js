import React from "react";

function Modal({ content, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Modal;

import React from "react";

interface ModalWrapProps {
  open: boolean;
  children: any;
}

function ModalWrap({ open, children }: ModalWrapProps) {
  return (
    <div className={`modal__wrap ${open ? "modal--open" : ""}`}>
      <div className="modal__backdrop"></div>
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default ModalWrap;

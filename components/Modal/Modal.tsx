"use client";

import React from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = ({ children, isOpen = true, onClose }: ModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button type="button" className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

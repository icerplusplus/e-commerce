import React, { useRef, useState, useEffect, useCallback } from "react";
import { Modal as CModal } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import "./index.css";

interface ModalProps {
  title: string;
  content: JSX.Element;
  isOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Modal = ({ title, content, isOpen }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      console.log("dom is removed");
      document.getElementById("modalId")?.remove();
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openModal = useCallback((isOpen) => setOpen(isOpen), [open]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => openModal(isOpen), [isOpen]);
  return (
    <CModal
      className="modal-custom"
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
            textAlign: "start",
            fontSize: 24,
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          // onFocus={() => {}}
          // onBlur={() => {}}
          // end
        >
          {title}
        </div>
      }
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
      footer={<></>}
    >
      <div id="modalId">{content}</div>
    </CModal>
  );
};
export default Modal;

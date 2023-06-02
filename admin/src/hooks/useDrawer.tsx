import React, { useCallback, useState } from "react";
import { Drawer, Button, Form, Col, Row } from "antd";

interface UseDrawerProps {
  headerTitle: string | React.ReactNode;
  width: number;
  showFooter?: boolean | true;
  footerCustom?: React.ReactNode;
}

interface UseDrawerType {
  drawerRender: () => JSX.Element;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setContentHandler: void;
  onOpen: void;
  onClose: void;
}

export const useDrawer = (props: UseDrawerProps): UseDrawerType => {
  const [visible, setVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string | React.ReactNode>();

  const onClose = useCallback(() => {
    setVisible(false);
    setContent(null);
  }, []);
  const onOpen = useCallback(() => setVisible(true), []);

  const setContentHandler = useCallback((value: React.ReactNode) => {
    setContent(value);
  }, []);

  const drawerRender = () => (
    <Drawer
      title={props.headerTitle}
      width={props.width || 450}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      {content}
      {/* footer */}
      {props?.showFooter && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e8e8e8",
            padding: "10px 16px",
            textAlign: "left",
            left: 0,
            background: "#fff",
            borderRadius: "0 0 4px 4px",
          }}
        >
          {props?.footerCustom && props?.footerCustom}
        </div>
      )}
    </Drawer>
  );

  return {
    drawerRender,
    setContentHandler,
    onOpen,
    onClose,
  } as const;
};

import React, { useState } from "react";
import { Drawer, List } from "antd";
import { useSelector } from "react-redux";

type Props = {
  menuOptions: [];
  openDrawer: boolean;
  setOpenDrawer: () => void;
};

function Header() {
  const userInfo = useSelector((state) => state?.user);

  return (
    <div className="text-sm font-normal text-white">
      Xin chào,
      <span className="italic"> {userInfo.info?.email}</span>
    </div>
  );
}

function LeftDrawer({ menuOptions, openDrawer, setOpenDrawer }: Props) {
  const [keyActive, setKeyActice] = useState(-1);

  const onClick = (key) => {
    setKeyActice(key);
  };

  return (
    <Drawer
      title={<Header />}
      placement={"left"}
      closable={false}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
      width={250}
      key={"left"}
      bodyStyle={styled.body}
      headerStyle={styled.header}
    >
      <List
        size="small"
        dataSource={menuOptions}
        renderItem={(item) => (
          <List.Item
            className={`${
              keyActive !== "logout" &&
              keyActive === item.key &&
              "border-r-4 border-[#ff0055]"
            } space-x-2 text-base`}
            onClick={() => onClick(item.key)}
          >
            <span className="">{item?.icon}</span>
            {item.label}
          </List.Item>
        )}
      />
    </Drawer>
  );
}

const styled = {
  header: {
    backgroundColor: "#1A94FF",
  },
  body: {
    padding: 0,
    border: "none",
  },
};

export default LeftDrawer;

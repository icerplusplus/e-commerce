import React, {useState} from 'react';
import {Drawer, List} from 'antd';
import {useAppSelector} from '../../../hooks';
import {MenuOptionProps} from '../index';

interface Props {
  menuOptions: MenuOptionProps[];
  openDrawer: boolean;
  setOpenDrawer: (status: boolean) => void;
}

function Header() {
  const userInfo = useAppSelector((state) => state.user);

  return (
    <div className="text-sm font-normal text-white">
      Xin chào,
      <span className="italic"> {userInfo.data?.email}</span>
    </div>
  );
}

const LeftDrawer: React.FC<Props> = ({
  menuOptions,
  openDrawer,
  setOpenDrawer,
}) => {
  const [keyActive, setKeyActice] = useState<string>();

  const onClick = (key: string) => key && setKeyActice(key);

  return (
    <Drawer
      title={<Header />}
      placement={'left'}
      closable={false}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
      width={250}
      key={'left'}
      bodyStyle={styled.body}
      headerStyle={styled.header}
    >
      <List
        size="small"
        dataSource={menuOptions}
        renderItem={(item) => (
          <List.Item
            className={`${
              keyActive !== 'logout' &&
              keyActive === item?.key &&
              'border-r-4 border-[#ff0055]'
            } space-x-2 text-base`}
            onClick={() => onClick(item?.key)}
          >
            <span className="">{item?.icon}</span>
            {item?.label}
          </List.Item>
        )}
      />
    </Drawer>
  );
};

const styled = {
  header: {
    backgroundColor: '#1A94FF',
  },
  body: {
    padding: 0,
    border: 'none',
  },
};

export default LeftDrawer;

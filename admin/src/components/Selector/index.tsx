import React from "react";
import { Avatar, Form, Select, Space } from "antd";

interface SelectProps {
  id: string | number;
  name: string;
  label: string;
  placeholder?: string | "Select a option and change input text above";
  rules?: [];
  disabled?: boolean | false;
  required?: boolean | true;
  onChange?: () => void;
  data?: [];
}

const Selector: React.FC<SelectProps> = ({
  id,
  name,
  label,
  placeholder,
  rules,
  disabled,
  required,
  onChange,
  data,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required }].concat(rules)}
    >
      <Select
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        allowClear
        key={id}
        disabled={disabled}
      >
        {data?.length > 0 &&
          data?.map((item, idx) => (
            <Select.Option value={item?.id || item[0]} key={idx}>
              {(item?.thumbnail || item?.avatar) && (
                <Space>
                  <Avatar src={item?.thumbnail || item?.avatar} />
                  {item?.title || item?.name}
                </Space>
              )}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default Selector;

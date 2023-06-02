import React, { HTMLInputTypeAttribute } from "react";
import { Form, Input as AntdInput, InputNumber } from "antd";

interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  placeholder?: string;
  rules?: [];
  disabled?: boolean | false;
  required?: boolean | true;
  direction?: "row" | "col";
  witdhFull?: boolean | true;
  initialValue?: string | "";
}

const Input: React.FC<InputProps> = ({
  type = "number" | "string",
  name,
  label,
  placeholder,
  rules,
  disabled,
  required,
  direction,
  witdhFull,
  initialValue,
}) => {
  console.log("initialValue: ", initialValue);
  const formProps = witdhFull && {
    wrapperCol: { xs: "100%", sm: "100%" },
  };

  return (
    <>
      {direction && direction === "col" && (
        <div>
          <label>{label}</label>
        </div>
      )}
      <Form.Item
        {...formProps}
        initialValue={initialValue}
        id={name}
        key={name}
        name={name}
        label={direction && direction === "col" ? "" : label}
        rules={[
          {
            type: type,
            message: "The input is not valid!",
          },
          {
            required: required,
            message: "Please this input can't empty!",
          },
        ]}
      >
        {type === "number" ? (
          <InputNumber min={0} className="input__number" disabled={disabled} />
        ) : (
          <AntdInput disabled={disabled} placeholder={placeholder} />
        )}
      </Form.Item>
    </>
  );
};

export default Input;

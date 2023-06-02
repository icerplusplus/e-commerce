import React, {useEffect, useState} from 'react';
import {FieldError, Merge, FieldErrorsImpl} from 'react-hook-form';
import * as yup from 'yup';
import YupPassword from 'yup-password';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string | 'Please fill this field';
  className?: string;
  register: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isShowing?: boolean;
}

// implement root yup to have a password validation
YupPassword(yup);

// custom password validation
const requiredField = () => yup.string().required();
const password = () =>
  requiredField()
    .min(
      8,
      'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
    )
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minSymbols(1, 'Password must contain at least 1 special character');

// schema validation
const schemaValidation = yup
  .object({
    email: yup.string().email(),
    password: password(),
  })
  .required();

const Input: React.FC<Props> = ({
  type,
  name,
  placeholder,
  register,
  className,
  error,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex flex-col">
      <input
        type={name !== 'password' ? type : isShowPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`${name} ${className} ${
          name === 'password' ? 'relative' : 'input-normal'
        }`}
        {...register(name)}
      />
      {/* @ts-ignore */}
      {error && <span className="err__input">{error?.message}</span>}
      {name === 'password' && (
        <span
          onClick={() => setIsShowPassword(!isShowPassword)}
          className="statusPassword absolute  right-0 cursor-pointer p-2 bg-white"
        >
          {!isShowPassword ? 'Hiện' : 'Ẩn'}
        </span>
      )}
    </div>
  );
};

export default Input;

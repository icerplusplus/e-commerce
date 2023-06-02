import clsx from 'clsx';
import React from 'react';

enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Warning = 'warning',
  Light = 'light',
  Danger = 'danger',
}

interface Props {
  children?: React.ReactNode;
  title?: string;
  type?: 'button' | 'reset' | 'submit';
  color?: 'primary' | 'secondary' | 'warning' | 'light' | 'danger';
  onClick?: () => void | Promise<void>;
  className?: React.ComponentProps<'div'>['className'];
}

const Button: React.FC<Props> = ({
  children,
  title,
  type = 'button',
  onClick,
  className,
  color = 'danger',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx([
        `
      w-full 
      my-2
      py-3 
      rounded 
      outline-none 
      border-none 
      text-white 
      text-lg
      font-semibold 
      cursor-pointer 
      shadow-md 
      justify-center 
      items-center 
      hover:opacity-80
      `,
        color === ButtonType.Primary && 'bg-main',
        color === ButtonType.Danger && 'bg-red',
        className && className,
      ])}
    >
      {children ?? title}
    </button>
  );
};

export default Button;

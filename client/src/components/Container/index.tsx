import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
}

const Container: React.FC<Props> = ({children, className}) => {
  return (
    <main
      className={`
        m-auto 
        my-2 
        gap-2
        rounded-md
        w-full
        lg:w-container
        ${className}
      `}
    >
      {children}
    </main>
  );
};

export default Container;

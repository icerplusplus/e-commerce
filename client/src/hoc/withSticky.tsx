import React from 'react';
import clsx from 'clsx';

export const withSticky = <T,>(WrappedComponent: React.FC<T>) => {
  return (props: Readonly<T>) => {
    return (
      <section
        className={clsx([
          `
            sticky
            top-2
            left-0
            space-y-2
            bg-body
          `,
        ])}
      >
        <WrappedComponent {...props} />
      </section>
    );
  };
};

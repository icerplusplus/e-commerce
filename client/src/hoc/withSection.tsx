import clsx from 'clsx';
import React from 'react';

export const withSection = <T, P extends React.CSSProperties>(
  WrappedComponent: React.FC<T>,
  moreProps?: P,
) => {
  return (props: Readonly<T>) => (
    <div className="bg-white rounded-md">
      <div className="m-auto my-2 w-full lg:w-container space-y-2">
        <section
          className={clsx([
            `section
          rounded-md 
          space-y-4`,
            moreProps?.backgroundColor
              ? `bg-[${moreProps?.backgroundColor}]`
              : `bg-white`,
          ])}
        >
          <WrappedComponent {...props} />
        </section>
      </div>
    </div>
  );
};

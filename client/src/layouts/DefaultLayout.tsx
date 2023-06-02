import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({children}) => {
  return (
    <div className="bg-body h-screen">
      {/* body */}
      {children}
    </div>
  );
};

export default DefaultLayout;

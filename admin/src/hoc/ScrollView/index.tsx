import React, { ReactNode } from "react";

export const withScrollView: React.FC = (
  WrappedComponent: ReactNode,
  height: string | "30vh" | "50vh" | "70vh"
) => {
  const style = {
    height: height || "30vh",
    overflowY: "scroll",
  };

  return (props) => (
    <div style={style} className="scrollview">
      <WrappedComponent {...props} />
    </div>
  );
};

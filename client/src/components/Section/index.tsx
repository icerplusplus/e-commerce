import React from "react";

interface Props {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  noPadding?: boolean;
  noGap?: boolean;
  backgroundTransparent?: boolean;
}

const Section: React.FC<Props> = ({
  children,
  className,
  noPadding = false,
  backgroundTransparent = false,
  noGap = false,
}) => {
  return (
    <section
      className={`
        m-auto 
        my-2 
        rounded-md
        ${!noPadding && "p-4"}
        ${!noGap && "space-y-2"}
        ${!backgroundTransparent && " bg-white"}
        ${className && className}
      `}
    >
      {children}
    </section>
  );
};

export default Section;

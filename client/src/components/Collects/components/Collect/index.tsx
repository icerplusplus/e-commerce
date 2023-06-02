import React from "react";
import {ICollect} from "../../../../types";
import {Col} from "antd";
import {clsx} from "clsx";

interface Props extends ICollect {
  onClick: (id: string | number) => void;
  isActive: boolean;
}

const Collect: React.FC<Props> = (props) => {
  return (
    <Col span={3} onClick={() => props?.id && props?.onClick(props?.id)}>
      <div
        className={clsx([
          `
            flex
            flex-col
            items-center
            justify-center
            space-y-2
            bg-white
            p-2
            rounded-md
            cursor-pointer
            hover:border
            hover:border-blue-400
            hover:text-blue-400
          `,
          props?.isActive &&
            `
              border
              border-blue-400
              text-blue-400
              cursor-not-allowed
            `,
        ])}
      >
        <img
          src={props?.thumbnail}
          alt={props?.title}
          className="
            min-w-[3rem]
            min-h-[3rem]
            w-[3rem]
            h-[3rem]
          "
        />
        <span>{props?.title}</span>
      </div>
    </Col>
  );
};

export default Collect;

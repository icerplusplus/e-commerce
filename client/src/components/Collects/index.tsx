import {Row} from "antd";
import React from "react";
import {ICollect} from "@/types";
import {withSticky} from "@/hoc";
import {Section} from "@/components";
import Collect from "./components/Collect";

interface Props {
  data?: ICollect[];
  collectionIsActive?: string | number;
  onCollectionSelected: (collectionId: string | number) => void;
}

const Collects: React.FC<Props> = (props) => {
  if (props?.data?.length === 0) return <>loading...</>;

  return (
    <Section
      backgroundTransparent={true}
      noPadding={true}
      className="sticky top-16"
    >
      <Row gutter={[8, 8]} className="bg-body py-1">
        {props?.data?.map((item: ICollect, index: number) => (
          <Collect
            {...item}
            key={item?.id}
            onClick={props?.onCollectionSelected}
            isActive={
              !props?.collectionIsActive
                ? index === 0
                : props?.collectionIsActive === item?.id
            }
          />
        ))}
      </Row>
    </Section>
  );
};

export default Collects;

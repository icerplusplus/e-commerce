import React, {useState} from "react";
import {Collects, CollectionProducts, Skeleton} from "@/components";
import {useCollect} from "@/hooks";
import {Section} from "@/components";

const Collect: React.FC = () => {
  const [collects] = useCollect();

  const [collectSelected, setCollectSelected] = useState<string | number>();

  const onSelected = (collectId: string | number) => {
    setCollectSelected(collectId);
  };

  const collectionData = collects?.data?.find((item, index) =>
    !collectSelected ? index === 0 : item?.id === collectSelected,
  );

  return (
    <Skeleton type="home-collection" isLoading={collects.isLoading || false}>
      <Section className="sticky top-0 z-10">
        <h1 className="header text-slate-800">Gợi Ý Hôm Nay</h1>
      </Section>
      <Collects
        data={collects?.data}
        collectionIsActive={collectSelected}
        onCollectionSelected={onSelected}
      />
      {/* @ts-ignore */}
      <CollectionProducts data={collectionData?.products} />
    </Skeleton>
  );
};

const styles = {backgroundColor: "#F5F5FA"};

export default Collect;

import React from "react";
import List from "../List";
import {Row} from "antd";

enum SkeletonType {
  // Home page
  HOME_SLIDER = "home-slider",
  HOME_CATEGORY = "home-category",
  HOME_COLLECTION = "home-collection",
  // Category page
  CARD = "product-card",
  LEFT_SIDEBAR = "left-sidebar",
  BRANDS_SIDEBAR = "brands-sidebar",
  TOP_SIDEBAR = "top-sidebar",
}

interface SkeletonProps {
  type:
    | "home-slider"
    | "home-category"
    | "home-collection"
    | "product-card"
    | "top-sidebar"
    | "brands-sidebar"
    | "left-sidebar"
    | "home-slider";
  isLoading: boolean;
  quantity?: number;
  children?: React.ReactNode;
  render?: () => React.ReactNode;
}

const HomeSkeleton = {
  HomeSliderSkeleton: () => (
    <div className="flex flex-row justify-between h-fit my-2 rounded-md bg-white p-2">
      <div className="bg-slate-200 animate-pulse w-full md:w-[803px] h-[271.05px] rounded-md" />
      <div className="bg-slate-200 animate-pulse w-[373.34px] h-[271.05px] rounded-md hidden md:block" />
    </div>
  ),
  HomeCategotySkeleton: () => (
    <div className="bg-white h-fit p-4 space-y-2 rounded-md">
      <div className="animate-pulse h-7 w-1/3 bg-slate-200" />
      <div className="flex flex-row flex-wrap gap-4">
        {[...Array(24)].map((e, i) => (
          <div key={i} className="w-[148px] h-[100px] py-2 space-y-2">
            <div className="animate-pulse w-full h-12 bg-slate-200" />
            <div className="animate-pulse w-full h-5 bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  ),
  HomeCollectionSkeleton: () => (
    <div className="flex flex-col h-fit space-y-2 rounded-md my-2">
      <div className="bg-white p-4">
        <div className="w-1/4 h-7 bg-slate-200 animate-pulse" />
      </div>
      <div className="w-full flex flex-row justify-between">
        {[...Array(8)].map((e, i) => (
          <div className="bg-slate-200 animate-pulse w-36 h-24" key={i} />
        ))}
      </div>
      <div className="w-full flex flex-row flex-wrap justify-between gap-2">
        {[...Array(24)].map((e, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  ),
};

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white max-w-[12rem] md:max-w-[12rem] w-[12rem] rounded cursor-pointer hover:shadow-item">
      <div className="bg-white max-w-[12rem] max-h-[12rem]">
        <div className="w-[12rem] h-[12rem] bg-slate-200 animate-pulse" />
      </div>
      <div className="my-[0.7rem] px-[0.7rem]">
        <div className="h-8 bg-slate-200 rounded min-h-[2rem] animate-pulse" />
        <div className="h-3 bg-slate-200 rounded mt-[0.5rem] min-h-[12px] animate-pulse" />
        <div className="h-6 bg-slate-200 rounded mt-4 min-h-[1rem] animate-pulse" />
      </div>
    </div>
  );
};

const TopSideBarSkeleton = () => (
  <div className="w-full h-[3.3rem] bg-white">
    <List className="py-2">
      {[...Array(8)].map((e, i) => (
        <div
          className="min-h-[2.25rem] min-w-[5rem] bg-slate-200 animate-pulse"
          key={i}
        />
      ))}
    </List>
  </div>
);

const LeftSideBarSkeleton = () => (
  <div className="min-w-[200px] max-w-[200px] min-h-screen bg-white">
    <div className="p-3 border-b-[1px] border-b-slate-200">
      <div className="w-[50%] bg-slate-200 animate-pulse h-[18px] mb-5" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px] mb-2" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px]" />
    </div>
    <div className="p-3 border-b-[1px] border-b-slate-200">
      <div className="w-[50%] bg-slate-200 animate-pulse h-[18px] mb-5" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px] mb-2" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px] mb-2" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px]" />
    </div>
    <div className="p-3 border-b-[1px] border-b-slate-200">
      <div className="w-[50%] bg-slate-200 animate-pulse h-[18px] mb-5" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px] mb-2" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px] mb-2" />
      <div className="w-full bg-slate-200 animate-pulse h-[14px]" />
    </div>
    <div className="p-3 border-b-[1px] border-b-slate-200">
      <div className="w-[50%] bg-slate-200 animate-pulse h-[18px] mb-5" />
      {[...Array(30)].map((e, i) => (
        <div
          className="w-full bg-slate-200 animate-pulse h-[14px] mb-2"
          key={i}
        />
      ))}
    </div>
  </div>
);

const BrandsSideBarSkeleton = () => (
  <div className="min-w-[200px] max-w-[200px] min-h-screen bg-white">
    <div className="p-3 border-b-[1px] border-b-slate-200">
      <div className="w-[50%] bg-slate-200 animate-pulse h-[18px] mb-5" />
      {[...Array(30)].map((e, i) => (
        <div
          className="w-full bg-slate-200 animate-pulse h-[14px] mb-2"
          key={i}
        />
      ))}
    </div>
  </div>
);

const Skeleton: React.FC<SkeletonProps> = ({
  isLoading,
  type,
  quantity,
  children,
  render,
}) => {
  if (isLoading) {
    switch (type) {
      case SkeletonType.CARD:
        return (
          <List>
            {[...Array(quantity)].map((e, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </List>
        );
      case SkeletonType.TOP_SIDEBAR:
        return <TopSideBarSkeleton />;
      case SkeletonType.LEFT_SIDEBAR:
        return <LeftSideBarSkeleton />;
      case SkeletonType.BRANDS_SIDEBAR:
        return <BrandsSideBarSkeleton />;
      case SkeletonType.HOME_SLIDER:
        return <HomeSkeleton.HomeSliderSkeleton />;
      case SkeletonType.HOME_CATEGORY:
        return <HomeSkeleton.HomeCategotySkeleton />;
      case SkeletonType.HOME_COLLECTION:
        return <HomeSkeleton.HomeCollectionSkeleton />;
      default:
        break;
    }
  }
  return <>{render ? render() : children}</>;
};

export default Skeleton;

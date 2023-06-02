import React, {useEffect, useState} from "react";
import AliceCarousel from "react-alice-carousel";
import godBanner from "@/assets/god_banner.png";
import {tmpBanners} from "@/utils/libs/constant";
import Section from "../Section";

import "./index.css";
import Skeleton from "../Skeleton";

const Slider: React.FC = () => {
  const [banners, setBanners] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // fetch to save banners data
    const data = tmpBanners.map((item, index) => (
      <div className="w-full h-auto" key={index}>
        <img
          className="rounded-md w-full h-auto object-cover"
          src={item}
          alt={item}
        />
      </div>
    ));
    setBanners(data);
  }, []);

  return (
    <Skeleton type="home-slider" isLoading={banners.length === 0}>
      <Section
        backgroundTransparent={true}
        noPadding={true}
        noGap={true}
        className="flex flex-row justify-between"
      >
        <div className="w-full lg:w-[820px]">
          <AliceCarousel
            key={1}
            items={banners}
            controlsStrategy="alternate"
            disableButtonsControls
            autoPlay={true}
            infinite
            animationDuration={2000}
            autoPlayInterval={2000}
            animationType="fadeout"
            renderDotsItem={(e) => <span />}
            responsive={{
              0: {items: 1},
            }}
          />
        </div>
        {/* banner */}
        <div className="hidden lg:block">
          <img src={godBanner} className="rounded-md max-h-[271.05px]" />
        </div>
      </Section>
    </Skeleton>
  );
};

export default Slider;

import React, { useEffect, useState } from "react";
import { tmpBanners } from "../../libs";
import AliceCarousel from "react-alice-carousel";
import godBanner from "../../assets/god_banner.png";
import "./index.css";

function Slider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // fetch to save banners data
    const data = tmpBanners.map((item, index) => {
      return (
        <div className="w-full lg:w-[805px] h-auto" key={index}>
          <img
            className="rounded-md w-full h-auto object-cover"
            src={item}
            alt={item}
          />
        </div>
      );
    });
    setBanners(data);
  }, []);

  return (
    <div className="lg:flex lg:justify-between gap-[0.5rem]">
      <div className="w-full lg:w-[805px]">
        <AliceCarousel
          key={1}
          items={banners}
          responsive={{
            0: { items: 1 },
          }}
          controlsStrategy="alternate"
          // disableDotsControls
          disableButtonsControls
          autoPlay={true}
          infinite
          animationDuration={2000}
          autoPlayInterval={2000}
          animationType="fadeout"
          renderDotsItem={(e) => <span />}
        />
      </div>
      {/* banner */}
      <div className="w-full hidden lg:block">
        <img src={godBanner} className="rounded-md" />
      </div>
    </div>
  );
}

export default Slider;

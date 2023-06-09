import React, {useEffect, useState} from "react";
import AliceCarousel from "react-alice-carousel";
import DealItem from "./components/DealItem";
import CountdownTimer from "../CountdownTimer";
import {promotions} from "@/utils/libs/constant";
import {getPromotionBanners} from "../../libs";

import "./index.css";
import Section from "../Section";

//config time for countdown timer
const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();
const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

const renderPromotionProducts = (products: any) => {
  return products.map((product: any) => (
    <DealItem product={product} key={product.deal_id} />
  ));
};

const renderBanner = (thumbnails: any) => {
  return thumbnails.map((item: any) => {
    return (
      <div className="hidden lg:block " key={item.thumbnail}>
        <img
          src={item.thumbnail}
          className="w-auto h-[272px] rounded-md object-fill"
        />
      </div>
    );
  });
};

const Promotion: React.FC = () => {
  const [dealProdusts, setDealProdusts] = useState<any>([]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    try {
      //set deal products data to state
      setDealProdusts(promotions);

      //set thumbnails data to state
      getPromotionBanners().then((res) => setThumbnails(res));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Section
      // backgroundTransparent={true}
      noGap={true}
      noPadding={true}
      className="flex flex-row justify-around"
    >
      <div className="w-full h-full bg-white rounded-md lg:max-w-[740px]">
        <div className="flex justify-between items-center w-full pt-[1rem] pb-[0.5rem] px-[0.5rem] md:px-[1rem]">
          <div className="flex justify-start items-center w-full">
            <div className="flex flex-row gap-[0.5rem]">
              <div className="flex flex-row justify-center items-center">
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg"
                  alt="giá-sốc"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg"
                  alt="icon-flash"
                  width={21}
                  className="hidden lg:block animate-scale"
                />
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg"
                  alt="flash-deal"
                  className="hidden lg:block"
                />
              </div>
              <CountdownTimer targetDate={dateTimeAfterThreeDays} />
            </div>
          </div>
          <div className="flex justify-end flex-shrink-[3.5] items-center w-full">
            <span className="text-[1rem] text-[#0B74E5] font-thin cursor-pointer">
              Xem thêm
            </span>
          </div>
        </div>
        <div className="relative flex justify-between items-center w-full px-[0.5rem] md:px-[1rem] ">
          {dealProdusts && (
            <AliceCarousel
              key={99}
              items={renderPromotionProducts(dealProdusts)}
              responsive={{
                0: {items: 2},
                481: {items: 5},
              }}
              controlsStrategy="alternate"
              disableDotsControls
              disableButtonsControls
              autoPlay={true}
              infinite
              animationDuration={2000}
              autoPlayInterval={2000}
              animationType="fadeout"
              touchTracking
              mouseTracking
            />
          )}
        </div>
      </div>
      <div className="w-full h-full rounded-md hidden lg:flex justify-center items-center lg:w-[432px]">
        {thumbnails.length > 0 && (
          <AliceCarousel
            key={"banners"}
            items={renderBanner(thumbnails)}
            responsive={{
              0: {items: 1},
            }}
            controlsStrategy="alternate"
            disableDotsControls
            disableButtonsControls
            autoPlay={true}
            infinite
            animationDuration={2500}
            autoPlayInterval={2500}
            animationType="fadeout"
            touchTracking
            mouseTracking
          />
        )}
      </div>
    </Section>
  );
};

export default Promotion;

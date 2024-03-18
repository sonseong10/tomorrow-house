import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { useState } from "react";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { SwiperProps, Swiper, SwiperSlide } from "swiper/react";
import { styled } from "styled-components";

SwiperCore.use([Navigation, Thumbs, Pagination, Autoplay]);

const PcCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`

function CategoryList() {
  const list = ["주방특가",                "BEST","오늘의딜","오픈런딜","행운출첵","프리미엄","초특가견적","득템찬스","오!쇼룸","특가/혜택"]
  return <></>
}

function MarketPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  let initSetting: SwiperProps;
  const initControl: SwiperProps = {
    onSwiper: setThumbsSwiper,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    loop:true,
    watchSlidesProgress: true,
    watchOverflow: true,
    slideToClickedSlide: true,
    className: "slide-control",
  };

  return <>
    <Swiper {...initControl}>
            {[1,2,3,4].map((list, index) => {
              return (
                <SwiperSlide key={index}>
                  <PcCarousel>{list}</PcCarousel>
                </SwiperSlide>
              );
            })}
    </Swiper>

    <CategoryList/>
  </>
}
export default MarketPage
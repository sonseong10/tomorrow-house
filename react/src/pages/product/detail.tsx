import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {useState} from 'react';
import {Swiper, SwiperSlide, SwiperProps} from 'swiper/react';
import SwiperCore from 'swiper';

import {FreeMode, Thumbs} from 'swiper/modules';
import styled from 'styled-components';

SwiperCore.use([FreeMode, Thumbs]);

const ProductionSellingCover = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ProductionSellingCoverImage = styled.div`
  width: 558px;
  height: 558px;
  border-radius: 10px;
  overflow: hidden;

  .swiper-slide {
    div.item {
      width: 100%;
      height: 558px;
    }

    background-color: #0066ff;

    &:nth-child(even) {
      background-color: #ffc92c;
    }
  }
`;

const ProductionSellingCoverImageList = styled.div`
  .mySwiper {
    height: 558px;
    margin-right: 10px;
    div.swiper-slide {
      position: relative;
      width: 61px;
      height: 56px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      &.swiper-slide-thumb-active::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        border: 2px solid var(--primary);
        content: '';
      }

      background-color: #0066ff;

      &:nth-child(even) {
        background-color: #ffc92c;
      }
    }
  }
`;

function ProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const initControl: SwiperProps = {
    loop: true,
    spaceBetween: 0,
    thumbs: {swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null},
    className: 'mySwiper2',
  };

  return (
    <div>
      <nav className="categoryGroup">
        <ol>
          <li>생활용품</li>
          <li>수건·타월</li>
          <li>세면타월</li>
        </ol>
      </nav>

      <div>
        <ProductionSellingCover>
          <ProductionSellingCoverImage>
            <Swiper {...initControl}>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
            </Swiper>
          </ProductionSellingCoverImage>
          <ProductionSellingCoverImageList>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={8}
              freeMode={true}
              direction="vertical"
              modules={[FreeMode, Thumbs]}
              className="mySwiper"
              allowTouchMove={false}
            >
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
              <SwiperSlide>
                <div className="item" />
              </SwiperSlide>
            </Swiper>
          </ProductionSellingCoverImageList>
        </ProductionSellingCover>

        <div>상품정보</div>
      </div>

      <div>텝메뉴</div>

      <div>
        <div>
          <div>상세</div>
          <div>리뷰</div>
          <div>문의</div>
          <div>배송/환불</div>
          <div>추천</div>
        </div>
        <aside>구매패널</aside>
      </div>
    </div>
  );
}

export default ProductDetail;

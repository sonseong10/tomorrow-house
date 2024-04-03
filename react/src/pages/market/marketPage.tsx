import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import { useState } from "react";
import SwiperCore from "swiper";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import { SwiperProps, Swiper, SwiperSlide } from "swiper/react";
import { styled } from "styled-components";
import {ProductList} from '../product/list';
import {ElementGroup, Title} from '../../styles/components';
import {UiSelectBox} from '../../components/ui/atom/SelectBox';

SwiperCore.use([Navigation, Thumbs, Pagination, Autoplay]);

const PcCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    display: inline-block;
    width: 100%;
    height: 380px;
    object-fit: cover;
  }
`;

const PcContainer = styled.div`
  overflow: auto;
  width: 100%;
  max-width: 1256px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const CategoryListStyle = styled.nav`
  padding: 0 60px;
  ul {
    display: flex;
    justify-content: space-between;
    margin: 48px 0 10px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #2f3438;
      div {
        background-color: #f4f6f8;
        width: 64px;
        height: 64px;
        border-radius: 12px;
        margin-bottom: 8px;
      }
    }
  }
`;

function CategoryList() {
  const list = [
    '주방특가',
    'BEST',
    '오늘의딜',
    '오픈런딜',
    '행운출첵',
    '프리미엄',
    '초특가견적',
    '득템찬스',
    '오!쇼룸',
    '특가/혜택',
  ];

  return (
    <CategoryListStyle>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <div></div>
            {item}
          </li>
        ))}
      </ul>
    </CategoryListStyle>
  );
}

function MarketPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  console.log(thumbsSwiper);

  // let initSetting: SwiperProps;
  const initControl: SwiperProps = {
    onSwiper: setThumbsSwiper,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    slideToClickedSlide: true,
    className: 'slide-control',
  };

  return (
    <>
      <Swiper {...initControl}>
        {[
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/171171790632484864.png?w=3840',
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/171170685450755779.png?w=3840',
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/171170457343566350.png?w=3840',
          'https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/171210842285547211.png?w=3840',
        ].map((list, index) => {
          return (
            <SwiperSlide key={index}>
              <PcCarousel>
                <img src={list} alt="상품케로셀" />
              </PcCarousel>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <PcContainer>
        <CategoryList />
      </PcContainer>

      <PcContainer>
        <ElementGroup.Row flexContent="between">
          <Title size="md">인기상품</Title>

          <UiSelectBox
            id="popularFilter"
            data={[
              {id: 'popular', text: '인기순'},
              {id: 'new', text: '최신순'},
            ]}
            init={0}
            size="sm"
          />
        </ElementGroup.Row>
        <ProductList
          products={[
            {
              code: '32ds92s',
              name: '논슬립 어깨뿔방지 옷걸이 30개 5colors 외 옷걸이/바지걸이 모음',
              price: 18900,
              discount: 62,
              supplierName: '진심감성 (리빙)',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/deals/167772098062783381.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds92s',
              name: '논슬립 어깨뿔방지 옷걸이 30개 5colors 외 옷걸이/바지걸이 모음',
              price: 18900,
              discount: 62,
              supplierName: '진심감성 (리빙)',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/deals/167772098062783381.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds92s',
              name: '논슬립 어깨뿔방지 옷걸이 30개 5colors 외 옷걸이/바지걸이 모음',
              price: 18900,
              discount: 62,
              supplierName: '진심감성 (리빙)',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/deals/167772098062783381.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds92s',
              name: '논슬립 어깨뿔방지 옷걸이 30개 5colors 외 옷걸이/바지걸이 모음',
              price: 18900,
              discount: 62,
              supplierName: '진심감성 (리빙)',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/deals/167772098062783381.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds92s',
              name: '논슬립 어깨뿔방지 옷걸이 30개 5colors 외 옷걸이/바지걸이 모음',
              price: 18900,
              discount: 62,
              supplierName: '진심감성 (리빙)',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/deals/167772098062783381.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
          ]}
        />
      </PcContainer>
    </>
  );
}
export default MarketPage
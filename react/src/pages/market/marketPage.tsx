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
  max-width: 1156px;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setThumbsSwiper] = useState<SwiperCore | null>(null);

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
        <ElementGroup.Row flexcontent="between">
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
              code: '3h2ds92s1',
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
              code: '32ds92sd',
              name: '1+1 독일토분 공기정화식물 마오리소포라 율마 몬스테라 유칼립투스',
              price: 18000,
              discount: 30,
              supplierName: '필플랜드',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165786292549269852.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 2409,
            },
            {
              code: '32ds92s1',
              name: '키노 LED 미니 머쉬룸 무선 무드등 조명 인테리어 2sizes(밝기/빛색상 변경)',
              price: 27400,
              discount: 54,
              supplierName: '레이라이저',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/170064077510598885.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds92s13',
              name: '쿠폰가 101,370/편안한 제주 25cm 필로우탑 본넬스프링 침대 매트리스S/SS/Q/K',
              price: 109000,
              discount: 45,
              supplierName: '휴도',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165580847056056090.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 18951,
            },
            {
              code: '32ds92s21',
              name: '[예약판매]페블 체어 미드센추리 패브릭 디자인 인테리어 철제 의자',
              price: 54900,
              discount: 39,
              supplierName: '우드띠어리',
              imageURL:
                'https://prs.ohou.se/apne2/any/uploads/productions/v1-194793978269824.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 411,
            },
            {
              code: '32ds923s1',
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
              code: '32ds912s1',
              name: '1+1 독일토분 공기정화식물 마오리소포라 율마 몬스테라 유칼립투스',
              price: 18000,
              discount: 30,
              supplierName: '필플랜드',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165786292549269852.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 2409,
            },
            {
              code: '32ds942s1',
              name: '키노 LED 미니 머쉬룸 무선 무드등 조명 인테리어 2sizes(밝기/빛색상 변경)',
              price: 27400,
              discount: 54,
              supplierName: '레이라이저',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/170064077510598885.png?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 25498,
            },
            {
              code: '32ds9f2s1',
              name: '쿠폰가 101,370/편안한 제주 25cm 필로우탑 본넬스프링 침대 매트리스S/SS/Q/K',
              price: 109000,
              discount: 45,
              supplierName: '휴도',
              imageURL:
                'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165580847056056090.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 18951,
            },
            {
              code: '321ds92s1',
              name: '[예약판매]페블 체어 미드센추리 패브릭 디자인 인테리어 철제 의자',
              price: 54900,
              discount: 39,
              supplierName: '우드띠어리',
              imageURL:
                'https://prs.ohou.se/apne2/any/uploads/productions/v1-194793978269824.jpg?gif=1&w=1280&h=1280&c=c&webp=1',
              grade: 4.8,
              reviewCount: 411,
            },
          ]}
        />
      </PcContainer>
    </>
  );
}
export default MarketPage
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {useState} from 'react';
import {Swiper, SwiperSlide, SwiperProps} from 'swiper/react';
import SwiperCore from 'swiper';

import {FreeMode, Thumbs} from 'swiper/modules';
import styled from 'styled-components';
import SVG from '../../commons/styles/svgIcon';
import {Link} from 'react-router-dom';
import {UiSelectBox} from '../../components/ui/atom/SelectBox';
import Button from '../../components/ui/atom/Button';

SwiperCore.use([FreeMode, Thumbs]);

const PcContainer = styled.div`
  overflow: auto;
  width: 100%;
  max-width: 1156px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ProductionSellingOverviewCategory = styled.nav`
  margin-top: 20px;
  padding: 0;
  border: none;

  ol {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: var(--font-sub-grey);

      &:not(:last-child)::after {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 5px;
        background: url(${SVG.NextArrow('#898989')}) no-repeat center center;
        background-size: 16px;
        content: '';
      }
    }
  }
`;

const ProductionSellingContainer = styled.div`
  margin: 40px 0;
  display: flex;

  > div {
    padding: 0 10px;
  }
`;

const ProductionSellingCover = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 30px;
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
      width: 53px;
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

const ProductionSellingNavigationContent = styled.div`
  background-color: #fafafa;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
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
      <PcContainer>
        <ProductionSellingOverviewCategory>
          <ol>
            <li>생활용품</li>
            <li>수건·타월</li>
            <li>세면타월</li>
          </ol>
        </ProductionSellingOverviewCategory>
      </PcContainer>

      <PcContainer>
        <ProductionSellingContainer>
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
                slidesPerView={9}
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

          <div>
            <div>
              <div>
                <p>아에홈</p>
                <div>
                  <h1>크롬출시! 키노 LED 미니 머쉬룸 무선 조명 인테리어 2sizes(밝기/빛색 변경)</h1>
                </div>
              </div>
              <div>
                <p>675개의 리뷰</p>
                <p>
                  <span>54%</span>
                  <del>60,000원</del>
                </p>
                <div>
                  <strong>27,400원</strong>
                </div>
              </div>
              <div>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>혜택</td>
                      <td>28P 적립 (WELCOME 0.1% 적립)</td>
                    </tr>
                    <tr>
                      <td>배송</td>
                      <td>
                        <span>2,500원</span>
                        <p>
                          선결제 17:00 까지 결제 시 <span>오늘 출발</span>
                        </p>
                        <div>
                          <span>일반택배</span>
                          <span> 제주도/도서산간 지역 3,000원</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link to={'#'}>
                <div>레나에너지</div>
                <div>브랜드홈</div>
              </Link>
            </div>
            <div>
              <section>
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
              </section>

              <div>
                <span>주문금액</span>
                <strong>0원</strong>
              </div>

              <div>
                <Button text="장바구니" btntype="border" btnsize="lg" thin color="primary" />
                <Button text="바로구매" btnsize="lg" thin color="primary" />
              </div>
            </div>
            <div></div>
          </div>
        </ProductionSellingContainer>
      </PcContainer>

      <ProductionSellingNavigationContent>
        <PcContainer>
          <a href="#">상품정보</a>
          <a href="#">
            리뷰<span>49</span>
          </a>
          <a href="#">
            문의<span>86</span>
          </a>
          <a href="#">배송/환불</a>
          <a href="#">추천</a>
        </PcContainer>
      </ProductionSellingNavigationContent>

      <PcContainer>
        <div style={{display: 'flex'}}>
          <div style={{display: 'inline-block'}}>
            <section>
              <header>
                <h1>상품정보</h1>
              </header>

              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                  <Button iconname="DownArrow" iconposition="after" text="펼치기" type="button"></Button>
                </div>
                <img
                  src="https://image.ohou.se/i/bucketplace-v2-development/uploads/admins/productions/notice/170778069306610551.jpg?gif=1&amp;w=720"
                  srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/admins/productions/notice/170778069306610551.jpg?gif=1&amp;w=1080 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/admins/productions/notice/170778069306610551.jpg?gif=1&amp;w=1440 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/admins/productions/notice/170778069306610551.jpg?gif=1&amp;w=2560 3x"
                  alt="판매자 공지 이미지"
                />
                <img
                  src="https://image.ohou.se/i/bucketplace-v2-development/uploads/expert_users/notice_images/172362252135613721.gif?gif=1&amp;w=720"
                  srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/expert_users/notice_images/172362252135613721.gif?gif=1&amp;w=1080 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/expert_users/notice_images/172362252135613721.gif?gif=1&amp;w=1440 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/expert_users/notice_images/172362252135613721.gif?gif=1&amp;w=2560 3x"
                  alt="판매자 공지 이미지"
                />
                <div>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>
                    <strong>
                      <span style={{backgroundColor: '#fbeeb8'}}>&nbsp;주문 폭주로 크림버터 - 미니 주문시&nbsp;</span>
                    </strong>
                  </p>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>
                    <strong>
                      <span style={{backgroundColor: '#fbeeb8'}}>&nbsp;08/23~ 순차 출고됩니다.&nbsp;</span>
                    </strong>
                  </p>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>
                    <strong>
                      <span style={{backgroundColor: '#fbeeb8'}}>&nbsp;이용에 불편을 드려 죄송합니다.&nbsp;</span>
                    </strong>
                  </p>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>
                    <strong>
                      <span style={{backgroundColor: '#fbeeb8'}}>그 외 주문건 17:00 이전 당일 출고됩니다.</span>
                    </strong>
                  </p>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>&nbsp;</p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262842629914688.jpg"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012574852291082.gif"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262842845990976.jpg"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262842926235648.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262843146948608.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012577658198599.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012579378208588.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012581158220247.gif"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012582393495978.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012583137245967.gif"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262843342553152.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012584992530169.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012585996794090.gif"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-262843444740160.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012587918704789.gif"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://prs.ohou.se/apne2/any/uploads/productions/descriptions/url/v1-197703056953472.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012589049948196.png"
                      alt=""
                    />
                  </p>
                  <p style={{textAlign: 'center'}}>
                    <img
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170012589742653044.png"
                      alt=""
                    />
                  </p>
                  <p>
                    <img
                      style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
                      src="https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/descriptions/url/170064069122766481.jpg"
                      alt=""
                    />
                  </p>
                </div>
              </div>
            </section>
            <div>리뷰</div>
            <div>문의</div>
            <div>배송/환불</div>
            <div>추천</div>
          </div>
          <aside style={{display: 'inline-block'}}>
            <div>
              <section>
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
                <UiSelectBox id="1" data={['dsadsadsa', 'dsadsa']} />
              </section>

              <div>
                <span>주문금액</span>
                <strong>0원</strong>
              </div>

              <div>
                <Button text="" btnsize="lg" thin btntype="border" iconname="BookMark" iconposition="center" />
                <Button text="장바구니" btntype="border" btnsize="lg" thin color="primary" />
                <Button text="바로구매" btnsize="lg" thin color="primary" />
              </div>
            </div>
          </aside>
        </div>
      </PcContainer>
    </div>
  );
}

export default ProductDetail;

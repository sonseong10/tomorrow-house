import styled from "styled-components";
// import { Title } from "styles/components";
import { Link } from "react-router-dom";
import LnbTopWrap from "./LnbTopWrap";
import { useLeft, useTop, useTopSelected } from "./store/navigatesHook";
import type { INavigatesVO } from "./store/navigateVo";

const Lnb = styled.nav<{ active: boolean }>`
  display: flex;
  align-items: stretch;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.active ? "220px" : "0px")};
  height: 100%;
  -webkit-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #cd3932;
  color: #fff;
  -webkit-transition: width 0.2s;
  transition: width 0.2s;
  z-index: 8;
`;

const SeerviceWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 40%;
  transform: translateX(-50%);
  top: 21px;
`;

const HeaderLogo = styled.div`
  & a {
    display: block;
    width: 130px;
  }
  & img {
    display: inline-block;
    width: 100%;
  }
`;

//

const LnbScroll = styled.div<{ active: boolean }>`
  overflow: auto;
  flex-wrap: nowrap;
  align-self: stretch;
  width: 220px;
  padding: ${props => (props.active ? "60px 0 50px" : "60px 0 50px")};
`;

function Nav(): JSX.Element {
  const { topList } = useTop();
  const getTopSelected = useTopSelected();
  const sTop = getTopSelected();
  const { isLeft } = useLeft();

  return (
    <Lnb active={isLeft}>
      <SeerviceWrap>
        <HeaderLogo>
          <Link to={"/admin/cms/contents/manage"}>
            <img alt="패스트뷰통합AD" src="/images/logo_ad.svg" />
          </Link>
        </HeaderLogo>
      </SeerviceWrap>

      <LnbScroll active={isLeft}>
        {topList&& topList.map((top: INavigatesVO) => (
          <LnbTopWrap key={top.id} isActive={top.id === sTop} item={top} />
        ))}
      </LnbScroll>
    </Lnb>
  );
}

export default Nav;

import styled from "styled-components";
import Logo from "../../../assets/images/logo.svg"
import { Link } from "react-router-dom";
import UiInputText from "../../../commons/components/ui/UiInputText";
import Button from "../../ui/atom/Button";
import SVG from "../../../commons/styles/svgIcon";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  border-bottom: 1px solid #EAEDEF;
  background-color: #fff;
  z-index: 7;

  > div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 10px 60px;
    max-width: 1256px;
    margin: 0 auto;

    h1 {
      img {
        display: block;
        height: 30px;
        margin-right: 35px;
      }
      margin-bottom: 0;
    }

    .gnb-left {
      flex: 1 1 0;
      flex-wrap: nowrap;
      a {
        display: inline-block;
        margin: 0 10px;
        padding: 21px 5px 15px;
        font-size: 18px;
        line-height: 1;
        font-weight: bold;
    
        &:hover,
        &.isActive {
          color: var(--primary)
        }
      }
    }

  .gnb-right {
    flex: 0 1 650px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search-wrapper {
      position: relative;
      margin-right: 14px;
      &::after {
        position: absolute;
        top: 50%;
        left: 6px;
        display: block;
        width: 24px;
        height: 24px;
        background: url(${SVG.Search("#999")}) no-repeat center center;
        transform: translateY(-50%);
        content: "";
      }

      #search {
        padding-left: 34px;
        height: 40px;
      }
    }

    .auth-group {
      display: flex;
      align-items: center;
      margin-right: 8px;
      .cart-icon {
        margin-right: 10px;
        transform: translateY(2px);
        &::after {
          display: inline-block;
          width: 24px;
          height: 24px;
          background: url(${SVG.Cart("#1d1d1d")}) no-repeat center center;
          content: "";
        }
      }

      a:not(.cart-icon){
        display: inline-block;
        padding: 0 10px;
        &:not(:last-child) {
          border-right: 1px solid #EAEDEF;
        }
      }
    }

    button {
      padding: 0 12px;
    }
  }
}`;

const SubCategoryWrapper = styled.nav`
  border-bottom: 1px solid #EAEDEF;
  background-color: #fff;
  nav {
    padding: 0 60px;
    max-width: 1256px;
    margin: 0 auto;
    ul {
      display: flex;
      li {
        position: relative;
        margin: 0 5px;
        padding: 12px 6px;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: var(--font-primary);
        cursor: pointer;

        &:hover {
          color: var(--primary);
        }

        &:first-child{
          color: var(--primary);
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary);
            content: "";
          }
        }
      }
    }
  }
`

function SubCategory():JSX.Element {
  const data:{name: string; loaction?: string}[] = [
    {name:"쇼핑홈", loaction: undefined},
    {name:"카테고리", loaction: undefined},
    {name:"베스트", loaction: undefined},
    {name:"오늘의딜", loaction: undefined}
  ]
  return <SubCategoryWrapper>
    <nav>
      <ul>
        {data.map((item, index)=> <li key={index}>{item.loaction ? <Link to={item.loaction}>{item.name}</Link> : item.name}</li>)}
      </ul>
    </nav>
  </SubCategoryWrapper>
}

function Header() {
  return (
    <>
      <HeaderContainer>
        <div>
          <h1 className="logo">
            <Link to="/">
              <img src={Logo} alt="내일의 집" />
            </Link>
          </h1>

          <div className="gnb-left">
            <Link to={'/'}>커뮤니티</Link>
            <Link to={'/store'} className="isActive">
              쇼핑
            </Link>
            <Link to={'/experts'}>인테리어/생활</Link>
          </div>

          <div className="gnb-right">
            <div className="search-wrapper">
              <UiInputText id="search" type="text" placeholder="상품 검색" />
            </div>
            <div className="auth-group">
              <Link to="/cart" className="cart-icon"></Link>
              <Link to="/">로그인</Link>
              <Link to="/">회원가입</Link>
              <Link to="/">고객센터</Link>
            </div>
            <Button text="글쓰기" color="primary" iconname="DownArrow" iconposition="after" />
          </div>
        </div>
      </HeaderContainer>
      <SubCategory />
    </>
  );
}

export default Header;

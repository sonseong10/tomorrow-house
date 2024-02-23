import styled from "styled-components";

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 0 24px 0 250px;
  background-color: #fff;
  z-index: 7;

  h3 {
    margin-bottom: 0;
  }
`;

const GnbWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;


function Header() {
  return (
    <HeaderContainer>
      <GnbWrap>
      
      </GnbWrap>
    </HeaderContainer>
  );
}

export default Header;

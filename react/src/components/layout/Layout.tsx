import  { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import { useContentHeight } from "../../commons/layers/store/layerHook";
import Header from "./header/Header";


const Container = styled.div<{active: boolean}>`
  position: relative;
  width: 100%;
  max-width: 1156px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: auto;
`;

const Content = styled.section`
  width: 100%;
  min-height: 710px;
  position: relative;
  padding: 0px;
  overflow: hidden;
  & > section:first-child {
    margin-top: 0;
  }
`;

function Layout(): JSX.Element {
  const {set} = useContentHeight();
  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    set(() => {
      return contentRef.current?.getBoundingClientRect() as DOMRect;
    });
  }, [set]);
  return (
    <>
      <Header />
      <Container active id="container">
        <Content ref={contentRef}>
          <Outlet />
        </Content>
      </Container>
    </>
  );
}

export default Layout;

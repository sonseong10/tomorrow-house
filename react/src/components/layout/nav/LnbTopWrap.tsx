import React from "react";
import { useLeftList } from "./store/navigatesHook";
import type { INavigatesVO, TOP } from "./store/navigateVo";
import styled, { css } from "styled-components";
import LnbItemLink from "./LnbItemLink";

const LnbWrap = styled.ul`
  width: 220px;
  white-space: nowrap;
`;

const LnbItem = styled.li`
  margin-top: 24px;
  white-space: nowrap;
  word-break: keep-all;
`;

const Lnb2Depth = styled.ul<{ open: boolean }>`
  overflow: hidden;
  height: 0;
  ${props =>
    props.open === true
      ? css`
          height: auto;
          padding-bottom: 16px;
        `
      : ""}
`;

function LnbTopWrap(props: {
  item: INavigatesVO;
  isActive: boolean;
}): JSX.Element {
  const { leftList } = useLeftList();
  return (
    <LnbWrap>
      <LnbItem>
        <Lnb2Depth open={true}>
          {leftList[props.item.id as TOP]?.map(
            (item: INavigatesVO, idx: React.Key | null | undefined) => (
              <LnbItemLink
                key={item.key ? item.key : idx}
                top={props.item}
                item={item}
              />
            )
          )}
        </Lnb2Depth>
      </LnbItem>
    </LnbWrap>
  );
}

export default React.memo(LnbTopWrap);

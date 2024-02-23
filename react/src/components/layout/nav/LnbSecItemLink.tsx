import React from "react";
import {
  useLeftSelected,
  useSecSelected,
  useTopSelected,
} from "./store/navigatesHook";
import type { INavigatesVO } from "./store/navigateVo";
import styled, { css } from "styled-components";

const LnbSecLink = styled.span<{ active?: boolean; disabled?: boolean }>`
  display: inline-block;
  line-height: 1;
  padding: 10px 0 10px 44px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  /* &::after {
    content: "";
    height: 6px;
    margin-top: -4px;
  } */

  &:hover {
    background-color: #94302b;
    font-weight: 800;
  }
  ${props =>
    props.active === true
      ? css`
          background-color: #94302b;
          font-weight: 800;
          &::after {
            display: block;
          }
        `
      : props.disabled
      ? css`
          color: var(--font-disabled);
        `
      : css`
          &::after {
            display: none;
          }
        `}
`;

function LnbSecItemLink(props: {
  top: INavigatesVO;
  item: INavigatesVO;
  sec: INavigatesVO;
}) {
  const getTopSelected = useTopSelected();
  const { getLeftSelected } = useLeftSelected();
  const { getSecSelected, setSec } = useSecSelected();
  const sTop = getTopSelected();
  const left = getLeftSelected(props.item);
  const sec = getSecSelected(props.sec.router);
  return (
    <li>
      <LnbSecLink
        active={props.top.id === sTop && left !== null && sec !== null}
        disabled={props.sec.disabled}
        onClick={setSec.bind(null, props.sec)}
      >
        {props.sec.name}
      </LnbSecLink>
    </li>
  );
}

export default React.memo(LnbSecItemLink);

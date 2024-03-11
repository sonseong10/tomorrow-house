import React from "react";
import {
  useLeftSelected,
  useSecList,
  useTopSelected,
} from "./store/navigatesHook";
import type { INavigatesVO } from "./store/navigateVo";
import styled, { css } from "styled-components";
import LnbSecItemLink from "./LnbSecItemLink";
import CurrentSVG from "../../../styles/svgIcon";

const LnbItemLinkCon = styled.li`
  display: flex;
  flex-direction: column;
`;

const Lnb2ItemLink = styled.span<{
  active?: boolean;
  disabled?: boolean;
  icon?: string;
}>`
  display: inline-block;
  line-height: 1;
  padding: 16px 0 16px 22px;
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

  ${props =>
    props.icon
      ? css`
          display: flex;
          align-items: center;
          &::before {
            display: block;
            width: 22px;
            height: 22px;
            margin-right: 6px;
            background: url(${CurrentSVG[props.icon!]("#fff")}) no-repeat center
              center;
            background-size: 20px;
            content: "";
          }
        `
      : ""}
`;

const LnbSecItemLinkCon = styled.ul`
  display: flex;
  flex-direction: column;
`;

function LnbItemLink(props: {
  top: INavigatesVO;
  item: INavigatesVO;
}): JSX.Element {
  const getTopSelected = useTopSelected();
  const { getLeftSelected, setLeft } = useLeftSelected();
  const sTop = getTopSelected();
  const left = getLeftSelected(props.item);
  const sec = useSecList(props.item.id as string);

  return (
    <LnbItemLinkCon>
      <Lnb2ItemLink
        active={props.top.id === sTop && left != null}
        disabled={props.item.disabled}
        onClick={setLeft.bind(null, props.item)}
        icon={props.item.icon}
      >
        {props.item.name}
      </Lnb2ItemLink>
      {sec && (
        <LnbSecItemLinkCon>
          {sec.map((s, idx) => (
            <LnbSecItemLink
              key={idx + 1}
              top={props.top}
              item={props.item}
              sec={s}
            />
          ))}
        </LnbSecItemLinkCon>
      )}
    </LnbItemLinkCon>
  );
}

export default React.memo(LnbItemLink);

import { useCheckBoxGroup } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import React from "react";
import styled, { css } from "styled-components";
import type { DirectionType } from "../../../commons/styles/ComponentsType";
import CheckBox from "./CheckBox";

const CheckBoxGroupStyle = styled.div<{
  direction?: DirectionType;
  isBelong?: boolean;
}>`
  display: ${props => {
    switch (props.direction) {
      case "row":
      default:
        return "inline-flex";
      case "col":
        return "flex";
    }
  }};

  flex-direction: ${props => {
    switch (props.direction) {
      case "row":
      default:
        return "row";
      case "col":
        return "column";
    }
  }};
  flex-wrap: wrap;
  margin: 3px 0;

  ${props => {
    if (props.isBelong) {
      return css`
        display: flex;
        & {
          position: relative;
          padding-left: 48px;
        }
        &:before {
          display: block;
          content: "";
          width: 14px;
          height: 14px;
          position: absolute;
          top: 0px;
          left: 26px;
          border-left: 1px solid var(--font-grey);
          border-bottom: 1px solid var(--font-grey);
        }
      `;
    }
  }};
`;

export interface ICheckBox {
  id: string;
  text: string;
  isAll?: boolean;
}

interface IInputCheckBoxProps {
  name: string;
  selected?: Array<string>;
  direction?: DirectionType;
  isBelong?: boolean;
  onlyBox?: boolean;
  data?: Array<ICheckBox>;
  change?: (isAll: boolean, selected: Array<string>) => void;
}

function CheckBoxGroupMemo(props: IInputCheckBoxProps): JSX.Element {
  const allCount = props.data?.filter((item) => !item.isAll).length;
  const isAll = props.selected?.length === allCount;
  const hasAll = props.data?.filter((item) => item.isAll);

  const change = (value: boolean, id?: string) => {
    if (hasAll !== undefined && hasAll[0].id === id) {
      if (value) {
        if (props.change) {
          props.change(
            value,
            (props.data as Array<ICheckBox>).filter((item) => !item.isAll).map((item) => item.id),
          );
        }
      } else {
        if (props.change) {
          props.change(false, []);
        }
      }
    } else {
      if (value) {
        if (props.change) {
          const con = [...(props.selected as Array<string>), id as string];
          props.change(con.length === allCount, con);
        }
      } else {
        if (props.change) {
          const con = [...(props.selected as Array<string>)];
          con.splice(con.indexOf(id as string), 1);
          props.change(con.length === allCount, con);
        }
      }
    }
  };
  return (
    <CheckBoxGroupStyle isBelong={props.isBelong} direction={props.direction}>
      {props.data?.map((item) => (
        <CheckBox
          key={item.id as unknown as string}
          onlyBox={props.onlyBox}
          name={props.name}
          id={item.id as unknown as string}
          text={item.text}
          value={item.isAll ? isAll : props.selected?.indexOf(item.id) !== -1}
          change={change}
        />
      ))}
    </CheckBoxGroupStyle>
  );
}

const CheckBoxGroup = React.memo(CheckBoxGroupMemo);
export default CheckBoxGroup;

export interface IUiCheckBoxProps {
  name: string;
  direction?: DirectionType;
  isBelong?: boolean;
  onlyBox?: boolean;
  data?: Array<ICheckBox>;
  change?: (isAll: boolean, selected: Array<string>) => void;
  valid?: IValid<{ isAll: boolean; value?: string[] }>;
  init?: string[];
}

export function UiCheckBoxGroup(props: IUiCheckBoxProps): JSX.Element {
  const { checkValue, changeValue } = useCheckBoxGroup(
    props.name,
    props.valid,
    props.data,
    props.init
  );
  return (
    <CheckBoxGroup {...props} selected={checkValue} change={changeValue} />
  );
}

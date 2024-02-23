import type { DirectionType, RadioType } from "../../../commons/styles/ComponentsType";
import { useRadio } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import React from "react";
import styled, { css } from "styled-components";
import type { Theme } from "../../../styles/theme";

const radioSvg = (color: string): string => {
  color = color.indexOf("#") === -1 ? color : color.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='7.25' stroke='%23${color}' stroke-width='1.5'/%3E%3C/svg%3E"`;
};

const radioCheckdSvg = (color: string): string => {
  color = color.indexOf("#") === -1 ? color : color.substring(1, color.length);
  return `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='%23${color}'/%3E%3Ccircle cx='8' cy='8' r='3' fill='%23ffffff'/%3E%3C/svg%3E"`;
};

const RadioBtnGroup = styled.div<{
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
  input {
    display: none;
  }

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
          top: 2px;
          left: 26px;
          border-left: 1px solid var(--font-grey);
          border-bottom: 1px solid var(--font-grey);
        }
      `;
    }
  }};
`;

const RadioItem = styled.p<{
  type?: RadioType;
  theme: Theme;
  onlyBox?: boolean;
}>`
  ${props => {
    switch (props.type) {
      case "button":
        return css`
          &:first-child label {
            border-left: 1px solid var(--btn-dark);
            border-radius: 4px 0 0 4px;
          }

          &:last-child label {
            border-radius: 0 4px 4px 0;
          }
          & input:checked + label {
            background-color: var(--btn-dark);
            color: #fff;
          }
          & label {
            display: block;
            width: 60px;
            height: 36px;
            border: 1px solid var(--btn-dark);
            border-left: 0;
            color: var(--btn-dark);
            line-height: 33px;
            font-size: ${props => props.theme.fontSize.text.lg};
            text-align: center;

            &:hover {
              background-color: var(--btn-dark-hover);
              cursor: pointer;
            }
          }
        `;
      case "radio":
      default:
        return css<{ onlyBox?: boolean }>`
          display: block;
          margin-right: 10px;

          label {
            display: inline-block;
            padding: 4px 0 4px 21px;
            background-size: 16px;
            background-position: left top 4px;
            background-repeat: no-repeat;
            background-image: url(${props =>
              radioSvg(props.theme.colors.borderPrimary)});
            vertical-align: middle;
            line-height: 1;
          }

          &:hover {
            input + label {
              background-image: url(${props =>
                radioSvg(props.theme.colors.borderHover)});
            }
            input:checked + label {
              background-image: url(${props =>
                radioCheckdSvg(props.theme.colors.borderFocus)});
            }
          }

          input {
            &:checked + label {
              background-image: url(${props =>
                radioCheckdSvg(props.theme.colors.borderFocus)});
            }
            &:disabled + label {
              background-image: url(${props =>
                radioSvg(props.theme.colors.borderPrimary)});
              color: var(--font-disabled);
            }
            &:checked:disabled + label {
              background-image: url(${props =>
                radioCheckdSvg(props.theme.colors.borderPrimary)});
              color: var(--font-disabled);
            }
          }

          ${props => {
            if (props.onlyBox) {
              return css`
                & {
                  margin-right: 0;
                }
                label {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  padding: 0;
                  margin: 0;
                  background-position: center center;
                  font-size: 0;

                  i {
                    margin-right: 0;
                  }
                }
              `;
            }
          }};
        `;
    }
  }}
`;

export interface IRadioItem {
  id: string;
  text: string;
  disable?: boolean;
}

type RadioItemType =
  | IRadioItem
  | { [key: string]: string | number | boolean | undefined };

export interface IProps {
  type?: RadioType;
  direction?: DirectionType;
  displayId?: string;
  selectType?: "select" | "id";
  selectId?: string;
  isBelong?: boolean;
  onlyBox?: boolean;
  data?: Array<RadioItemType>;
  name: string;
  selected?: number | string | boolean;
  disable?: boolean;
  change?: (selected: number) => void;
  changeId?: (selected: string) => void;
}

function RadioGroup(props: IProps): JSX.Element {
  const selectType =
    props.selectType === undefined ? "select" : props.selectType;
  const getSelected = () => {
    switch (selectType) {
      case "select":
        return props.selected as number;
      case "id":
        if (props.selectId !== undefined && props.selected !== undefined) {
          return props.data?.findIndex(
            v =>
              (v as { [key: string]: string | number | undefined })[
                props.selectId as string
              ] === props.selected
          );
        } else {
          return undefined;
        }
    }
  };

  const onChange = (idx: number) => {
    switch (selectType) {
      case "select":
        if (props.change) {
          props.change(idx);
        }
        break;
      case "id":
        if (props.data !== undefined) {
          if (props.changeId) {
            props.changeId(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (props.data[idx] as { [key: string]: any })[
                props.selectId as string
              ]
            );
          }
        }
        break;
    }
  };

  const getId = (item: RadioItemType) => {
    return props.name + "_" + (item.id === undefined ? item.text : item.id);
  };

  return (
    <RadioBtnGroup direction={props.direction} isBelong={props.isBelong}>
      {props.data?.map((item, idx) => (
        <RadioItem key={idx} type={props.type} onlyBox={props.onlyBox}>
          <input
            type="radio"
            name={props.name}
            id={getId(item)}
            disabled={
              item.disable === undefined
                ? props.disable
                : (item.disable as boolean)
            }
            checked={idx === getSelected()}
            onChange={onChange.bind(null, idx)}
          />
          <label htmlFor={getId(item)}>{item.text}</label>
        </RadioItem>
      ))}
    </RadioBtnGroup>
  );
}

export default React.memo(RadioGroup);

export interface IUiRadioProps {
  name: string;
  type?: RadioType;
  direction?: DirectionType;
  displayId?: string;
  selectType?: "select" | "id";
  selectId?: string;
  isBelong?: boolean;
  onlyBox?: boolean;
  data?: Array<
    IRadioItem | { [key: string]: string | number | boolean | undefined }
  >;
  disable?: boolean;
  init?: string | number | boolean;
  valid?: IValid<string | number | undefined>;
  change?: (selected?: string | number) => void;
}

export function UiRadioGroup(props: IUiRadioProps): JSX.Element {
  const { checkValue, changeValue } = useRadio(
    props.name,
    props.valid,
    props.init,
    props.change
  );
  return (
    <RadioGroup
      {...props}
      selected={checkValue}
      change={changeValue}
      changeId={changeValue}
    />
  );
}

import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import type { Theme } from "../../../styles/theme";
import { WFrom } from "../../../styles/styleds";
import { useEffect } from "react";
import { getSearchRegExp, mouseUp } from "../../../commons/utils";
import { useSelectBox } from "../../../commons/ui/useUihook";
import type { IValid } from "../../../commons/ui/useValid";
import SVG from "../../../commons/styles/svgIcon";
import type { Size } from "../../../styles/stylesVo";
import { useConfirm } from "../../../components/popup/popupHook";
import InputText from "./InputText";

const SelectWrapper = styled.div<{ size: Size }>`
  display: inline-flex;
  width: auto;
  text-align: left;
  ${WFrom};
`;

const SelectHidden = styled.select`
  border: 0 !important;
  clip: rect(0 0 0 0) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

const Select2 = styled.span`
  width: 100% !important;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
  width: 89px;
`;

const Selection = styled.span``;

const Select2Selection = styled.span<{ disable: boolean; theme: Theme }>`
  background-color: ${props =>
    props.disable ? props.theme.colors : "#fff"};
  margin-left: 0;
  display: block;
  cursor: pointer;
  box-sizing: border-box;
`;

const Select2Value = styled.span<{
  active: boolean;
  selected: boolean;
  theme: Theme;
}>`
  border: 1px solid
    ${props =>
      props.active
        ? props.theme.colors.borderFocus
        : props.theme.colors.borderPrimary};
  display: block;
  border-radius: ${props => (props.active ? "4px 4px 0 0" : "4px")};
  width: 100%;
  height: 100%;
  padding-right: 30px;
  line-height: 34px;
  color: ${props =>
    props.selected
      ? props.theme.colors.fontPrimary
      : props.theme.colors.fontDisabled};
  padding-left: 8px;
`;

const Select2Arrow = styled.span<{ active: boolean }>`
  position: absolute;
  top: 1px;
  right: 1px;
  width: 30px;
  height: 34px;
  background: url(${SVG.DownArrow("a8a9aa")}) no-repeat 2px center;
  ${props =>
    props.active
      ? css`
          background-position: 7px center;
          transform: rotate(180deg);
        `
      : ""}
`;

const DropDownWapper = styled.span`
  display: block;
  height: auto;
  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  position: absolute;
  left: 0;
  top: 36px;
  border-radius: 0 0 4px 4px;
  border: 1px solid var(--border-primary);
  border-top: 0;
  background-color: #fff;
  box-shadow: 2px 3px 8px 0px rgb(0 0 0 / 10%);
  z-index: 21;
`;

const OptionWrapper = styled.ul`
  cursor: pointer;
`;

const OptionItem = styled.li<{ active: boolean; check?: boolean }>`
  display: block;
  width: 100%;
  padding: 8px;
  border: 0;
  text-align: left;
  transition: background 0.2s;
  &:hover {
    background-color: var(--bg-form);
  }
  ${props => {
    if (props.check) {
      return `&:before {
        display: inline-block;
        content: "";
        width: 16px;
        height: 16px;
        margin-right: 5px;
        vertical-align: middle;
      }
      ${
        props.active
          ? `background: url(${SVG.Check(
              "ff4949"
            )}) no-repeat right 0.6em center; 
      color: var(--primary)`
          : ""
      }`;
    } else {
      if (props.active) {
        return `
          background: url(${SVG.Check("ff4949")}) no-repeat right 0.6em center; 
          color: var(--primary)
        `;
      }
      return ``;
    }
  }}
`;

const ClearIcon = styled.span`
  display: block;
  position: absolute;
  top: 0;
  right: 30px;
  width: 18px;
  height: 34px;
  border: 0;
  background: url("/images/icon/icon_clear.svg") no-repeat center center;
  font-size: 0;
  text-indent: -9999px;
`;

const SelectSearch = styled.div`
  padding: 10px;
  & input {
    width: 100%;
    padding-left: 30px;
    background: url(${SVG.Search("A8A9AA")}) no-repeat left 0.6em center;
    &:focus {
      background-image: url(${SVG.Search("7c7e80")});
    }
  }
`;

export interface ISelectBoxProps<T> {
  displayId?: string;
  selectType?: "select" | "id";
  selectId?: string;
  size?: Size;
  select?: string | number;
  placeholder?: string;
  change?: (
    selected?: number,
    value?: T | undefined
  ) => Promise<void> | void | Promise<number> | number;
  changeId?: (
    selected?: string,
    value?: T | undefined
  ) => Promise<void> | void | Promise<string> | string;
  onChange?: (selected: string) => void;
  disable?: boolean;
  search?: boolean;
  multiTitle?: string;
  data: Array<T>;
  isClear?: boolean;
  defence?: string;
}

function SelectBox<T>(props: ISelectBoxProps<T>): JSX.Element {
  const size = props.size;
  const placeholder = props.placeholder || "선택";
  const disable = props.disable || false;
  const search = props.search || false;
  const selectType = props.selectType || "select";
  const [isActive, setActive] = useState(false);
  const confirm = useConfirm();

  const [selected, setSelected] = useState<number | undefined>(
    props.selectType === "select"
      ? (props.select as number)
      : props.select !== undefined
      ? props.data.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value => (value as any)[props.selectId as string] === props.select
        ) !== -1
        ? props.data.findIndex(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value => (value as any)[props.selectId as string] === props.select
          )
        : undefined
      : props.select
  );

  const isClear = props.placeholder !== undefined;
  const [clear, setClear] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let searchReg = getSearchRegExp(searchValue);
  const selectWrapperRef = useRef(null);
  const selectSearchRef = useRef(null);
  const toggleHandler = useCallback(() => {
    if (!disable) {
      const a = !isActive;
      setActive(a);
      setSearchValue("");
      if (a) {
        mouseUp(selectWrapperRef, setActive, selectSearchRef);
      }
    }
  }, [isActive, disable]);
  const changeSelected = useCallback(
    (idx: number) => {
      if (props.defence !== undefined) {
        if (selected === undefined) {
          setActive(false);
          setSelected(idx);
          return;
        }
        confirm(props.defence, (bo: boolean) => {
          if (bo) {
            setActive(false);
            setSelected(idx);
            switch (selectType) {
              case "select":
                if (props.change) {
                  props.change(idx, props.data[idx]);
                }
                break;
              case "id":
                if (props.changeId) {
                  props.changeId(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (props.data[idx] as any)[
                      props.selectId as string
                    ] as string,
                    props.data[idx]
                  );
                } else {
                  if (props.change) {
                    props.change(idx, props.data[idx]);
                  }
                }
                break;
            }
          }
        });
        return;
      }
      setActive(false);
      setSelected(idx);
      if (props.isClear === false) {
        setClear(false);
      } else {
        setClear(true);
      }
      switch (selectType) {
        case "select":
          if (props.change) {
            props.change(idx, props.data[idx]);
          }
          break;
        case "id":
          if (props.changeId) {
            props.changeId(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (props.data[idx] as any)[props.selectId as string] as string,
              props.data[idx]
            );
          } else {
            if (props.change) {
              props.change(idx, props.data[idx]);
            }
          }
          break;
      }
    },
    [isActive]
  );
  const clearHandler = useCallback(() => {
    setSelected(undefined);
    setClear(false);
    if (props.changeId) {
      props.changeId();
    }
    if (props.change) {
      props.change();
    }
  }, []);
  const searchHandler = useCallback((e: string) => {
    setSearchValue(e);
    searchReg = getSearchRegExp(e);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getText = (item: any) => {
    switch (typeof item) {
      case "object":
        if (props.displayId !== undefined) {
          return item[props.displayId];
        } else {
          return item.text;
        }
      default:
        return item;
    }
  };
  const selectedValue = () => {
    if (selected === undefined) {
      return placeholder;
    } else {
      return getText(props.data[selected]);
    }
  };

  useEffect(() => {
    if (props.select === undefined && selected !== undefined) {
      setSelected(undefined);
      setClear(false);
    } else {
      let idx = undefined;

      switch (selectType) {
        case "select":
          setSelected(props.select as number);
          break;
        case "id":
          idx = props.data?.findIndex(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value => (value as any)[props.selectId as string] === props.select
          );
          // console.log(idx, props.data, props.select, props.selectId);
          if (idx > -1) {
            setSelected(idx);
          } else {
            setSelected(undefined);
          }
          break;
        default:
          props.data.findIndex(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value => (value as any)[props.selectId as string] === props.select
          );
          // setSelected(props.select as Array<number>);
          break;
      }
    }
  }, [props.select, props.data]);

  return (
    <SelectWrapper size={size ? size : "md"} ref={selectWrapperRef}>
      <SelectHidden>
        {props.data?.map((item, idx) => (
          <option key={idx} value={getText(item)}>
            {getText(item)}
          </option>
        ))}
      </SelectHidden>
      <Select2>
        <Selection>
          <Select2Selection disable={disable} onClick={toggleHandler}>
            {isClear ? clear ? <ClearIcon onClick={clearHandler} /> : "" : ""}
            <Select2Value active={isActive} selected={selected !== undefined}>
              {selectedValue()}
            </Select2Value>
            <Select2Arrow active={isActive}></Select2Arrow>
          </Select2Selection>
        </Selection>
        {isActive ? (
          <DropDownWapper>
            {search ? (
              <SelectSearch ref={selectSearchRef}>
                <InputText
                  type="text"
                  change={searchHandler}
                  value={searchValue}
                  placeholder="검색어 입력"
                />
              </SelectSearch>
            ) : (
              ""
            )}
            <OptionWrapper>
              {props.data?.map((item, idx) =>
                searchReg.test(getText(item)) ? (
                  <OptionItem
                    key={idx}
                    value={getText(item)}
                    active={selected === idx}
                    onClick={changeSelected.bind(null, idx)}
                  >
                    {getText(item)}
                  </OptionItem>
                ) : (
                  ""
                )
              )}
            </OptionWrapper>
          </DropDownWapper>
        ) : (
          ""
        )}
      </Select2>
    </SelectWrapper>
  );
}
export default React.memo(SelectBox);

export interface IUiSelectBoxProps<T> {
  id: string;
  displayId?: string;
  selectType?: "select" | "id";
  selectId?: string;
  size?: Size;
  placeholder?: string;
  disable?: boolean;
  search?: boolean;
  multiTitle?: string;
  data: Array<T>;
  isClear?: boolean;
  valid?: IValid<string | number | undefined>;
  init?: string | number;
  change?: (value?: string | number) => void; //캠페인 템플릿 변경될때 인식하기 위한 변수
}

export function UiSelectBox<T>(props: IUiSelectBoxProps<T>): JSX.Element {
  const { selectValue, changeValue } = useSelectBox(
    props.id,
    props.valid,
    props.init
  );

  const changeFunc = (select?: number, value?: unknown) => {
    changeValue(select as string | number, value as string);
    if (props.change) {
      props.change(select);
    }
  };

  const changeIdFunc = (select?: string, value?: unknown) => {
    changeValue(select as string | number, value as string);
    if (props.change) {
      props.change(select);
    }
  };

  return (
    <SelectBox
      {...props}
      select={selectValue}
      change={changeFunc}
      changeId={changeIdFunc}
    />
  );
}

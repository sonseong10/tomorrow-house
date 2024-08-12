import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
  TitleSize,
  TextSize,
  FontWeight,
  TextAlign,
  FlexWrap,
  FlexAlighItem,
  FlexJustifyContent,
} from "../styles/styleds";
import type { DirectionType } from "../commons/styles/ComponentsType";
import type {
  Color,
  FontAlignType,
  FontSizeNomalType,
  FontSizeTitleType,
  FontWeightType,
} from "./stylesVo";
import { TableContainer as Table } from "../commons/ui/grid/GridStyled";

/**
 * 컴포넌트 단위(width html tag) 스타일 정의 파일
 */

/**
 * h3외의 태그로 만들어야 할 경우 component as="태그명" 사용
 * 다른 컴포넌트도 태그가 바뀔경우 마찬가지 사용
 */
export const Title = styled.h3<{
  inline?: boolean;
  mgBottom?: number;
  mgTop?: number;
  size?: FontSizeTitleType;
  weight?: FontWeightType;
  align?: FontAlignType;
}>`
  ${TitleSize};
  ${FontWeight};
  ${TextAlign}
  width: ${props => props.inline && "200px"};
  margin-bottom: ${props =>
    props.mgBottom === undefined
      ? 20
      : props.mgBottom === 0
      ? 0
      : props.mgBottom}px;
  margin-top: ${props =>
    props.mgTop === undefined ? 0 : props.mgTop === 0 ? 0 : props.mgTop}px;
  letter-spacing: 0.2px;
`;

export const Text = styled.p<{
  size?: FontSizeNomalType;
  align?: FontAlignType;
  color?: Color;
}>`
  ${TextSize};
  ${TextAlign}
  color: ${props => {
    switch (props.color) {
      case "positive":
        return `var(--positive)`;
      case "error":
        return `var(--negative)`;
      case "success":
        return `var(--success)`;
      case "disabled":
        return `var(--font-disabled)`;
      case "description":
        return `var(--font-grey)`;
      default:
        return `var(--font-primary)`;
    }
  }};
`;

/**
 * input, select 등의 요소가 연속으로 배치될때 사용
 * 바로 아래 자식 요소들을 정렬시킴
 * Row(가로 방향으로 자식 엘리먼트 배치), Col(세로방향으로 배치) <InputGroup.Row></InputGroup.Row>
 */
interface IElementGroup {
  flexAlign?: 'start' | 'center' | 'end' | 'strech';
  flexWrap?: boolean;
  flexcontent?: 'start' | 'center' | 'end' | 'between' | 'around';
}

export const ElementGroup = {
  Row: styled.div<IElementGroup>`
    ${FlexWrap};
    ${FlexAlighItem};
    ${FlexJustifyContent};

    display: flex;
    flex-direction: row;

    & > * {
      margin: 3px 6px 3px 0;
    }

    & > label {
      margin-right: 10px;
    }

    & > *:last-child {
      margin-right: 0;
    }
  `,
  Col: styled.div<IElementGroup>`
    ${FlexWrap};
    ${FlexAlighItem};
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: 6px;
    }

    & > *:first-child {
      margin-top: 0;
    }
  `,
};

/**
 * InputDate 여러개 쓸때 사용
 */
export const DateGroup = styled.div`
  display: flex;
  align-items: center;

  & > span {
    margin: 0 6px;
  }

  & div > p:first-of-type {
    margin-left: 8px;
  }
`;

/**
 * table
 */

export const TableContainer = styled(Table)<{
  direction: DirectionType;
  over?: boolean;
  height?: number;
}>`
  text-align: center;
  div {
    border: 0;
  }

  & table {
    table-layout: fixed;
    min-width: 100%;
    border-top: 1px solid var(--border-dark);
    & thead {
      border-bottom: 0;
      & th {
        background-color: #fff !important;
        height: 40px !important;
      }
    }
    & tr {
      border-top: 1px solid var(--border-primary);
      &:first-child {
        border-top: 1px solid var(--border-primary);
      }

      &:last-child {
        border-bottom: 1px solid var(--border-primary);
      }
    }
    & th,
    & td {
      height: 67px;
      padding: 10px;
      vertical-align: middle;
      white-space: nowrap;

      &.space-normal {
        white-space: normal;
      }
    }
    & th {
      background-color: #fff;
      font-weight: 500;
      font-size: 12px;
      word-break: keep-all;
      text-align: center;
      & em {
        margin-left: 2px;
        color: var(--negative);
      }
    }
    & td {
      color: var(--font-primary);
    }
  }
  ${props => (props.over ? "overflow: auto; border-bottom: 0;" : "")}
  ${props => (props.height ? `max-height: ${props.height}px;` : "")}
  ${props => {
    switch (props.direction) {
      case "row":
        return css`
          & th,
          & td {
            text-align: center;
          }

          & tbody table thead th {
            background-color: #fff;
          }
        `;
      case "col":
        return css`
          & th,
          & td {
            padding: 10px 8px;
            height: 57px;
            font-size: 13px;
          }
          & th {
            border-left: 0;
            text-align: center;
          }
          & tr > th:first-child,
          & tr > td:first-child {
            border-left: 0;
          }
          & thead th {
            padding: 10px 8px;
          }
          & tbody th {
            border-left: 0;
            font-size: 14px;
            background-color: #fff;
            font-weight: 400;
          }
          & tbody table thead th {
            background-color: var(--bg-table-head);
          }
          & td {
            border-left: 0;
            text-align: center;
          }
        `;
    }
  }}
`;

export const ScrollTable = styled.div<{ height?: number }>`
  ${props => {
    if (props.height) {
      return css`
        display: block;
        max-height: ${props.height}px;
        overflow: auto;
        overscroll-behavior: contain;

        &::-webkit-scrollbar {
          display: none;
        }

        table {
          border-top: 0;
          thead {
            display: none;
          }
        }
      `;
    }
  }}
`;

/**
 *
 */

export const VerticalMiddle = styled.span`
  line-height: 32px;
  vertical-align: middle !important;
`;

export const Input = styled.input<{ inputSize?: string; hidden?: boolean }>`
  ${props => {
    switch (props.type) {
      case "text":
      case "number":
      case "search":
      case "password":
      case "file":
      case "email":
      case "tel":
        return css`
          ${props.hidden
            ? css`
                display: none;
              `
            : ``}
          width: ${props.inputSize ? props.inputSize : "240px"};
          height: 36px;
          padding: 8px 10px;
          border: 1px solid var(--border-primary);
          border-radius: 4px;
          color: var(--font-primary);
          font-weight: 400;
          font-size: ${props => props.theme.fontSize.default};
          -webkit-box-sizing: border-box;
          box-sizing: border-box;

          &:focus {
            border-color: var(--border-focus);
          }

          &:-moz-read-only {
            border-color: var(--primary);
            background-color: var(--bg-form);
            color: var(--font-primary);
          }
          &:read-only,
          &:disabled,
          &.is-disabled {
            border-color: var(--border-hover);
            background-color: var(--bg-table-head);
            color: var(--font-disabled);
            cursor: not-allowed;
          }
        `;
      default:
        return ``;
    }
  }}
`;

export const ListWrapper = styled.section`
  position: relative;
  margin-top: 80px;
`;

export const SelectWrapper = styled.div`
  min-width: 120px;
  text-align: left;
`;

export const ListTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

/**
 * button list group
 */
interface IButtonList extends IElementGroup {
  position?: "top" | "bottom";
  minWidth?: number;
}

const ButtonGroupCommon = styled.div<IButtonList>`
  display: flex;
  ${FlexWrap};
  ${FlexAlighItem};
  ${FlexJustifyContent};
  margin-left: -3px;
  margin-right: -3px;

  ${props => {
    switch (props.position) {
      case "top":
        return css`
          margin-bottom: 27px;
        `;
      case "bottom":
        return css`
          margin-top: 27px;
        `;
    }
  }}

  button {
    min-width: ${props => (props.minWidth && props.minWidth) || 100}px;
  }
`;

export const RowButtonGroup = styled(ButtonGroupCommon)`
  flex-direction: row;

  button {
    margin: 0 3px;
  }
`;
export const ColButtonGroup = styled(ButtonGroupCommon)`
  flex-direction: column;

  button {
    margin-top: 6px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const ButtonGroup = {
  Row: styled.div<IButtonList>`
    ${ButtonGroupCommon}
    flex-direction: row;

    button {
      margin: 0 3px;
    }
  `,
  Col: styled.div<IButtonList>`
    ${ButtonGroupCommon}
    flex-direction: column;

    button {
      margin-top: 6px;

      &:first-child {
        margin-top: 0;
      }
    }
  `,
};

export const CellLink = styled(Link)`
  display: inline-block;
  width: 160px;
  color: #064cff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

export const SearchInput = styled.div`
  position: relative;
  input {
    padding-right: 48px;
  }
  button {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

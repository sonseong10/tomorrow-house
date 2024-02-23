import styled, { useTheme, css } from "styled-components";
import type { TabType } from "../../../commons/styles/ComponentsType";
import type { Theme } from "../../../styles/theme";

const WrapperStyle = (props: { kinds?: TabType }) => {
  switch (props.kinds) {
    case "Text":
      return css`
        min-height: 30px;
        margin-bottom: 30px;
      `;
    case "Button":
      return css`
        min-height: 29px;
        border-bottom: 1px solid var(--border-focus);
        z-index: 17;
      `;
  }
};

const ListStyle = (props: { kinds?: TabType }) => {
  switch (props.kinds) {
    case "Text":
      return css`
        margin-left: 35px;
      `;
    case "Button":
      return css`
        margin-left: 7px;
      `;
  }
};

const ItemStyle = (props: { kinds?: TabType }) => {
  const theme = useTheme() as Theme;

  switch (props.kinds) {
    case "Text":
      return css`
        border: none;
        background: none;
        font-size: ${theme.fontSize.text.lg};
        line-height: 30px;
        color: var(--font-disabled);
        transition: font 0.3s;

        &.is-active {
          font-weight: 800;
          color: var(--font-primary);

          span {
            width: 100%;
          }
        }

        &:not(:disabled):hover {
          color: var(--font-primary);
        }

        span {
          display: block;
          position: absolute;
          bottom: 3px;
          width: 0;
          height: 7px;
          background-color: var(--primary);
          z-index: -1;
          transition: height 0.3s;
        }
      `;
    case "Button":
      return css`
        padding: 6px 20px;
        border: 1px solid var(--border-primary);
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        font-size: ${theme.fontSize.text.sm};
        color: var(--font-disabled);

        &.is-active {
          border-color: var(--border-focus);
          background-color: var(--bg-table-head);
          color: var(--font-primary);
          font-weight: 700;

          &::before {
            display: block;
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            width: 100%;
            height: 4px;
            background: var(--background-body);
          }
        }

        &:hover {
          color: var(--font-primary);
        }
      `;
  }
};

const TabWrapper = styled.ul<{ kinds?: TabType }>`
  display: flex;
  position: relative;

  ${WrapperStyle}
`;

const List = styled.li<{ kinds?: TabType }>`
  ${ListStyle}

  &:first-child {
    margin-left: 0;
  }
`;

const Item = styled.button<{ kinds?: TabType }>`
  display: block;
  position: relative;

  ${ItemStyle}
`;

function TabList(props: {
  itemText: string;
  id?: string;
  kinds?: TabType;
  active?: string;
  subText?: string;
  onClick?: (id: string) => void;
  disabled?: boolean;
}): JSX.Element {
  const setActive = () => {
    if (props.onClick && props.id) {
      props.onClick(props.id);
    }
  };
  return (
    <List kinds={props.kinds}>
      <Item
        kinds={props.kinds}
        className={props.id === props.active ? "is-active" : ""}
        onClick={setActive}
        disabled={props.disabled}
      >
        {props.itemText}
        <span>{props.subText && props.subText}</span>
      </Item>
    </List>
  );
}

interface ITabListProps {
  id: string;
  text: string;
  disabled?: boolean;
}

interface ITabProps {
  kinds?: TabType;
  list: Array<ITabListProps>;
  subText?: string; // TabType이 BUTTON일때만 사용
  active?: string;
  click?: (id: string) => void;
}

function TabMenu(props: ITabProps): JSX.Element {
  return (
    <>
      <TabWrapper kinds={props.kinds ? props.kinds : "Text"}>
        {props.list?.map((item: ITabListProps) => (
          <TabList
            key={item.id}
            kinds={props.kinds ? props.kinds : "Text"}
            id={item.id}
            itemText={item.text}
            active={props.active}
            subText={
              props.kinds === "Button" && props.subText ? props.subText : ""
            }
            onClick={props.click?.bind(null, item.id)}
            disabled={item.disabled}
          />
        ))}
      </TabWrapper>
    </>
  );
}

export default TabMenu;

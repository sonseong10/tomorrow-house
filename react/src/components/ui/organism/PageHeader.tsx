import { type ReactNode } from "react";
import styled from "styled-components";
import { ElementGroup } from "../../../styles/components";

const PageHeaderStyle = styled(ElementGroup.Row)`
  height: 60px;
  padding: 0 30px;
  background-color: var(--border-disabled);

  > div {
    display: flex;
    align-items: center;
    margin: 0;
    justify-content: space-between;
    :not(:last-child) {
      ::after {
        display: block;
        width: 1px;
        height: 38px;
        margin: 0 30px;
        background-color: var(--border-primary);
        content: "";
      }
    }
  }
`;

const ChlidElement = styled.div<{ size?: string }>`
  min-width: ${props => (props.size ? props.size : "auto")};
`;

interface IPageHeaderProps {
  option: { element: ReactNode; visible?: boolean; size?: string }[];
}

function PageHeader({ option }: IPageHeaderProps) {
  return (
    <PageHeaderStyle>
      {option.map((i, index) => (
        <ChlidElement key={index} size={i.size}>
          {i.element}
        </ChlidElement>
      ))}
    </PageHeaderStyle>
  );
}

export default PageHeader;

import { useDevice } from "../../store/modules/init/initHook";
import styled, { css } from "styled-components";
import Layout from "./Layout";

const Wrap = styled.div<{device: boolean}>`
  width: 100%;
  background-color: var(--backgroundBody);

  ${(props) => {
    switch (props.device) {
      case true:
        return css`
          position: relative;
          min-height: 100vh;

          &.is-hidden {
            overflow: hidden;
            min-height: auto;
            height: 100vh;
          }
        `;
      case false:
        return css`
          /* overflow-x: hidden;
          overflow-y: scroll; */
          height: 100%;

          &.is-hidden {
            overflow-y: hidden !important;

            .container {
              overflow-y: hidden;
            }
          }
        `;
    }
  }};
`;

function Wrapper(): JSX.Element {
  const {isDeviceType} = useDevice();

  return (
    <Wrap device={isDeviceType}>
      <Layout />
    </Wrap>
  );
}

export default Wrapper;

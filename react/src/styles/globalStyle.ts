import { createGlobalStyle } from "styled-components";
import { CommonGlobal } from "../commons/styles/commonGlobalStyle";
import type { Theme } from "./theme";

export const GlobalStyle = createGlobalStyle<{ theme?: Theme }>`
${CommonGlobal};
:root {
  --primary: ${props => props.theme.colors.primary};
  --btn-primary: ${props => props.theme.colors.btnPrimary};
  --btn-primary-hover: ${props => props.theme.colors.btnPrimaryHover};
}

html {
  height: 100%;
}
body {
  height: 100%;
}

.wrapper {
  height: 100%;
}
`;

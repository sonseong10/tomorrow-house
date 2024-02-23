import { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import Popup from "./commons/popup/PopupController";
import LoadingView from "./commons/loading/LoadingView";
import LayerController from "./commons/layers/LayerController";
import Spinner from "./commons/loading/display/Spinner";

function App() {
    const [theme] = useState<DefaultTheme>(lightTheme);

  return <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Popup />
      <LoadingView />
      <LayerController />
      <Suspense fallback={<Spinner text="로딩중입니다." />}>

      </Suspense>
    </ThemeProvider>
  </BrowserRouter>;
}

export default App;

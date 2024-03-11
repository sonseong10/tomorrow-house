import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import Popup from "./commons/popup/PopupController";
import LoadingView from "./commons/loading/LoadingView";
import LayerController from "./commons/layers/LayerController";
import Spinner from "./commons/loading/display/Spinner";
import MainPage from "./pages/main/mainPage";
import { SMBridgeCallBack } from "./utils/SMBridge";
import { checkFakePcAgent } from "./store/modules/init/initVo";
import { useDevice } from "./store/modules/init/initHook";

function App() {
    const { isDeviceType } = useDevice();

    const [theme] = useState<DefaultTheme>(lightTheme);
    if (window.SMBridgeCallBack === undefined) {
      window.SMBridgeCallBack = SMBridgeCallBack;
    }

     // 세션이 모바일일때
  if (!isDeviceType) {
    // 현재 기기가 pc이면
    if (!checkFakePcAgent()) {
      document.body.classList.add("device-pc");
    }
  }
  // 세션이 pc일때
  else {
    // 현재 기기가 pc이면
    if (!checkFakePcAgent()) {
      document.body.classList.remove("device-pc");
    }
  }

  return <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Popup />
      <LoadingView />
      <LayerController />
      <Suspense fallback={<Spinner text="로딩중입니다." />}>
        <Routes>
          <Route path="/">
            <MainPage />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  </BrowserRouter>;
}

export default App;

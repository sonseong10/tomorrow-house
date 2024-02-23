import type { ICommonsStore } from "commons";
import AbsPopup from "commons/popup/display/AbsPopup";
import { usePopupData } from "commons/popup/store/absPopupHook";
import { rdxChangePopupData } from "commons/popup/store/popupR";
import { useSelectorEq } from "commons/store/common";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ElementGroup, Title } from "styles/components";
import { PopupType } from "../PopupType";
import Button from "components/ui/atom/Button";

const StyleBox = styled.div`
  background-color: var(--btn-disabled);
  padding: 8px 14px;
`;

const ButtonGroupWrapper = styled(ElementGroup.Row)`
  width: 100%;
  justify-content: center;
  padding: 6px;
  border-top: 1px solid var(--border-primary);

  button {
    flex: 1;
    margin: 0;
    font-weight: 400;
  }
`;

const generateInsTag = (data?: {
  type: "getshop" | "viewus" | "car" | "ad";
  code: string | number;
}) => {
  if (data === undefined) {
    return;
  }

  switch (data?.type) {
    case "viewus":
      return `<ins ad="integrated" adtype="${data?.type}" code="${data?.code}"></ins>`;
    case "getshop":
      return `<ins ad="integrated" adtype="${data?.type}" code="${data?.code}"></ins>`;
    case "car":
      return `<ins ad="integrated" adtype="${data?.type}" code="${data?.code}"></ins>`;
    default:
      return `<ins ad="integrated" adtype="dev" code="${data?.code}"></ins>`;
  }
};

const generateScriptTag = () => {
  switch (process.env.REACT_APP_UI_ENV) {
    case "development":
      return `<script src="https://in-ad-scdev.fastview.co.kr/integrated-ad.js"></script>`;
    case "test":
      return `<script src="https://in-ad-scdev.fastview.co.kr/integrated-ad.js"></script>`;
    default:
      return `<script src="https://in-ad-scdev.fastview.co.kr/integrated-ad.js"></script>`;
  }
};

const usePopupState = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(
      rdxChangePopupData({
        type: PopupType.SCRIPT,
        key: "isShow",
        value: true,
      })
    );
  };
};

const usePopupInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      rdxChangePopupData({
        type: PopupType.SCRIPT,
        key: "isShow",
        value: false,
      })
    );
  }, []);
};

export function ScriptPopupButton(): JSX.Element {
  const { popupDo } = usePopupData<{
    type: "getshop" | "viewus" | "car" | "ad";
    code: string | number;
  }>(PopupType.SCRIPT);
  const change = usePopupState();

  return (
    <ButtonGroupWrapper>
      <Button
        text="스크립트 복사"
        btnType="ghost"
        color="dark"
        btnSize="md"
        iconName="Code"
        iconPosition="before"
        onClick={() => {
          change();
          const temp = document.createElement("textarea");
          temp.value =
            generateInsTag(popupDo.data) + `\n` + generateScriptTag();
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
        }}
      />
    </ButtonGroupWrapper>
  );
}

const ScriptPopup = (): JSX.Element => {
  const { popupDo } = usePopupData<{
    type: "getshop" | "viewus" | "car" | "ad";
    code: string | number;
  }>(PopupType.SCRIPT);
  const { result } = useSelectorEq((state: ICommonsStore) => ({
    result: state.popups.returnData[PopupType.SCRIPT],
  }));
  usePopupInit();

  return (
    <AbsPopup type={PopupType.SCRIPT}>
      <StyleBox>
        <span>{generateInsTag(popupDo.data)}</span>
        <br />
        <span>{generateScriptTag()}</span>
      </StyleBox>

      {result && result?.isShow && (
        <Title align="center" mgBottom={0} mgTop={18} weight="regular">
          스크립트가 성공적으로 복사되었습니다.
        </Title>
      )}
    </AbsPopup>
  );
};

export default ScriptPopup;

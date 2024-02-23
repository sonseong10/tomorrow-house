import AbsPopup from "commons/popup/display/AbsPopup";
import { usePopupData } from "commons/popup/store/absPopupHook";
import React from "react";
import styled from "styled-components";
import { PopupType } from "../PopupType";

const ImageWrap = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const ImageBox = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePopup = (): JSX.Element => {
  const { popupDo } = usePopupData<string>(PopupType.IMAGE);
  return (
    <AbsPopup type={PopupType.IMAGE}>
      <ImageWrap>
        <ImageBox src={popupDo.data} alt="이미지" />
      </ImageWrap>
    </AbsPopup>
  );
};

export default ImagePopup;

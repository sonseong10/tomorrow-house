import AbsPopup from "commons/popup/display/AbsPopup";
import { usePopupData } from "commons/popup/store/absPopupHook";
import Grid from "commons/ui/grid/Grid";
import React from "react";
import { Text } from "styles/components";
import type { Color } from "styles/stylesVo";
import { PopupType } from "../PopupType";

const GridPopup = (): JSX.Element => {
  const { popupDo } = usePopupData<{
    setting: [];
    data: unknown[];
    footerMsg?: { text: string; color?: Color };
  }>(PopupType.GRID);

  return (
    <AbsPopup type={PopupType.GRID}>
      {popupDo?.data &&
        popupDo.data?.data.length > 0 &&
        Grid({
          setting: popupDo.data.setting,
          data: popupDo.data.data,
          headerInfo: { fixed: 300 },
        })}
      {popupDo.data?.footerMsg && (
        <Text color={popupDo.data?.footerMsg.color}>
          {popupDo.data?.footerMsg.text}
        </Text>
      )}
    </AbsPopup>
  );
};

export default GridPopup;

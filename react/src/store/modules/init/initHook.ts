import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { IState } from "..";
import { useSelectorEq } from "../../../commons/store/common";
import { DeviceType } from "./initVo";
import {
  getSession,
  setSession,
} from "../../../commons/storage/storageHook";
import { SessionName } from "../../../store/storageVo";
import { rdxPopupReset } from "../../../commons/popup/store/popupR";

export function useSetDevice() {
  const setDevice = (type: DeviceType) => {
    setSession(SessionName.DEVICE, type);
  };
  return { setDevice };
}

/**
 * `isDeviceType`
 * @return false => mobile
 * @return true => pc
 */
export function useDevice() {
  const { deviceType } = useSelectorEq((state: IState) => ({
    deviceType: state.init?.deviceType,
  }));
  const getDeviceType = () => {
    if (deviceType === undefined) {
      return getSession(SessionName.DEVICE);
    } else {
      return deviceType;
    }
  };

  return {
    getDeviceType,
    get isDeviceType() {
      switch (getDeviceType()) {
        case DeviceType.MOBILE:
          return false;
        default:
          return true;
      }
    },
  };
}



function useInit() {
  const [isInit, setInit] = useState(false);
  const init = async () => {
    return {code: 200}
  };
  const dispatch = useDispatch();
  const rePage = (e: PageTransitionEvent) => {
    if (e.persisted) {
      dispatch(rdxPopupReset());
    }
  };
  useEffect(() => {
    window.addEventListener("pageshow", rePage);
    return () => {
      window.removeEventListener("pageshow", rePage);
    };
  }, []);
  return { init, isInit };
}

export default useInit;

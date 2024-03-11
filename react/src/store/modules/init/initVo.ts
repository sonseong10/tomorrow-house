import { getSession, setSession } from "../../../commons/storage/storageHook";
import { SessionName } from "../../../store/storageVo";

/**
 * 인앱 통신을 위한 타입
 */
export enum MobileType {
  NONE = "none",
  ANDROID = "android",
  IOS = "ios",
  BROWSER = "browser",
}

export enum DeviceType {
  PC = "PC",
  MOBILE = "MOBILE",
}

export interface ITodayItem {
  imgSrc: string;
  prodId: string;
  setDate: string;
  name: string;
}

export function checkUserAgent() {
  if (
    getSession(SessionName.DEVICE) === null ||
    getSession(SessionName.DEVICE) === undefined
  ) {
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    const isMobile = /mobi/i.test(window.navigator.userAgent);

    if (isMobile || userAgent.indexOf("smbridge") !== -1) {
      setSession(SessionName.DEVICE, "MOBILE");
      if (userAgent.indexOf("smbridge") !== -1) {
        if (userAgent.indexOf("android") !== -1) {
          setSession(SessionName.MOBILE_TYPE, MobileType.ANDROID);
        } else if (
          userAgent.indexOf("iphone") !== -1 ||
          userAgent.indexOf("ipad") !== -1
        ) {
          setSession(SessionName.MOBILE_TYPE, MobileType.IOS);
        } else {
          setSession(SessionName.MOBILE_TYPE, MobileType.BROWSER);
        }
      } else {
        setSession(SessionName.MOBILE_TYPE, MobileType.BROWSER);
      }
    } else {
      setSession(SessionName.DEVICE, "PC");
      setSession(SessionName.MOBILE_TYPE, MobileType.BROWSER);
    }
  }
}

export function checkFakePcAgent() {
  const isInApp = window.navigator.userAgent
    .toLocaleLowerCase()
    .indexOf("smbridge");
  const isMobile = /mobi/i.test(window.navigator.userAgent);

  return isInApp > -1 ? true : isMobile;
}

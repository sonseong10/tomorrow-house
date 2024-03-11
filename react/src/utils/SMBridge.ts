import { getSession } from "../commons/storage/storageHook";
import { MobileType } from "../store/modules/init/initVo";
import { SessionName } from "../store/storageVo";

const userAgent = window.navigator.userAgent.toLocaleLowerCase();
if (userAgent.indexOf("smbridge") !== -1) {
  if (userAgent.indexOf("android") !== -1) {
    window.SMBCall = (message: string) => {
      const ob = JSON.parse(message);
      // SMBridgeCall(Command.ALERT);
      SMBridgeCallBack(ob.id, ob.command);
    };
  }
}

export enum Command {
  IS_NETWORK = "isNetwork",
  SHARE = "share",
  LOG = "log",
}

export interface Bridge {
  id: string;
  command: Command;
  test?: string;
  value?: SMBrigdeReturn;
}
interface BridgeItem<T> {
  bridge: Bridge;
  params?: T;
  callback?: (item: Bridge, params?: T) => Promise<void> | void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SMBrigdeList: { [key: string]: BridgeItem<any> } = {};
type SMBrigdeReturn = boolean | string | undefined;
/**
 * 인앱 방식 통신을 위한 함수
 * @param command 실행 함수이름
 * @param params 전달될 값
 */
const SMBridgeCall = async <T = undefined>(
  command: Command,
  callback?: (item: Bridge, params?: T) => Promise<void> | void,
  params?: T
): Promise<void> => {
  const item: BridgeItem<T> = {
    bridge: {
      id: "ID" + Date.now(),
      command: command,
    },
    params: params,
    callback: callback,
  };
  SMBrigdeList[item.bridge.id] = item;
  item.bridge.test = typeof window.SMBridgeCallBack;
  const bridgeStr = JSON.stringify({ ...item.bridge, ...params });
  switch (getSession(SessionName.MOBILE_TYPE) as MobileType) {
    case MobileType.ANDROID:
      if (window.SMBridge !== undefined) {
        const payload = await window.SMBridge.callEvent(bridgeStr);
        SMBridgeCallBack(item.bridge.id, payload);
      }
      break;
    case MobileType.IOS:
      if (
        window.webkit !== undefined &&
        window.webkit.messageHandlers !== undefined &&
        window.webkit.messageHandlers.SMBridge !== undefined
      ) {
        window.webkit.messageHandlers.SMBridge.postMessage(bridgeStr);
      }
      break;
    case MobileType.BROWSER:
    case MobileType.NONE:
    default:
      SMBridgeCallBack(item.bridge.id, true);
      break;
  }
};
// TODO: IOS 작업을 위해 남겨둠
export const SMBridgeCallBack = async <T>(
  id: string,
  value: SMBrigdeReturn
): Promise<void> => {
  const bridgeitem: BridgeItem<T> = SMBrigdeList[id];
  bridgeitem.bridge.value = value;
  if (bridgeitem.callback) {
    await bridgeitem.callback(bridgeitem.bridge, bridgeitem.params);
  }
  delete SMBrigdeList[id];
};

export default SMBridgeCall;

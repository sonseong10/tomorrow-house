/// <reference types="vite/client" />
interface  Window {
  SMBridgeCallBack: (id: string, value: any) => Promise<void>;
  SMBCall: (message: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SMBridge: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkit: any;
}
/// <reference types="vite/client" />
interface Window {
    __TAURI__?: {
      tauri: {
        invoke: (command: string, args?: any) => Promise<any>;
      };
    };
  }

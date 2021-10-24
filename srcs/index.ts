/*
 *  ___   _   _ |  _|_ __  _     
 *  |__) [_] |_ |<  |_ |  [_] |\|
 * 
 * File: \srcs\index.ts
 * Project: @docktron/sdk
 * Created Date: Friday, 22nd October 2021 12:01:40 am
 * Author: leone
 * -----
 * Last Modified: Fri Oct 22 2021
 * Modified By: leone
 * -----
 * Copyright (c) 2021 docktron
 * -----
 */

import { IWebApp } from "@docktron/headers";

declare global {
  interface Window {
    docktronSDK:docktronSDK;
  }
}

interface docktronSDK {
  isInsideDocktron: () => boolean;
  system: {
    pkg: {
      install: (pkg:IWebApp) => Promise<{sucess:boolean, error:Error}>,
      version: (pkg:IWebApp) => Promise<IWebApp|null>,
    }
  }
}

const defaultSdk: docktronSDK = {
  isInsideDocktron: () => false,
  system: {
    pkg: {
      install: (pkg:IWebApp) => {
        pkg;
        return new Promise((resolve) => resolve({sucess: false, error: new Error('not in docktron env')}))
      },
      version: (pkg:IWebApp) => {
        pkg;
        return new Promise((resolve) => resolve(null))
      }
    }
  }
}

const docktronSDK = typeof window !== 'undefined' && window.docktronSDK ?
  window.docktronSDK : defaultSdk;

export default docktronSDK;

import { useState } from 'react';
import { XQSDK, Authorize, CodeValidator, ServerResponse, Encrypt, Decrypt, EncryptionAlgorithm } from "@xqmsg/jssdk-core";


if (!process.env.REACT_APP_XQ_API) {
  throw new Error("XQ API key is not set! Declare REACT_APP_XQ_API")
}

if (!process.env.REACT_APP_XQ_DASH) {
  throw new Error("XQ Dashboard key is not set! Declare REACT_APP_XQ_DASH")
}

const sdk = new XQSDK({
  XQ_API_KEY: process.env.REACT_APP_XQ_API,
  DASHBOARD_API_KEY: process.env.REACT_APP_XQ_DASH,
});

const algorithm = sdk.getAlgorithm("OTPv2"); // Either "AES" or "OTPv2"


type UseAuthorizeResult = {
  preAuth: string | null, 
  error: ServerResponse | null,
  auth: string | null,
  getMagicCode: (email: string) => Promise<ServerResponse>,
  submitMagicCode: (code: string) => Promise<ServerResponse>,
}


export const useAuthorize = (): UseAuthorizeResult => {
  const [preAuth, setPreAuth] = useState<string | null>(null);
  const [auth, setAuth] = useState<string | null>(null);
  const [error, setError] = useState<ServerResponse | null>(null);

  const getMagicCode = async (email: string) => {
    const response = await new Authorize(sdk)
      .supplyAsync({ [Authorize.USER]: email })
    switch (response.status) {
      case ServerResponse.OK: {
        // Success. A pre-authorization token should automatically be cached.
        const token = response.payload;
        setPreAuth(token);
        setError(null);
        setAuth(null)
        break;
      }
      case ServerResponse.ERROR: {
        // Something went wrong...
        setError(response)
        setPreAuth(null)
        setAuth(null)
        break;
      }
    }

    return response;
  };

  const submitMagicCode = async (code: string) => {
    const response = await new CodeValidator(sdk)
      .supplyAsync({ [CodeValidator.PIN]: code })

    switch (response.status) {
      case ServerResponse.OK: {
        // The user is now fully authorized. The new access token
        // is added to the active user profile.
        setPreAuth(null);
        setError(null);
        setAuth(response.payload);
        break;
      }
      case ServerResponse.ERROR: {
        // Something went wrong...
        // Keep preAuth unchanged
        setError(response);
        setAuth(null);
        break;
      }
    }

    return response;
  };

  return {
    preAuth, error, auth,
    getMagicCode, submitMagicCode,
  };
};


type UseEncryptMessageResult = {
  encryptedText: string | null, 
  locatorKey: string | null, 
  error: ServerResponse | null,
  encryptMessage: (message: string, recipients: Array<string>, expiresHours: number) => Promise<ServerResponse>,
}


export const useEncryptMessage = (): UseEncryptMessageResult => {
  const [error, setError] = useState<ServerResponse | null>(null);
  const [encryptedText, setEncryptedText] = useState<string | null>(null);
  const [locatorKey, setLocatorKey] = useState<string | null>(null);

  const encryptMessage = async (message: string, recipients: Array<string>, expiresHours: number) => {
    const payload = {
      [Encrypt.TEXT]: message,
      [Encrypt.RECIPIENTS]: recipients,
      [Encrypt.EXPIRES_HOURS]: expiresHours,
    };

    const response = await new Encrypt(sdk, algorithm).supplyAsync(payload)

    // response is nullable? Assume timeout I guess.
    if (!response) {
      const noResponse: ServerResponse = {
        status: 'Request Timeout',
        statusCode: 408,
        payload: null,
      };
      setError(noResponse);
      setEncryptedText(null);
      setLocatorKey(null);
      return noResponse;
    }

    switch (response.status) {
      case ServerResponse.OK: {
        const data = response.payload;
        const locatorKey = data[Encrypt.LOCATOR_KEY];
        const encryptedText = data[Encrypt.ENCRYPTED_TEXT];
        // Do something with the data
        setError(null);
        setEncryptedText(encryptedText);
        setLocatorKey(locatorKey);
        break;
      }
      case ServerResponse.ERROR: {
        // Something went wrong...
        setError(response);
        setEncryptedText(null);
        setLocatorKey(null);
        break;
      }
    }

    return response;
  }


  return {
    encryptedText, locatorKey, error,
    encryptMessage,
  };
}


type UseDecryptMessageResult = {
  decryptedText: string | null, 
  error: ServerResponse | null,
  decryptMessage: (message: string, locatorKey: string) => Promise<ServerResponse>,
}


export const useDecryptMessage = (): UseDecryptMessageResult => {
  const [error, setError] = useState<ServerResponse | null>(null);
  const [decryptedText, setDecryptedText] = useState<string | null>(null);

  const decryptMessage = async (message: string, locatorKey: string) => {
    const payload = {
      [Decrypt.LOCATOR_KEY]: locatorKey,
      [Decrypt.ENCRYPTED_TEXT]: message,
    };
    
    const response = await new Decrypt(sdk, algorithm).supplyAsync(payload)

    // response is nullable? Assume timeout I guess.
    if (!response) {
      const noResponse: ServerResponse = {
        status: 'Request Timeout',
        statusCode: 408,
        payload: null,
      };
      setError(noResponse);
      setDecryptedText(null);
      return noResponse;
    }

    switch (response.status) {
      case ServerResponse.OK: {
        const data = response.payload;
        const decryptedText = data[EncryptionAlgorithm.DECRYPTED_TEXT];
        // Do something with the data
        setDecryptedText(decryptedText)
        setError(null);
        break;
      }
      case ServerResponse.ERROR: {
        // Something went wrong...
        setDecryptedText(null)
        setError(response);
        break;
      }
    };

    return response;
  };

  return {
    decryptMessage, decryptedText, error,
  }
}

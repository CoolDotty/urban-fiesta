import React, { useState } from "react";
import { useAuthorize, useEncryptMessage, useDecryptMessage } from "./util/XQ";

import Button from "./components/Button";
import TextInput from "./components/TextInput";
import TextArea from "./components/TextArea";

const App: React.FC = () => {
  const {
    preAuth, error: authorizeError, auth,
    getMagicCode, submitMagicCode,
  } = useAuthorize();

  const {
    encryptedText, locatorKey: locatorKeyResult, error: encryptError,
    encryptMessage,
  } = useEncryptMessage();

  const {
    decryptMessage, decryptedText, error: decryptError,
  } = useDecryptMessage();


  const [email, setEmail] = useState<string>('');
  const emailLockedIn: boolean = Boolean(preAuth || auth);
  const cantSubmitEmail: boolean = Boolean(!email || emailLockedIn);
  const [magicCode, setMagicCode] = useState<string>('');
  const cantSubmitMagicCode: boolean = Boolean(!magicCode);
  // API supports multiple receipients but we'll use one to make it easier
  const [recipient, setRecipient] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [locatorKey, setLocatorKey] = useState<string>('');
  const [encoded, setEncoded] = useState<string>('');

  const isLoggedIn: boolean = Boolean(auth && !authorizeError);


  const visibleStates = Object.entries({ 
    preAuth, auth,
    encryptedText, 
    locatorKey: locatorKeyResult,
    decryptedText,
    authorizeError: authorizeError?.payload,
    encryptError: encryptError?.payload,
    decryptError: decryptError?.payload,
  })


  return (
    <div className="app">
      <div data-testid="greetings-container">
        Greetings! Welcome to the XQ take-home assessment
      </div>

      {visibleStates.map(([key, value]) => (
        <div style={{ whiteSpace: 'nowrap' }} key={key}>
          {key}:&nbsp;{value ?? <span style={{ color: 'gray' }}>null</span>}
        </div>
      ))}

      <fieldset>
        <legend>Login</legend>
        <div>
          <TextInput
            placeholder="guy@email.com"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
          />
          <Button
            disabled={cantSubmitEmail}
            onClick={() => { 
              getMagicCode(email)
            }}
          >
            Get Magic Code
          </Button>
        </div>
      
        <TextInput 
          placeholder="123456"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMagicCode(e.target.value)}} 
        />
        <Button
          disabled={cantSubmitMagicCode}
          onClick={() => { 
            submitMagicCode(magicCode)
          }}
        >
          Submit Magic Code
        </Button>
      </fieldset>

      {!isLoggedIn ? null : (
        <>
          <fieldset>
            <legend>Encrypt</legend>
            <div>
              <TextInput
                placeholder="jim@email.com"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRecipient(e.target.value);
                }}
              />
              <TextArea
                placeholder="Hello!"
                style={{ display: 'block' }}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setMessage(e.target.value)}} 
              />
              <Button
                onClick={() => { 
                  encryptMessage(message, [recipient], 24);
                }}
              >
                Encrypt Message
              </Button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Decrypt</legend>
            <TextInput
              placeholder="Locator Key"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLocatorKey(e.target.value);
              }}
            />
            <TextArea
              placeholder="asdfdafg="
              style={{ display: 'block' }}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {setEncoded(e.target.value)}} 
            />
            <Button
              onClick={() => { 
                decryptMessage(encoded, locatorKey);
              }}
            >
              Decrypt Message
            </Button>
          </fieldset>
        </>
      )}
    </div>
  );
};

export default App;

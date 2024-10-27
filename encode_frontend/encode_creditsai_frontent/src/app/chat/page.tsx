'use client';
import styles from './chat.module.css';

import {Button, Typography, TextField, CircularProgress} from '@mui/material';

import {useState} from 'react';
import {useAccount, useSignMessage} from 'wagmi';
import {postChat} from '@/shared/api';
import classNames from 'classnames';

export default function Home() {
  const [response, setResponse] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const account = useAccount();

  const signer = useSignMessage();

  const signRequest = async (request: object) => {
    const msgToSign = JSON.stringify(request);

    const signature = await signer.signMessageAsync({
      message: msgToSign,
    });

    console.debug(`Signed message: ${msgToSign} \n with signature:`, signature);
    return signature;

    // if (window.ethereum) {
    //   await window.ethereum.request({method: 'eth_requestAccounts'});
    //   var provider = new ethers.providers.Web3Provider(window.ethereum);

    //   var signer = provider.getSigner();
    //   var msg_to_sign = JSON.stringify(request);
    //   var address = await signer.getAddress();
    //   try {
    //     var signed = await signer.signMessage(msg_to_sign);
    //     return [address, signed];
    //   } catch (e) {
    //     setIsProcessing(false);
    //     alert('Error signing, please try again.');
    //   }
    // } else {
    //   setIsProcessing(false);
    //   alert('Please install metamask.');
    // }
  };

  const submitRequest = async () => {
    if (!account.address) {
      return;
    }
    setIsProcessing(true);
    try {
      const request_body = {message: userPrompt};
      const signature = await signRequest(request_body);

      const response = await postChat({
        text: userPrompt,
        address: account.address,
        signed: signature,
      });
      console.debug('Chat Response:', response);
      setResponse(response['data']['response']);
      setUserPrompt('');
    } catch (error) {
      console.error('Error in chat', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={classNames(styles.page, 'my-auto')}>
      <main className={styles.main}>
        <div
          style={{
            minHeight: '80%',
          }}
        >
          {isProcessing ? (
            <CircularProgress />
          ) : (
            <Typography>{response}</Typography>
          )}
        </div>
        <TextField
          multiline
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyUp={(e) => {
            if (e.key == 'Enter' && e.shiftKey) {
              submitRequest();
            }
          }}
          sx={{
            width: '100%',
            align: 'center',
          }}
          disabled={isProcessing}
        />
        <Button onClick={submitRequest}>Submit request</Button>
      </main>
    </div>
  );
}

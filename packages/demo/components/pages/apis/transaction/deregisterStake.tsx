import { useEffect, useState } from 'react';
import Codeblock from '../../../ui/codeblock';
import Card from '../../../ui/card';
import RunDemoButton from '../../../common/runDemoButton';
import RunDemoResult from '../../../common/runDemoResult';
import SectionTwoCol from '../../../common/sectionTwoCol';
import useWallet from '../../../../contexts/wallet';
import ConnectCipWallet from '../../../common/connectCipWallet';
import Input from '../../../ui/input';
import { Transaction } from '@martifylabs/mesh';

export default function DeregisterStake() {
  const { wallet, walletConnected } = useWallet();
  const [rewardAddress, setRewardAddress] = useState<string>(
    'stake_test1uzx0ksy9f4qnj2mzfdncqyjy84sszh64w43853nug5pedjgytgke9'
  );

  useEffect(() => {
    async function init() {
      const rewardAddresses = await wallet.getRewardAddresses();
      setRewardAddress(rewardAddresses[0]);
    }
    if (walletConnected) {
      init();
    }
  }, [walletConnected]);

  return (
    <SectionTwoCol
      sidebarTo="deregisterStake"
      header="Deregister Stake"
      leftFn={Left({ rewardAddress })}
      rightFn={Right({})}
    />
  );
}

function Left({ rewardAddress }) {
  let codeSnippet = `import { Transaction } from '@martifylabs/mesh';\n\n`;

  codeSnippet += `const rewardAddress = '${rewardAddress}';\n\n`;

  codeSnippet += `const tx = new Transaction({ initiator: wallet });\n`;
  codeSnippet += `tx.deregisterStake(rewardAddress);\n\n`;

  codeSnippet += `const unsignedTx = await tx.build();\n`;
  codeSnippet += `const signedTx = await wallet.signTx(unsignedTx);\n`;
  codeSnippet += `const txHash = await wallet.submitTx(signedTx);`;

  return (
    <>
      <p>
        ??
      </p>
      <Codeblock data={codeSnippet} isJson={false} />
    </>
  );
}

function Right({}) {
  const [state, setState] = useState<number>(0);
  const [response, setResponse] = useState<null | any>(null);
  const [responseError, setResponseError] = useState<null | any>(null);
  const { wallet, walletConnected, hasAvailableWallets } = useWallet();

  async function runDemo() {
    setState(1);
    setResponseError(null);

    try {
      const rewardAddresses = await wallet.getRewardAddresses();
      const rewardAddress = rewardAddresses[0];

      const tx = new Transaction({ initiator: wallet });
      tx.deregisterStake(rewardAddress);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      setResponse(txHash);
      setState(2);
    } catch (error) {
      setResponseError(JSON.stringify(error));
      setState(0);
    }
  }

  return (
    <Card>
      {hasAvailableWallets && (
        <>
          {walletConnected ? (
            <>
              <RunDemoButton
                runDemoFn={runDemo}
                loading={state == 1}
                response={response}
              />
              <RunDemoResult response={response} />
            </>
          ) : (
            <ConnectCipWallet />
          )}
        </>
      )}
      <RunDemoResult response={responseError} label="Error" />
    </Card>
  );
}

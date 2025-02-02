import { useState, useEffect } from 'react';
import CommonLayout from '../../components/common/layout';
import Metatags from '../../components/site/metatags';
import Codeblock from '../../components/ui/codeblock';
import {
  BadgeFetcher,
  BadgeSubmitter,
} from '../../components/pages/providers/badges';
import Fetcher from '../../components/pages/providers/fetcher';
import { TangoProvider } from '@martifylabs/mesh';
import Submitter from '../../components/pages/providers/submitter';

export default function ProvidersTangocrypto() {
  const sidebarItems = [
    { label: 'fetchProtocolParameters', to: 'fetchProtocolParameters' },
    { label: 'fetchAddressUtxos', to: 'fetchAddressUtxos' },
    { label: 'fetchAccountInfo', to: 'fetchAccountInfo' },
    { label: 'submitTx', to: 'submitTx' },
  ];

  return (
    <>
      <Metatags
        title="Tangocrypto Provider"
        description="Accessing and processing information stored on the blockchain"
      />
      <CommonLayout sidebarItems={sidebarItems}>
        <Hero />
        <Main />
      </CommonLayout>
    </>
  );
}

function Hero() {
  let code1 = `const tangocryptoProvider = new TangoProvider('<TANGOCRYPTO_API_KEY>');\n`;
  return (
    <header className="mb-4 lg:mb-6">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Tangocrypto
        <span className="ml-2">
          <BadgeFetcher />
          <BadgeSubmitter />
        </span>
      </h2>
      <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
        Accessing and processing information stored on the blockchain
      </p>

      <div className="grid grid-cols-1 px-4 lg:grid-cols-2 lg:gap-16 pb-16">
        <div className="col-span-1 xl:col-auto">
          <p>
            <a href="https://tangocrypto.com/" target="_blank" rel="noreferrer">
              Tangocrypto
            </a>{' '}
            globally-distributed edge network offer realtime messaging
            performance, scalability, and reliability; which allows your app to
            access information stored on the blockchain.
          </p>
          <p>Get started:</p>
          <Codeblock data={code1} isJson={false} />
        </div>
        <div className="col-span-1"></div>
      </div>
    </header>
  );
}

function Main() {
  const [tangocryptoProvider, setTangocryptoProvider] =
    useState<TangoProvider | null>(null);

  useEffect(() => {
    async function load() {
      const _provider = new TangoProvider(
        'testnet',
        process.env.NEXT_PUBLIC_TANGOCRYPTO_API_ID_TESTNET!,
        process.env.NEXT_PUBLIC_TANGOCRYPTO_API_KEY_TESTNET!
      );
      setTangocryptoProvider(_provider);
    }
    load();
  }, []);

  return (
    <>
      <Fetcher
        fetcher={tangocryptoProvider}
        fetcherName="tangocryptoProvider"
      />
      <Submitter
        submitter={tangocryptoProvider}
        submitterName="tangocryptoProvider"
      />
    </>
  );
}

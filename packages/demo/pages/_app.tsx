import '../styles/globals.css';
import '../styles/highlight/stackoverflow-dark.css';
import '../styles/custom.css';
import type { AppProps } from 'next/app';
import { WalletProvider } from '../contexts/wallet';
import Navbar from '../components/site/navbar';
import Footer from '../components/site/footer';
import { AppWalletProvider } from '../contexts/appWallet';
import { MeshProvider } from '@martifylabs/mesh-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ga from '../lib/ga';
import Scroller from '../components/site/scroller';

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Google Analytics
   */
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <MeshProvider>
      <AppWalletProvider>
        <WalletProvider>
          <div className="cursor-default">
            <header>
              <Navbar />
            </header>
            <main className="pt-16 pb-16 lg:pb-24 bg-white dark:bg-gray-900">
              <Component {...pageProps} />
            </main>
            <Footer />
            <Scroller />
          </div>
        </WalletProvider>
      </AppWalletProvider>
    </MeshProvider>
  );
}

export default MyApp;

import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '@rainbow-me/rainbowkit/styles.css';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { LoopringAccountProvider } from '../context/account-context';
import { LoopringUnlockProvider } from '../context/unlock-context';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain === mainnet) {
          return {
            http: 'https://mainneteth.loopring.io',
          };
        }

        return {
          http: '',
        };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Loopring SDK NextJS',
  projectId:
    process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <LoopringAccountProvider>
          <LoopringUnlockProvider>
            <Head>
              <title>Welcome to loopring-sdk-nextjs!</title>
            </Head>
            <main className="app">
              <div className="min-h-full">
                <div className="py-10">
                  <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                        Loopring SDK NextJS Example
                      </h1>
                    </div>
                  </header>
                  <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <Component {...pageProps} />
                    </div>
                  </main>
                </div>
              </div>
            </main>
          </LoopringUnlockProvider>
        </LoopringAccountProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default CustomApp;

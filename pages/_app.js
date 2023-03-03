// eslint-disable-next-line
import "symbol-observable";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useRef } from "react";
import Head from "next/head";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { arbitrum, optimism, polygon, polygonMumbai } from "wagmi/chains";

import { AuthProvider } from "../src/context/AuthContext";
import { BottomTabProvider } from "../src/context/BottomTabContext";
import { SigninProvider } from "../src/context/SigninContext";
import { PubProvider } from "../src/context/PublicationContext";
import { publicProvider } from "wagmi/providers/public";

// store imports
import { Provider } from "react-redux";
import { reduxWrapper } from "../store/store";

function MyApp({ Component, pageProps, ...rest }) {
  const { store } = reduxWrapper.useWrappedStore(rest);
  const { chains, provider } = useRef(
    configureChains(
      [mainnet, polygon, optimism, arbitrum, polygon, polygonMumbai, goerli],
      [
        // alchemyProvider({ apiKey: 'CHu5o-Y1e5EoW_49i3DY_uw4WZnEpp4B' }),
        publicProvider(),
      ]
    )
  ).current;

  const { connectors } = useRef(
    getDefaultWallets({
      appName: "Whisper.Lens",
      chains,
    })
  ).current;

  const wagmiClient = useRef(
    createClient({
      autoConnect: true,
      connectors,
      provider,
    })
  ).current;

  return (
    <>
    <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1"
        />
        <link
          rel="icon"
          sizes="64x64"
          type="image/jpg"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-64x64.jpg`}
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-57x57.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-60x60.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-72x72.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-76x76.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-114x114.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-120x120.png`}
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-32x32.png`}
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-16x16.png`}
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="48x48"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/w-48x48.png`}
        />
      </Head>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            <BottomTabProvider>
              <PubProvider>
                <SigninProvider>
                  <Component {...pageProps} />
                </SigninProvider>
              </PubProvider>
            </BottomTabProvider>
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>

    </>
  );
}

export default MyApp;

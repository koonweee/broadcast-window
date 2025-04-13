import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Head from 'next/head';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Broadcast Window</title>
        <meta name="description" content="Stream viewer for broadcast-box" />
      </Head>
      <div className="bg-gray-800 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}

import "../styles/global.css"
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>React Next</title>
    </Head>
    <Component {...pageProps} />
  </>
};
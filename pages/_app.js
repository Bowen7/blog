import Head from 'next/head'
import Layout from '../components/layout'
import './globals.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="前端,JS,JavaScript,计算机,算法" />
        <meta name="author" content="Bowen,张文翔" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/logo.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-6KLLQLJ9LT"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6KLLQLJ9LT');`
              }}
            />
          </>
        )}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App

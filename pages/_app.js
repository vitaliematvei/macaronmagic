import React from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import Layout from '../components/Layout';
import SEO from '../next-seo.config';
import '@/styles/globals.css';
import '@/styles/index.scss';
import '@/styles/mobile.scss';

import { StateContext } from '../context/StateContext';

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}

export default App;

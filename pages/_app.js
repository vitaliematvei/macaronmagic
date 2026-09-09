import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import '@/styles/globals.css';
import '@/styles/index.scss';
import '@/styles/mobile.scss';

import { StateContext } from '../context/StateContext';

function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
export default App;

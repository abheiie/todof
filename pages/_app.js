import '../styles/globals.css'
import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider as ReduxProvider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from "../redux/store";
import axios from 'axios';
import { Config } from '../utils';
axios.defaults.baseURL = Config.API_URL;

import App from '../components/App';
import { RouteGuard } from '../components/RouteGuard';


function NextApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);
  // const queryClientRef = useRef(null);
  // if (!queryClientRef.current) {
  //   queryClientRef.current = new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         refetchOnWindowFocus: false,
  //       },
  //     },
  //   });
  // }


  useEffect(() => {
    const nProgressStart = () => NProgress.start();
    const nProgressDone = () => NProgress.done();

    // N Progress.
    Router.events.on('routeChangeStart', nProgressStart);
    Router.events.on('routeChangeComplete', nProgressDone);
    Router.events.on('routeChangeError', nProgressDone);

    return () => {
      // N Progress.
      Router.events.on('routeChangeStart', nProgressStart);
      Router.events.on('routeChangeComplete', nProgressDone);
      Router.events.on('routeChangeError', nProgressDone);
    };
  }, []);


  return (
    <>
      {/* <QueryClientProvider client={queryClientRef.current}> */}
        {/* <Hydrate state={pageProps.dehydratedState}> */}
          <ReduxProvider store={store}>
              <App>
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
              </App>
            {/* </ThemeProvider> */}
          </ReduxProvider>
        {/* </Hydrate> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
    </>
  );
}


export default NextApp

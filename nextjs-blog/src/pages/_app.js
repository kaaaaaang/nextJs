import '../../styles/globals.css';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ErrorBoundary from '@/components/ErrorBoundary';

export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log('web vitals', metric);
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [visitedTime] = useState(new Date());

  return (
    <Layout home={router.pathname === '/'}>
      <div>
        visited:{' '}
        {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </div>
      {/*<ErrorBoundary fallbackComponent={<div>하하하하</div>}>*/}
      <ErrorBoundary>
        <Component {...pageProps} pathname={router.pathname} />
      </ErrorBoundary>
    </Layout>
  );
}

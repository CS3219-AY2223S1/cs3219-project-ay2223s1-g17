import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicMatchMake = dynamic(
  () => import('../components/MatchMake/MatchMake'),
  {
    suspense: true,
  }
);

const MatchPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={`Loading...`}>
        <DynamicMatchMake />
      </Suspense>
    </div>
  );
};

export default MatchPage;

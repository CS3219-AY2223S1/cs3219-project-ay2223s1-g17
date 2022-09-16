import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PageWrapper from 'components/PageWrapper';

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
        <title>Find a Match</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={`Loading...`}>
        <PageWrapper>
          <DynamicMatchMake />
        </PageWrapper>
      </Suspense>
    </div>
  );
};

export default MatchPage;

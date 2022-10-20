import Head from 'next/head';
import type { NextPage } from 'next';
import LandingPage from 'components/LandingPage';
import PageWrapper from 'components/PageWrapper';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <LandingPage />
      </PageWrapper>
    </div>
  );
};

export default Home;

import Head from 'next/head';
import type { NextPage } from 'next';
import LandingPage from 'components/LandingPage';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'contexts/AuthContext';
import Hero from 'components/Hero';
import { useHistory, useStatistics } from 'api/hero';

const Home: NextPage = () => {
  const { user } = useAuth();

  const { history, isLoadingHistory, isFetchingHistory } = useHistory(
    user?._id ?? ''
  );
  const { statistics, isLoadingStatistics, isFetchingStatistics } =
    useStatistics(user?._id ?? '');

  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        {user && statistics ? (
          <Hero
            history={history}
            statistics={statistics}
            isLoading={isFetchingHistory || isLoadingHistory}
          />
        ) : (
          <LandingPage />
        )}
      </PageWrapper>
    </div>
  );
};

export default Home;

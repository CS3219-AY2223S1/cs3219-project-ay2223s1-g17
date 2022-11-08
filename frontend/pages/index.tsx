import Head from 'next/head';
import type { NextPage } from 'next';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'contexts/AuthContext';
import Hero from 'components/Hero';
import dynamic from 'next/dynamic';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import { Suspense } from 'react';

const DynamicLandingPage = dynamic(() => import('../components/LandingPage'), {
  suspense: true,
});

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<LoadingPage />}>
        <PageWrapper fixedHeight whiteBackground={!user}>
          {user ? (
            <Hero
              userId={user._id}
              username={user.username}
              createdAt={user.createdAt}
              preferredLanguage={user.preferredLanguage}
            />
          ) : (
            <DynamicLandingPage />
          )}
        </PageWrapper>
      </Suspense>
    </div>
  );
};

export default Home;

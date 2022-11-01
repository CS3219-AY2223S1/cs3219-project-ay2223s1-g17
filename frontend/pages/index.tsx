import Head from 'next/head';
import type { NextPage } from 'next';
import LandingPage from 'components/LandingPage';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'contexts/AuthContext';
import Hero from 'components/Hero';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper fixedHeight whiteBackground={!user}>
        {user ? (
          <Hero
            userId={user._id}
            username={user.username}
            createdAt={user.createdAt}
            preferredLanguage={user.preferredLanguage}
          />
        ) : (
          <LandingPage />
        )}
      </PageWrapper>
    </div>
  );
};

export default Home;

import AuthForm from 'components/AuthForm';
import type { NextPage } from 'next';
import Head from 'next/head';

const MatchPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthForm />
    </div>
  );
};

export default MatchPage;

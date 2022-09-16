import AuthForm from 'components/AuthForm';
import PageWrapper from 'components/PageWrapper';
import { NextPage } from 'next';
import Head from 'next/head';

const Auth: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Register and Log In</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <AuthForm />
      </PageWrapper>
    </div>
  );
};

export default Auth;

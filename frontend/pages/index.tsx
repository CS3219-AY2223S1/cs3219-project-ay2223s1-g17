import { Stack } from '@mui/material';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'contexts/useAuth';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  const { user } = useAuth();
  // console.log(user);
  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Stack
          sx={{
            height: '100%',
            color: 'black',
            textAlign: 'center',
            paddingTop: '30%',
            fontSize: 24,
          }}
        >
          {`Welcome to Peer Prep${user ? `, ${user.username}` : ''}`}
        </Stack>
      </PageWrapper>
    </div>
  );
};

export default Home;

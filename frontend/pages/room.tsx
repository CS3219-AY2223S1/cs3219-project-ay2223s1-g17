import PageWrapper from 'components/PageWrapper';
import Room from 'components/room/Room';
import type { NextPage } from 'next';
import Head from 'next/head';

const PeerPrepRoom: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Room />
      </PageWrapper>
    </div>
  );
};

export default PeerPrepRoom;

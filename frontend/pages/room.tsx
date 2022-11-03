import PageWrapper from 'components/PageWrapper';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingPage from 'components/LoadingPage/LoadingPage';

const DynamicRoom = dynamic(() => import('components/CollabRoom'), {
  suspense: true,
});

const PeerPrepRoom: NextPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PageWrapper fullWidth fixedHeight whiteBackground>
        <DynamicRoom />
      </PageWrapper>
    </Suspense>
  );
};

export default PeerPrepRoom;

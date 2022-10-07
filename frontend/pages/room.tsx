import PageWrapper from 'components/PageWrapper';
import Room from 'components/room/Room';
import type { NextPage } from 'next';

const PeerPrepRoom: NextPage = () => {
  return (
    <PageWrapper fullWidth>
      <Room />
    </PageWrapper>
  );
};

export default PeerPrepRoom;

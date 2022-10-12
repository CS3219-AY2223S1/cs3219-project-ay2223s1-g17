import PageWrapper from 'components/PageWrapper';
import Room from 'components/Room';
import type { NextPage } from 'next';

const PeerPrepRoom: NextPage = () => {
  return (
    <PageWrapper fullWidth fixedHeight>
      <Room />
    </PageWrapper>
  );
};

export default PeerPrepRoom;

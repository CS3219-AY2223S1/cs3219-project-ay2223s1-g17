import PageWrapper from 'components/PageWrapper';
import Room from 'components/CollabRoom';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCodingSession } from 'api/history';
import { Skeleton } from '@mui/material';

const ViewHistory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useCodingSession(String(id));

  return (
    <PageWrapper fullWidth fixedHeight>
      {data ? (
        <Room
          readOnly
          readOnlyQuestion={data.question}
          readOnlyChats={data.chats}
          readOnlyEditorContent={data.code}
        />
      ) : (
        <Skeleton />
      )}
    </PageWrapper>
  );
};

export default ViewHistory;

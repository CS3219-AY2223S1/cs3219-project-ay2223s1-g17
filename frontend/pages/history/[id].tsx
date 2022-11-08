import PageWrapper from 'components/PageWrapper';
import Room from 'components/CollabRoom';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCodingSession } from 'api/history';

const ViewHistory: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isFetching } = useCodingSession(String(id));

  return (
    <PageWrapper fullWidth fixedHeight whiteBackground>
      <Room
        readOnly
        readOnlyQuestion={data?.question}
        readOnlyChats={data?.chats}
        readOnlyEditorContent={data?.code}
        isLoading={isLoading || isFetching}
      />
    </PageWrapper>
  );
};

export default ViewHistory;

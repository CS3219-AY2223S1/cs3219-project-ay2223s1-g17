import Head from 'next/head';
import type { NextPage } from 'next';
import LandingPage from 'components/LandingPage';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'contexts/AuthContext';
import Hero from 'components/Hero';
import { DIFFICULTY, HTTP_METHOD, LANGUAGE, SERVICE } from 'utils/enums';
import { History, Statistics } from 'components/Hero/Hero';
import { useEffect, useState } from 'react';
import { apiCall } from 'utils/helpers';

const Home: NextPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<History[]>([]);
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    const fetchHistoryAndStatistics = async () => {
      const h = await apiCall({
        service: SERVICE.HISTORY,
        method: HTTP_METHOD.POST,
        path: '/get',
        body: {
          userId: user?._id,
        },
      });
      setHistory(h);

      const s = await apiCall({
        service: SERVICE.HISTORY,
        method: HTTP_METHOD.POST,
        path: '/stats',
        body: {
          userId: user?._id,
        },
      });
      setStatistics(s);
    };

    if (user) fetchHistoryAndStatistics();
  }, [user]);

  const addHistory = () => {
    const temp = statistics;
    if (!temp) return;
    temp.languagesUsed[LANGUAGE.PYTHON] = 1;
    temp.completedQuestionsByDifficulty[DIFFICULTY.EASY] = 1;
    temp.completedQuestions.push('new');
    setStatistics(temp);
  };

  return (
    <div>
      <Head>
        <title>PeerPrep</title>
        <meta name="PeerPrep" content="Leetcode with friends uwu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        {user && statistics ? (
          <Hero
            history={history}
            statistics={statistics}
            addHistory={addHistory}
          />
        ) : (
          <LandingPage />
        )}
      </PageWrapper>
    </div>
  );
};

export default Home;

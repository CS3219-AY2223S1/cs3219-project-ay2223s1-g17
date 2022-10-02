import { useEffect, useState } from 'react';
import { DIFFICULTY, HTTP_METHOD, LANGUAGE, SERVICE } from 'utils/enums';
import { apiCall } from 'utils/helpers';

const useQuestion = () => {
  const [question, setQuestion] = useState<Question | undefined>();

  useEffect(() => {
    let ignore = false;

    const fetchQuestion = async () => {
      const question = await apiCall({
        service: SERVICE.QUESTION,
        path: '/question/get/difficulty/EASY',
        method: HTTP_METHOD.GET,
      });

      if (!ignore) {
        setQuestion(question);
      }
    };

    fetchQuestion();

    () => {
      ignore = true;
    };
  }, []);

  return question || {};
};

type Question = {
  title?: string;
  difficulty?: DIFFICULTY;
  description?: string;
  examples?: { input: string; output: string; explanation: string }[];
  constraints?: string[];
  templates?: Record<LANGUAGE, string>;
};

export default useQuestion;

import CodeEditor from 'components/CodeEditor';
import { Question } from 'components/CodeEditor/CodeEditor';
import PageWrapper from 'components/PageWrapper';
import { useState, useEffect } from 'react';
import { HTTP_METHOD, SERVICE } from 'utils/enums';
import { apiCall } from 'utils/helpers';

const Editor = () => {
  const [question, setQuestion] = useState<Question | undefined>();

  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await apiCall({
        service: SERVICE.QUESTION,
        path: '/question/get/difficulty/EASY',
        method: HTTP_METHOD.GET,
      });
      setQuestion(question);
    };
    fetchQuestion();
  }, []);

  return (
    <PageWrapper fullWidth>
      {question ? <CodeEditor {...question} /> : <div>No Question</div>}
    </PageWrapper>
  );
};

export default Editor;

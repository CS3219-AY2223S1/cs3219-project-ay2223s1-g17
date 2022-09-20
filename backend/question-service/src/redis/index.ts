import * as redis from 'redis';
import { QuestionDocument } from '../model/question.type';

const questionsKey = 'questions';

const initializeRedisClient = async () => {
  const host = `${process.env.REDIS_HOST ?? 'localhost'}`;
  const redisClient = redis.createClient({
    socket: {
      host,
    },
  });
  await redisClient.connect();
  return redisClient;
};

export const fetchQuestionsFromCache = async (): Promise<
  QuestionDocument[] | null
> => {
  const redisClient = await initializeRedisClient();

  const questions = await redisClient
    .get(questionsKey)
    .then((res) => (res ? JSON.parse(res) : res));

  return questions;
};

export const cacheQuestions = async (questions: QuestionDocument[]) => {
  const redisClient = await initializeRedisClient();

  await redisClient.set(questionsKey, JSON.stringify(questions));
};

import { useMatching } from 'contexts/MatchingContext';
import DifficultySelector from './DifficultySelector';
import MatchQueueTimer from './MatchQueueTimer';

const Matchmaking = () => {
  const { isMatching, roomId: isMatched } = useMatching();

  return isMatched ? (
    <></>
  ) : isMatching ? (
    <MatchQueueTimer />
  ) : (
    <DifficultySelector />
  );
};

export default Matchmaking;

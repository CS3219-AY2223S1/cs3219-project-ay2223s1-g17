import Stopwatch from 'components/Stopwatch';
import { useMatchingContext } from 'contexts/MatchingContext';
import DifficultySelector from './DifficultySelector';
import MatchQueueTimer from './MatchQueueTimer';

const Matchmaking = () => {
  const { isMatching, roomId: isMatched } = useMatchingContext();

  return isMatched ? (
    <Stopwatch />
  ) : isMatching ? (
    <MatchQueueTimer />
  ) : (
    <DifficultySelector />
  );
};

export default Matchmaking;

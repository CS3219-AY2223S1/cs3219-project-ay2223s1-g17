import useSocket, { DIFFICULTY } from 'components/MatchMake/hooks/useSocket';
import React from 'react';

const MatchMake = () => {
  const { isConnected, startMatch, isMatching, count } = useSocket();

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <button disabled={isMatching} onClick={() => startMatch(DIFFICULTY.EASY)}>
        easy
      </button>
      <button
        disabled={isMatching}
        onClick={() => startMatch(DIFFICULTY.MEDIUM)}
      >
        medium
      </button>
      <button disabled={isMatching} onClick={() => startMatch(DIFFICULTY.HARD)}>
        hard
      </button>
      {count !== null && (
        <div>
          <b>{count}</b>
        </div>
      )}
    </div>
  );
};

export default MatchMake;

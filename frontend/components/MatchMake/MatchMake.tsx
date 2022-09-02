import useSocket from 'components/MatchMake/hooks/useSocket';
import React from 'react';

export const MatchMake = () => {
  const { isConnected, lastPong, sendPing } = useSocket();

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
};

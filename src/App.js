import React, { useState } from 'react';
import Crupier from './components/Crupier/Crupier';


const defaultPlayer = { username: 'player', cards: [], play: false, win: false };

const App = () => {
  const [ players, setPlayers ] = useState(new Array(6).fill(null).map((_, i) => ({ ...defaultPlayer, username: 'player ' + (i + 1) })));

  return (
    <div>
      <Crupier players={players} setPlayers={setPlayers}/>
    </div>
  );
};

export default App;

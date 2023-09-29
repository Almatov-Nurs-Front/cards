// Modules and Hooks
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
// Components
import Card from '../Card/Card';
import { Spinner } from '@chakra-ui/react';
import PersonIcon from '@mui/icons-material/Person';
// Assets
import King from '../../assets/images/king.png';
import Dama from '../../assets/images/dama.png';
import Valet from '../../assets/images/valet.png';
// Styles
import classes from './Crupier.module.scss';


const colods = [
  { title: 'Туз', name: 'Т' },
  { title: 'Король', name: <img src={King} alt="" draggable={false}/> },
  { title: 'Дама', name: <img src={Dama} alt="" draggable={false}/> },
  { title: 'Валет' , name: <img src={Valet} alt="" draggable={false}/> },
  { title: 10 , name: 10 },
  { title: 9 , name: 9 },
  { title: 8 , name: 8 },
  { title: 7 , name: 7 },
  { title: 6 , name: 6 }
];

const initialSuits = [
  { title: 'Черви', label: '♥', color: 'red' },
  { title: 'Пики', label: '♠', color: 'black' },
  { title: 'Бубны', label: '♦', color: 'red' },
  { title: 'Трефы', label: '♣', color: 'black' },
];

const initialCards = [].concat(...initialSuits.map((suit) => colods.map((colod) => ({ ...suit, name: colod }))));

const Crupier = ({ players = [ ], setPlayers }) => {
  const [ cards, setCards ] = useState([]);
  const [ trump, setTrump ] = useState({});

  const player_cards = players.reduce((acc, curr) => acc + curr.cards.length, 0);
  
  useEffect(() => {
    const shuffle_cards = _.shuffle(initialCards);
    setCards(shuffle_cards);
    setTrump({ ...shuffle_cards.at(-1), name: { title: 'Козырь', name: 'Козырь' } });
  }, []);

  useEffect(() => {
    const player_cards = players.reduce((acc, curr) => acc + curr.cards.length, 0);
    if (player_cards < players.length * 6 && cards.length) {
      const index = players.findIndex((i) => !i.cards.length);
      const newPlayer = { ...players.at(index), cards: cards.slice(0, 6) };
      const newPlayers = players.with(index, newPlayer);
      setTimeout(() => {
        setCards(cards.slice(6, cards.length));
        setPlayers(newPlayers);
      }, 1000);
    }
  }, [ players, cards ]);

  if (!cards.length && player_cards < 36) return <Spinner width={50} height={50}/>;
  return (
    <div>
      <Card item={trump} hidden={false}/>
      <div className={classes.cards}>
        {
          cards.length >= 2
          &&
          <div className={classes.card}>
            <Card/>
          </div>
        }
        {
          cards.length >= 1
          &&
          <div className={classes.downCard}>
            <Card item={cards.at(-1)} hidden={false}/>
          </div>
        }
      </div>
      <ul className={classes.players}>
        {
          players?.map((player, index) => (
            <li key={index} className={classes.player}>
              <PersonIcon/><br/>{player.username}<br/>
              <ul className={classes.playerCards}>
                {
                  player.cards?.map(card => <Card item={card}/>)
                }
              </ul>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Crupier;
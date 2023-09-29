import React from 'react';
// Styles
import classes from './Card.module.scss';


const Card = ({ item, hidden = true }) => {
  const { title, label, color, name } = item || {};
  const hiddenClass = hidden ? classes.hidden : '';
  return (
    <div title={!hidden ?`${name?.title} ${title}` : ''} className={`${classes.card} ${hiddenClass}`}>
      <span className={`${classes.icon} ${classes[ color ]}`}>{label}</span>
      <span className={classes.title}>{name?.name}</span>
      <span className={classes.down_title}>{name?.name}</span>
      <span className={`${classes.down_icon} ${classes[ color ]}`}>{label}</span>
    </div>
  );
};

export default Card;
import React from 'react';

import Data from './Data';
import Name from './Name';
import Percentage from './Percentage';
import Picture from './Picture';
import Popularity from './Popularity';
import Position from './Position';
import Votes from './Votes';

import css from './candidate.module.css';

export default function Candidate(props) {
  const { previousPercentage ,previousVote ,candidate, position } = props;
  const { id ,name, votes, percentage, popularity } = candidate;

  const imageSource = `${id}.jpg`;

  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imageSource={imageSource} description={name} />
      <Data>
        <Name>{name}</Name>
        <Votes value={votes} previous={previousVote} />
        <Percentage value={percentage} previous={previousPercentage} />
        <Popularity value={popularity} />
      </Data> 
    </div>
  );
}

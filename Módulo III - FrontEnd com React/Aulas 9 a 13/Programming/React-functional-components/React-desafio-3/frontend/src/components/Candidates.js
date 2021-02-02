import React from 'react';

import FlipMove from 'react-flip-move';

import Candidate from './Candidate';
import Card from './Card';

export default function Candidates(props) {
  const { candidates, previousVotes, previousPercentages } = props;

  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;

          // Votes
          const previousVotesObject = previousVotes.find((item) => item.id === id);
          // aqui a primeira passada vai retornar undefined porque não tem nada 

          // aqui eu concerto isso
          const previousVote =  !!previousVotesObject ? previousVotesObject.votes : 0; // tem algo lá? seta os votos. Não tem? 0.

          
          // Percentage
          const previousPercentageObject = previousPercentages.find((item) => item.id === id);

          const previousPercentage =  !!previousPercentageObject ? previousPercentageObject.percentage : 0;

          return (
            <div key={id}>
              <Card><Candidate previousPercentage={previousPercentage} previousVote={previousVote} candidate={candidate} position={index + 1} /></Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}

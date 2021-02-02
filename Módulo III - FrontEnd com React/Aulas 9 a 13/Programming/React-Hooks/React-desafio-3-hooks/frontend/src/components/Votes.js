import React from 'react';

import CountUp from 'react-countup';

export default function Votes(props) {
  const { value, previous } = props;

  return (
    <div>
      <CountUp start={previous || 0} end={value} duration={0.6} separator=".">
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
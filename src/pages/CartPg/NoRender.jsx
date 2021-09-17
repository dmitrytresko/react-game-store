import React from 'react';

let countsNumber = 0;

const NoRender = ()  => {
  countsNumber = countsNumber + 1;

  return (
    <p>renders count: {countsNumber}</p>
  )
}

export default NoRender;

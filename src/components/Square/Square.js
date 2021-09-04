import React, { useContext } from 'react';
import { Context } from '../Game/game';
// import PropTypes from 'prop-types';
import './Square.css';

function Square ({position, value, winSquare}) {

  const contetxt = useContext(Context);

    return (
      <button
        className= { winSquare ? 'square-active' : 'square' }
        onClick={() => contetxt.clickSquare (position)}
      >
        {value}
      </button>
    );
}

export default Square;
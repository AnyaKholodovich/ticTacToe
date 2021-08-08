import React from "react";
// import PropTypes from 'prop-types';
import './Square.css';

function Square ({position, onClick, value}) {

    return (
      <button
        className="square"
        onClick={() => onClick (position)}
      >
        {value}
      </button>
    );
}

export default Square;
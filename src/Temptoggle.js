import React from 'react';

const Temptoggle = ({ tempUnit, onToggle }) => {
  return (
    <button onClick={onToggle}>
      Temp: {tempUnit === 'celsius' ? 'F' : 'C'}
    </button>
  );
};

export default Temptoggle;

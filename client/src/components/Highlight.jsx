import React from 'react';

const Highlight = ({color, children}) => {
  return <strong style={{ color }}>{children}</strong>;
};

export default Highlight;
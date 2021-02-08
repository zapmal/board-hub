import React from 'react';

const Highlight = ({color = '#7362d0', children}) => {
  return <strong style={{ color }}>{children}</strong>;
};

export default Highlight;
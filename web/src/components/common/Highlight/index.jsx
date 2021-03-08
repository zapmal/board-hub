import React from 'react';

export const Highlight = ({color = '#7362d0', children}) => {
  return <strong style={{ color }}>{children}</strong>;
};
import React from 'react';

import { Prompt } from './styles';

/**
 * If a <strong> is passed it will highlight it.
 */
export const PromptButton = ({ to, children }) => {
  return (
    <Prompt to={to}>
      {children}
    </Prompt>
  );
};
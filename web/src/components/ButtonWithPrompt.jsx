import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Prompt = styled(Link)`
  padding: 18px;
  font-size: 18px;
  background-color: transparent;
  border: 4px solid #ffffff;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;

  strong {
    color: #ffffff;
    transition: all .2s;
  }

  &:hover strong {
    box-shadow: 0 4px 0 -2px #ffffff;
  }

  span::before {
    content: '';
    margin-left: 10px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    transform: rotate(-45deg) translateY(-1px);
    transition: transform .2s cubic-bezier(.4, 0, .2, 1);
  }

  &:hover span::before {
    transform: rotate(-45deg) translateY(8px) translateX(8px);
  }

  span::after {
    content: '';
    display: inline-block;
    background-color: #ffffff;
    height: 2px;
    width: 10px;
    margin-left: .25em;
    transition: transform .2s cubic-bezier(.4,0,.2,1);
    animation: blink 1s infinite;
  }

  &:hover span::after {
    transform: translateX(-5px) translateY(-4px) scaleX(1.5);
    animation: none;
  }

  @keyframes blink {
    0% { opacity: 0; }
    25% { opacity: .2; }
    50% { opacity: .5; }
    75% { opacity: .7; }
    100% { opacity: 1; }
  }
`;

/**
 * If a <strong> is passed it will highlight it.
 */
const ButtonWithPrompt = ({ to, children }) => {
  return (
    <Prompt to={to}>
      {children}
    </Prompt>
  );
};

export default ButtonWithPrompt;
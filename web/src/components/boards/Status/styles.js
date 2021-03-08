import styled, { css } from 'styled-components/macro';

export const StatusContainer = styled.div`
  margin: 200px;
  ${({ error }) => error 
  ? 'text-align: center;'
  : css`
      display: flex;
      justify-content: center;
  `
  }
`;
import styled from 'styled-components';

export const ListContainer = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  background-color: #ebecf0;
  border-radius: 5px;
  width: 300px;
  height: 100%;

  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const ListName = styled.h3`
  margin: 0 auto;
  letter-spacing: 1px;
  padding: 8px;
  transition: all 200ms ease-in;

  &:hover {
    color: #7362d0;
    box-shadow: inset 0 -2px 0 #7362d0;
  }
`;

export const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? '#e0e0e0' : 'inherit'};
  flex-grow: 1;
`;
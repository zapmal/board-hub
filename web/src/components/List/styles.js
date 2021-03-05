import styled from 'styled-components';

export const ListContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 300px;

  display: flex;
  flex-direction: column;
`;

export const ListName = styled.h3`
  padding: 8px;
`;

export const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? 'skyblue' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`;
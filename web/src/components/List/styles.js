import styled from 'styled-components';

export const ListContainer = styled.div`
  margin: 10px;
  border: 1px solid lightgrey;
  background-color: #ebecf0;
  border-radius: 2px;
  width: 300px;
  height: 100%;

  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const ListName = styled.h3`
  margin: 0 auto;
  padding: 8px;
`;

export const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) => isDraggingOver ? 'skyblue' : 'inherit'};
  flex-grow: 1;
  /* min-height: 100px; */
`;
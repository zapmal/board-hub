import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging, isDragDisabled }) => 
    isDragDisabled 
      ? 'lightgrey'
      : isDragging ? 'lightgreen' : 'white'};
  display: flex;
`;
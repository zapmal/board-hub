import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging, isDisabled }) => 
    isDisabled 
      ? 'lightgrey'
      : isDragging ? '#bdbdbd' : 'white'};

  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
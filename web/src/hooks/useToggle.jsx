import { useReducer } from 'react';

const useToggle = (initialState = false) => {
  return useReducer((state) => !state, initialState);
};

export default useToggle;
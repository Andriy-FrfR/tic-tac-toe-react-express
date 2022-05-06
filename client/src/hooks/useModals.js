import { useContext } from 'react';
import { modalsContext } from '../contexts/modals/modalsContext';

export const useModals = () => {
  return useContext(modalsContext);
};

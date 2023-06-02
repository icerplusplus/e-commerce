import {useEffect} from 'react';
import {Path, useNavigate} from 'react-router-dom';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  function changeToPage(path: string | Partial<Path>) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  return {changeToPage} as const;
};

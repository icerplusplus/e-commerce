import {useEffect} from 'react';

interface INotFound {
  isNotFound: boolean;
}

export const withScrollToTop = <T,>(WrappedComponent: React.FC<T>) => {
  return (props: Readonly<T>) => {
    useEffect(() => window.scrollTo(0, 0), []);

    return <WrappedComponent {...props} />;
  };
};

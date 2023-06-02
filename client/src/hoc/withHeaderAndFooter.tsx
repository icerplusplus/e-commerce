import React, {useState} from 'react';
import {useAppSelector} from '@/hooks';
import {Header, Footer} from '@/components';
import Auth from '../features/Auth';
import {selectUserInfo} from '@/stores/reducer';

export const withHeaderAndFooter = <T,>(WrappedComponent: React.FC<T>) => {
  return (props: Readonly<T>) => {
    const [showAuthForm, setShowAuthForm] = useState(false);
    // store
    const userStore = useAppSelector(selectUserInfo);

    const togglePopup = () => setShowAuthForm(!showAuthForm);

    return (
      <>
        {/* header */}
        <Header togglePopup={togglePopup} />
        {showAuthForm && <Auth toggle={togglePopup} />}

        {/* body */}
        <WrappedComponent {...props} />

        {/* footer */}
        <Footer />
      </>
    );
  };
};

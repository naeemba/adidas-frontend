import React, { useEffect, useState } from 'react';
import './api/axios';
import HomeScreen from './screens/Home';
import ProductScreen from './screens/Product';
import Header from './components/Header';

const Router = ({ pathname }: { pathname: string }): React.ReactElement => {
  if (pathname.startsWith('/product')) return <ProductScreen />;
  return <HomeScreen />;
};

const Wrapper = (): React.ReactElement => {
  const [pathname, setPathname] = useState('/');
  const changeUrlListener = (): void => {
    setPathname(window.location.pathname);
  };
  useEffect(() => {
    window.addEventListener('popstate', changeUrlListener);
    return (): void =>
      window.removeEventListener('popstate', changeUrlListener);
  }, []);
  console.log({ pathname });
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl">
        <Header />
        <div className="pt-4 pb-8">
          <Router pathname={pathname} />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

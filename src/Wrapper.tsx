import React, { useEffect, useState } from 'react';
import './api/axios';
import HomeScreen from './screens/Home';
import ProductScreen from './screens/Product';
import Header from './components/Header';

const Router = ({
  pathname,
  params,
}: {
  pathname: string;
  params?: URLSearchParams;
}): React.ReactElement => {
  if (pathname.startsWith('/product')) return <ProductScreen />;
  return <HomeScreen search={params?.get('search') ?? ''} />;
};

Router.defaultProps = {
  params: undefined,
};

const Wrapper = (): React.ReactElement => {
  const [pathname, setPathname] = useState('/');
  const [params, setParams] = useState<URLSearchParams | undefined>();
  const changeUrlListener = (): void => {
    setPathname(window.location.pathname);
    setParams(new URLSearchParams(window.location.search));
  };
  useEffect(() => {
    window.addEventListener('popstate', changeUrlListener);
    return (): void =>
      window.removeEventListener('popstate', changeUrlListener);
  }, []);
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl">
        <Header />
        <div className="pt-4 pb-8">
          <Router pathname={pathname} params={params} />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

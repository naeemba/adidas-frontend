import React from 'react';
import { locationUtils } from '../utils';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search-icon.svg';

const Header = (): React.ReactElement => {
  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get('search');
  return (
    <div className="flex items-center px-4 py-4 my-0 bg-blue-100 md:my-4 md:mx-4 md:rounded-2xl">
      <button
        type="button"
        onClick={(): void => locationUtils.pushState('/')}
        className="my-auto mr-4 focus:outline-none"
      >
        <img src={logo} alt="logo" className="h-10 lg:w-16" />
      </button>
      <div className="relative flex items-center flex-1 max-w-xs my-auto ml-4 ml-auto">
        <input
          type="text"
          className="w-full h-12 text-sm text-gray-500 rounded-lg pl-14 focus:outline-none"
          placeholder="search"
          defaultValue={searchValue ?? ''}
          onChange={(event): void =>
            locationUtils.pushState(
              `${window.location.pathname}?search=${event.target.value}`,
            )
          }
        />
        <img
          src={searchIcon}
          alt="search"
          className="absolute w-5 h-5 my-auto opacity-50 left-4"
        />
      </div>
    </div>
  );
};

export default Header;

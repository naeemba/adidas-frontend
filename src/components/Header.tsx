import React from 'react';
import { locationUtils } from '../utils';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search-icon.svg';

const Header = (): React.ReactElement => {
  const params = new URLSearchParams(window.location.search);
  const searchValue = params.get('search');
  return (
    <div className="flex h-24 my-4 bg-blue-100 rounded-2xl">
      <button
        type="button"
        onClick={(): void => locationUtils.pushState('/')}
        className="my-auto focus:outline-none"
      >
        <img src={logo} alt="logo" className="w-16 ml-8" />
      </button>
      <div className="relative flex items-center my-auto ml-auto mr-8">
        <input
          type="text"
          className="h-12 text-sm text-gray-500 rounded-lg pl-14 focus:outline-none"
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

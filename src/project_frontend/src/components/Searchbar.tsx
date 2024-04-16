import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex items-center">   
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 placeholder-gray-800" placeholder="Search" required />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-gray-800 bg-white rounded-lg border border-white hover:text-white hover:bg-gray-800 focus:outline-none">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

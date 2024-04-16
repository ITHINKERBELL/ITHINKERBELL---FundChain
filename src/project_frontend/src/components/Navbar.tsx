import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLink } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './Searchbar';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
    // function here
  };

  return (
    <header className="header sticky top-0 bg-white flex items-center justify-between px-8 py-2 z-10">

      <div className="flex-grow mr-10"></div>

      <SearchBar />

      <div className="flex-grow"></div>

      <div className='flex'>
        <a href="" className="mr-4 flex items-center justify-center">
            <p className="mr-2">Connect</p>
            <FontAwesomeIcon icon={faLink} className='h-5 w-5 py-1 px-1 hover:bg-gray-800 hover:text-white rounded-lg hover:duration-300 hover:ease-linear' />
        </a>
       </div>
    </header>
  );
};

export default Navbar;

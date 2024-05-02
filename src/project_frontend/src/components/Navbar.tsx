import React, { useState } from "react";
import PlugConnect from "./PlugConnect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLink } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./Searchbar";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnect = (connected: boolean) => {
    if (connected) {
      console.log('Connected to Plug Wallet');
    } else {
      console.error('Failed to connect to Plug Wallet');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
    // function here
  };

  return (
    <header className="header sticky top-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-between px-8 py-2 z-10 rounded-bl-xl rounded-br-xl">
      <div className="flex-grow mr-10"></div>

      <SearchBar />

      <div className="flex-grow"></div>

      <div className="flex">
        <PlugConnect 
          dark={true} 
          title="Connect to Plug" 
          onConnectCallback={handleConnect} 
        />
      </div>
    </header>
  );
};

export default Navbar;

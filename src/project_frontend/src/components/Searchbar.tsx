import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div id="search-bar" className="w-80 bg-white rounded-md shadow-lg z-10">
      <form className="flex items-center justify-center p-2">
        <input
          type="text"
          placeholder="Search Campaign"
          className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

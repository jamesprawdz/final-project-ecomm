import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        placeholder="Search for a product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;

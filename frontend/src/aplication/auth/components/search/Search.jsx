import React from "react";
import "./Search.css";
import { BiSearch } from "react-icons/bi";

export const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <BiSearch size={18} className="icon-search" />
      <input
        type="text"
        placeholder="Search Users"
        value={value}
        onChange={onChange}
        className="searchInput"
      />
    </div>
  );
};

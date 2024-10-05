"use client";

import React, { useState } from 'react';
import { Input, message } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (value) {
      // make call here
    } else {
      message.error('Please enter a search term');
    }
  };

  return (
    <div className="w-full max-w-md mt-4">
      <Search
        placeholder="Search"
        onSearch={handleSearch}
        loading={loading}
        className="bg-gray-200 border-gray-400 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
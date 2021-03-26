import React, { useState } from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';

const AdvancedSearch = ({ restaurants }) => {
  const [searchText, setSearchText] = useState('');
  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const buildOptions = () => {
    if (!restaurants) {
      return [];
    } else {
      const regex = new RegExp(searchText, 'gi');
      return restaurants
        .map((r) => {
          const { _id, restaurant_name } = r;
          return { value: _id, label: restaurant_name };
        })
        .filter((r) => r.label.match(regex));
    }
  };

  return (
    <div>
      {/* <h1>Search bar</h1>
      <Input
        type='text'
        placeholder='Search for restaurant names'
        onChange={(e) => onChange(e)}
        value={searchText}
        className='py-4'
      /> */}
      <Select options={buildOptions()} isClearable={true} isSearchable={true} />
    </div>
  );
};

export default AdvancedSearch;

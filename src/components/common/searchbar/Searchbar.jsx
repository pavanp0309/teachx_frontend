import React, { useState } from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

const SearchBar = ({ placeholder, filters, onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.value || "");

  return (
    <div className="d-flex align-items-center   rounded px-2" style={{ width: "350px" }}>
        {/* Search Input */}
        <Search
        placeholder={placeholder}
        allowClear
        onSearch={(value) => onSearch(selectedFilter, value)}
        style={{ flex: 1 }}
         className="me-2"
      />
      
      {/* Filter Dropdown */}
      <Select
        defaultValue={selectedFilter}
        onChange={setSelectedFilter}
        style={{ width: 120 }}
       
      >
        {filters.map((filter) => (
          <Option key={filter.value} value={filter.value}>
            {filter.label}
          </Option>
        ))}
      </Select>

    
    </div>
  );
};

export default SearchBar;

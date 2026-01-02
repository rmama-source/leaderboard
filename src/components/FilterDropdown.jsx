// src/components/FilterDropdown.jsx
import React, { useState } from 'react';

const FilterDropdown = ({ label, options, selectedOptions, onToggle, searchable = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className="mb-4">
      <div className="bg-black text-white rounded-full px-6 py-3 mb-2">
        <span className="font-medium">{label}</span>
      </div>
      
      {searchable && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${label.toLowerCase()}...`}
          className="w-full px-4 py-2 mb-2 rounded-full border-2 border-gray-300 text-sm focus:outline-none focus:border-black"
        />
      )}
      
      <div className="bg-white rounded-2xl border-2 border-black p-3 max-h-40 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map(option => (
            <label key={option} className="flex items-center py-1.5 cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => onToggle(option)}
                className="mr-3 w-4 h-4 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-500 py-2 text-center">No {label.toLowerCase()} found</p>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
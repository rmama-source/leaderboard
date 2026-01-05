// src/components/SingleSelectFilter.jsx
import React from 'react';

const SingleSelectFilter = ({ label, options, selectedOption, onSelect }) => {
  return (
    <div className="mb-4">
      <div className="bg-black text-white rounded-full px-6 py-3 mb-2">
        <span className="font-medium">{label}</span>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-black p-3 max-h-40 overflow-y-auto">
        {options.map(option => (
          <label key={option} className="flex items-center py-1.5 cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name={label}
              checked={selectedOption === option}
              onChange={() => onSelect(option)}
              className="mr-3 w-4 h-4 cursor-pointer flex-shrink-0"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SingleSelectFilter;
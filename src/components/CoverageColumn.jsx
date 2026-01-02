// src/components/CoverageColumn.jsx
import React from 'react';
import CoverageCard from './CoverageCard';

const CoverageColumn = ({ title, coverage, showPublication, isDark = false, isLoading = false }) => {
  const bgColor = isDark ? 'bg-blue-900 text-white' : 'bg-yellow-50';

  return (
    <div className={`flex-1 p-8 overflow-y-auto ${bgColor}`}>
      <h2 className="text-4xl font-bold mb-8">{title}</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Searching competitor articles...</p>
        </div>
      ) : coverage.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 text-lg">
            {isDark ? 'Select publications and click Apply to search' : 'Select filters and click Apply'}
          </p>
        </div>
      ) : (
        <div>
          {coverage.map(item => (
            <CoverageCard 
              key={item.id} 
              item={item} 
              showPublication={showPublication}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoverageColumn;
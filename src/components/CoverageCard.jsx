// src/components/CoverageCard.jsx
import React from 'react';

const CoverageCard = ({ item, showPublication = false }) => {
  // Debug: log the item to see what data we're getting
  console.log('CoverageCard item:', item);
  console.log('CoverageCard URL:', item.url);
  
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white text-black rounded-2xl p-6 border-2 border-black mb-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg leading-tight flex-1">
          {item.headline}
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{item.date}</span>
        {showPublication && (
          <span className="font-medium">{item.publication}</span>
        )}
      </div>
    </a>
  );
};

export default CoverageCard;
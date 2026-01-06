// src/components/SentimentDial.jsx
import React from 'react';

const SentimentDial = ({ selectedSentiment, onSelect }) => {
  const sentiments = ['Positive', 'Neutral', 'Mixed', 'Negative'];
  
  // Colors for each sentiment
  const sentimentColors = {
    'Positive': 'bg-green-500 hover:bg-green-600',
    'Neutral': 'bg-gray-400 hover:bg-gray-500',
    'Mixed': 'bg-yellow-500 hover:bg-yellow-600',
    'Negative': 'bg-red-500 hover:bg-red-600'
  };

  const selectedColors = {
    'Positive': 'bg-green-600 ring-4 ring-green-300',
    'Neutral': 'bg-gray-500 ring-4 ring-gray-300',
    'Mixed': 'bg-yellow-600 ring-4 ring-yellow-300',
    'Negative': 'bg-red-600 ring-4 ring-red-300'
  };

  return (
    <div className="mb-4">
      <div className="bg-black text-white rounded-full px-6 py-3 mb-2">
        <span className="font-medium">Sentiment</span>
      </div>
      
      <div className="bg-white rounded-2xl border-2 border-black p-4">
        <div className="grid grid-cols-2 gap-3">
          {sentiments.map(sentiment => {
            const isSelected = selectedSentiment === sentiment;
            const colorClass = isSelected 
              ? selectedColors[sentiment]
              : sentimentColors[sentiment];
            
            return (
              <button
                key={sentiment}
                onClick={() => onSelect(sentiment === selectedSentiment ? null : sentiment)}
                className={`${colorClass} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform ${
                  isSelected ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                {sentiment}
              </button>
            );
          })}
        </div>
        
        {selectedSentiment && (
          <button
            onClick={() => onSelect(null)}
            className="w-full mt-3 text-sm text-gray-600 hover:text-black underline"
          >
            Clear sentiment filter
          </button>
        )}
      </div>
    </div>
  );
};

export default SentimentDial;
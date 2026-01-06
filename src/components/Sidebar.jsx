// src/components/Sidebar.jsx
import React from 'react';
import Header from './Header';
import LeaderInput from './LeaderInput';
import FilterDropdown from './FilterDropdown';
import SingleSelectFilter from './SingleSelectFilter';
import SentimentDial from './SentimentDial';
import { topics, publications } from '../data/filterOptions';

const Sidebar = ({
  selectedLeader,
  setSelectedLeader,
  selectedTopics,
  setSelectedTopics,
  selectedPublication,
  setSelectedPublication,
  selectedSentiment,
  setSelectedSentiment,
  onApply,
  onClear
}) => {
  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="w-96 bg-yellow-100 border-r-2 border-black flex flex-col h-screen">
      <div className="p-6 flex-shrink-0">
        <Header />
        <h2 className="text-2xl font-bold mb-4">FILTERS</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6">
        <LeaderInput
          selectedLeader={selectedLeader}
          setSelectedLeader={setSelectedLeader}
        />

        <FilterDropdown
          label="Topic"
          options={topics}
          selectedOptions={selectedTopics}
          onToggle={toggleTopic}
          searchable={true}
        />


        <SingleSelectFilter
          label="Publication"
          options={publications}
          selectedOption={selectedPublication}
          onSelect={setSelectedPublication}
        />

                <SentimentDial
          selectedSentiment={selectedSentiment}
          onSelect={setSelectedSentiment}
        />


        {/* <div className="mb-6">
          <div className="bg-black text-white rounded-full px-6 py-3">
            <span className="font-medium">Interview | Reference</span>
          </div>
        </div> */}
      </div>

      <div className="p-6 flex-shrink-0 border-t-2 border-black bg-yellow-100">
        <button
          onClick={onApply}
          className="w-full bg-black text-white rounded-full px-8 py-3 font-semibold hover:bg-gray-800 transition-colors mb-3"
        >
          Apply
        </button>
        <button
          onClick={onClear}
          className="w-full bg-white text-black rounded-full px-8 py-3 font-semibold border-2 border-black hover:bg-gray-100 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
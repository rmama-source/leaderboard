// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CoverageColumn from './components/CoverageColumn';
import { mockSemaforData } from './data/mockData';
import { searchCompetitorCoverage } from './services/braveSearchService';

const App = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [semaforCoverage, setSemaforCoverage] = useState([]);
  const [competitorCoverage, setCompetitorCoverage] = useState([]);
  const [isLoadingCompetitor, setIsLoadingCompetitor] = useState(false);

  const applyFilters = async () => {
    // Filter Semafor coverage (local, instant)
    let filteredSemafor = mockSemaforData;
    
    if (selectedLeader) {
      filteredSemafor = filteredSemafor.filter(item => 
        item.leaders && item.leaders.some(leader => 
          leader.toLowerCase().includes(selectedLeader.toLowerCase())
        )
      );
    }
    
    if (selectedTopics.length > 0) {
      filteredSemafor = filteredSemafor.filter(item =>
        item.allTopics && item.allTopics.some(topic =>
          selectedTopics.includes(topic)
        )
      );
    }

    if (selectedSentiment) {
      filteredSemafor = filteredSemafor.filter(item =>
        item.sentiment === selectedSentiment
      );
    }
    
    setSemaforCoverage(filteredSemafor);

    // Search competitor coverage (API call)
    if (selectedPublication) {
      setIsLoadingCompetitor(true);
      try {
        // Get more results for single publication (20)
        const results = await searchCompetitorCoverage(
          selectedLeader,
          selectedTopics,
          [selectedPublication],  // Pass as array with single publication
          20
        );
        setCompetitorCoverage(results);
      } catch (error) {
        console.error('Error fetching competitor coverage:', error);
        setCompetitorCoverage([]);
      } finally {
        setIsLoadingCompetitor(false);
      }
    } else {
      setCompetitorCoverage([]);
    }
  };

  const clearFilters = () => {
    setSelectedLeader(null);
    setSelectedTopics([]);
    setSelectedPublication(null);
    setSelectedSentiment(null);
    setSemaforCoverage([]);
    setCompetitorCoverage([]);
  };

  return (
    <div className="flex h-screen bg-yellow-50">
      <Sidebar
        selectedLeader={selectedLeader}
        setSelectedLeader={setSelectedLeader}
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        selectedPublication={selectedPublication}
        setSelectedPublication={setSelectedPublication}
        selectedSentiment={selectedSentiment}
        setSelectedSentiment={setSelectedSentiment}
        onApply={applyFilters}
        onClear={clearFilters}
      />
      
      <div className="flex-1 flex">
        <CoverageColumn
          title="Semafor Coverage"
          coverage={semaforCoverage}
          showPublication={false}
        />
        
        <CoverageColumn
          title="Competitor Coverage"
          coverage={competitorCoverage}
          showPublication={true}
          isDark={true}
          isLoading={isLoadingCompetitor}
        />
      </div>
    </div>
  );
};

export default App;
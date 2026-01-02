// src/components/LeaderInput.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const LeaderInput = ({ selectedLeader, setSelectedLeader }) => {
  const [leaderName, setLeaderName] = useState('');

  const handleLeaderSubmit = (e) => {
    if (e.key === 'Enter' && leaderName.trim()) {
      setSelectedLeader(leaderName.trim());
      setLeaderName('');
    }
  };

  const removeLeader = () => {
    setSelectedLeader(null);
  };

  return (
    <div className="mb-4">
      <div className="bg-black text-white rounded-full px-6 py-3 mb-2">
        <span className="font-medium">Name of Leader</span>
      </div>
      {selectedLeader ? (
        <div className="flex items-center bg-white rounded-full px-4 py-2 border-2 border-black">
          <span className="flex-1">{selectedLeader}</span>
          <button onClick={removeLeader} className="ml-2 hover:opacity-70">
            <X size={16} />
          </button>
        </div>
      ) : (
        <input
          type="text"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          onKeyDown={handleLeaderSubmit}
          placeholder="Type name and press Enter"
          className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-black"
        />
      )}
    </div>
  );
};

export default LeaderInput;
// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="bg-yellow-200 rounded-full px-6 py-3 mb-8 border-2 border-black inline-flex items-center">
      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
      <h1 className="font-bold text-l">Leaderboard: A Semafor Tool</h1>
    </div>
  );
};

export default Header;
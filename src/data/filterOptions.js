// src/data/filterOptions.js
import articlesData from './article_tags.json';

// Helper to parse JSON strings
const parseJsonString = (str) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
};

// Extract unique topics from the real data
const extractUniqueTopics = () => {
  const topicsSet = new Set();
  
  if (Array.isArray(articlesData)) {
    articlesData.forEach(article => {
      const primaryTopics = parseJsonString(article.tags?.primary_topics);
      const secondaryTopics = parseJsonString(article.tags?.secondary_topics);
      
      [...primaryTopics, ...secondaryTopics].forEach(topic => {
        if (topic) topicsSet.add(topic);
      });
    });
  }
  
  return Array.from(topicsSet).sort();
};

// Use real topics from your data
export const topics = extractUniqueTopics();

// If no topics found, use defaults
if (topics.length === 0) {
  topics.push(
    'Politics',
    'Economy',
    'Technology',
    'Foreign Policy',
    'Climate',
    'Healthcare',
    'Education',
    'Defense'
  );
}

export const publications = [
  'The New York Times',
  'The Wall Street Journal',
  'The Washington Post',
  'CNN',
  'Politico',
  'Bloomberg',
  'Reuters',
  'Financial Times'
];
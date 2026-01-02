// src/data/mockData.js
import articlesData from './article_tags.json';

// Helper function to extract headline from URL slug
const extractHeadlineFromUrl = (url) => {
  if (!url) return 'No headline available';
  
  try {
    // Extract the last part of the URL path (the slug)
    const urlParts = url.split('/');
    const slug = urlParts[urlParts.length - 1];
    
    // Convert hyphens to spaces and capitalize first letter of each word
    const headline = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return headline;
  } catch (e) {
    return 'Article';
  }
};

// Helper function to extract excerpt from HTML content
const extractExcerpt = (content) => {
  if (!content) return '';
  
  // Remove HTML tags and get first 200 characters
  const textContent = content.replace(/<[^>]*>/g, ' ').trim();
  return textContent.length > 200 
    ? textContent.substring(0, 200) + '...'
    : textContent;
};

// Helper function to parse JSON arrays stored as strings
const parseJsonString = (str) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
};

// Transform the real Semafor data
export const mockSemaforData = Array.isArray(articlesData) 
  ? articlesData
      .filter(article => article.url) // Only include articles with valid URLs
      .map((article, index) => {
        const people = parseJsonString(article.tags?.people);
        const primaryTopics = parseJsonString(article.tags?.primary_topics);
        const secondaryTopics = parseJsonString(article.tags?.secondary_topics);
        
        return {
          id: article.url,
          headline: extractHeadlineFromUrl(article.url),
          date: article.pub_date 
            ? new Date(article.pub_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })
            : 'Unknown date',
          leader: people.length > 0 ? people[0] : 'Unknown',
          leaders: people, // Keep full array for filtering
          topic: primaryTopics.length > 0 ? primaryTopics[0] : 'General',
          allTopics: [...primaryTopics, ...secondaryTopics], // Combined for filtering
          excerpt: extractExcerpt(article.content),
          url: article.url, // Use the actual URL from data
          rawData: article // Keep original data for reference
        };
      })
  : [];

// Mock competitor data (keep this until you have real competitor data)
export const mockCompetitorData = [
  {
    id: 1,
    headline: 'Microsoft leader talks cloud computing dominance',
    date: 'Nov 18, 2024',
    publication: 'The Wall Street Journal',
    leader: 'Satya Nadella',
    leaders: ['Satya Nadella'],
    topic: 'Technology',
    allTopics: ['Technology', 'Business'],
    excerpt: 'WSJ sits down with Nadella to discuss Microsoft\'s cloud strategy and competition.',
    url: 'https://www.semafor.com'
  },
  {
    id: 2,
    headline: 'Tech giant CEO on AI ethics and governance',
    date: 'Nov 12, 2024',
    publication: 'The New York Times',
    leader: 'Satya Nadella',
    leaders: ['Satya Nadella'],
    topic: 'Technology',
    allTopics: ['Technology', 'AI'],
    excerpt: 'Times exclusive: How Microsoft plans to lead in responsible AI development.',
    url: 'https://www.semafor.com'
  },
  {
    id: 3,
    headline: 'Fed Chair weighs in on economic indicators',
    date: 'Nov 22, 2024',
    publication: 'Bloomberg',
    leader: 'Jerome Powell',
    leaders: ['Jerome Powell'],
    topic: 'Economy',
    allTopics: ['Economy', 'Monetary Policy'],
    excerpt: 'Powell provides Bloomberg with insights on labor market and inflation trends.',
    url: 'https://www.semafor.com'
  }
];
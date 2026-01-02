// src/services/braveSearchService.js

const BRAVE_API_KEY = import.meta.env.VITE_BRAVE_API_KEY;

// Detect environment and use appropriate endpoint
const IS_PRODUCTION = import.meta.env.PROD;
const API_ENDPOINT = IS_PRODUCTION 
  ? '/api/search'  // Vercel serverless function
  : '/api/brave/res/v1/web/search';  // Vite dev proxy

// Map publication names to their domains
const PUBLICATION_DOMAINS = {
  'The New York Times': 'nytimes.com',
  'The Wall Street Journal': 'wsj.com',
  'The Washington Post': 'washingtonpost.com',
  'CNN': 'cnn.com',
  'Politico': 'politico.com',
  'Bloomberg': 'bloomberg.com',
  'Reuters': 'reuters.com',
  'Financial Times': 'ft.com'
};

// Build search query for a publication
const buildSearchQuery = (publication, leader, topics) => {
  const domain = PUBLICATION_DOMAINS[publication];
  if (!domain) return null;

  let query = `site:${domain}`;
  
  // Add leader name in quotes for exact match
  if (leader) {
    query += ` "${leader}"`;
  }
  
  // Add topics as space-separated keywords (simpler approach)
  if (topics && topics.length > 0) {
    // Just add first topic to keep query simple
    query += ` ${topics[0]}`;
  }
  
  return query;
};

// Extract clean excerpt from description or snippet
const extractExcerpt = (description, snippet) => {
  const text = description || snippet || '';
  // Remove extra whitespace and limit length
  return text.trim().substring(0, 200) + (text.length > 200 ? '...' : '');
};

// Format Brave Search results to match our app's structure
const formatResults = (results, publication) => {
  if (!results || !results.web || !results.web.results) {
    return [];
  }

  return results.web.results.map((result, index) => ({
    id: `brave-${publication}-${index}`,
    headline: result.title || 'No title',
    date: result.age || 'Recent', // Brave returns relative age like "2 days ago"
    publication: publication,
    leader: 'Various', // We'd need to parse content to extract this
    leaders: [],
    topic: 'Various',
    allTopics: [],
    excerpt: extractExcerpt(result.description, result.snippet),
    url: result.url
  }));
};

// Search a single publication
const searchPublication = async (publication, leader, topics) => {
  const query = buildSearchQuery(publication, leader, topics);
  
  if (!query) {
    console.error(`Invalid publication: ${publication}`);
    return [];
  }

  console.log(`Searching ${publication} with query:`, query);

  try {
    let response;
    
    if (IS_PRODUCTION) {
      // Production: Use Vercel serverless function
      response = await fetch(
        `${API_ENDPOINT}?q=${encodeURIComponent(query)}&count=10`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );
    } else {
      // Development: Use Vite proxy
      const url = `${API_ENDPOINT}?q=${encodeURIComponent(query)}&count=10`;
      console.log('Full URL:', url);
      
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': BRAVE_API_KEY
        }
      });
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Brave Search API error: ${response.status}`, errorBody);
      return [];
    }

    const data = await response.json();
    return formatResults(data, publication);
  } catch (error) {
    console.error(`Error searching ${publication}:`, error);
    return [];
  }
};

// Main function to search all selected publications
export const searchCompetitorCoverage = async (leader, topics, publications) => {
  if (!publications || publications.length === 0) {
    return [];
  }

  console.log('Searching publications:', publications);
  console.log('Leader:', leader);
  console.log('Topics:', topics);

  // Search all publications in parallel
  const searchPromises = publications.map(pub => 
    searchPublication(pub, leader, topics)
  );

  try {
    const results = await Promise.all(searchPromises);
    // Flatten array of arrays into single array
    const allResults = results.flat();
    
    console.log(`Found ${allResults.length} competitor articles`);
    return allResults;
  } catch (error) {
    console.error('Error in searchCompetitorCoverage:', error);
    return [];
  }
};
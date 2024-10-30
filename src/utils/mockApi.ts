import { Article, Topic } from '../types';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in 2024',
    description: 'Exploring the latest developments in artificial intelligence and their impact on society.',
    url: 'https://example.com/ai-future',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    source: 'Tech Daily',
    publishedAt: '2024-03-15T10:00:00Z',
    category: 'technology'
  },
  {
    id: '2',
    title: 'Global Markets Update',
    description: 'Analysis of current market trends and economic indicators.',
    url: 'https://example.com/markets',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    source: 'Business Weekly',
    publishedAt: '2024-03-15T09:30:00Z',
    category: 'business'
  },
  // Add more mock articles as needed
];

export const fetchArticles = async (topics: Topic[]): Promise<Article[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return MOCK_ARTICLES.filter(article => 
    topics.includes(article.category as Topic)
  );
};

export const shareToX = async (text: string): Promise<boolean> => {
  // Simulate sharing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Shared to X:', text);
  return true;
};
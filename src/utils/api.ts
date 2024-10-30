import { Article, Topic } from '../types';

const API_KEY = 'pub_577897b3869a16a715badc44818f4918b1716';
const API_BASE_URL = 'https://newsdata.io/api/1';

export const fetchNewsArticles = async (topics: Topic[]): Promise<Article[]> => {
  try {
    const category = topics.join(',');
    const response = await fetch(
      `${API_BASE_URL}/news?apikey=${API_KEY}&category=${category}&language=en`
    );
    const data = await response.json();
    
    return data.results.map((article: any) => ({
      id: article.article_id,
      title: article.title,
      description: article.description || 'No description available',
      url: article.link,
      imageUrl: article.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      source: article.source_id,
      publishedAt: article.pubDate,
      category: article.category[0]
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
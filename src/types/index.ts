export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  preferences: {
    topics: string[];
    darkMode: boolean;
  };
  dailyPostsCount: number;
  viewedArticles: number;
}

export type Topic = 
  | 'technology'
  | 'business'
  | 'science'
  | 'health'
  | 'entertainment'
  | 'sports';
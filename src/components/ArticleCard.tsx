import React from 'react';
import { Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onShare: (article: Article) => void;
}

export default function ArticleCard({ article, onShare }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {article.description}
            </p>
          </div>
          <button
            onClick={() => onShare(article)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {article.source} • {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
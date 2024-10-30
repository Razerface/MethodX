import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Article } from '../types';

interface ShareModalProps {
  article: Article;
  onClose: () => void;
  onShare: (text: string) => void;
}

export default function ShareModal({ article, onClose, onShare }: ShareModalProps) {
  const defaultText = `${article.title} ${article.url} #news #${article.category}`;
  const [shareText, setShareText] = useState(defaultText);
  const charLimit = 280;

  const handleShare = () => {
    onShare(shareText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share to X</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <textarea
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg mb-4 resize-none"
          maxLength={charLimit}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {shareText.length}/{charLimit} characters
          </span>
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
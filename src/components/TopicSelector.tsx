import React from 'react';
import { Topic } from '../types';

interface TopicSelectorProps {
  selectedTopics: Topic[];
  onTopicToggle: (topic: Topic) => void;
}

const AVAILABLE_TOPICS: Topic[] = [
  'technology',
  'business',
  'science',
  'health',
  'entertainment',
  'sports'
];

export default function TopicSelector({ selectedTopics, onTopicToggle }: TopicSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Select Your Topics</h2>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => onTopicToggle(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedTopics.includes(topic)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
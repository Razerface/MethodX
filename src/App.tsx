import React, { useState, useEffect } from 'react';
import { getUser, login, togglePremium, saveUser } from './utils/mockAuth';
import { fetchNewsArticles } from './utils/api';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import ShareModal from './components/ShareModal';
import TopicSelector from './components/TopicSelector';
import PremiumBanner from './components/PremiumBanner';
import { Article, User, Topic } from './types';

function App() {
  const [user, setUser] = useState<User | null>(getUser());
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!user) {
      login();
      setUser(getUser());
    }
  }, []);

  useEffect(() => {
    const loadArticles = async () => {
      if (user) {
        setLoading(true);
        const fetchedArticles = await fetchNewsArticles(user.preferences.topics);
        setArticles(fetchedArticles);
        setLoading(false);
      }
    };

    loadArticles();
  }, [user?.preferences.topics]);

  const handleShare = (article: Article) => {
    if (!user?.isPremium && user?.dailyPostsCount >= 1) {
      alert('Free users can only share once per day. Upgrade to Premium for unlimited sharing!');
      return;
    }
    setSelectedArticle(article);
  };

  const handleTopicToggle = (topic: Topic) => {
    if (user) {
      const newTopics = user.preferences.topics.includes(topic)
        ? user.preferences.topics.filter(t => t !== topic)
        : [...user.preferences.topics, topic];
      
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          topics: newTopics
        }
      };
      
      saveUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const handleUpgrade = () => {
    togglePremium();
    setUser(getUser());
  };

  const handleShareSubmit = (text: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        dailyPostsCount: user.dailyPostsCount + 1
      };
      saveUser(updatedUser);
      setUser(updatedUser);
      console.log('Shared to X:', text);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!user.isPremium && <PremiumBanner onUpgrade={handleUpgrade} />}
        
        <TopicSelector
          selectedTopics={user.preferences.topics as Topic[]}
          onTopicToggle={handleTopicToggle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : (
            articles.slice(0, user.isPremium ? undefined : 10).map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onShare={handleShare}
              />
            ))
          )}
        </div>

        {selectedArticle && (
          <ShareModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onShare={handleShareSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
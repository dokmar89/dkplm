import React from 'react';
import { Book, ArrowRight } from 'lucide-react';

const articles = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of age verification integration',
    category: 'Basics',
  },
  {
    title: 'Understanding Verification Methods',
    description: 'Detailed comparison of available verification options',
    category: 'Methods',
  },
  {
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems',
    category: 'Support',
  },
  {
    title: 'Best Practices',
    description: 'Optimize your verification process',
    category: 'Advanced',
  },
];

export const KnowledgeBase = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">Knowledge Base</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {articles.map((article, index) => (
            <button
              key={index}
              className="text-left group p-4 border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full">
                    {article.category}
                  </span>
                  <h3 className="font-medium mt-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{article.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
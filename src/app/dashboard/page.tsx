'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface UrlData {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  totalClicks: number;
  createdAt: string;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState<UrlData | null>(null);

  useEffect(() => {
    // Fetch URLs from backend
    // This is a placeholder - actual implementation will call the backend API
    const mockData: UrlData[] = [
      {
        shortCode: 'abc123',
        originalUrl: 'https://example.com/very-long-url',
        shortUrl: 'http://localhost:3001/abc123',
        totalClicks: 42,
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        shortCode: 'xyz789',
        originalUrl: 'https://another-example.com/path',
        shortUrl: 'http://localhost:3001/xyz789',
        totalClicks: 128,
        createdAt: '2024-01-14T15:45:00Z',
      },
    ];
    setUrls(mockData);
    setLoading(false);
  }, []);

  const handleDelete = async (shortCode: string) => {
    // Placeholder for delete functionality
    if (confirm('Are you sure you want to delete this link?')) {
      setUrls(urls.filter((url) => url.shortCode !== shortCode));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0FDF4] text-[#14532D] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#14532D]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-[#14532D] transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-lg transition-colors"
          >
            Create New Link
          </Link>
        </div>

        {/* URL List */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#DCFCE7]">
            <h2 className="text-xl font-semibold">Your Links</h2>
          </div>
          {urls.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              <p>No links created yet. Create your first link to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#DCFCE7]">
              {urls.map((url) => (
                <div
                  key={url.shortCode}
                  className="p-6 hover:bg-[#DCFCE7] transition-colors cursor-pointer"
                  onClick={() => setSelectedUrl(url)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#16A34A] font-mono font-semibold">
                          /{url.shortCode}
                        </span>
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#14532D] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-gray-600 text-sm truncate mb-3">{url.originalUrl}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-gray-700">{url.totalClicks} clicks</span>
                        </div>
                        <span className="text-gray-500">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(url.shortCode);
                      }}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Panel (shown when a URL is selected) */}
        {selectedUrl && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Analytics for /{selectedUrl.shortCode}
              </h2>
              <button
                onClick={() => setSelectedUrl(null)}
                className="text-gray-600 hover:text-[#14532D] transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center text-gray-600 py-12">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-[#16A34A]" />
              <p className="text-lg mb-2">Detailed analytics coming soon!</p>
              <p className="text-sm">
                Total clicks: {selectedUrl.totalClicks}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

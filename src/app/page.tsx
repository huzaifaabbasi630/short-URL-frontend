'use client';

import { useState, useRef } from 'react';
import { Link2, Settings, Copy, Download, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import QRCode from '@/components/QRCode';
import { shortenUrl } from '@/lib/api';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customBackhalf, setCustomBackhalf] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleShorten = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const data = await shortenUrl({
        originalUrl: url,
        customBackhalf: customBackhalf || undefined,
      });
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert(error instanceof Error ? error.message : 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortenedUrl) {
      await navigator.clipboard.writeText(shortenedUrl);
      alert('Copied to clipboard!');
    }
  };

  const handleDownloadQR = () => {
    setShowQRModal(true);
  };

  const handleDownloadQRImage = () => {
    const canvas = qrRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#14532D]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Smart URL Shortener
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Ultra-fast link shortening with advanced analytics
          </p>

          {/* URL Shortener Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-6 py-4 bg-[#DCFCE7] border border-[#16A34A] rounded-xl text-[#14532D] placeholder-gray-500 focus:outline-none focus:border-[#16A34A] transition-colors"
              />
              <button
                onClick={handleShorten}
                disabled={loading || !url}
                className="px-8 py-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Link2 className="w-5 h-5" />
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </div>

            {/* Advanced Settings Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#14532D] transition-colors mb-4"
            >
              <Settings className="w-4 h-4" />
              <span>Advanced Settings</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Advanced Settings Panel */}
            {showAdvanced && (
              <div className="bg-[#DCFCE7] rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm text-[#14532D] mb-2">
                    Custom Backhalf (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="my-custom-link"
                    value={customBackhalf}
                    onChange={(e) => setCustomBackhalf(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#16A34A] rounded-lg text-[#14532D] placeholder-gray-500 focus:outline-none focus:border-[#16A34A] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#14532D] mb-2">
                      Link Expiry (optional)
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-4 py-3 bg-white border border-[#16A34A] rounded-lg text-[#14532D] focus:outline-none focus:border-[#16A34A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#14532D] mb-2">
                      Password Protection (optional)
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-4 py-3 bg-white border border-[#16A34A] rounded-lg text-[#14532D] placeholder-gray-500 focus:outline-none focus:border-[#16A34A] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Result Section */}
            {shortenedUrl && (
              <div className="mt-6 bg-[#DCFCE7] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-[#14532D] mb-1">Your shortened URL:</p>
                  <p className="text-[#16A34A] font-mono text-lg">{shortenedUrl}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 bg-white hover:bg-[#BBF7D0] border border-[#16A34A] rounded-lg transition-colors flex items-center gap-2 text-[#14532D]"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={handleDownloadQR}
                    className="px-6 py-3 bg-white hover:bg-[#BBF7D0] border border-[#16A34A] rounded-lg transition-colors flex items-center gap-2 text-[#14532D]"
                  >
                    <Download className="w-4 h-4" />
                    QR Code
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Link */}
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="text-[#16A34A] hover:text-[#15803D] transition-colors"
            >
              View Analytics Dashboard →
            </Link>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#14532D]">QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-600 hover:text-[#14532D] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-4 rounded-xl border border-[#16A34A]">
                <QRCode value={shortenedUrl} size={200} />
              </div>
              <button
                onClick={handleDownloadQRImage}
                className="w-full px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

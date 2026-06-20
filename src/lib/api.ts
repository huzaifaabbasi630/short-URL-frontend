const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ShortenUrlRequest {
  originalUrl: string;
  customBackhalf?: string;
}

export interface ShortenUrlResponse {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

export interface UrlData {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  totalClicks: number;
  createdAt: string;
}

export interface AnalyticsData {
  shortCode: string;
  timestamp: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  ipAddress: string;
}

export async function shortenUrl(
  data: ShortenUrlRequest
): Promise<ShortenUrlResponse> {
  const response = await fetch(`${API_URL}/api/v1/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to shorten URL');
  }

  return response.json();
}

export async function getUrls(): Promise<UrlData[]> {
  // This endpoint needs to be created in the backend
  const response = await fetch(`${API_URL}/api/v1/urls`);

  if (!response.ok) {
    throw new Error('Failed to fetch URLs');
  }

  return response.json();
}

export async function getAnalytics(shortCode: string): Promise<AnalyticsData[]> {
  // This endpoint needs to be created in the backend
  const response = await fetch(`${API_URL}/api/v1/analytics/${shortCode}`);

  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }

  return response.json();
}

export async function deleteUrl(shortCode: string): Promise<void> {
  // This endpoint needs to be created in the backend
  const response = await fetch(`${API_URL}/api/v1/urls/${shortCode}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete URL');
  }
}

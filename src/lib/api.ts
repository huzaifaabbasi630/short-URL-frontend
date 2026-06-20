import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://short-url-backend-orcin.vercel.app';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://halfurl.vercel.app';

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
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/shorten`, {
      originalUrl: data.originalUrl,
      customBackhalf: data.customBackhalf,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Update shortUrl to use backend domain for redirection
    const responseData = response.data;
    responseData.shortUrl = `${BACKEND_URL}/${responseData.shortCode}`;

    return responseData;
  } catch (error) {
    console.error('Error shortening URL:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to shorten URL');
    }
    throw new Error('Failed to shorten URL');
  }
}

export async function getUrls(): Promise<UrlData[]> {
  // This endpoint needs to be created in the backend
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/urls`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching URLs:', error);
    throw new Error('Failed to fetch URLs');
  }
}

export async function getAnalytics(shortCode: string): Promise<AnalyticsData[]> {
  // This endpoint needs to be created in the backend
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/analytics/${shortCode}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw new Error('Failed to fetch analytics');
  }
}

export async function deleteUrl(shortCode: string): Promise<void> {
  // This endpoint needs to be created in the backend
  try {
    await axios.delete(`${BACKEND_URL}/api/v1/urls/${shortCode}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error deleting URL:', error);
    throw new Error('Failed to delete URL');
  }
}

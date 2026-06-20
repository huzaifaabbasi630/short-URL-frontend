'use client';

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface AnalyticsData {
  timestamp: string;
  country: string;
  city: string;
  device: string;
  browser: string;
}

interface AnalyticsChartsProps {
  data: AnalyticsData[];
}

const COLORS = ['#02f5a1', '#01d486', '#00c476', '#00b466', '#00a456'];

export default function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  // Process data for clicks over time chart
  const clicksOverTime = data.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const existing = acc.find((d) => d.date === date);
    if (existing) {
      existing.clicks += 1;
    } else {
      acc.push({ date, clicks: 1 });
    }
    return acc;
  }, [] as { date: string; clicks: number }[]);

  // Process data for device breakdown
  const deviceBreakdown = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.device === item.device);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ device: item.device, value: 1 });
    }
    return acc;
  }, [] as { device: string; value: number }[]);

  // Process data for browser breakdown
  const browserBreakdown = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.browser === item.browser);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ browser: item.browser, value: 1 });
    }
    return acc;
  }, [] as { browser: string; value: number }[]);

  // Process data for geo distribution
  const geoDistribution = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.country === item.country);
    if (existing) {
      existing.clicks += 1;
    } else {
      acc.push({ country: item.country, clicks: 1 });
    }
    return acc;
  }, [] as { country: string; clicks: number }[])
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10);

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>No analytics data available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Clicks Over Time */}
      <div className="bg-[#0a2a33] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Clicks Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={clicksOverTime}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#02f5a1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#02f5a1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2f35" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a2f35',
                border: '1px solid #2a3f45',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#02f5a1"
              fillOpacity={1}
              fill="url(#colorClicks)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a2a33] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ device, percent }) =>
                  `${device}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2f35',
                  border: '1px solid #2a3f45',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0a2a33] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Browser Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={browserBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ browser, percent }) =>
                  `${browser}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {browserBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2f35',
                  border: '1px solid #2a3f45',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geo Location Distribution */}
      <div className="bg-[#0a2a33] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={geoDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2f35" />
            <XAxis
              dataKey="country"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a2f35',
                border: '1px solid #2a3f45',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="clicks" fill="#02f5a1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

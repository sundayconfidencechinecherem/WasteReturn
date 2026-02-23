// app/admin/reports/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Truck,
  Recycle,
  Award,
  DollarSign,
  FileText,
  Filter,
  Printer
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock report data
const mockReports = {
  overview: {
    totalUsers: 12453,
    newUsers: 342,
    activeDrivers: 48,
    totalPickups: 3452,
    wasteCollected: 45280, // kg
    recyclingRate: 68,
    pointsIssued: 1250000,
    cashPaid: 625000,
    revenue: 1250000,
    expenses: 875000,
    profit: 375000,
  },
  trends: {
    users: { value: 12, direction: 'up' },
    pickups: { value: 8, direction: 'up' },
    waste: { value: 15, direction: 'up' },
    recycling: { value: 5, direction: 'up' },
  },
  topCategories: [
    { name: 'Plastics', amount: 15200, percentage: 33.6 },
    { name: 'Aluminum', amount: 8900, percentage: 19.7 },
    { name: 'Paper', amount: 7600, percentage: 16.8 },
    { name: 'Glass', amount: 5400, percentage: 11.9 },
    { name: 'Electronics', amount: 4200, percentage: 9.3 },
    { name: 'Others', amount: 3980, percentage: 8.7 },
  ],
  topDrivers: [
    { name: 'Segun Adeleke', pickups: 145, rating: 4.8, earnings: 187500 },
    { name: 'Musa Kabir', pickups: 132, rating: 4.9, earnings: 165000 },
    { name: 'Emeka Okafor', pickups: 128, rating: 4.6, earnings: 152000 },
    { name: 'Blessing John', pickups: 98, rating: 4.7, earnings: 122500 },
  ],
  monthlyData: [
    { month: 'Jan', pickups: 245, users: 320, waste: 3850 },
    { month: 'Feb', pickups: 278, users: 345, waste: 4120 },
    { month: 'Mar', pickups: 312, users: 378, waste: 4450 },
    { month: 'Apr', pickups: 298, users: 392, waste: 4280 },
    { month: 'May', pickups: 334, users: 415, waste: 4720 },
    { month: 'Jun', pickups: 356, users: 438, waste: 4980 },
  ],
};

type ReportType = 'overview' | 'financial' | 'operations' | 'environmental';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('overview');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Reports & Analytics</h1>
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              <Button variant="outline" onClick={handleExport} isLoading={isExporting} className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>

          {/* Report Type Tabs */}
          <div className="flex gap-4 mt-4">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'financial', label: 'Financial', icon: DollarSign },
              { id: 'operations', label: 'Operations', icon: Truck },
              { id: 'environmental', label: 'Environmental', icon: Recycle },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 pb-2 px-1 ${
                  reportType === tab.id
                    ? 'border-b-2 border-[#1976D2] text-[#1976D2] font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => setReportType(tab.id as ReportType)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {reportType === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className={`text-xs flex items-center ${
                      mockReports.trends.users.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {mockReports.trends.users.direction === 'up' ? '+' : '-'}{mockReports.trends.users.value}%
                      {mockReports.trends.users.direction === 'up' ? 
                        <TrendingUp className="w-3 h-3 ml-1" /> : 
                        <TrendingDown className="w-3 h-3 ml-1" />
                      }
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{mockReports.overview.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Users</p>
                  <p className="text-xs text-green-600 mt-1">+{mockReports.overview.newUsers} this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Truck className="w-5 h-5 text-green-500" />
                    <span className="text-xs flex items-center text-green-600">
                      +{mockReports.trends.pickups.value}% <TrendingUp className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{mockReports.overview.totalPickups.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Pickups</p>
                  <p className="text-xs text-gray-500 mt-1">{mockReports.overview.activeDrivers} active drivers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Recycle className="w-5 h-5 text-orange-500" />
                    <span className="text-xs flex items-center text-green-600">
                      +{mockReports.trends.waste.value}% <TrendingUp className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{(mockReports.overview.wasteCollected / 1000).toFixed(1)}t</p>
                  <p className="text-xs text-gray-500">Waste Collected</p>
                  <p className="text-xs text-green-600 mt-1">{mockReports.overview.recyclingRate}% recycling rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                    <span className="text-xs flex items-center text-green-600">
                      +{mockReports.trends.recycling.value}% <TrendingUp className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold">₦{(mockReports.overview.profit / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Net Profit</p>
                  <p className="text-xs text-gray-500 mt-1">Revenue: ₦{(mockReports.overview.revenue / 1000).toFixed(1)}k</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {mockReports.monthlyData.map((data) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-[#1976D2] rounded-t"
                            style={{ height: `${(data.pickups / 400) * 100}px` }}
                          />
                          <div 
                            className="w-full bg-green-500 rounded-t"
                            style={{ height: `${(data.waste / 5000) * 80}px` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{data.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#1976D2] rounded" />
                      <span className="text-xs">Pickups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span className="text-xs">Waste (kg)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Waste Composition */}
              <Card>
                <CardHeader>
                  <CardTitle>Waste Composition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReports.topCategories.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.name}</span>
                          <span className="font-medium">{(cat.amount / 1000).toFixed(1)}t ({cat.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-[#1976D2]" 
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Drivers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.topDrivers.map((driver, index) => (
                    <div key={driver.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1976D2]/10 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{driver.pickups} pickups</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-yellow-500">★ {driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₦{driver.earnings.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">earnings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {reportType === 'financial' && (
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₦{(mockReports.overview.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₦{(mockReports.overview.expenses / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-red-600 mt-1">+8% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Profit</p>
                  <p className="text-2xl font-bold text-blue-600">₦{(mockReports.overview.profit / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-green-600 mt-1">+22% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Points Paid</p>
                  <p className="text-2xl font-bold text-purple-600">{(mockReports.overview.pointsIssued / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500 mt-1">≈ ₦{(mockReports.overview.cashPaid / 1000).toFixed(1)}k</p>
                </CardContent>
              </Card>
            </div>

            {/* Financial Reports List */}
            <Card>
              <CardHeader>
                <CardTitle>Available Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Monthly Revenue Report', date: 'Feb 2026', size: '2.4 MB', type: 'PDF' },
                    { name: 'Expense Breakdown', date: 'Feb 2026', size: '1.8 MB', type: 'Excel' },
                    { name: 'Driver Payout Summary', date: 'Feb 2026', size: '1.2 MB', type: 'PDF' },
                    { name: 'Points Liability Report', date: 'Feb 2026', size: '0.9 MB', type: 'Excel' },
                    { name: 'Tax Summary Q1 2026', date: 'Jan 2026', size: '3.1 MB', type: 'PDF' },
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Download {report.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {reportType === 'operations' && (
          <div className="space-y-6">
            {/* Operations Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Avg. Pickup Time</p>
                  <p className="text-2xl font-bold">24 min</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Driver Efficiency</p>
                  <p className="text-2xl font-bold">12.5/driver</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Customer Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">4.7 ★</p>
                </CardContent>
              </Card>
            </div>

            {/* Operations Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Operations Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Driver Performance Report', date: 'Feb 2026', size: '1.5 MB' },
                    { name: 'Route Efficiency Analysis', date: 'Feb 2026', size: '2.1 MB' },
                    { name: 'Pickup Completion Metrics', date: 'Feb 2026', size: '0.8 MB' },
                    { name: 'Vehicle Utilization Report', date: 'Feb 2026', size: '1.3 MB' },
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {reportType === 'environmental' && (
          <div className="space-y-6">
            {/* Environmental Impact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">CO2 Prevented</p>
                  <p className="text-2xl font-bold text-green-600">45.2t</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Trees Saved</p>
                  <p className="text-2xl font-bold">1,245</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Energy Saved</p>
                  <p className="text-2xl font-bold">234 MWh</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">Water Saved</p>
                  <p className="text-2xl font-bold">156k L</p>
                </CardContent>
              </Card>
            </div>

            {/* Environmental Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Carbon Footprint Report', date: 'Feb 2026', size: '1.2 MB' },
                    { name: 'Recycling Impact Analysis', date: 'Feb 2026', size: '1.8 MB' },
                    { name: 'Sustainability Metrics', date: 'Feb 2026', size: '2.0 MB' },
                    { name: 'Waste Diversion Report', date: 'Feb 2026', size: '1.1 MB' },
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
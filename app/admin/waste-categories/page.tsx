// app/admin/waste-categories/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus,
  Edit,
  Trash2,
  Recycle,
  AlertCircle,
  Package,
  DollarSign,
  GripVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

// Mock waste categories
const mockCategories = [
  {
    id: 'cat1',
    name: 'Recyclable',
    color: '#1976D2',
    icon: '♻️',
    types: 8,
    totalCollected: 28500,
    active: true
  },
  {
    id: 'cat2',
    name: 'Organic',
    color: '#2E7D32',
    icon: '🍃',
    types: 4,
    totalCollected: 12300,
    active: true
  },
  {
    id: 'cat3',
    name: 'Hazardous',
    color: '#C62828',
    icon: '⚠️',
    types: 5,
    totalCollected: 3200,
    active: true
  },
  {
    id: 'cat4',
    name: 'E-Waste',
    color: '#7B1FA2',
    icon: '📱',
    types: 6,
    totalCollected: 8900,
    active: true
  },
  {
    id: 'cat5',
    name: 'Residual',
    color: '#757575',
    icon: '🗑️',
    types: 3,
    totalCollected: 5600,
    active: false
  },
];

const mockWasteTypes = [
  {
    id: 'wt1',
    name: 'PET Plastics',
    category: 'Recyclable',
    basePoints: 40,
    icon: '🧴',
    instructions: ['Remove labels', 'Rinse', 'Crush'],
    active: true,
    collected: 8500
  },
  {
    id: 'wt2',
    name: 'Aluminum Cans',
    category: 'Recyclable',
    basePoints: 100,
    icon: '🥫',
    instructions: ['Rinse', 'Crush'],
    active: true,
    collected: 6200
  },
  {
    id: 'wt3',
    name: 'Cardboard',
    category: 'Recyclable',
    basePoints: 20,
    icon: '📦',
    instructions: ['Flatten', 'Keep dry'],
    active: true,
    collected: 7800
  },
  {
    id: 'wt4',
    name: 'Glass - Clear',
    category: 'Recyclable',
    basePoints: 10,
    icon: '🥤',
    instructions: ['Rinse', 'Remove lids'],
    active: true,
    collected: 4300
  },
  {
    id: 'wt5',
    name: 'Electronics',
    category: 'E-Waste',
    basePoints: 200,
    icon: '📱',
    instructions: ['Remove batteries', 'Keep intact'],
    active: true,
    collected: 2100
  },
  {
    id: 'wt6',
    name: 'Food Scraps',
    category: 'Organic',
    basePoints: 5,
    icon: '🍎',
    instructions: ['No packaging', 'Keep separate'],
    active: true,
    collected: 8900
  },
];

export default function AdminWasteCategoriesPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'types'>('categories');
  const [search, setSearch] = useState('');

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
              <h1 className="text-xl font-semibold">Waste Categories</h1>
            </div>
            <Button variant="primary" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              className={`pb-2 px-1 ${
                activeTab === 'categories'
                  ? 'border-b-2 border-[#1976D2] text-[#1976D2] font-medium'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === 'types'
                  ? 'border-b-2 border-[#1976D2] text-[#1976D2] font-medium'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('types')}
            >
              Waste Types
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {activeTab === 'categories' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.types} waste types</p>
                      </div>
                    </div>
                    <Badge variant={category.active ? 'success' : 'default'}>
                      {category.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Collected</span>
                      <span className="font-bold">{(category.totalCollected / 1000).toFixed(1)}t</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Color Code</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-xs font-mono">{category.color}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-red-500">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points/kg</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockWasteTypes.map((type) => (
                      <tr key={type.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{type.icon}</span>
                            <span className="font-medium">{type.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={
                            type.category === 'Recyclable' ? 'recyclable' :
                            type.category === 'Organic' ? 'organic' :
                            type.category === 'E-Waste' ? 'electronic' : 'default'
                          }>
                            {type.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-bold text-green-600">{type.basePoints}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {type.instructions.slice(0, 2).map((inst, i) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {inst}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(type.collected / 1000).toFixed(1)}t
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={type.active ? 'success' : 'default'}>
                            {type.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
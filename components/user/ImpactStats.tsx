// components/user/ImpactStats.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Leaf, TreesIcon as TreePine, Droplet, Cloud } from 'lucide-react';

interface ImpactStatsProps {
  totalRecycled: number; // in kg
  treesSaved: number;
  waterSaved: number; // in liters
  co2Prevented: number; // in kg
}

export function ImpactStats({ totalRecycled, treesSaved, waterSaved, co2Prevented }: ImpactStatsProps) {
  const stats = [
    {
      label: 'Recycled',
      value: `${totalRecycled} kg`,
      icon: Leaf,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Trees Saved',
      value: treesSaved,
      icon: TreePine,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      label: 'Water Saved',
      value: `${waterSaved}L`,
      icon: Droplet,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'CO₂ Prevented',
      value: `${co2Prevented} kg`,
      icon: Cloud,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Your Environmental Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`${stat.bg} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
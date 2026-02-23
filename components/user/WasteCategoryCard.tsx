// components/user/WasteCategoryCard.tsx
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WasteType } from '@/lib/types';

interface WasteCategoryCardProps {
  wasteType: WasteType;
  onSelect?: () => void;
  selected?: boolean;
}

export function WasteCategoryCard({ wasteType, onSelect, selected }: WasteCategoryCardProps) {
  const categoryColor = {
    recyclable: '#1976D2',
    organic: '#2E7D32',
    hazardous: '#C62828',
    electronic: '#7B1FA2',
    residual: '#757575',
  }[wasteType.category] || '#1976D2';

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selected ? 'ring-2 ring-[#1976D2]' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            {wasteType.icon}
          </div>
          <Badge variant={wasteType.category}>
            {wasteType.basePointsPerKg} pts/kg
          </Badge>
        </div>

        <h3 className="font-semibold mb-1">{wasteType.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{wasteType.description}</p>

        <div className="space-y-1">
          {wasteType.sortingInstructions.slice(0, 2).map((instruction, i) => (
            <p key={i} className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              {instruction}
            </p>
          ))}
        </div>

        {wasteType.requiresSpecialHandling && (
          <Badge variant="hazardous" className="mt-2">
            Special Handling Required
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
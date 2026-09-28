import React from 'react';
import * as Icons from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  color?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-4 h-4', color }) => {
  // Map icon name to Lucide component
  const IconComponent = (Icons as any)[name] || Icons.CircleDollarSign;

  return <IconComponent className={className} style={color ? { color } : undefined} />;
};

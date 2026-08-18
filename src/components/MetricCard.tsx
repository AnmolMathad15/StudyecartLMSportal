import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  value,
  label,
  iconColor = 'text-[#006B47]',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#BDCAC0]/70 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-xs transition-all ${
        onClick ? 'cursor-pointer hover:border-[#006B47]' : ''
      }`}
    >
      <Icon className={`w-6 h-6 ${iconColor} mb-2 opacity-85`} />
      <span className="font-bold text-3xl md:text-4xl text-[#191c1e] leading-none mb-1.5 tracking-tight font-display">
        {value}
      </span>
      <span className="text-[11px] font-bold text-[#404943] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

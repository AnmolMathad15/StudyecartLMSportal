import React from 'react';
import { useLms } from '../context/LmsContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useLms();

  if (!toastMessage) return null;

  const bgColors = {
    success: 'bg-[#005034] text-white border-[#8DF7C1]/40',
    error: 'bg-[#BA1A1A] text-white border-[#ffdad6]/40',
    info: 'bg-[#191c1e] text-white border-[#BDCAC0]/40'
  };

  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  const Icon = Icons[toastMessage.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium ${
          bgColors[toastMessage.type]
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span>{toastMessage.text}</span>
      </div>
    </div>
  );
};

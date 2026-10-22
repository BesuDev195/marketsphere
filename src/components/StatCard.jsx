import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  subtext,
  colorScheme = 'sky',
}) => {
  const colorMap = {
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">{title}</span>
        {Icon && (
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${colorMap[colorScheme] || colorMap.sky}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      <div className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1 sm:mb-2 truncate">
        {value}
      </div>

      <div className="flex items-center gap-2 text-xs">
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded ${
              trend === 'up'
                ? 'bg-emerald-100 text-emerald-800'
                : trend === 'down'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'neutral' && <Minus className="w-3 h-3" />}
            {change}
          </span>
        )}
        {subtext && <span className="text-slate-400 truncate">{subtext}</span>}
      </div>
    </div>
  );
};

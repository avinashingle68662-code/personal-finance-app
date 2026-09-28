import React, { useState } from 'react';
import {
  Coffee,
  Utensils,
  ShoppingCart,
  Fuel,
  Sparkles,
  Zap,
  Film,
  PlusCircle,
  CheckCircle2,
  TrendingUp,
  X
} from 'lucide-react';
import { Transaction } from '../types/finance';
import { formatCurrency } from '../utils/financeCalculations';

interface QuickLogBarProps {
  onQuickLog: (transaction: Omit<Transaction, 'id'>) => void;
  currency: string;
  onOpenFullModal: () => void;
}

export const QuickLogBar: React.FC<QuickLogBarProps> = ({
  onQuickLog,
  currency,
  onOpenFullModal,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const presets = [
    {
      label: 'Coffee & Snack',
      amount: 5,
      type: 'expense' as const,
      categoryId: 'cat-dining',
      categoryName: 'Dining & Delivery',
      isDiscretionary: true,
      icon: Coffee,
      color: '#F59E0B',
    },
    {
      label: 'Lunch / Takeout',
      amount: 16,
      type: 'expense' as const,
      categoryId: 'cat-dining',
      categoryName: 'Dining & Delivery',
      isDiscretionary: true,
      icon: Utensils,
      color: '#F59E0B',
    },
    {
      label: 'Grocery Run',
      amount: 45,
      type: 'expense' as const,
      categoryId: 'cat-groceries',
      categoryName: 'Groceries & Household',
      isDiscretionary: false,
      icon: ShoppingCart,
      color: '#2563EB',
    },
    {
      label: 'Gas / Transit',
      amount: 35,
      type: 'expense' as const,
      categoryId: 'cat-transport',
      categoryName: 'Transport & Fuel',
      isDiscretionary: false,
      icon: Fuel,
      color: '#60A5FA',
    },
    {
      label: 'Streaming / Sub',
      amount: 15,
      type: 'expense' as const,
      categoryId: 'cat-subscriptions',
      categoryName: 'Tech & Subscriptions',
      isDiscretionary: true,
      icon: Film,
      color: '#8B5CF6',
    },
    {
      label: 'Electric / Utility',
      amount: 65,
      type: 'expense' as const,
      categoryId: 'cat-utilities',
      categoryName: 'Utilities & Internet',
      isDiscretionary: false,
      icon: Zap,
      color: '#1D4ED8',
    },
    {
      label: 'Side Gig Income',
      amount: 150,
      type: 'income' as const,
      categoryId: 'cat-freelance',
      categoryName: 'Freelance & Client Work',
      isDiscretionary: false,
      icon: TrendingUp,
      color: '#10B981',
    },
  ];

  const handlePresetClick = (p: typeof presets[0]) => {
    const today = new Date().toISOString().slice(0, 10);
    onQuickLog({
      type: p.type,
      amount: p.amount,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      date: today,
      description: p.label,
      isDiscretionary: p.isDiscretionary,
      isRecurring: false,
    });

    setToastMessage(`Logged: ${p.label} (${p.type === 'income' ? '+' : '-'}${currency}${p.amount})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bar Container */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block leading-tight">
              1-Tap Quick Log
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:block">
              Record frequent expenses with 1 click
            </span>
          </div>
        </div>

        {/* Horizontal Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1 max-w-full">
          {presets.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => handlePresetClick(p)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/70 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 group shrink-0"
                title={`Instantly log ${p.label} (${currency}${p.amount})`}
              >
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px] shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  <Icon className="w-2.5 h-2.5" />
                </div>
                <span>{p.label}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600">
                  {p.type === 'income' ? '+' : '-'}{currency}{p.amount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Full Modal Trigger */}
        <button
          onClick={onOpenFullModal}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95 shrink-0 whitespace-nowrap"
        >
          <PlusCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Custom Entry</span>
        </button>
      </div>
    </div>
  );
};

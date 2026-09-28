import React, { useState } from 'react';
import {
  PieChart,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Edit2,
  Save,
  X,
  Plus
} from 'lucide-react';
import { CATEGORIES } from '../data/seedData';
import { FinancialPersona } from '../types/finance';
import { formatCurrency, formatPercent, MonthlyFinancialSummary } from '../utils/financeCalculations';
import { CategoryIcon } from './CategoryIcon';

interface BudgetPlannerViewProps {
  budgets: Record<string, number>;
  onUpdateBudgets: (newBudgets: Record<string, number>) => void;
  summary: MonthlyFinancialSummary;
  currentPersona: FinancialPersona;
  currency: string;
  onAskAI: (prompt: string) => void;
}

export const BudgetPlannerView: React.FC<BudgetPlannerViewProps> = ({
  budgets,
  onUpdateBudgets,
  summary,
  currentPersona,
  currency,
  onAskAI,
}) => {
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<string>('');
  const [newCatId, setNewCatId] = useState<string>('');
  const [newLimit, setNewLimit] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  const expenseCategories = CATEGORIES.filter(c => c.type === 'expense');

  const totalBudgeted = Object.values(budgets).reduce((sum, val) => sum + (val || 0), 0);
  const unbudgetedSurplus = summary.totalIncome - totalBudgeted;

  const handleStartEdit = (catId: string, currentVal: number) => {
    setEditingCatId(catId);
    setEditAmount(currentVal.toString());
  };

  const handleSaveEdit = (catId: string) => {
    const num = parseFloat(editAmount);
    if (!isNaN(num) && num >= 0) {
      onUpdateBudgets({
        ...budgets,
        [catId]: num,
      });
    }
    setEditingCatId(null);
  };

  const handleAddBudget = () => {
    const num = parseFloat(newLimit);
    if (newCatId && !isNaN(num) && num > 0) {
      onUpdateBudgets({
        ...budgets,
        [newCatId]: num,
      });
      setNewCatId('');
      setNewLimit('');
      setIsAddingNew(false);
    }
  };

  // Group budgets by Needs, Wants, Savings
  const categoriesWithBudgets = expenseCategories
    .filter(c => (budgets[c.id] !== undefined && budgets[c.id] > 0) || (summary.categorySpending[c.id] || 0) > 0)
    .map(c => {
      const budget = budgets[c.id] || 0;
      const spent = summary.categorySpending[c.id] || 0;
      const diff = budget - spent;
      const percent = budget > 0 ? Math.round((spent / budget) * 100) : spent > 0 ? 999 : 0;

      return {
        ...c,
        budget,
        spent,
        diff,
        percent,
      };
    });

  const getProgressColor = (percent: number) => {
    if (percent > 100) return 'bg-rose-500 text-rose-500';
    if (percent >= 80) return 'bg-amber-500 text-amber-500';
    return 'bg-emerald-500 text-emerald-500';
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Monthly Budget Blueprint
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {currentPersona.headline}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Compare actual category expenditures against planned caps. Overspending triggers automated alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onAskAI('Generate 50/30/20 budget plan with exact category numbers')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Auto-Generate Budget
          </button>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Category Cap
          </button>
        </div>
      </div>

      {/* Add New Budget Bar */}
      {isAddingNew && (
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Category
            </label>
            <select
              value={newCatId}
              onChange={e => setNewCatId(e.target.value)}
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
            >
              <option value="">-- Choose Category --</option>
              {expenseCategories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.group})
                </option>
              ))}
            </select>
          </div>

          <div className="w-40">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
              Monthly Limit ({currency})
            </label>
            <input
              type="number"
              value={newLimit}
              onChange={e => setNewLimit(e.target.value)}
              placeholder="e.g. 350"
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
            />
          </div>

          <div className="flex items-end gap-2 pt-4">
            <button
              onClick={handleAddBudget}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
            >
              Save Limit
            </button>
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-xl text-slate-500 text-xs hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
            Total Monthly Income
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(summary.totalIncome, currency)}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
            Total Budgeted Limits
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(totalBudgeted, currency)}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {Math.round((totalBudgeted / (summary.totalIncome || 1)) * 100)}% of income allocated
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
            Unallocated / Savings Buffer
          </span>
          <span className={`text-xl font-bold ${unbudgetedSurplus >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600'}`}>
            {formatCurrency(unbudgetedSurplus, currency)}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            {unbudgetedSurplus >= 0 ? 'Available for emergency or investments' : 'Overbudgeted across categories'}
          </span>
        </div>
      </div>

      {/* Category Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoriesWithBudgets.map(cat => {
          const isOver = cat.spent > cat.budget;
          const isEditing = editingCatId === cat.id;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border transition ${
                isOver
                  ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                  >
                    <CategoryIcon name={cat.icon} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                        {cat.group}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isOver && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 whitespace-nowrap">
                      <AlertTriangle className="w-3 h-3" /> Over by {formatCurrency(cat.spent - cat.budget, currency)}
                    </span>
                  )}

                  {!isEditing ? (
                    <button
                      onClick={() => handleStartEdit(cat.id, cat.budget)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Edit limit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSaveEdit(cat.id)}
                        className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingCatId(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 my-2.5 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    cat.percent > 100
                      ? 'bg-rose-500'
                      : cat.percent >= 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, cat.percent)}%` }}
                />
              </div>

              {/* Metrics footer */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <span className="text-slate-400 text-[11px]">Spent: </span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {formatCurrency(cat.spent, currency)}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Limit: </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={e => setEditAmount(e.target.value)}
                      className="w-20 px-1.5 py-0.5 text-xs border rounded-sm font-semibold inline-block"
                      autoFocus
                    />
                  ) : (
                    <strong className="text-slate-800 dark:text-slate-200">
                      {formatCurrency(cat.budget, currency)}
                    </strong>
                  )}
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({cat.percent}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Target,
  ShieldCheck,
  PlusCircle,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { SavingsGoal } from '../types/finance';
import { formatCurrency, MonthlyFinancialSummary } from '../utils/financeCalculations';
import { CategoryIcon } from './CategoryIcon';

interface SavingsGoalsViewProps {
  goals: SavingsGoal[];
  onUpdateGoals: (goals: SavingsGoal[]) => void;
  summary: MonthlyFinancialSummary;
  currency: string;
}

export const SavingsGoalsView: React.FC<SavingsGoalsViewProps> = ({
  goals,
  onUpdateGoals,
  summary,
  currency,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [contributeGoalId, setContributeGoalId] = useState<string | null>(null);
  const [contributeAmount, setContributeAmount] = useState<string>('100');

  // New Goal Form State
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('2027-12-31');
  const [category, setCategory] = useState('Emergency');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [monthlyContribution, setMonthlyContribution] = useState('200');

  // Calculate Emergency Fund Stats
  const totalEssentialMonthly = summary.needsSpent > 0 ? summary.needsSpent : 2000;
  const emergencyGoal = goals.find(g => g.category.toLowerCase().includes('emergency') || g.name.toLowerCase().includes('emergency'));
  const currentEmergencyCash = emergencyGoal ? emergencyGoal.currentAmount : 5000;
  const runwayMonths = (currentEmergencyCash / totalEssentialMonthly).toFixed(1);

  const handleContribute = (goalId: string) => {
    const addVal = parseFloat(contributeAmount);
    if (isNaN(addVal) || addVal <= 0) return;

    const updated = goals.map(g => {
      if (g.id === goalId) {
        const newAmt = g.currentAmount + addVal;
        if (newAmt >= g.targetAmount) {
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
        return { ...g, currentAmount: newAmt };
      }
      return g;
    });

    onUpdateGoals(updated);
    setContributeGoalId(null);
    setContributeAmount('100');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const tAmount = parseFloat(targetAmount);
    const cAmount = parseFloat(currentAmount) || 0;
    const mContribution = parseFloat(monthlyContribution) || 100;

    if (!name.trim() || isNaN(tAmount) || tAmount <= 0) return;

    const newGoal: SavingsGoal = {
      id: `g-${Date.now()}`,
      name: name.trim(),
      targetAmount: tAmount,
      currentAmount: cAmount,
      targetDate,
      category,
      priority,
      monthlyContribution: mContribution,
      icon: 'Target',
    };

    onUpdateGoals([...goals, newGoal]);
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Fund Runway Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900/90 via-slate-900 to-emerald-950 text-white shadow-lg border border-teal-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Liquid Runway Metric
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-200">
                {runwayMonths} Months Safe
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Emergency Reserve: {formatCurrency(currentEmergencyCash, currency)}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Based on your essential monthly baseline of {formatCurrency(totalEssentialMonthly, currency)}/mo. Standard target is 3 to 6 months.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Goal
        </button>
      </div>

      {/* Add Goal Modal / Drawer */}
      {isAdding && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Define New Savings Target
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateGoal} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Goal Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Vacation to Europe, Tech Upgrade"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Target Amount ({currency}) *
              </label>
              <input
                type="number"
                required
                value={targetAmount}
                onChange={e => setTargetAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Already Saved ({currency})
              </label>
              <input
                type="number"
                value={currentAmount}
                onChange={e => setCurrentAmount(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Target Deadline Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              >
                <option value="Emergency">Emergency Buffer</option>
                <option value="Real Estate">Home & Real Estate</option>
                <option value="Travel">Travel & Vacation</option>
                <option value="Tech">Tech & Gadgets</option>
                <option value="Education">Education & Family</option>
                <option value="Other">Other Milestone</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Planned Monthly Contribution ({currency})
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={e => setMonthlyContribution(e.target.value)}
                placeholder="200"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 shadow-sm"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map(goal => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
          const monthsLeft = goal.monthlyContribution > 0 ? Math.ceil(remaining / goal.monthlyContribution) : 0;
          const isComplete = percent >= 100;

          return (
            <div
              key={goal.id}
              className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                isComplete
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {goal.category}
                  </span>
                  <span className={`text-xs font-bold ${isComplete ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
                    {percent}% {isComplete && '🎉 Done'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                  {goal.name}
                </h3>

                {goal.notes && (
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    {goal.notes}
                  </p>
                )}

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 my-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-slate-900 dark:text-slate-100">
                    {formatCurrency(goal.currentAmount, currency)}
                  </span>
                  <span className="text-slate-400">
                    Target: {formatCurrency(goal.targetAmount, currency)}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <span>Deadline:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{goal.targetDate}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="shrink-0">Pace:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300 text-right">
                      {formatCurrency(goal.monthlyContribution, currency)}/mo {monthsLeft > 0 ? `(~${monthsLeft} mos)` : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {contributeGoalId === goal.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={contributeAmount}
                      onChange={e => setContributeAmount(e.target.value)}
                      placeholder="Amount"
                      className="w-24 px-2 py-1 text-xs border rounded-lg"
                      autoFocus
                    />
                    <button
                      onClick={() => handleContribute(goal.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => setContributeGoalId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setContributeGoalId(goal.id);
                      setContributeAmount('100');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    Contribute Savings
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

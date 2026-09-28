import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Calendar,
  Layers,
  Target
} from 'lucide-react';
import {
  FinancialHealthScore,
  FinancialPersona,
  Transaction,
  UserFinanceState
} from '../types/finance';
import {
  formatCurrency,
  formatPercent,
  MonthlyFinancialSummary
} from '../utils/financeCalculations';
import { CategoryIcon } from './CategoryIcon';
import { QuickLogBar } from './QuickLogBar';

interface DashboardViewProps {
  state: UserFinanceState;
  summary: MonthlyFinancialSummary;
  healthScore: FinancialHealthScore;
  currentPersona: FinancialPersona;
  currency: string;
  onOpenTransactionModal: () => void;
  onNavigateTab: (tab: string) => void;
  onQuickAskAdvisor: (topic: string) => void;
  onQuickLog: (transaction: Omit<Transaction, 'id'>) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  summary,
  healthScore,
  currentPersona,
  currency,
  onOpenTransactionModal,
  onNavigateTab,
  onQuickAskAdvisor,
  onQuickLog,
}) => {
  const recentTransactions = state.transactions.slice(0, 6);

  const getHealthBadge = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return { label: 'Excellent Health', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400' };
      case 'B':
        return { label: 'Good Stability', color: 'text-blue-600 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400' };
      case 'C':
        return { label: 'Needs Rebalancing', color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400' };
      default:
        return { label: 'High Caution', color: 'text-rose-600 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400' };
    }
  };

  const healthBadge = getHealthBadge(healthScore.grade);

  return (
    <div className="space-y-6">
      {/* Persona Context Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900/90 via-slate-900 to-teal-950 text-white shadow-lg border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                {currentPersona.scenarioNumber > 0 ? `Scenario ${currentPersona.scenarioNumber}` : 'Custom Profile'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight break-words">
                {currentPersona.headline}: {currentPersona.name}
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {currentPersona.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onQuickAskAdvisor('audit spending')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-sm shadow-emerald-500/30 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Audit
            </button>
            <button
              onClick={() => onQuickAskAdvisor('budget plan')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition border border-white/15 cursor-pointer"
            >
              <PieChart className="w-3.5 h-3.5" />
              50/30/20 Plan
            </button>
            <button
              onClick={() => onNavigateTab('scenarios')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
            >
              Scenario Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 1-Tap Quick Log Preset Bar for Effortless Tracking */}
      <QuickLogBar
        onQuickLog={onQuickLog}
        currency={currency}
        onOpenFullModal={onOpenTransactionModal}
      />

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Income */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Income (Sep 2026)</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
            {formatCurrency(summary.totalIncome, currency)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Target: {formatCurrency(currentPersona.monthlyIncomeTarget, currency)}</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Total Expenses</span>
            <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
            {formatCurrency(summary.totalExpense, currency)}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500">
            <span>Needs: <strong className="text-slate-700 dark:text-slate-300">{formatCurrency(summary.needsSpent, currency)}</strong></span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Wants: <strong className="text-slate-700 dark:text-slate-300">{formatCurrency(summary.wantsSpent, currency)}</strong></span>
          </div>
        </div>

        {/* Net Savings Surplus */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Net Monthly Surplus</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              summary.netSavings >= 0 ? 'bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'
            }`}>
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold tracking-tight truncate ${summary.netSavings >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600'}`}>
            {formatCurrency(summary.netSavings, currency)}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 leading-tight">
            {summary.netSavings >= 0 ? 'Surplus ready for emergency buffer & goals' : 'Operating at an immediate cash deficit!'}
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs min-w-0">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Savings Rate</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight truncate">
            {formatPercent(summary.savingsRate)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 gap-1">
            <span className="shrink-0">Target: 20%+</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
              {summary.savingsRate >= 20 ? '✅ Above Target' : '⚠️ Below Target'}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Health Scorecard & 50/30/20 Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Scorecard (1 col) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Financial Health Score
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${healthBadge.color}`}>
                Grade {healthScore.grade}
              </span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500 flex flex-col items-center justify-center shadow-inner shrink-0">
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-none">
                  {healthScore.totalScore}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                  / 100
                </span>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {healthBadge.label}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  Emergency Buffer: <strong>{healthScore.emergencyMonthsBuffer} mos</strong> living baseline.
                </div>
                <div className="text-[11px] text-slate-500">
                  Savings Rate: <strong>{Math.round(healthScore.savingsRatePercent)}%</strong> of monthly income.
                </div>
              </div>
            </div>

            {/* Sub-score bars */}
            <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Savings Rate (&gt;20%)</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{healthScore.savingsRateScore}/25</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(healthScore.savingsRateScore / 25) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Budget Discipline</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{healthScore.budgetDisciplineScore}/25</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(healthScore.budgetDisciplineScore / 25) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Emergency Fund Buffer</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{healthScore.emergencyBufferScore}/25</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${(healthScore.emergencyBufferScore / 25) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Discretionary Wants (&lt;30%)</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{healthScore.discretionaryRatioScore}/25</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(healthScore.discretionaryRatioScore / 25) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onQuickAskAdvisor('audit spending')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              View Personalized AI Health Report
            </button>
          </div>
        </div>

        {/* 50/30/20 Visual Allocation & Overspending Alerts (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 50/30/20 Framework */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3 gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  50 / 30 / 20 Budget Allocation Meter
                </h3>
                <p className="text-xs text-slate-500 truncate">
                  Ideal target: 50% Needs, 30% Wants, 20% Savings
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('budget')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                Budget Planner <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Stacked Progress Bar */}
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex my-3">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, summary.needsPercentage)}%` }}
                title={`Needs: ${Math.round(summary.needsPercentage)}%`}
              />
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(100 - summary.needsPercentage, summary.wantsPercentage)}%` }}
                title={`Wants: ${Math.round(summary.wantsPercentage)}%`}
              />
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, summary.savingsPercentage || summary.savingsRate))}%` }}
                title={`Savings: ${Math.round(summary.savingsPercentage || summary.savingsRate)}%`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center pt-2">
              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block truncate">
                  Essential Needs
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 block my-0.5">
                  {Math.round(summary.needsPercentage)}%
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {formatCurrency(summary.needsSpent, currency)} <span className="text-slate-400 font-normal">(50% Target)</span>
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block truncate">
                  Discretionary Wants
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 block my-0.5">
                  {Math.round(summary.wantsPercentage)}%
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {formatCurrency(summary.wantsSpent, currency)} <span className="text-slate-400 font-normal">(30% Target)</span>
                </span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block truncate">
                  Savings & Growth
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 block my-0.5">
                  {Math.round(summary.savingsRate)}%
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {formatCurrency(summary.netSavings, currency)} <span className="text-slate-400 font-normal">(20% Target)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Overspending Alerts */}
          {summary.overspentCategories.length > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
              <div className="flex items-center gap-2 mb-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Active Spending Leaks Detected ({summary.overspentCategories.length} categories)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {summary.overspentCategories.map(cat => (
                  <div
                    key={cat.categoryId}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-800/40 flex items-center justify-between gap-2 min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {cat.categoryName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        Spent {formatCurrency(cat.actualSpent, currency)} of {formatCurrency(cat.budgetLimit, currency)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 inline-block whitespace-nowrap">
                        +{formatCurrency(cat.overage, currency)} over
                      </span>
                      <span className="block text-[10px] text-rose-500 font-medium mt-0.5">
                        {cat.percentUsed}% cap
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Great job! All category expenditures are currently within planned budget limits.</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Grid: Recent Transactions & Savings Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Recent Transactions
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTransactionModal}
                className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add
              </button>
              <button
                onClick={() => onNavigateTab('transactions')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {recentTransactions.map(t => (
              <div
                key={t.id}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30 flex items-center justify-between gap-2.5 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    t.type === 'income'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : t.isDiscretionary
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                  }`}>
                    <CategoryIcon name={t.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {t.description}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 truncate">
                      <span>{t.date}</span>
                      <span>•</span>
                      <span className="truncate">{t.categoryName}</span>
                      {t.isDiscretionary && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 font-medium shrink-0">
                          Want
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`text-xs font-bold shrink-0 pl-1 ${
                  t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, currency)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals Tracker */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Active Savings Goals
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('goals')}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Manage Goals <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {state.savingsGoals.map(goal => {
                const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
                return (
                  <div
                    key={goal.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs gap-2">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 min-w-0">
                        <span className="truncate">{goal.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-500 bg-slate-100 dark:bg-slate-700 shrink-0">
                          {goal.category}
                        </span>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                        {percent}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{formatCurrency(goal.currentAmount, currency)} saved</span>
                      <span>Target: {formatCurrency(goal.targetAmount, currency)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateTab('goals')}
              className="w-full py-2 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Target className="w-3.5 h-3.5" />
              Open Emergency Fund & Goals Planner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

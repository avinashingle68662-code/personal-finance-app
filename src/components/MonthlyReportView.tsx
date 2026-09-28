import React from 'react';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Target,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/seedData';
import { FinancialHealthScore, FinancialPersona, Transaction } from '../types/finance';
import { exportTransactionsToCSV, formatCurrency, formatPercent, MonthlyFinancialSummary } from '../utils/financeCalculations';

interface MonthlyReportViewProps {
  summary: MonthlyFinancialSummary;
  healthScore: FinancialHealthScore;
  currentPersona: FinancialPersona;
  transactions: Transaction[];
  currency: string;
  onAskAI: (prompt: string) => void;
}

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  summary,
  healthScore,
  currentPersona,
  transactions,
  currency,
  onAskAI,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csv = exportTransactionsToCSV(transactions, currency);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `monthly_report_${summary.month}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Sort categories by expenditure
  const topSpentCategories = Object.entries(summary.categorySpending)
    .map(([catId, amount]) => {
      const cat = CATEGORIES.find(c => c.id === catId);
      return {
        id: catId,
        name: cat ? cat.name : catId,
        group: cat ? cat.group : 'wants',
        color: cat ? cat.color : '#3B82F6',
        amount,
        percentage: summary.totalExpense > 0 ? Math.round((amount / summary.totalExpense) * 100) : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Monthly Financial Summary Report
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {summary.month}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consolidated income vs expenses, savings achieved, budget overruns, and next month targets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Personal Finance Advisor Bot • Financial Statement
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Monthly Financial Performance
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Period: September 1, 2026 – September 30, 2026 • Prepared for: <strong className="text-slate-700 dark:text-slate-300">{currentPersona.name} ({currentPersona.headline})</strong>
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-6">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Overall Health Rating
            </span>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              Grade {healthScore.grade} ({healthScore.totalScore}/100)
            </div>
            <span className="text-[11px] text-slate-500">
              {healthScore.emergencyMonthsBuffer} Months Emergency Buffer
            </span>
          </div>
        </div>

        {/* Section 1: Executive Numbers */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            1. Executive Cash Flow Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Total Income</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(summary.totalIncome, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Total Expenses</span>
              <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
                {formatCurrency(summary.totalExpense, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Net Savings Achieved</span>
              <span className={`text-lg font-bold ${summary.netSavings >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600'}`}>
                {formatCurrency(summary.netSavings, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Net Savings Rate</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {formatPercent(summary.savingsRate)}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: 50/30/20 Distribution Analysis */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            2. Budget Allocation Compliance (50/30/20 Rule)
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                  Essential Needs: {Math.round(summary.needsPercentage)}% (Target: ≤50%)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(summary.needsSpent, currency)}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Housing, basic groceries, utilities, primary transport, and healthcare.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                  Discretionary Wants: {Math.round(summary.wantsPercentage)}% (Target: ≤30%)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(summary.wantsSpent, currency)}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Dining out, takeout delivery, entertainment, shopping, and streaming subscriptions.
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                  Savings & Growth: {Math.round(summary.savingsRate)}% (Target: ≥20%)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(summary.netSavings, currency)}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Emergency fund transfers, 401(k), index fund deposits, and debt principal reduction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Spending Breakdown by Category */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            3. Spending Distribution by Category
          </h3>
          <div className="space-y-2">
            {topSpentCategories.map(cat => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 uppercase font-medium">({cat.group})</span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <span className="text-slate-400 text-[11px]">{cat.percentage}% of spend</span>
                  <strong className="text-slate-900 dark:text-slate-100 font-bold">
                    {formatCurrency(cat.amount, currency)}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Budget Overruns & Leak Analysis */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            4. Overspending & Budget Overrun Audit
          </h3>
          {summary.overspentCategories.length > 0 ? (
            <div className="space-y-2">
              {summary.overspentCategories.map(cat => (
                <div
                  key={cat.categoryId}
                  className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <div>
                      <strong className="font-bold">{cat.categoryName}</strong>: Budgeted {formatCurrency(cat.budgetLimit, currency)}, but spent {formatCurrency(cat.actualSpent, currency)}.
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 shrink-0">
                    +{formatCurrency(cat.overage, currency)} over limit
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero budget overruns detected in tracked categories this month.</span>
            </div>
          )}
        </div>

        {/* Section 5: Strategic Goals for Next Month */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              5. Advisor Recommendations for October 2026
            </h3>
            <button
              onClick={() => onAskAI('What should be my exact financial goals for October 2026?')}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 print:hidden"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI for Detailed Goals
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>Discretionary Spending Cap:</strong> Limit dining and delivery expenditures to avoid repeating the {summary.overspentCategories[0]?.categoryName || 'food'} budget overrun.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>Target Savings Pace:</strong> Maintain a minimum net savings rate of 25% to stay on track for your primary long-term savings goal.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span><strong>Automate Payday Transfers:</strong> Schedule immediate auto-deposits into your emergency buffer within 24 hours of receiving monthly income.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

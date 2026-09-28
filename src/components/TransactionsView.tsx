import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  PlusCircle,
  Trash2,
  Calendar,
  Tag,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  Repeat
} from 'lucide-react';
import { CATEGORIES } from '../data/seedData';
import { Transaction, TransactionType } from '../types/finance';
import { exportTransactionsToCSV, formatCurrency } from '../utils/financeCalculations';
import { CategoryIcon } from './CategoryIcon';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: () => void;
  onDeleteTransaction: (id: string) => void;
  currency: string;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  currency,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [discretionaryFilter, setDiscretionaryFilter] = useState<'all' | 'needs' | 'wants'>('all');

  const filtered = transactions.filter(t => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && t.categoryId !== categoryFilter) return false;
    if (discretionaryFilter === 'needs' && (t.type !== 'expense' || t.isDiscretionary)) return false;
    if (discretionaryFilter === 'wants' && (t.type !== 'expense' || !t.isDiscretionary)) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchCat = t.categoryName.toLowerCase().includes(q);
      const matchAmount = t.amount.toString().includes(q);
      if (!matchDesc && !matchCat && !matchAmount) return false;
    }

    return true;
  });

  const totalFilteredIncome = filtered
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFilteredExpense = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleExportCSV = () => {
    const csvContent = exportTransactionsToCSV(filtered, currency);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Top Action & Stats Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            Income & Expense Ledger
          </h2>
          <p className="text-xs text-slate-500">
            Showing {filtered.length} of {transactions.length} total recorded entries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
            title="Download CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={onAddTransaction}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Log Transaction
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search description, payee, amount..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Types (Income & Expenses)</option>
              <option value="income">Income Only (+)</option>
              <option value="expense">Expenses Only (-)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.type})
                </option>
              ))}
            </select>
          </div>

          {/* Needs vs Wants Filter */}
          <div>
            <select
              value={discretionaryFilter}
              onChange={e => setDiscretionaryFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Spending Tiers</option>
              <option value="needs">Essential Needs Only (50% target)</option>
              <option value="wants">Discretionary Wants (30% target)</option>
            </select>
          </div>
        </div>

        {/* Filter Summary Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Income in view: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+{formatCurrency(totalFilteredIncome, currency)}</strong>
            </span>
            <span>•</span>
            <span>
              Expenses in view: <strong className="text-rose-600 dark:text-rose-400 font-bold">-{formatCurrency(totalFilteredExpense, currency)}</strong>
            </span>
            <span>•</span>
            <span>
              Net: <strong className={totalFilteredIncome >= totalFilteredExpense ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 font-bold'}>
                {formatCurrency(totalFilteredIncome - totalFilteredExpense, currency)}
              </strong>
            </span>
          </div>

          {(search || typeFilter !== 'all' || categoryFilter !== 'all' || discretionaryFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setTypeFilter('all');
                setCategoryFilter('all');
                setDiscretionaryFilter('all');
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No transactions match your search filters
            </p>
            <p className="text-xs text-slate-500">
              Try adjusting your filters or click below to log a new entry.
            </p>
            <button
              onClick={onAddTransaction}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition"
            >
              Log New Transaction
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-center">Classification</th>
                  <th className="py-3 px-4 text-right">Amount ({currency})</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {filtered.map(t => {
                  const cat = CATEGORIES.find(c => c.id === t.categoryId);
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                    >
                      {/* Date */}
                      <td className="py-3 px-4 font-medium text-slate-500 whitespace-nowrap">
                        {t.date}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${cat?.color || '#10B981'}20`, color: cat?.color || '#10B981' }}
                          >
                            <CategoryIcon name={cat?.icon || 'CircleDollarSign'} className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {t.categoryName}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        <div className="font-medium">{t.description}</div>
                        {t.notes && <div className="text-[10px] text-slate-400 mt-0.5">{t.notes}</div>}
                      </td>

                      {/* Classification Tags */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {t.type === 'income' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                              Income
                            </span>
                          ) : t.isDiscretionary ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                              Discretionary Want
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                              Essential Need
                            </span>
                          )}

                          {t.isRecurring && (
                            <span className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500" title="Recurring Monthly">
                              <Repeat className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right whitespace-nowrap font-bold">
                        <span className={t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}>
                          {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, currency)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onDeleteTransaction(t.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

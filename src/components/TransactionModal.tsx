import React, { useState } from 'react';
import { X, PlusCircle, Check } from 'lucide-react';
import { CATEGORIES } from '../data/seedData';
import { Transaction, TransactionType } from '../types/finance';
import { CategoryIcon } from './CategoryIcon';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  currency: string;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currency,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('cat-groceries');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [isDiscretionary, setIsDiscretionary] = useState<boolean>(false);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const filteredCategories = CATEGORIES.filter(c => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const cat = CATEGORIES.find(c => c.id === categoryId);
    const catName = cat ? cat.name : 'Other';

    onSave({
      type,
      amount: numAmount,
      categoryId,
      categoryName: catName,
      date,
      description: description.trim() || catName,
      isDiscretionary: type === 'expense' ? isDiscretionary : false,
      isRecurring,
      notes: notes.trim(),
    });

    // Reset and close
    setAmount('');
    setDescription('');
    setNotes('');
    onClose();
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const firstCat = CATEGORIES.find(c => c.type === newType);
    if (firstCat) {
      setCategoryId(firstCat.id);
      setIsDiscretionary(firstCat.group === 'wants');
    }
  };

  const handleCategorySelect = (id: string) => {
    setCategoryId(id);
    const selected = CATEGORIES.find(c => c.id === id);
    if (selected && type === 'expense') {
      setIsDiscretionary(selected.group === 'wants');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                Log New Transaction
              </h2>
              <p className="text-xs text-slate-500">Record income or track daily/weekly expenses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Type Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`py-2 text-sm font-medium rounded-lg transition ${
                type === 'expense'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Expense (-{currency})
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`py-2 text-sm font-medium rounded-lg transition ${
                type === 'income'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Income (+{currency})
            </button>
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Amount ({currency}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">{currency}</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-base font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
              {filteredCategories.map(cat => {
                const isSelected = categoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border text-left transition ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Description / Payee
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Trader Joe's, Client Retainer, Electric Bill"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Expense Classification Toggles */}
          {type === 'expense' && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Discretionary Spending (Want)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Non-essential want (dining, entertainment, shopping) vs essential need
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDiscretionary(!isDiscretionary)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                    isDiscretionary ? 'bg-amber-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <span className="bg-white w-4 h-4 rounded-full shadow-xs transform transition" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Recurring Monthly
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Repeats every month (rent, insurance, subscription)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                    isRecurring ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <span className="bg-white w-4 h-4 rounded-full shadow-xs transform transition" />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
            >
              <Check className="w-4 h-4" />
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

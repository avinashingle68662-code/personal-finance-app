import React from 'react';
import {
  Wallet,
  Bot,
  PieChart,
  Target,
  FileText,
  Layers,
  PlusCircle,
  Sparkles,
  ArrowRightLeft,
  Briefcase,
  GraduationCap,
  Laptop,
  Users,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { FinancialHealthScore, FinancialPersona, PersonaId, UserProfile } from '../types/finance';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: FinancialPersona;
  currentUser?: UserProfile;
  onOpenAuthModal: () => void;
  onOpenScenarioModal: () => void;
  onOpenTransactionModal: () => void;
  onLogout?: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  healthScore: FinancialHealthScore;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  currentUser,
  onOpenAuthModal,
  onOpenScenarioModal,
  onOpenTransactionModal,
  onLogout,
  currency,
  setCurrency,
  healthScore,
}) => {
  const getPersonaIcon = (avatar: string) => {
    switch (avatar) {
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'Laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'Users': return <Users className="w-3.5 h-3.5" />;
      default: return <User className="w-3.5 h-3.5" />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Wallet },
    { id: 'advisor', label: 'AI Advisor Bot', icon: Bot, badge: 'AI' },
    { id: 'transactions', label: 'Income & Expenses', icon: ArrowRightLeft },
    { id: 'budget', label: 'Budget Planner', icon: PieChart },
    { id: 'goals', label: 'Savings & Goals', icon: Target },
    { id: 'reports', label: 'Monthly Report', icon: FileText },
    { id: 'scenarios', label: 'Scenario Explorer', icon: Layers },
  ];

  const getScoreColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    if (grade === 'B') return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    if (grade === 'C') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[3.75rem] py-2 gap-2 sm:gap-4">
          {/* Logo & Persona Badge */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-initial">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base md:text-lg tracking-tight truncate">
                  Personal Finance Advisor
                </h1>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 shrink-0">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  Gemini AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden xl:block truncate">
                Intelligent budget planning, spending analytics & saving strategies
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Scenario Switcher Button */}
            <button
              onClick={onOpenScenarioModal}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 bg-slate-50/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 transition text-xs font-semibold shrink-0 cursor-pointer"
              title="Switch persona scenario"
            >
              <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                {getPersonaIcon(currentPersona.avatarIcon)}
              </span>
              <span className="hidden md:inline max-w-[85px] lg:max-w-[120px] truncate">
                {currentPersona.headline}
              </span>
              <span className="hidden sm:inline px-1 py-0.5 rounded text-[9px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Switch
              </span>
            </button>

            {/* Health Score Pill */}
            <div className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl border text-xs font-semibold shrink-0 ${getScoreColor(healthScore.grade)}`}>
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{healthScore.totalScore}/100</span>
              <span className="font-bold underline ml-0.5">({healthScore.grade})</span>
            </div>

            {/* Currency Selector */}
            <div className="relative shrink-0">
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                aria-label="Currency"
                className="appearance-none pl-2 pr-5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="£">£ GBP</option>
                <option value="₹">₹ INR</option>
                <option value="¥">¥ JPY</option>
                <option value="C$">C$ CAD</option>
              </select>
            </div>

            {/* User Account / Login Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
              title="Account Settings & Profiles"
            >
              <div
                className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                style={{ backgroundColor: currentUser?.avatarColor || '#10B981' }}
              >
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <span className="hidden md:inline max-w-[70px] lg:max-w-[90px] truncate">
                {currentUser?.isLoggedIn ? currentUser.name : 'Sign In'}
              </span>
            </button>

            {/* 1-Fast-Click Sign Out Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 hover:border-rose-300 dark:hover:border-rose-700 transition text-xs font-semibold shrink-0 cursor-pointer shadow-xs active:scale-95"
                title="Sign Out in 1 click"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            {/* Primary Action: Log Transaction */}
            <button
              onClick={onOpenTransactionModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      isActive ? 'bg-white text-emerald-700' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

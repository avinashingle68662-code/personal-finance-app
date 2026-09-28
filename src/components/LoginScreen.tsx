import React, { useState } from 'react';
import {
  LogIn,
  Bot,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  User,
  Mail,
  Lock,
  CheckCircle2,
  DollarSign,
  PieChart,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { PersonaId, UserProfile } from '../types/finance';

interface LoginScreenProps {
  onLogin: (user: UserProfile, personaId?: PersonaId) => void;
}

const DEFAULT_DEMO_ACCOUNTS = [
  {
    id: 'custom',
    name: 'Personal Account',
    email: 'user@example.com',
    role: 'Personal Finance Manager',
    personaId: 'custom' as PersonaId,
    color: '#059669',
    badge: 'Owner Profile',
    tagline: 'Custom Income & Expense Tracking with AI Advisor',
    income: '$4,500/mo',
  },
  {
    id: 'salaried',
    name: 'Alex Chen',
    email: 'alex.chen@techcorp.com',
    role: 'Salaried Professional',
    personaId: 'salaried' as PersonaId,
    color: '#10B981',
    badge: 'Scenario 1',
    tagline: 'Fixed $6,100/mo salary • Curb dining leaks & save down payment',
    income: '$6,100/mo',
  },
  {
    id: 'student',
    name: 'Maya Patel',
    email: 'maya.patel@campus.edu',
    role: 'College Student',
    personaId: 'student' as PersonaId,
    color: '#3B82F6',
    badge: 'Scenario 2',
    tagline: '$1,100/mo allowance • Student discounts & emergency fund',
    income: '$1,100/mo',
  },
  {
    id: 'freelancer',
    name: 'Marcus Vance',
    email: 'marcus@vancecreative.com',
    role: 'Freelance Designer',
    personaId: 'freelancer' as PersonaId,
    color: '#8B5CF6',
    badge: 'Scenario 3',
    tagline: 'Variable $5,700/mo • 20% tax reserve & runway cushion',
    income: '$5,700/mo',
  },
  {
    id: 'household',
    name: 'Sarah & David',
    email: 'jenkins.family@home.org',
    role: 'Household Manager',
    personaId: 'household' as PersonaId,
    color: '#F59E0B',
    badge: 'Scenario 4',
    tagline: 'Shared $8,500/mo • Mortgage, childcare & family goals',
    income: '$8,500/mo',
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [tab, setTab] = useState<'demo' | 'custom'>('demo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Load profiles with removed accounts filtered out
  const [profiles, setProfiles] = useState(() => {
    try {
      const savedRemoved = localStorage.getItem('pfa_removed_fast_profiles');
      if (savedRemoved) {
        const removedIds: string[] = JSON.parse(savedRemoved);
        return DEFAULT_DEMO_ACCOUNTS.filter(acc => !removedIds.includes(acc.id));
      }
    } catch (e) {}
    return DEFAULT_DEMO_ACCOUNTS;
  });

  const handleSelectDemo = (acc: typeof DEFAULT_DEMO_ACCOUNTS[0]) => {
    setSuccessNotice(`Logging in as ${acc.name}...`);
    setTimeout(() => {
      onLogin(
        {
          id: acc.id,
          name: acc.name,
          email: acc.email,
          role: acc.role,
          avatarColor: acc.color,
          isLoggedIn: true,
        },
        acc.personaId
      );
    }, 250);
  };

  const handleRemoveProfile = (e: React.MouseEvent, accId: string, accName: string) => {
    e.stopPropagation();
    const updated = profiles.filter(p => p.id !== accId);
    setProfiles(updated);

    try {
      const saved = localStorage.getItem('pfa_removed_fast_profiles');
      const removedIds: string[] = saved ? JSON.parse(saved) : [];
      if (!removedIds.includes(accId)) {
        removedIds.push(accId);
        localStorage.setItem('pfa_removed_fast_profiles', JSON.stringify(removedIds));
      }
    } catch (e) {}

    setSuccessNotice(`Removed "${accName}" from Fast Login`);
    setTimeout(() => setSuccessNotice(null), 2200);
  };

  const handleRestoreProfiles = () => {
    localStorage.removeItem('pfa_removed_fast_profiles');
    setProfiles(DEFAULT_DEMO_ACCOUNTS);
    setSuccessNotice('Restored all Fast Login profiles');
    setTimeout(() => setSuccessNotice(null), 2000);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSuccessNotice(`Welcome back, ${name || 'User'}!`);
    setTimeout(() => {
      onLogin(
        {
          id: `u-${Date.now()}`,
          name: name.trim() || email.split('@')[0],
          email: email.trim(),
          role: 'Personal Finance User',
          avatarColor: '#10B981',
          isLoggedIn: true,
        },
        'custom'
      );
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-3 sm:p-6 relative overflow-x-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-lg bg-slate-900/95 border border-slate-800 rounded-3xl p-4 sm:p-7 shadow-2xl relative z-10 backdrop-blur-md">
        {/* Brand / Logo Title */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25 mb-2.5">
            <Bot className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>AI-Powered Financial Planning</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug px-2">
            Personal Finance Advisor Bot
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed px-2">
            Sign in to access your personal dashboard, expense ledger, 50/30/20 budget planner, and AI advisor.
          </p>
        </div>

        {/* Success toast if triggered */}
        {successNotice && (
          <div className="mb-4 p-2.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 justify-center animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{successNotice}</span>
          </div>
        )}

        {/* Tab switchers: 1-Click Fast Profiles vs Custom Email */}
        <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl mb-4 gap-1">
          <button
            type="button"
            onClick={() => setTab('demo')}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition text-center truncate cursor-pointer ${
              tab === 'demo'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ 1-Click Fast Login
          </button>
          <button
            type="button"
            onClick={() => setTab('custom')}
            className={`py-2 px-2 text-xs font-bold rounded-lg transition text-center truncate cursor-pointer ${
              tab === 'custom'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ✉️ Sign In with Email
          </button>
        </div>

        {/* Tab 1: 1-Click Instant Login (Easy to use) */}
        {tab === 'demo' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 px-0.5 mb-1 gap-2">
              <span className="font-semibold text-slate-300 truncate">Select profile to start:</span>
              <span className="text-[11px] text-emerald-400 font-medium shrink-0">Click to login • or remove</span>
            </div>

            {profiles.length === 0 ? (
              <div className="p-6 text-center text-slate-400 border border-dashed border-slate-800 rounded-2xl space-y-3">
                <p className="text-xs">All fast login profiles have been removed.</p>
                <button
                  type="button"
                  onClick={handleRestoreProfiles}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Default Profiles
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {profiles.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => handleSelectDemo(acc)}
                    className="w-full p-2.5 sm:p-3 rounded-2xl border border-slate-800 hover:border-emerald-500/70 bg-slate-800/60 hover:bg-slate-800 text-left transition flex items-center justify-between gap-2.5 sm:gap-3 group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 shadow-sm"
                        style={{ backgroundColor: acc.color }}
                      >
                        {acc.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition truncate">
                            {acc.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold shrink-0">
                            {acc.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {acc.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pl-1">
                      <span className="text-xs font-semibold text-emerald-400 whitespace-nowrap">
                        {acc.income}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveProfile(e, acc.id, acc.name)}
                        title={`Remove ${acc.name} from Fast Login`}
                        className="w-7 h-7 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/70 border border-transparent hover:border-rose-900/60 flex items-center justify-center transition shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Option to restore profiles if some were removed */}
                {profiles.length < DEFAULT_DEMO_ACCOUNTS.length && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleRestoreProfiles}
                      className="text-[11px] text-slate-400 hover:text-emerald-400 transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore removed profiles ({DEFAULT_DEMO_ACCOUNTS.length - profiles.length} hidden)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Email Form */}
        {tab === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-95 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Personal Finance Bot
            </button>
          </form>
        )}

        {/* Trust & Guarantee Banner */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="leading-tight">Private & secure • AI financial advisor ready</span>
        </div>
      </div>
    </div>
  );
};

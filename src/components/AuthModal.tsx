import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  CheckCircle2,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  LogOut,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile, PersonaId } from '../types/finance';
import { PERSONAS } from '../data/seedData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile;
  onLogin: (user: UserProfile, personaId?: PersonaId) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const defaultQuickDemoAccounts = [
    {
      id: 'custom',
      name: 'Personal Account',
      email: 'user@example.com',
      role: 'Personal Finance Manager',
      personaId: 'custom' as PersonaId,
      color: '#059669',
      badge: 'Owner Profile',
    },
    {
      id: 'salaried',
      name: 'Alex Chen',
      email: 'alex.chen@techcorp.com',
      role: 'Salaried Professional',
      personaId: 'salaried' as PersonaId,
      color: '#10B981',
      badge: 'Scenario 1',
    },
    {
      id: 'student',
      name: 'Maya Patel',
      email: 'maya.patel@campus.edu',
      role: 'College Student',
      personaId: 'student' as PersonaId,
      color: '#3B82F6',
      badge: 'Scenario 2',
    },
    {
      id: 'freelancer',
      name: 'Marcus Vance',
      email: 'marcus@vancecreative.com',
      role: 'Freelance Designer',
      personaId: 'freelancer' as PersonaId,
      color: '#8B5CF6',
      badge: 'Scenario 3',
    },
    {
      id: 'household',
      name: 'Sarah & David Jenkins',
      email: 'jenkins.family@home.org',
      role: 'Household Manager',
      personaId: 'household' as PersonaId,
      color: '#F59E0B',
      badge: 'Scenario 4',
    },
  ];

  const [demoAccounts, setDemoAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('pfa_removed_fast_profiles');
      if (saved) {
        const removed: string[] = JSON.parse(saved);
        return defaultQuickDemoAccounts.filter(a => !removed.includes(a.id));
      }
    } catch (e) {}
    return defaultQuickDemoAccounts;
  });

  const handleRemoveProfile = (e: React.MouseEvent, accId: string, accName: string) => {
    e.stopPropagation();
    const updated = demoAccounts.filter(a => a.id !== accId);
    setDemoAccounts(updated);

    try {
      const saved = localStorage.getItem('pfa_removed_fast_profiles');
      const removed: string[] = saved ? JSON.parse(saved) : [];
      if (!removed.includes(accId)) {
        removed.push(accId);
        localStorage.setItem('pfa_removed_fast_profiles', JSON.stringify(removed));
      }
    } catch (e) {}

    setSuccessMessage(`Removed "${accName}" from Fast Login`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleRestoreProfiles = () => {
    localStorage.removeItem('pfa_removed_fast_profiles');
    setDemoAccounts(defaultQuickDemoAccounts);
    setSuccessMessage('Restored all Fast Login profiles');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const loggedUser: UserProfile = {
      id: `u-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      role: 'Personal Finance User',
      avatarColor: '#10B981',
      isLoggedIn: true,
    };

    setSuccessMessage(`Welcome back, ${loggedUser.name}!`);
    setTimeout(() => {
      onLogin(loggedUser);
      onClose();
      setSuccessMessage('');
    }, 400);
  };

  const handleQuickDemoSelect = (acc: typeof defaultQuickDemoAccounts[0]) => {
    const user: UserProfile = {
      id: acc.id,
      name: acc.name,
      email: acc.email,
      role: acc.role,
      avatarColor: acc.color,
      isLoggedIn: true,
    };

    setSuccessMessage(`Signed in as ${acc.name}!`);
    setTimeout(() => {
      onLogin(user, acc.personaId);
      onClose();
      setSuccessMessage('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <LogIn className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                {currentUser?.isLoggedIn ? 'Account & Profiles' : 'Sign In to Advisor Bot'}
              </h2>
              <p className="text-xs text-slate-500">
                {currentUser?.isLoggedIn ? `Active: ${currentUser.name}` : 'Access your budgets & smart financial plans'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Pill if already signed in */}
        {currentUser?.isLoggedIn && (
          <div className="px-6 py-3 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-xs"
                style={{ backgroundColor: currentUser.avatarColor || '#10B981' }}
              >
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-200 font-semibold">
                    Signed In
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">{currentUser.email}</div>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-2.5 py-1 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg flex items-center gap-1 font-medium transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        )}

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mx-6 mt-4 p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setTab('signin')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                tab === 'signin'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              1-Click Fast Login
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                tab === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Custom Email
            </button>
          </div>
        </div>

        {/* Tab 1: 1-Click Fast Login Profiles */}
        {tab === 'signin' && (
          <div className="p-6 space-y-4 overflow-y-auto">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Select an Account to Sign In Instantly:
              </span>
              <p className="text-[11px] text-slate-500 mb-3">
                No typing required! Click any profile to immediately load all transactions, budgets, and personalized advisor memory.
              </p>
            </div>

            {demoAccounts.length === 0 ? (
              <div className="p-6 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                <p className="text-xs">All fast login profiles have been removed.</p>
                <button
                  type="button"
                  onClick={handleRestoreProfiles}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Default Profiles
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {demoAccounts.map(acc => {
                  const isCurrent = currentUser?.email === acc.email;
                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleQuickDemoSelect(acc)}
                      className={`w-full p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                        isCurrent
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs"
                          style={{ backgroundColor: acc.color }}
                        >
                          {acc.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                            <span className="truncate">{acc.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                              {acc.badge}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold shrink-0 pl-1">
                        {isCurrent ? (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                            Sign In <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleRemoveProfile(e, acc.id, acc.name)}
                          title={`Remove ${acc.name} from Fast Login`}
                          className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center justify-center transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Option to restore profiles if some were removed */}
                {demoAccounts.length < defaultQuickDemoAccounts.length && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleRestoreProfiles}
                      className="text-[11px] text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore removed profiles</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Custom Email Sign In / Sign Up */}
        {tab === 'signup' && (
          <form onSubmit={handleCustomSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Password / Quick PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition active:scale-95 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Sign In & Sync Data
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
          <p className="text-[11px] text-slate-400">
            🔒 Bank-grade local encryption • Data stored securely in your browser & server
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { AdvisorChatView } from './components/AdvisorChatView';
import { TransactionsView } from './components/TransactionsView';
import { BudgetPlannerView } from './components/BudgetPlannerView';
import { SavingsGoalsView } from './components/SavingsGoalsView';
import { MonthlyReportView } from './components/MonthlyReportView';
import { ScenarioExplorerView } from './components/ScenarioExplorerView';
import { ScenarioSwitcherModal } from './components/ScenarioSwitcherModal';
import { TransactionModal } from './components/TransactionModal';
import { AuthModal } from './components/AuthModal';
import { LoginScreen } from './components/LoginScreen';
import { INITIAL_STATES, PERSONAS } from './data/seedData';
import { ChatMessage, PersonaId, SavingsGoal, Transaction, UserFinanceState, UserProfile } from './types/finance';
import { calculateFinancialHealthScore, calculateMonthlySummary } from './utils/financeCalculations';
import { loadPersistedState, savePersistedState } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Require login when first opening the app
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pfa_is_authenticated') === 'true';
  });

  // Initialize state with custom/owner profile or salaried
  const [state, setState] = useState<UserFinanceState>(INITIAL_STATES.custom || INITIAL_STATES.salaried);

  // Load persisted state on mount
  useEffect(() => {
    loadPersistedState().then(saved => {
      if (saved && saved.transactions && saved.budgets) {
        setState(saved);
        if (saved.currentUser && saved.currentUser.isLoggedIn) {
          // Keep authentication in sync
          setIsAuthenticated(localStorage.getItem('pfa_is_authenticated') === 'true');
        }
      }
    });
  }, []);

  // Save state on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      savePersistedState(state);
    }, 800);
    return () => clearTimeout(timer);
  }, [state]);

  const currentPersona = useMemo(() => {
    return PERSONAS.find(p => p.id === state.currentPersonaId) || PERSONAS[0];
  }, [state.currentPersonaId]);

  // Derived financial summary
  const summary = useMemo(() => {
    return calculateMonthlySummary(state.transactions, state.budgets, state.currentMonth);
  }, [state.transactions, state.budgets, state.currentMonth]);

  // Derived financial health score
  const healthScore = useMemo(() => {
    const emergencyGoal = state.savingsGoals.find(g =>
      g.category.toLowerCase().includes('emergency') || g.name.toLowerCase().includes('emergency')
    );
    const emergencyCash = emergencyGoal ? emergencyGoal.currentAmount : 6000;
    return calculateFinancialHealthScore(summary, emergencyCash);
  }, [summary, state.savingsGoals]);

  // Switch persona / scenario
  const handleSelectPersona = (id: PersonaId) => {
    const nextPreset = INITIAL_STATES[id] || INITIAL_STATES.salaried;
    setState({
      ...nextPreset,
      currency: state.currency,
    });
  };

  // Login handler
  const handleLogin = (user: UserProfile, personaId?: PersonaId) => {
    localStorage.setItem('pfa_is_authenticated', 'true');
    setIsAuthenticated(true);

    if (personaId && INITIAL_STATES[personaId]) {
      setState({
        ...INITIAL_STATES[personaId],
        currentUser: user,
        currency: state.currency,
      });
    } else {
      setState(prev => ({
        ...prev,
        currentUser: user,
      }));
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('pfa_is_authenticated');
    setIsAuthenticated(false);
    setState(prev => ({
      ...prev,
      currentUser: {
        id: 'guest',
        name: 'Guest User',
        email: 'guest@example.com',
        role: 'Guest Visitor',
        avatarColor: '#64748B',
        isLoggedIn: false,
      },
    }));
  };

  // Log transaction
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
    };
    setState(prev => ({
      ...prev,
      transactions: [newTx, ...prev.transactions],
    }));
  };

  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  };

  // Update category budgets
  const handleUpdateBudgets = (newBudgets: Record<string, number>) => {
    setState(prev => ({
      ...prev,
      budgets: newBudgets,
    }));
  };

  // Update savings goals
  const handleUpdateGoals = (newGoals: SavingsGoal[]) => {
    setState(prev => ({
      ...prev,
      savingsGoals: newGoals,
    }));
  };

  // Currency change
  const handleSetCurrency = (c: string) => {
    setState(prev => ({
      ...prev,
      currency: c,
    }));
  };

  // Chat history state setter adapter
  const setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>> = valueOrFn => {
    setState(prev => {
      const nextHistory = typeof valueOrFn === 'function' ? valueOrFn(prev.chatHistory) : valueOrFn;
      return {
        ...prev,
        chatHistory: nextHistory,
      };
    });
  };

  // Quick ask advisor from any tab
  const handleQuickAskAdvisor = (prompt: string) => {
    setActiveTab('advisor');
  };

  // If user is not yet logged in, show the LoginScreen first
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPersona={currentPersona}
        currentUser={state.currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
        onOpenTransactionModal={() => setIsTransactionModalOpen(true)}
        onLogout={handleLogout}
        currency={state.currency}
        setCurrency={handleSetCurrency}
        healthScore={healthScore}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            state={state}
            summary={summary}
            healthScore={healthScore}
            currentPersona={currentPersona}
            currency={state.currency}
            onOpenTransactionModal={() => setIsTransactionModalOpen(true)}
            onNavigateTab={setActiveTab}
            onQuickAskAdvisor={handleQuickAskAdvisor}
            onQuickLog={handleAddTransaction}
          />
        )}

        {activeTab === 'advisor' && (
          <AdvisorChatView
            chatHistory={state.chatHistory}
            setChatHistory={setChatHistory}
            currentPersona={currentPersona}
            summary={summary}
            topTransactions={state.transactions.slice(0, 10)}
            currentBudgets={state.budgets}
            currency={state.currency}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsView
            transactions={state.transactions}
            onAddTransaction={() => setIsTransactionModalOpen(true)}
            onDeleteTransaction={handleDeleteTransaction}
            currency={state.currency}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetPlannerView
            budgets={state.budgets}
            onUpdateBudgets={handleUpdateBudgets}
            summary={summary}
            currentPersona={currentPersona}
            currency={state.currency}
            onAskAI={handleQuickAskAdvisor}
          />
        )}

        {activeTab === 'goals' && (
          <SavingsGoalsView
            goals={state.savingsGoals}
            onUpdateGoals={handleUpdateGoals}
            summary={summary}
            currency={state.currency}
          />
        )}

        {activeTab === 'reports' && (
          <MonthlyReportView
            summary={summary}
            healthScore={healthScore}
            currentPersona={currentPersona}
            transactions={state.transactions}
            currency={state.currency}
            onAskAI={handleQuickAskAdvisor}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioExplorerView
            currentPersonaId={state.currentPersonaId}
            onSelectPersona={id => {
              handleSelectPersona(id);
              setActiveTab('dashboard');
            }}
            currency={state.currency}
          />
        )}
      </main>

      {/* Scenario Switcher Modal */}
      <ScenarioSwitcherModal
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
        currentPersonaId={state.currentPersonaId}
        onSelectPersona={handleSelectPersona}
      />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleAddTransaction}
        currency={state.currency}
      />

      {/* Authentication / Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={state.currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

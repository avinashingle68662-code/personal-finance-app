import React from 'react';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Laptop,
  Users,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  PieChart
} from 'lucide-react';
import { PERSONAS } from '../data/seedData';
import { PersonaId } from '../types/finance';

interface ScenarioExplorerViewProps {
  currentPersonaId: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
  currency: string;
}

export const ScenarioExplorerView: React.FC<ScenarioExplorerViewProps> = ({
  currentPersonaId,
  onSelectPersona,
  currency,
}) => {
  const getPersonaIcon = (avatar: string) => {
    switch (avatar) {
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const detailedScenarios = [
    {
      ...PERSONAS[0],
      challengeTitle: 'Dining & Entertainment Leaks with Fixed Salary',
      challengeText: 'Salaried tech operations lead earning $5,500/mo salary plus $600 bonus. Living comfortably but frequent weekend takeout sushi, bistro dinners, and concerts result in $250+ in unmonitored overspending, slowing down a real estate down payment goal.',
      aiSolution: 'Identifies food delivery and concert leaks, applies strict 50/30/20 category caps, and establishes automated transfers that increase savings from $1,200 to $1,500/mo.',
      recommendedRule: '50/30/20 Rule + Payday Auto-transfer',
    },
    {
      ...PERSONAS[1],
      challengeTitle: 'Constrained Student Allowance & Dorm Cooking',
      challengeText: 'Undergraduate student on a $1,100 monthly budget ($700 parent allowance + $400 campus lab job). High proportion of fixed costs (dorm sublet $450) leaves little wiggle room; late-night study pizza and campus espresso runs cause end-of-month cash pinches.',
      aiSolution: 'Calculates realistic daily discretionary limits, identifies student discount bundles (Spotify/Apple/Transit), recommends batch dorm meal prep to shave $70/mo for a laptop fund.',
      recommendedRule: 'Zero-Based Envelope Method',
    },
    {
      ...PERSONAS[2],
      challengeTitle: 'Fluctuating Client Revenue & Quarterly Tax Reserves',
      challengeText: 'Freelance brand consultant whose income swings between $3,200 and $6,400 per month across multiple client retainers and project sprints. Struggles with cashflow anxiety during lean quarters and forgets to hold back 20-25% for quarterly taxes.',
      aiSolution: 'Establishes a lean living baseline ($2,800), isolates a dedicated 20% Tax Reserve escrow, and directs all surplus from boom months into a 6-Month Volatility Runway.',
      recommendedRule: 'Safe Baseline Floor + Runway Buffer',
    },
    {
      ...PERSONAS[3],
      challengeTitle: 'Family Shared Income, Grocery Inflation & Daycare',
      challengeText: 'Dual-earner family of 4 with combined income of $8,500/mo. Navigating high essential obligations: mortgage ($2,400), daycare/school ($1,450), and healthcare ($620). Grocery bills have surged to $1,280 due to inflation, plus seasonal heating spikes.',
      aiSolution: 'Consolidates multi-stream family income, flags grocery price surges, outlines Costco bulk-purchasing meal strategies, and automates contributions to Children’s 529 College plans.',
      recommendedRule: 'Consolidated Family 70/20/10 Budget',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            Real-World Personal Finance Scenarios
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          The Personal Finance Advisor Bot is engineered to solve the distinct financial challenges faced by different demographics: salaried employees, college students, freelancers with fluctuating income, and busy household managers. Click any scenario below to load its full financial dataset.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailedScenarios.map((sc, index) => {
          const isActive = currentPersonaId === sc.id;
          return (
            <div
              key={sc.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition relative ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {getPersonaIcon(sc.avatarIcon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shrink-0">
                          Scenario {index + 1}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shrink-0">
                            Currently Active
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                        {sc.headline}
                      </h3>
                      <p className="text-xs text-slate-500">{sc.name} • {sc.role}</p>
                    </div>
                  </div>
                </div>

                {/* Challenge description */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    {sc.challengeTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {sc.challengeText}
                  </p>
                </div>

                {/* AI Solution */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    AI Advisor Solution & Strategy
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {sc.aiSolution}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Recommended Model:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{sc.recommendedRule}</span>
                  </div>
                </div>

                {/* Monthly Income Stat */}
                <div className="flex items-center justify-between text-xs py-1 text-slate-500">
                  <span>Monthly Take-Home Profile:</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-sm font-bold">
                    {currency}{sc.monthlyIncomeTarget.toLocaleString()}/month
                  </strong>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectPersona(sc.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Active Scenario (Loaded)
                    </>
                  ) : (
                    <>
                      Load Scenario {index + 1} Dataset
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

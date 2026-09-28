import React from 'react';
import { X, Check, Briefcase, GraduationCap, Laptop, Users, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { PERSONAS } from '../data/seedData';
import { PersonaId } from '../types/finance';

interface ScenarioSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersonaId: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
}

export const ScenarioSwitcherModal: React.FC<ScenarioSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentPersonaId,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  const getPersonaIcon = (avatarIcon: string) => {
    switch (avatarIcon) {
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                Explore Scenarios
              </span>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-xl">
                Personal Finance Personas & Scenarios
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any of the 4 real-world financial situations to test personalized budget generation, AI spending audits, and savings goals.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONAS.map(p => {
            const isSelected = currentPersonaId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  onSelectPersona(p.id);
                  onClose();
                }}
                className={`cursor-pointer rounded-2xl p-5 border text-left transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}>
                        {getPersonaIcon(p.avatarIcon)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {p.scenarioNumber > 0 && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Scenario {p.scenarioNumber}
                            </span>
                          )}
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                            {p.headline}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500">{p.name} • {p.role}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Highlight tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.highlightTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Key facts */}
                  <div className="space-y-1 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    {p.situationKeyFacts.slice(0, 2).map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">
                    Est. Monthly: <span className="text-slate-800 dark:text-slate-200 font-bold">${p.monthlyIncomeTarget.toLocaleString()}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 ${
                    isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {isSelected ? 'Loaded Scenario' : 'Switch Scenario'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  PieChart,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Scissors,
  RefreshCw,
  User,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, FinancialPersona } from '../types/finance';
import { MonthlyFinancialSummary } from '../utils/financeCalculations';
import { askAdvisor, generateBudgetPlan, predictSpending, requestAudit } from '../services/api';

interface AdvisorChatViewProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  currentPersona: FinancialPersona;
  summary: MonthlyFinancialSummary;
  topTransactions: any[];
  currentBudgets: Record<string, number>;
  currency: string;
}

export const AdvisorChatView: React.FC<AdvisorChatViewProps> = ({
  chatHistory,
  setChatHistory,
  currentPersona,
  summary,
  topTransactions,
  currentBudgets,
  currency,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Analyzing financial profile...');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || input).trim();
    if (!message || isLoading) return;

    if (!textToSend) setInput('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory(prev => [...prev, userMsg]);
    setIsLoading(true);
    setLoadingStatus('Consulting AI Financial Advisor...');

    try {
      let replyText = '';
      const lower = message.toLowerCase();

      if (lower.includes('audit') || lower.includes('spending leak')) {
        setLoadingStatus('Auditing transaction categories & overspending leaks...');
        replyText = await requestAudit({
          personaRole: currentPersona.headline,
          summary,
          topTransactions,
        });
      } else if (lower.includes('budget') || lower.includes('50/30/20')) {
        setLoadingStatus('Generating customized zero-based budget blueprint...');
        replyText = await generateBudgetPlan({
          personaRole: currentPersona.headline,
          totalIncome: summary.totalIncome || currentPersona.monthlyIncomeTarget,
          currentBudgets,
          currentExpenses: summary.categorySpending,
        });
      } else if (lower.includes('predict') || lower.includes('forecast')) {
        setLoadingStatus('Forecasting end-of-month cash flow and upcoming risk...');
        replyText = await predictSpending({
          personaRole: currentPersona.headline,
          summary,
        });
      } else {
        replyText = await askAdvisor({
          message,
          personaRole: currentPersona.headline,
          personaContext: `${currentPersona.name}, ${currentPersona.description}`,
          summary,
          chatHistory,
        });
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'model',
        text: "I encountered a slight communication error, but here is my rapid recommendation: keep discretionary spending below 30% of your take-home pay and prioritize funding your emergency buffer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: '🔍 Run Spending Audit', icon: AlertCircle, prompt: 'Please run a complete spending audit of my current month finances and identify overspending areas.' },
    { label: '📊 50/30/20 Budget Plan', icon: PieChart, prompt: 'Generate a personalized 50/30/20 budget plan with exact category dollar limits based on my income.' },
    { label: '🍽️ Can I afford dining out tonight?', icon: Sparkles, prompt: 'Based on my remaining budget for dining and wants this month, can I afford a $40 dinner out tonight?' },
    { label: '💡 How to save $150 this month?', icon: Scissors, prompt: 'Give me 3 easy, practical steps to save $150 this month without ruining my lifestyle.' },
    { label: '🔮 Forecast Cash Flow', icon: TrendingUp, prompt: 'Forecast my spending and net savings buffer for the remainder of this month and early next month.' },
    { label: '🛡️ Emergency Fund Plan', icon: ShieldCheck, prompt: 'How many months of emergency buffer do I need for my situation and how should I build it?' },
  ];

  // Helper to render formatted markdown
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-3 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Header 2 or 1
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return (
          <h3 key={idx} className="font-bold text-slate-900 dark:text-slate-100 text-base mt-3 mb-1">
            {line.replace(/^[#]+\s/, '')}
          </h3>
        );
      }
      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().replace(/^[-*]\s/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-700 dark:text-slate-300 my-0.5 leading-relaxed">
            {formatBold(content)}
          </li>
        );
      }
      // Numbered items
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 my-1 font-medium leading-relaxed pl-2 border-l-2 border-emerald-500/40">
            {formatBold(line.trim())}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Regular paragraph
      return (
        <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed my-0.5">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-4">
      {/* Persona Context Reminder Header */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Personal Finance Advisor Bot
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                Active: {currentPersona.headline}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              Personalized for {currentPersona.name} • Monthly Income: {currency}{summary.totalIncome.toLocaleString()} • Savings Rate: {Math.round(summary.savingsRate)}%
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setChatHistory([
              {
                id: `reset-${Date.now()}`,
                role: 'model',
                text: `Advisor re-initialized for ${currentPersona.headline}. What would you like to review today?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            ]);
          }}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 self-end sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Clear Conversation
        </button>
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 text-slate-700 dark:text-slate-300 text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition hover:shadow-xs active:scale-95 disabled:opacity-50"
            >
              <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Conversation Container */}
      <div className="h-[550px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {chatHistory.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs ${
                    isUser
                      ? 'bg-emerald-600 text-white shadow-xs rounded-tr-xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isUser ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {isUser ? 'You' : 'Personal Finance Advisor Bot'}
                    </span>
                    <span className={`text-[10px] ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  <div className={isUser ? 'text-white' : 'text-slate-800 dark:text-slate-200'}>
                    {isUser ? msg.text : renderMessageContent(msg.text)}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl p-3.5 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
                <span>{loadingStatus}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Ask advisor about your ${currentPersona.headline.toLowerCase()} budget, savings, or spending leaks...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition disabled:opacity-50 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import { ChatMessage, UserFinanceState } from '../types/finance';
import { MonthlyFinancialSummary } from '../utils/financeCalculations';

export async function askAdvisor(params: {
  message: string;
  personaRole: string;
  personaContext: string;
  summary: MonthlyFinancialSummary;
  chatHistory: ChatMessage[];
}): Promise<string> {
  try {
    const res = await fetch('/api/advisor/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.text || 'Unable to generate response at this time.';
  } catch (error) {
    console.warn('API error, using local fallback:', error);
    return `### 💡 AI Financial Advisory
- Your current monthly savings rate is **${Math.round(params.summary.savingsRate)}%**.
- Discretionary spending takes up **${Math.round(params.summary.wantsPercentage)}%** of your income.
- Recommended immediate step: Audit your top 2 non-essential spending categories and redirect $100 towards your emergency buffer.`;
  }
}

export async function requestAudit(params: {
  personaRole: string;
  summary: MonthlyFinancialSummary;
  topTransactions: any[];
}): Promise<string> {
  try {
    const res = await fetch('/api/advisor/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.warn('Audit API error, using fallback:', error);
    const over = params.summary.overspentCategories[0];
    return `### 🔍 Spending Audit Report
- **Savings Rate**: ${Math.round(params.summary.savingsRate)}%
- **Overspent Categories**: ${over ? `${over.categoryName} (+$${over.overage})` : 'None detected'}
- **Needs vs Wants**: ${Math.round(params.summary.needsPercentage)}% vs ${Math.round(params.summary.wantsPercentage)}%
- **Recommendation**: Set up a weekly discretionary cash allowance to prevent card tap overruns.`;
  }
}

export async function generateBudgetPlan(params: {
  personaRole: string;
  totalIncome: number;
  currentBudgets: Record<string, number>;
  currentExpenses: Record<string, number>;
}): Promise<string> {
  try {
    const res = await fetch('/api/advisor/budget-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.warn('Budget Plan API error, using fallback:', error);
    return `### 📊 50/30/20 Budget Plan
- **Needs (50%)**: $${Math.round(params.totalIncome * 0.50).toLocaleString()}
- **Wants (30%)**: $${Math.round(params.totalIncome * 0.30).toLocaleString()}
- **Savings/Debt (20%)**: $${Math.round(params.totalIncome * 0.20).toLocaleString()}
Implement auto-transfers on payday for guaranteed savings success.`;
  }
}

export async function predictSpending(params: {
  personaRole: string;
  summary: MonthlyFinancialSummary;
  daysPassedInMonth?: number;
  daysInMonth?: number;
}): Promise<string> {
  try {
    const res = await fetch('/api/advisor/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.warn('Predict API error, using fallback:', error);
    return `### 🔮 Predictive Spending Analysis
- Forecasted Month-End Spend: $${Math.round(params.summary.totalExpense * 1.05).toLocaleString()}
- Projected Savings Surplus: $${Math.round(params.summary.netSavings * 0.95).toLocaleString()}
- Advice: Keep dining and entertainment expenses minimal for the final days of the month.`;
  }
}

export async function loadPersistedState(): Promise<UserFinanceState | null> {
  try {
    const res = await fetch('/api/storage/state');
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (e) {
    return null;
  }
}

export async function savePersistedState(state: UserFinanceState): Promise<boolean> {
  try {
    const res = await fetch('/api/storage/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

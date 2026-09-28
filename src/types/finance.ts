export type TransactionType = 'income' | 'expense';

export type CategoryGroup = 'needs' | 'wants' | 'savings_debt' | 'income';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
  group: CategoryGroup;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  categoryName: string;
  date: string; // YYYY-MM-DD
  description: string;
  isDiscretionary: boolean;
  isRecurring: boolean;
  paymentMethod?: string;
  tags?: string[];
  notes?: string;
}

export interface BudgetLimit {
  categoryId: string;
  monthlyLimit: number;
  alertThreshold?: number; // e.g. 0.8 for 80%
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // YYYY-MM-DD
  category: string;
  priority: 'low' | 'medium' | 'high';
  monthlyContribution: number;
  icon: string;
  notes?: string;
}

export type PersonaId = 'salaried' | 'student' | 'freelancer' | 'household' | 'custom';

export interface FinancialPersona {
  id: PersonaId;
  name: string;
  role: string;
  headline: string;
  description: string;
  monthlyIncomeTarget: number;
  avatarIcon: string;
  scenarioNumber: number; // 1, 2, 3, 4, 0
  highlightTags: string[];
  situationKeyFacts: string[];
}

export interface FinancialHealthScore {
  totalScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  savingsRateScore: number; // 0 - 25
  budgetDisciplineScore: number; // 0 - 25
  emergencyBufferScore: number; // 0 - 25
  discretionaryRatioScore: number; // 0 - 25
  emergencyMonthsBuffer: number;
  savingsRatePercent: number;
  topAdvice: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: string;
  actionType?: 'audit' | 'budget_plan' | 'predict' | 'savings_plan' | 'advice' | 'general';
  structuredData?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarColor?: string;
  isLoggedIn: boolean;
}

export interface UserFinanceState {
  currentPersonaId: PersonaId;
  currentUser?: UserProfile;
  currency: string; // '$', '€', '£', '₹', '¥'
  currentMonth: string; // '2026-09'
  transactions: Transaction[];
  budgets: Record<string, number>; // categoryId -> monthlyLimit
  savingsGoals: SavingsGoal[];
  chatHistory: ChatMessage[];
  lastSavedAt?: string;
}

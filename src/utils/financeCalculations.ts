import { CATEGORIES } from '../data/seedData';
import { CategoryGroup, FinancialHealthScore, Transaction } from '../types/finance';

export function formatCurrency(amount: number, currency: string = '$'): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(abs);

  return `${isNegative ? '-' : ''}${currency}${formatted}`;
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate)}%`;
}

export interface MonthlyFinancialSummary {
  month: string;
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  savingsRate: number;
  needsSpent: number;
  wantsSpent: number;
  savingsInvested: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
  categorySpending: Record<string, number>;
  categoryIncome: Record<string, number>;
  overspentCategories: {
    categoryId: string;
    categoryName: string;
    budgetLimit: number;
    actualSpent: number;
    overage: number;
    percentUsed: number;
  }[];
}

export function calculateMonthlySummary(
  transactions: Transaction[],
  budgets: Record<string, number>,
  monthPrefix: string = '2026-09'
): MonthlyFinancialSummary {
  const filtered = transactions.filter(t => t.date.startsWith(monthPrefix));

  let totalIncome = 0;
  let totalExpense = 0;
  let needsSpent = 0;
  let wantsSpent = 0;
  let savingsInvested = 0;

  const categorySpending: Record<string, number> = {};
  const categoryIncome: Record<string, number> = {};

  const categoryMap = new Map(CATEGORIES.map(c => [c.id, c]));

  for (const t of filtered) {
    const cat = categoryMap.get(t.categoryId);
    const group: CategoryGroup = cat ? cat.group : (t.isDiscretionary ? 'wants' : 'needs');

    if (t.type === 'income') {
      totalIncome += t.amount;
      categoryIncome[t.categoryId] = (categoryIncome[t.categoryId] || 0) + t.amount;
    } else {
      totalExpense += t.amount;
      categorySpending[t.categoryId] = (categorySpending[t.categoryId] || 0) + t.amount;

      if (group === 'needs') {
        needsSpent += t.amount;
      } else if (group === 'wants') {
        wantsSpent += t.amount;
      } else if (group === 'savings_debt') {
        // Emergency fund deposits, investment contributions
        savingsInvested += t.amount;
      }
    }
  }

  // Net savings = total income minus non-savings expenses (or unallocated surplus + intentional savings)
  const livingExpenses = needsSpent + wantsSpent;
  const netSavings = totalIncome - livingExpenses;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.min(100, (netSavings / totalIncome) * 100)) : 0;

  const needsPercentage = totalIncome > 0 ? (needsSpent / totalIncome) * 100 : 0;
  const wantsPercentage = totalIncome > 0 ? (wantsSpent / totalIncome) * 100 : 0;
  const savingsPercentage = totalIncome > 0 ? (savingsInvested / totalIncome) * 100 : 0;

  // Overspent categories
  const overspentCategories: MonthlyFinancialSummary['overspentCategories'] = [];
  for (const [catId, limit] of Object.entries(budgets)) {
    const actual = categorySpending[catId] || 0;
    if (limit > 0 && actual > limit) {
      const cat = categoryMap.get(catId);
      overspentCategories.push({
        categoryId: catId,
        categoryName: cat ? cat.name : catId,
        budgetLimit: limit,
        actualSpent: actual,
        overage: actual - limit,
        percentUsed: Math.round((actual / limit) * 100),
      });
    }
  }

  overspentCategories.sort((a, b) => b.overage - a.overage);

  return {
    month: monthPrefix,
    totalIncome,
    totalExpense,
    netSavings,
    savingsRate,
    needsSpent,
    wantsSpent,
    savingsInvested,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    categorySpending,
    categoryIncome,
    overspentCategories,
  };
}

export function calculateFinancialHealthScore(
  summary: MonthlyFinancialSummary,
  totalEmergencySavings: number = 5000
): FinancialHealthScore {
  // 1. Savings Rate Score (0 - 25)
  // Target: >= 20% gives 25 points, scaled proportionally
  let savingsRateScore = 0;
  if (summary.savingsRate >= 25) savingsRateScore = 25;
  else if (summary.savingsRate >= 20) savingsRateScore = 22;
  else if (summary.savingsRate >= 15) savingsRateScore = 18;
  else if (summary.savingsRate >= 10) savingsRateScore = 14;
  else if (summary.savingsRate >= 5) savingsRateScore = 10;
  else savingsRateScore = Math.max(2, Math.round(summary.savingsRate * 1.5));

  // 2. Budget Discipline Score (0 - 25)
  // Penalize for overspent categories
  const overspentCount = summary.overspentCategories.length;
  let budgetDisciplineScore = 25;
  if (overspentCount === 0) budgetDisciplineScore = 25;
  else if (overspentCount === 1) budgetDisciplineScore = 20;
  else if (overspentCount === 2) budgetDisciplineScore = 15;
  else if (overspentCount === 3) budgetDisciplineScore = 10;
  else budgetDisciplineScore = 5;

  // 3. Emergency Buffer Score (0 - 25)
  // Monthly essential baseline = needsSpent
  const monthlyEssential = summary.needsSpent > 0 ? summary.needsSpent : 1500;
  const emergencyMonthsBuffer = Number((totalEmergencySavings / monthlyEssential).toFixed(1));
  let emergencyBufferScore = 0;
  if (emergencyMonthsBuffer >= 6) emergencyBufferScore = 25;
  else if (emergencyMonthsBuffer >= 3) emergencyBufferScore = 20;
  else if (emergencyMonthsBuffer >= 2) emergencyBufferScore = 15;
  else if (emergencyMonthsBuffer >= 1) emergencyBufferScore = 10;
  else emergencyBufferScore = 5;

  // 4. Discretionary Ratio Score (0 - 25)
  // Wants should ideally be <= 30% of income
  let discretionaryRatioScore = 0;
  if (summary.wantsPercentage <= 20) discretionaryRatioScore = 25;
  else if (summary.wantsPercentage <= 30) discretionaryRatioScore = 22;
  else if (summary.wantsPercentage <= 40) discretionaryRatioScore = 16;
  else if (summary.wantsPercentage <= 50) discretionaryRatioScore = 10;
  else discretionaryRatioScore = 5;

  const totalScore = Math.min(100, Math.max(10, savingsRateScore + budgetDisciplineScore + emergencyBufferScore + discretionaryRatioScore));

  let grade: FinancialHealthScore['grade'] = 'C';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 70) grade = 'B';
  else if (totalScore >= 55) grade = 'C';
  else if (totalScore >= 40) grade = 'D';
  else grade = 'F';

  const topAdvice: string[] = [];
  if (overspentCount > 0) {
    const topOver = summary.overspentCategories[0];
    topAdvice.push(`Trim ${topOver.categoryName} spending to close the $${topOver.overage} budget leak.`);
  }
  if (summary.savingsRate < 20) {
    topAdvice.push(`Target raising your monthly savings rate from ${Math.round(summary.savingsRate)}% to at least 20%.`);
  }
  if (emergencyMonthsBuffer < 3) {
    topAdvice.push(`Build your emergency buffer from ${emergencyMonthsBuffer} months to at least 3-6 months of essential needs.`);
  }
  if (topAdvice.length === 0) {
    topAdvice.push('Excellent financial balance! Consider funneling excess surplus into high-yield investments.');
  }

  return {
    totalScore,
    grade,
    savingsRateScore,
    budgetDisciplineScore,
    emergencyBufferScore,
    discretionaryRatioScore,
    emergencyMonthsBuffer,
    savingsRatePercent: summary.savingsRate,
    topAdvice,
  };
}

export function exportTransactionsToCSV(transactions: Transaction[], currency: string = '$'): string {
  const headers = ['ID', 'Date', 'Type', `Amount (${currency})`, 'Category', 'Description', 'Discretionary', 'Recurring'];
  const rows = transactions.map(t => [
    t.id,
    t.date,
    t.type,
    t.amount.toString(),
    `"${t.categoryName.replace(/"/g, '""')}"`,
    `"${t.description.replace(/"/g, '""')}"`,
    t.isDiscretionary ? 'Yes' : 'No',
    t.isRecurring ? 'Yes' : 'No',
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

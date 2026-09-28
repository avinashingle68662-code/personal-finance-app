import { Category, FinancialPersona, SavingsGoal, Transaction, UserFinanceState } from '../types/finance';

export const CATEGORIES: Category[] = [
  // Income categories
  { id: 'cat-salary', name: 'Primary Salary', icon: 'Briefcase', color: '#10B981', type: 'income', group: 'income' },
  { id: 'cat-freelance', name: 'Freelance & Client Work', icon: 'Laptop', color: '#059669', type: 'income', group: 'income' },
  { id: 'cat-allowance', name: 'Allowance / Stipend', icon: 'GraduationCap', color: '#34D399', type: 'income', group: 'income' },
  { id: 'cat-bonus', name: 'Bonus & Overtime', icon: 'Award', color: '#6EE7B7', type: 'income', group: 'income' },
  { id: 'cat-invest-income', name: 'Dividends & Interest', icon: 'TrendingUp', color: '#047857', type: 'income', group: 'income' },
  { id: 'cat-other-income', name: 'Other Income', icon: 'PlusCircle', color: '#2DD4BF', type: 'income', group: 'income' },

  // Needs (Essential Expenses)
  { id: 'cat-rent', name: 'Rent & Housing', icon: 'Home', color: '#3B82F6', type: 'expense', group: 'needs' },
  { id: 'cat-groceries', name: 'Groceries & Household', icon: 'ShoppingCart', color: '#2563EB', type: 'expense', group: 'needs' },
  { id: 'cat-utilities', name: 'Utilities & Internet', icon: 'Zap', color: '#1D4ED8', type: 'expense', group: 'needs' },
  { id: 'cat-transport', name: 'Transport & Fuel', icon: 'Car', color: '#60A5FA', type: 'expense', group: 'needs' },
  { id: 'cat-healthcare', name: 'Healthcare & Insurance', icon: 'HeartPulse', color: '#0284C7', type: 'expense', group: 'needs' },
  { id: 'cat-education', name: 'Education & Tuition', icon: 'BookOpen', color: '#4F46E5', type: 'expense', group: 'needs' },
  { id: 'cat-tax-reserve', name: 'Tax Reserve', icon: 'FileText', color: '#6366F1', type: 'expense', group: 'needs' },

  // Wants (Discretionary Expenses)
  { id: 'cat-dining', name: 'Dining & Delivery', icon: 'Utensils', color: '#F59E0B', type: 'expense', group: 'wants' },
  { id: 'cat-entertainment', name: 'Entertainment & Events', icon: 'Film', color: '#EC4899', type: 'expense', group: 'wants' },
  { id: 'cat-shopping', name: 'Shopping & Apparel', icon: 'ShoppingBag', color: '#D946EF', type: 'expense', group: 'wants' },
  { id: 'cat-subscriptions', name: 'Tech & Subscriptions', icon: 'Tv', color: '#8B5CF6', type: 'expense', group: 'wants' },
  { id: 'cat-travel', name: 'Travel & Vacations', icon: 'Plane', color: '#F97316', type: 'expense', group: 'wants' },
  { id: 'cat-personal', name: 'Personal Care & Hobbies', icon: 'Sparkles', color: '#E11D48', type: 'expense', group: 'wants' },

  // Savings & Debt Repayment
  { id: 'cat-debt', name: 'Debt & Loan Payoff', icon: 'CreditCard', color: '#EF4444', type: 'expense', group: 'savings_debt' },
  { id: 'cat-emergency-fund', name: 'Emergency Fund Deposit', icon: 'ShieldCheck', color: '#10B981', type: 'expense', group: 'savings_debt' },
  { id: 'cat-investments', name: 'Investments & 401(k)', icon: 'BarChart3', color: '#14B8A6', type: 'expense', group: 'savings_debt' },
];

export const PERSONAS: FinancialPersona[] = [
  {
    id: 'salaried',
    name: 'Alex Chen',
    role: 'Senior Tech Operations Specialist',
    headline: 'Salaried Professional',
    description: 'Steady monthly income looking to curb sneaky dining & entertainment leaks, build an aggressive down payment fund, and optimize the 50/30/20 rule.',
    monthlyIncomeTarget: 6100,
    avatarIcon: 'Briefcase',
    scenarioNumber: 1,
    highlightTags: ['Fixed Salary', 'Dining Leaks', 'Downpayment Goal', '50/30/20 Rule'],
    situationKeyFacts: [
      'Base monthly salary: $5,500 + quarterly performance bonus ($600).',
      'Overspending identified in takeout food delivery ($480 vs $350 budget) and nightlife.',
      'Active savings rate is 22%, aiming to accelerate to 30% for real estate down payment.',
      'Needs a structured monthly report comparing planned vs actual spending.'
    ]
  },
  {
    id: 'student',
    name: 'Maya Patel',
    role: 'Computer Science Undergraduate',
    headline: 'College Student',
    description: 'Managing a constrained monthly allowance and campus tutoring stipend. Needs strict spending discipline, student discounts, and an emergency cushion.',
    monthlyIncomeTarget: 1100,
    avatarIcon: 'GraduationCap',
    scenarioNumber: 2,
    highlightTags: ['Tight Budget', 'Allowance & Stipend', 'Dorm Cooking', 'Emergency Buffer'],
    situationKeyFacts: [
      'Total monthly budget: $1,100 ($700 parent allowance + $400 campus lab tutor).',
      'High proportion of fixed costs (dorm/sublet $450, books/campus transit $110).',
      'Frequent late-night food & convenience store runs causing cash shortfalls.',
      'Requires realistic category caps and recommendations for campus discount perks.'
    ]
  },
  {
    id: 'freelancer',
    name: 'Marcus Vance',
    role: 'Independent Brand Designer & Consultant',
    headline: 'Freelancer (Variable Income)',
    description: 'Income swings between $3,200 and $6,400 per month across multiple clients. Needs a lean baseline budget, 6-month runway buffer, and tax withholdings.',
    monthlyIncomeTarget: 5700,
    avatarIcon: 'Laptop',
    scenarioNumber: 3,
    highlightTags: ['Variable Income', 'Client Retainers', 'Tax Reserve', '6-Month Runway'],
    situationKeyFacts: [
      'Variable earnings across 3 clients: $2,500 retainer, $1,800 project, $1,400 sprint.',
      'Must allocate 20-25% for quarterly estimated taxes without touching it.',
      'Expenses include Figma/Adobe SaaS, co-working space pass, and health insurance.',
      'Needs safety baseline analysis to withstand low-revenue drought months.'
    ]
  },
  {
    id: 'household',
    name: 'Sarah & David Jenkins',
    role: 'Dual-Earner Household of 4',
    headline: 'Household Manager',
    description: 'Managing shared family income of $8,500 across two kids, mortgage, daycare, utilities, and grocery inflation. Seeking long-term college and emergency security.',
    monthlyIncomeTarget: 8500,
    avatarIcon: 'Users',
    scenarioNumber: 4,
    highlightTags: ['Family of 4', 'Mortgage & Daycare', 'Grocery Surges', 'College 529 Plan'],
    situationKeyFacts: [
      'Combined monthly take-home: $8,500 ($5,200 engineering + $3,300 education).',
      'Major fixed obligations: Mortgage ($2,400), Daycare ($1,450), Healthcare ($620).',
      'Recent grocery inflation causing $180 overrun above standard $1,100 family budget.',
      'Requires consolidated monthly report with family savings strategies for College & Vacation.'
    ]
  },
  {
    id: 'custom',
    name: 'Personal Profile',
    role: 'Custom User',
    headline: 'My Custom Finances',
    description: 'Track your own income streams, log custom daily expenses, set personalized savings goals, and consult the AI Advisor tailored to your unique financial situation.',
    monthlyIncomeTarget: 4500,
    avatarIcon: 'User',
    scenarioNumber: 0,
    highlightTags: ['Personalized', 'Interactive', 'Custom Goals', 'Real-time Analytics'],
    situationKeyFacts: [
      'Fully customizable income and expense streams.',
      'Adaptive AI advice based on your real entered transactions.',
      'Configurable monthly budget limits and goal milestones.'
    ]
  }
];

// Helper to get realistic dates in September 2026
const d = (day: number) => `2026-09-${String(day).padStart(2, '0')}`;

// Scenario 1: Salaried Professional
const SALARIED_TRANSACTIONS: Transaction[] = [
  // Income
  { id: 's1-inc-1', type: 'income', amount: 5500, categoryId: 'cat-salary', categoryName: 'Primary Salary', date: d(1), description: 'Direct Deposit - TechCorp Bi-weekly & EOM Salary', isDiscretionary: false, isRecurring: true },
  { id: 's1-inc-2', type: 'income', amount: 600, categoryId: 'cat-bonus', categoryName: 'Bonus & Overtime', date: d(15), description: 'Q3 Product Launch Performance Bonus', isDiscretionary: false, isRecurring: false },

  // Needs
  { id: 's1-exp-1', type: 'expense', amount: 1600, categoryId: 'cat-rent', categoryName: 'Rent & Housing', date: d(1), description: '1BR Apartment Rent - Downtown', isDiscretionary: false, isRecurring: true },
  { id: 's1-exp-2', type: 'expense', amount: 210, categoryId: 'cat-utilities', categoryName: 'Utilities & Internet', date: d(3), description: 'Fiber Internet & Electric Utility Bill', isDiscretionary: false, isRecurring: true },
  { id: 's1-exp-3', type: 'expense', amount: 250, categoryId: 'cat-transport', categoryName: 'Transport & Fuel', date: d(5), description: 'Monthly Metro Pass & Ride Shares', isDiscretionary: false, isRecurring: true },
  { id: 's1-exp-4', type: 'expense', amount: 280, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(6), description: 'Trader Joe’s weekly restock', isDiscretionary: false, isRecurring: false },
  { id: 's1-exp-5', type: 'expense', amount: 245, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(18), description: 'Whole Foods market organic produce', isDiscretionary: false, isRecurring: false },
  { id: 's1-exp-6', type: 'expense', amount: 180, categoryId: 'cat-healthcare', categoryName: 'Healthcare & Insurance', date: d(10), description: 'Dental checkup & Prescription copay', isDiscretionary: false, isRecurring: false },

  // Wants (Discretionary Leaks)
  { id: 's1-exp-7', type: 'expense', amount: 145, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(4), description: 'DoorDash Friday sushi for two', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-8', type: 'expense', amount: 165, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(12), description: 'Weekend bistro dinner with colleagues', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-9', type: 'expense', amount: 95, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(19), description: 'Artisan coffee & weekday bakery lunches', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-10', type: 'expense', amount: 75, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(24), description: 'Food truck lunch and bubble teas', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-11', type: 'expense', amount: 190, categoryId: 'cat-entertainment', categoryName: 'Entertainment & Events', date: d(14), description: 'Concert tickets & drinks at amphitheater', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-12', type: 'expense', amount: 130, categoryId: 'cat-entertainment', categoryName: 'Entertainment & Events', date: d(22), description: 'IMAX movies & weekend mini-golf', isDiscretionary: true, isRecurring: false },
  { id: 's1-exp-13', type: 'expense', amount: 95, categoryId: 'cat-subscriptions', categoryName: 'Tech & Subscriptions', date: d(8), description: 'Gym membership, Spotify, Netflix & Claude Pro', isDiscretionary: true, isRecurring: true },
  { id: 's1-exp-14', type: 'expense', amount: 180, categoryId: 'cat-shopping', categoryName: 'Shopping & Apparel', date: d(16), description: 'Autumn sneakers & casual work shirts', isDiscretionary: true, isRecurring: false },

  // Savings / Debt
  { id: 's1-exp-15', type: 'expense', amount: 700, categoryId: 'cat-emergency-fund', categoryName: 'Emergency Fund Deposit', date: d(2), description: 'High Yield Savings Account transfer', isDiscretionary: false, isRecurring: true },
  { id: 's1-exp-16', type: 'expense', amount: 500, categoryId: 'cat-investments', categoryName: 'Investments & 401(k)', date: d(15), description: 'S&P 500 Index Fund Auto-invest', isDiscretionary: false, isRecurring: true },
];

const SALARIED_BUDGETS: Record<string, number> = {
  'cat-rent': 1600,
  'cat-utilities': 220,
  'cat-transport': 260,
  'cat-groceries': 550,
  'cat-healthcare': 200,
  'cat-dining': 350, // Actual is 480 (OVERSPENT by 130!)
  'cat-entertainment': 200, // Actual is 320 (OVERSPENT by 120!)
  'cat-subscriptions': 100,
  'cat-shopping': 200,
  'cat-emergency-fund': 800,
  'cat-investments': 600,
};

const SALARIED_GOALS: SavingsGoal[] = [
  {
    id: 'g-sal-1',
    name: 'Home Down Payment Reserve',
    targetAmount: 40000,
    currentAmount: 18500,
    targetDate: '2027-12-31',
    category: 'Real Estate',
    priority: 'high',
    monthlyContribution: 800,
    icon: 'Home',
    notes: 'Aiming for 20% down on a condo in the tech corridor.'
  },
  {
    id: 'g-sal-2',
    name: '6-Month Emergency Shield',
    targetAmount: 18000,
    currentAmount: 11400,
    targetDate: '2027-04-30',
    category: 'Emergency',
    priority: 'high',
    monthlyContribution: 700,
    icon: 'ShieldCheck',
    notes: 'Held in high-yield account yielding 4.5% APY.'
  },
  {
    id: 'g-sal-3',
    name: 'Tokyo Spring Vacation',
    targetAmount: 4500,
    currentAmount: 2200,
    targetDate: '2027-03-25',
    category: 'Travel',
    priority: 'medium',
    monthlyContribution: 300,
    icon: 'Plane',
    notes: 'Flights and cherry blossom week bookings.'
  }
];

// Scenario 2: College Student
const STUDENT_TRANSACTIONS: Transaction[] = [
  // Income ($1,100)
  { id: 's2-inc-1', type: 'income', amount: 700, categoryId: 'cat-allowance', categoryName: 'Allowance / Stipend', date: d(1), description: 'Parental Monthly Living Support', isDiscretionary: false, isRecurring: true },
  { id: 's2-inc-2', type: 'income', amount: 400, categoryId: 'cat-salary', categoryName: 'Primary Salary', date: d(15), description: 'CS Lab Peer Tutor Stipend (10 hrs/wk)', isDiscretionary: false, isRecurring: true },

  // Needs ($645)
  { id: 's2-exp-1', type: 'expense', amount: 450, categoryId: 'cat-rent', categoryName: 'Rent & Housing', date: d(1), description: 'Shared 3-person apartment sublet near campus', isDiscretionary: false, isRecurring: true },
  { id: 's2-exp-2', type: 'expense', amount: 140, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(4), description: 'Aldi student essentials: oats, eggs, rice, produce', isDiscretionary: false, isRecurring: false },
  { id: 's2-exp-3', type: 'expense', amount: 110, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(18), description: 'Discount bulk pantry items and ramen', isDiscretionary: false, isRecurring: false },
  { id: 's2-exp-4', type: 'expense', amount: 65, categoryId: 'cat-transport', categoryName: 'Transport & Fuel', date: d(5), description: 'University bus pass recharge and bike maintenance', isDiscretionary: false, isRecurring: true },
  { id: 's2-exp-5', type: 'expense', amount: 45, categoryId: 'cat-education', categoryName: 'Education & Tuition', date: d(10), description: 'Course lab access code & printing credits', isDiscretionary: false, isRecurring: false },

  // Wants ($235) - Sneaky leaks in dining & cafe drinks
  { id: 's2-exp-6', type: 'expense', amount: 48, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(6), description: 'Late-night campus pizza after study group', isDiscretionary: true, isRecurring: false },
  { id: 's2-exp-7', type: 'expense', amount: 52, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(13), description: 'DoorDash burger & boba during midterms', isDiscretionary: true, isRecurring: false },
  { id: 's2-exp-8', type: 'expense', amount: 35, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(20), description: 'Campus library espresso drinks', isDiscretionary: true, isRecurring: false },
  { id: 's2-exp-9', type: 'expense', amount: 30, categoryId: 'cat-entertainment', categoryName: 'Entertainment & Events', date: d(12), description: 'Campus theater ticket & snacks', isDiscretionary: true, isRecurring: false },
  { id: 's2-exp-10', type: 'expense', amount: 20, categoryId: 'cat-subscriptions', categoryName: 'Tech & Subscriptions', date: d(2), description: 'Student Spotify Duo & iCloud storage', isDiscretionary: true, isRecurring: true },
  { id: 's2-exp-11', type: 'expense', amount: 50, categoryId: 'cat-shopping', categoryName: 'Shopping & Apparel', date: d(22), description: 'Thrift shop autumn sweater', isDiscretionary: true, isRecurring: false },

  // Savings ($100)
  { id: 's2-exp-12', type: 'expense', amount: 70, categoryId: 'cat-emergency-fund', categoryName: 'Emergency Fund Deposit', date: d(2), description: 'Student rainy day buffer deposit', isDiscretionary: false, isRecurring: true },
  { id: 's2-exp-13', type: 'expense', amount: 30, categoryId: 'cat-investments', categoryName: 'Investments & 401(k)', date: d(15), description: 'Micro-investing app round-ups', isDiscretionary: false, isRecurring: true },
];

const STUDENT_BUDGETS: Record<string, number> = {
  'cat-rent': 450,
  'cat-groceries': 220, // Actual is 250 (slightly over)
  'cat-transport': 70,
  'cat-education': 50,
  'cat-dining': 75, // Actual is 135 (OVERSPENT by 60!)
  'cat-entertainment': 30,
  'cat-subscriptions': 20,
  'cat-shopping': 40,
  'cat-emergency-fund': 75,
  'cat-investments': 30,
};

const STUDENT_GOALS: SavingsGoal[] = [
  {
    id: 'g-stu-1',
    name: 'Graduation Laptop Upgrade',
    targetAmount: 1200,
    currentAmount: 480,
    targetDate: '2027-05-15',
    category: 'Tech',
    priority: 'high',
    monthlyContribution: 60,
    icon: 'Laptop',
    notes: 'Refurbished M-series MacBook for coding capstone projects.'
  },
  {
    id: 'g-stu-2',
    name: 'Student Emergency Buffer',
    targetAmount: 1000,
    currentAmount: 390,
    targetDate: '2027-02-28',
    category: 'Emergency',
    priority: 'medium',
    monthlyContribution: 40,
    icon: 'ShieldCheck',
    notes: 'For unexpected textbook or medical clinic fees.'
  }
];

// Scenario 3: Freelancer with Variable Income
const FREELANCER_TRANSACTIONS: Transaction[] = [
  // Income ($5,700 across 3 clients)
  { id: 's3-inc-1', type: 'income', amount: 2500, categoryId: 'cat-freelance', categoryName: 'Freelance & Client Work', date: d(2), description: 'Client Apex - Monthly Design Retainer', isDiscretionary: false, isRecurring: true },
  { id: 's3-inc-2', type: 'income', amount: 1800, categoryId: 'cat-freelance', categoryName: 'Freelance & Client Work', date: d(14), description: 'Client Lumina - Brand Identity Milestone 2', isDiscretionary: false, isRecurring: false },
  { id: 's3-inc-3', type: 'income', amount: 1400, categoryId: 'cat-freelance', categoryName: 'Freelance & Client Work', date: d(25), description: 'Client FinTech - Web UI Sprint Deliverable', isDiscretionary: false, isRecurring: false },

  // Business & Living Needs
  { id: 's3-exp-1', type: 'expense', amount: 1450, categoryId: 'cat-rent', categoryName: 'Rent & Housing', date: d(1), description: 'Live/Work Studio Apartment', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-2', type: 'expense', amount: 1140, categoryId: 'cat-tax-reserve', categoryName: 'Tax Reserve', date: d(15), description: 'Estimated Q3 Federal & State Tax (20% set aside)', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-3', type: 'expense', amount: 320, categoryId: 'cat-healthcare', categoryName: 'Healthcare & Insurance', date: d(5), description: 'Self-Employed ACA Health & Vision Plan', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-4', type: 'expense', amount: 250, categoryId: 'cat-utilities', categoryName: 'Utilities & Internet', date: d(6), description: 'Co-working hot desk pass & Gig-speed fiber', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-5', type: 'expense', amount: 480, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(7), description: 'Fresh market groceries and meal prep items', isDiscretionary: false, isRecurring: false },
  { id: 's3-exp-6', type: 'expense', amount: 190, categoryId: 'cat-subscriptions', categoryName: 'Tech & Subscriptions', date: d(3), description: 'Adobe Creative Cloud, Figma Pro, Webflow, Loom', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-7', type: 'expense', amount: 180, categoryId: 'cat-transport', categoryName: 'Transport & Fuel', date: d(11), description: 'Car insurance and client meeting fuel', isDiscretionary: false, isRecurring: true },

  // Discretionary
  { id: 's3-exp-8', type: 'expense', amount: 175, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(9), description: 'Client lunch meeting and networking coffee', isDiscretionary: true, isRecurring: false },
  { id: 's3-exp-9', type: 'expense', amount: 135, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(21), description: 'Weekend social dinners and craft beers', isDiscretionary: true, isRecurring: false },
  { id: 's3-exp-10', type: 'expense', amount: 120, categoryId: 'cat-entertainment', categoryName: 'Entertainment & Events', date: d(18), description: 'Design museum exhibit and indie film pass', isDiscretionary: true, isRecurring: false },
  { id: 's3-exp-11', type: 'expense', amount: 160, categoryId: 'cat-shopping', categoryName: 'Shopping & Apparel', date: d(23), description: 'Studio desk lighting & mechanical keyboard keycaps', isDiscretionary: true, isRecurring: false },

  // Savings / Runway
  { id: 's3-exp-12', type: 'expense', amount: 800, categoryId: 'cat-emergency-fund', categoryName: 'Emergency Fund Deposit', date: d(2), description: 'Freelance 6-Month Income Volatility Runway', isDiscretionary: false, isRecurring: true },
  { id: 's3-exp-13', type: 'expense', amount: 300, categoryId: 'cat-investments', categoryName: 'Investments & 401(k)', date: d(26), description: 'Solo 401(k) auto-contribution', isDiscretionary: false, isRecurring: true },
];

const FREELANCER_BUDGETS: Record<string, number> = {
  'cat-rent': 1450,
  'cat-tax-reserve': 1200,
  'cat-healthcare': 350,
  'cat-utilities': 250,
  'cat-groceries': 450, // Actual is 480 (slight overspend)
  'cat-subscriptions': 200,
  'cat-transport': 180,
  'cat-dining': 250, // Actual is 310 (OVERSPENT by 60!)
  'cat-entertainment': 100,
  'cat-shopping': 150,
  'cat-emergency-fund': 800,
  'cat-investments': 300,
};

const FREELANCER_GOALS: SavingsGoal[] = [
  {
    id: 'g-free-1',
    name: '6-Month Freelance Runway Cushion',
    targetAmount: 20000,
    currentAmount: 11800,
    targetDate: '2027-06-30',
    category: 'Emergency',
    priority: 'high',
    monthlyContribution: 800,
    icon: 'ShieldCheck',
    notes: 'Crucial buffer to withstand client dry spells without touching investments.'
  },
  {
    id: 'g-free-2',
    name: 'Pro Studio Workstation & Camera',
    targetAmount: 3800,
    currentAmount: 2200,
    targetDate: '2027-01-31',
    category: 'Tech',
    priority: 'medium',
    monthlyContribution: 300,
    icon: 'Laptop',
    notes: 'High-end 4K editing monitor and mirrorless client video camera.'
  }
];

// Scenario 4: Household Manager
const HOUSEHOLD_TRANSACTIONS: Transaction[] = [
  // Combined Family Income ($8,500)
  { id: 's4-inc-1', type: 'income', amount: 5200, categoryId: 'cat-salary', categoryName: 'Primary Salary', date: d(1), description: 'David - Engineering Lead Salary (Direct Deposit)', isDiscretionary: false, isRecurring: true },
  { id: 's4-inc-2', type: 'income', amount: 3300, categoryId: 'cat-salary', categoryName: 'Primary Salary', date: d(1), description: 'Sarah - School Administrator Salary (Direct Deposit)', isDiscretionary: false, isRecurring: true },

  // Heavy Household Needs
  { id: 's4-exp-1', type: 'expense', amount: 2400, categoryId: 'cat-rent', categoryName: 'Rent & Housing', date: d(1), description: 'Suburban Home Mortgage & Property Escrow', isDiscretionary: false, isRecurring: true },
  { id: 's4-exp-2', type: 'expense', amount: 1450, categoryId: 'cat-education', categoryName: 'Education & Tuition', date: d(1), description: 'Preschool daycare & elementary after-school care', isDiscretionary: false, isRecurring: true },
  { id: 's4-exp-3', type: 'expense', amount: 680, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(3), description: 'Costco family bulk run: diapers, proteins, staples', isDiscretionary: false, isRecurring: false },
  { id: 's4-exp-4', type: 'expense', amount: 600, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(17), description: 'Kroger & organic supermarket weekly groceries', isDiscretionary: false, isRecurring: false },
  { id: 's4-exp-5', type: 'expense', amount: 460, categoryId: 'cat-utilities', categoryName: 'Utilities & Internet', date: d(5), description: 'Family gas heating, electricity, water, & trash', isDiscretionary: false, isRecurring: true },
  { id: 's4-exp-6', type: 'expense', amount: 620, categoryId: 'cat-healthcare', categoryName: 'Healthcare & Insurance', date: d(8), description: 'Family HMO health, dental & vision premiums', isDiscretionary: false, isRecurring: true },
  { id: 's4-exp-7', type: 'expense', amount: 420, categoryId: 'cat-transport', categoryName: 'Transport & Fuel', date: d(10), description: 'Two vehicle insurance, gas & maintenance', isDiscretionary: false, isRecurring: true },

  // Wants & Family Discretionary
  { id: 's4-exp-8', type: 'expense', amount: 220, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(11), description: 'Friday family pizza night & takeout treats', isDiscretionary: true, isRecurring: false },
  { id: 's4-exp-9', type: 'expense', amount: 120, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(21), description: 'Weekend brunch and ice cream parlor with kids', isDiscretionary: true, isRecurring: false },
  { id: 's4-exp-10', type: 'expense', amount: 280, categoryId: 'cat-entertainment', categoryName: 'Entertainment & Events', date: d(14), description: 'Zoo annual family membership & kids soccer gear', isDiscretionary: true, isRecurring: false },
  { id: 's4-exp-11', type: 'expense', amount: 85, categoryId: 'cat-subscriptions', categoryName: 'Tech & Subscriptions', date: d(4), description: 'Disney+, Netflix 4K, Amazon Prime, Spotify Family', isDiscretionary: true, isRecurring: true },
  { id: 's4-exp-12', type: 'expense', amount: 140, categoryId: 'cat-shopping', categoryName: 'Shopping & Apparel', date: d(24), description: 'Kids autumn shoes and back-to-school supplies', isDiscretionary: true, isRecurring: false },

  // Savings & College 529
  { id: 's4-exp-13', type: 'expense', amount: 500, categoryId: 'cat-investments', categoryName: 'Investments & 401(k)', date: d(1), description: 'Kids College 529 Investment Plan Auto-transfer', isDiscretionary: false, isRecurring: true },
  { id: 's4-exp-14', type: 'expense', amount: 400, categoryId: 'cat-emergency-fund', categoryName: 'Emergency Fund Deposit', date: d(15), description: 'Family Home Repair & Emergency Reserve', isDiscretionary: false, isRecurring: true },
];

const HOUSEHOLD_BUDGETS: Record<string, number> = {
  'cat-rent': 2400,
  'cat-education': 1450,
  'cat-groceries': 1100, // Actual is 1280 (OVERSPENT by 180!)
  'cat-utilities': 400, // Actual is 460 (OVERSPENT by 60 due to heating!)
  'cat-healthcare': 620,
  'cat-transport': 420,
  'cat-dining': 280, // Actual is 340 (OVERSPENT by 60)
  'cat-entertainment': 250,
  'cat-subscriptions': 90,
  'cat-shopping': 150,
  'cat-investments': 500,
  'cat-emergency-fund': 400,
};

const HOUSEHOLD_GOALS: SavingsGoal[] = [
  {
    id: 'g-house-1',
    name: 'Children College 529 Fund',
    targetAmount: 50000,
    currentAmount: 22400,
    targetDate: '2032-08-31',
    category: 'Education',
    priority: 'high',
    monthlyContribution: 500,
    icon: 'GraduationCap',
    notes: 'Tax-advantaged index fund growth for Emma and Liam’s higher education.'
  },
  {
    id: 'g-house-2',
    name: 'Home Roof & HVAC Maintenance Reserve',
    targetAmount: 12000,
    currentAmount: 6800,
    targetDate: '2027-10-31',
    category: 'Emergency',
    priority: 'high',
    monthlyContribution: 400,
    icon: 'Home',
    notes: 'Anticipating HVAC system replacement in late 2027.'
  },
  {
    id: 'g-house-3',
    name: 'Family Summer National Parks Trip',
    targetAmount: 5000,
    currentAmount: 3100,
    targetDate: '2027-07-01',
    category: 'Travel',
    priority: 'medium',
    monthlyContribution: 250,
    icon: 'Plane',
    notes: 'Cabin rental, gear, and park admissions.'
  }
];

export const INITIAL_STATES: Record<string, UserFinanceState> = {
  salaried: {
    currentPersonaId: 'salaried',
    currentUser: {
      id: 'u-alex',
      name: 'Alex Chen',
      email: 'alex.chen@techcorp.com',
      role: 'Salaried Professional',
      avatarColor: '#10B981',
      isLoggedIn: true,
    },
    currency: '$',
    currentMonth: '2026-09',
    transactions: SALARIED_TRANSACTIONS,
    budgets: SALARIED_BUDGETS,
    savingsGoals: SALARIED_GOALS,
    chatHistory: [
      {
        id: 'msg-sal-1',
        role: 'model',
        text: "👋 Welcome Alex! I've completed your September spending review. You're doing well with a 22% net savings rate, but you're running $250 over budget across Dining ($480 vs $350) and Entertainment ($320 vs $200). If we rein in weekend food delivery, you could redirect $300 straight into your Home Down Payment Reserve! Would you like me to generate a tailored 50/30/20 rebalancing plan?",
        timestamp: '2026-09-27 09:15',
        actionType: 'audit'
      }
    ]
  },
  student: {
    currentPersonaId: 'student',
    currentUser: {
      id: 'u-maya',
      name: 'Maya Patel',
      email: 'maya.patel@campus.edu',
      role: 'College Student',
      avatarColor: '#3B82F6',
      isLoggedIn: true,
    },
    currency: '$',
    currentMonth: '2026-09',
    transactions: STUDENT_TRANSACTIONS,
    budgets: STUDENT_BUDGETS,
    savingsGoals: STUDENT_GOALS,
    chatHistory: [
      {
        id: 'msg-stu-1',
        role: 'model',
        text: "Hey Maya! 🎓 As a college student on a $1,100 monthly budget, every dollar counts. Right now, discretionary spending on takeout pizza, boba, and library espressos ($135) has exceeded your $75 food allowance. By swapping 2 DoorDash orders for batch dorm pasta cooking and using the campus coffee club, you can save $60/month to fund your Graduation Laptop Goal!",
        timestamp: '2026-09-27 10:20',
        actionType: 'advice'
      }
    ]
  },
  freelancer: {
    currentPersonaId: 'freelancer',
    currentUser: {
      id: 'u-marcus',
      name: 'Marcus Vance',
      email: 'marcus@vancecreative.com',
      role: 'Freelance Designer',
      avatarColor: '#8B5CF6',
      isLoggedIn: true,
    },
    currency: '$',
    currentMonth: '2026-09',
    transactions: FREELANCER_TRANSACTIONS,
    budgets: FREELANCER_BUDGETS,
    savingsGoals: FREELANCER_GOALS,
    chatHistory: [
      {
        id: 'msg-free-1',
        role: 'model',
        text: "Hello Marcus! 💻 September was a strong month with $5,700 earned across Apex, Lumina, and FinTech. I noticed you reserved $1,140 (20%) for estimated taxes—excellent discipline! Because freelance earnings can drop to $3,200 during slower quarters, I recommend keeping your living baseline at $2,800 and placing surplus cash directly into your 6-Month Volatility Runway.",
        timestamp: '2026-09-27 11:05',
        actionType: 'audit'
      }
    ]
  },
  household: {
    currentPersonaId: 'household',
    currentUser: {
      id: 'u-jenkins',
      name: 'Sarah & David Jenkins',
      email: 'jenkins.family@home.org',
      role: 'Household Manager',
      avatarColor: '#F59E0B',
      isLoggedIn: true,
    },
    currency: '$',
    currentMonth: '2026-09',
    transactions: HOUSEHOLD_TRANSACTIONS,
    budgets: HOUSEHOLD_BUDGETS,
    savingsGoals: HOUSEHOLD_GOALS,
    chatHistory: [
      {
        id: 'msg-house-1',
        role: 'model',
        text: "Welcome Sarah & David! 👨‍👩‍👧‍👦 Here is your consolidated family financial overview for September. Out of your combined $8,500 income, fixed needs (mortgage, daycare, health, groceries) took up $7,430. Groceries surged to $1,280 ($180 above target), and early autumn heating bumped utilities by $60. Your Children's 529 plan ($500) remains fully on schedule. Want to see bulk shopping recommendations to trim $200 from groceries?",
        timestamp: '2026-09-27 08:45',
        actionType: 'audit'
      }
    ]
  },
  custom: {
    currentPersonaId: 'custom',
    currentUser: {
      id: 'u-user',
      name: 'Personal User',
      email: 'user@example.com',
      role: 'Personal Finance Manager',
      avatarColor: '#059669',
      isLoggedIn: true,
    },
    currency: '$',
    currentMonth: '2026-09',
    transactions: [
      { id: 'c-inc-1', type: 'income', amount: 4500, categoryId: 'cat-salary', categoryName: 'Primary Salary', date: d(1), description: 'Monthly Salary', isDiscretionary: false, isRecurring: true },
      { id: 'c-exp-1', type: 'expense', amount: 1300, categoryId: 'cat-rent', categoryName: 'Rent & Housing', date: d(1), description: 'Apartment rent', isDiscretionary: false, isRecurring: true },
      { id: 'c-exp-2', type: 'expense', amount: 400, categoryId: 'cat-groceries', categoryName: 'Groceries & Household', date: d(4), description: 'Supermarket supplies', isDiscretionary: false, isRecurring: false },
      { id: 'c-exp-3', type: 'expense', amount: 150, categoryId: 'cat-utilities', categoryName: 'Utilities & Internet', date: d(5), description: 'Electric & Wi-Fi', isDiscretionary: false, isRecurring: true },
      { id: 'c-exp-4', type: 'expense', amount: 220, categoryId: 'cat-dining', categoryName: 'Dining & Delivery', date: d(12), description: 'Dining out and weekend coffee', isDiscretionary: true, isRecurring: false },
      { id: 'c-exp-5', type: 'expense', amount: 600, categoryId: 'cat-emergency-fund', categoryName: 'Emergency Fund Deposit', date: d(15), description: 'Savings deposit', isDiscretionary: false, isRecurring: true },
    ],
    budgets: {
      'cat-rent': 1300,
      'cat-groceries': 450,
      'cat-utilities': 160,
      'cat-dining': 200,
      'cat-emergency-fund': 700,
    },
    savingsGoals: [
      {
        id: 'g-cust-1',
        name: 'Rainy Day Fund',
        targetAmount: 10000,
        currentAmount: 4200,
        targetDate: '2027-08-31',
        category: 'Emergency',
        priority: 'high',
        monthlyContribution: 500,
        icon: 'ShieldCheck',
        notes: 'Targeting 3-6 months of essential living expenses.'
      }
    ],
    chatHistory: [
      {
        id: 'msg-cust-1',
        role: 'model',
        text: "👋 Welcome to your Personal Finance Advisor Bot! I am ready to analyze your income, monitor your daily expenses, generate smart budgets, and help you achieve your savings goals. Tell me what you'd like to work on today!",
        timestamp: '2026-09-27 12:00',
        actionType: 'general'
      }
    ]
  }
};

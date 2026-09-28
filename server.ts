import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Simple on-disk state storage for persistence across turns/restarts
const DATA_DIR = path.resolve(process.cwd(), '.data');
const STATE_FILE = path.join(DATA_DIR, 'user_finance_state.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Failed to create .data dir', e);
  }
}

// Fallback intelligent financial advisor logic if API key isn't provided or fails
function generateFallbackAdvisorResponse(
  prompt: string,
  personaRole: string,
  summary: any
): string {
  const overruns = summary?.overspentCategories || [];
  const topOverrun = overruns.length > 0 ? overruns[0] : null;
  const savingsRate = Math.round(summary?.savingsRate || 0);

  if (prompt.toLowerCase().includes('audit') || prompt.toLowerCase().includes('spending')) {
    return `### 🔍 AI Financial Audit Summary for ${personaRole}

**1. Cash Flow & Savings Efficiency**
- Current Savings Rate: **${savingsRate}%** (Benchmark: 20%+ for healthy long-term growth).
- Total Income: **$${(summary?.totalIncome || 0).toLocaleString()}** vs Living Expenses: **$${((summary?.needsSpent || 0) + (summary?.wantsSpent || 0)).toLocaleString()}**.

**2. Spending Leaks & Category Overruns**
${topOverrun ? `- ⚠️ **${topOverrun.categoryName}**: Exceeded budget by **$${topOverrun.overage}** (${topOverrun.percentUsed}% of limit utilized).` : '- ✅ All tracked categories are currently within budget limits!'}
- Needs vs Wants Ratio: **${Math.round(summary?.needsPercentage || 0)}% Needs** vs **${Math.round(summary?.wantsPercentage || 0)}% Wants** (50/30 target).

**3. Actionable Next Steps**
1. Put a temporary freeze on non-essential dining/delivery for the next 7 days.
2. Automate a transfer of at least 15-20% of your primary income on payday before discretionary spending begins.
3. Review recurring subscriptions and cancel unused memberships to instantly recover $40–$80 monthly.`;
  }

  if (prompt.toLowerCase().includes('budget') || prompt.toLowerCase().includes('plan')) {
    const inc = summary?.totalIncome || 4500;
    const needsTarget = Math.round(inc * 0.50);
    const wantsTarget = Math.round(inc * 0.30);
    const savingsTarget = Math.round(inc * 0.20);

    return `### 📊 Personalized 50/30/20 Budget Blueprint

Based on your current monthly revenue of **$${inc.toLocaleString()}**, here is your optimized financial framework:

- **Needs (50% = $${needsTarget.toLocaleString()})**:
  - Rent/Housing: ~$${Math.round(inc * 0.28).toLocaleString()}
  - Groceries & Household: ~$${Math.round(inc * 0.12).toLocaleString()}
  - Utilities, Transport & Health: ~$${Math.round(inc * 0.10).toLocaleString()}
- **Wants & Discretionary (30% = $${wantsTarget.toLocaleString()})**:
  - Dining & Coffee: ~$${Math.round(inc * 0.12).toLocaleString()}
  - Entertainment & Hobbies: ~$${Math.round(inc * 0.10).toLocaleString()}
  - Shopping & Personal: ~$${Math.round(inc * 0.08).toLocaleString()}
- **Savings & Emergency Runway (20% = $${savingsTarget.toLocaleString()})**:
  - Emergency Fund: ~$${Math.round(inc * 0.12).toLocaleString()}
  - Investments & 401(k): ~$${Math.round(inc * 0.08).toLocaleString()}

*Recommendation*: Automate your savings transfer on day 1 of the month to protect your long-term goals.`;
  }

  if (prompt.toLowerCase().includes('predict') || prompt.toLowerCase().includes('forecast')) {
    return `### 🔮 Predictive Spending & Cashflow Forecast

- **Projected End-of-Month Expenses**: ~$${Math.round((summary?.totalExpense || 3000) * 1.05).toLocaleString()}
- **Forecasted Savings Surplus**: ~$${Math.round((summary?.netSavings || 800) * 0.95).toLocaleString()}
- **Upcoming Risk Factors**:
  - Watch for weekend dining spikes which typically surge by 35% in the final two weeks of the month.
  - Anticipated seasonal utility fluctuations and recurring digital subscriptions due in early October.
- **Strategic Advice**: Set a hard daily discretionary cap of $25/day for the remaining days of this billing cycle.`;
  }

  return `### 💡 AI Personal Finance Recommendation

As an advisor tuned for your **${personaRole}** profile:
- Your current net savings rate is sitting at **${savingsRate}%**.
- To reach optimal financial peace of mind, prioritize keeping fixed obligations below 55% of net income and steadily building a 3-to-6 month liquid emergency buffer.
- How can I help you today? You can ask me to perform a detailed spending audit, rebalance your category limits, or optimize an emergency fund strategy!`;
}

// 1. API: Chat with Advisor Bot
app.post('/api/advisor/chat', async (req: Request, res: Response) => {
  try {
    const { message, personaRole, personaContext, summary, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      const systemInstruction = `You are "Personal Finance Advisor Bot", a friendly, certified-level personal financial planning assistant with expertise in budgeting, spending analytics, debt reduction, and savings optimization.
User Persona: ${personaRole || 'General User'}.
Context: ${personaContext || 'Personal finance planning'}.
Current Month Metrics:
- Monthly Income: $${summary?.totalIncome || 0}
- Total Expense: $${summary?.totalExpense || 0}
- Net Savings: $${summary?.netSavings || 0} (Savings Rate: ${Math.round(summary?.savingsRate || 0)}%)
- Needs Spending: $${summary?.needsSpent || 0} (${Math.round(summary?.needsPercentage || 0)}%)
- Wants Spending: $${summary?.wantsSpent || 0} (${Math.round(summary?.wantsPercentage || 0)}%)
- Overspent Categories: ${JSON.stringify(summary?.overspentCategories || [])}

Provide clear, structured, encouraging, and math-grounded advice. Use markdown with bold numbers, bullet points, and actionable tips. Keep advice practical and respectful of the user's specific financial situation.`;

      // Construct recent conversation turns
      let promptContent = `${systemInstruction}\n\n`;
      if (Array.isArray(chatHistory) && chatHistory.length > 0) {
        promptContent += 'Previous conversation:\n';
        for (const item of chatHistory.slice(-4)) {
          promptContent += `${item.role === 'user' ? 'User' : 'Advisor'}: ${item.text}\n`;
        }
        promptContent += '\n';
      }
      promptContent += `User query: ${message}\n\nPlease respond with personalized financial guidance:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContent,
      });

      const responseText = response.text || '';
      return res.json({ text: responseText, success: true });
    } else {
      // Fallback response
      const fallbackText = generateFallbackAdvisorResponse(message, personaRole, summary);
      return res.json({ text: fallbackText, success: true });
    }
  } catch (error: any) {
    console.error('Error in /api/advisor/chat:', error);
    const fallbackText = generateFallbackAdvisorResponse(
      req.body.message || '',
      req.body.personaRole || 'User',
      req.body.summary || {}
    );
    return res.json({ text: fallbackText, success: true, note: 'Rendered with built-in financial analyzer' });
  }
});

// 2. API: Audit Spending
app.post('/api/advisor/audit', async (req: Request, res: Response) => {
  try {
    const { personaRole, summary, topTransactions } = req.body;

    if (ai) {
      const prompt = `Conduct an exhaustive, high-value Financial Spending Audit for this user.
Persona: ${personaRole}
Financial Overview:
- Income: $${summary?.totalIncome || 0}
- Total Expenses: $${summary?.totalExpense || 0}
- Net Savings: $${summary?.netSavings || 0} (Rate: ${Math.round(summary?.savingsRate || 0)}%)
- Needs: $${summary?.needsSpent || 0} (${Math.round(summary?.needsPercentage || 0)}%)
- Wants / Discretionary: $${summary?.wantsSpent || 0} (${Math.round(summary?.wantsPercentage || 0)}%)
- Savings & Debt Repayments: $${summary?.savingsInvested || 0}
- Overspent Categories: ${JSON.stringify(summary?.overspentCategories || [])}
- Sample recent transactions: ${JSON.stringify(topTransactions || [])}

Deliver your audit in three structured sections:
1. Executive Health Assessment (Evaluate cash flow, savings rate vs 20% benchmark, and needs/wants balance)
2. Leak Detection & Category Overruns (Call out specific numbers where they are exceeding limits, especially discretionary food, entertainment, or subscriptions)
3. 3 High-Impact Action Items (Concrete steps they can implement this week to save $150-$400/month)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ text: response.text || '', success: true });
    } else {
      const fallbackText = generateFallbackAdvisorResponse('audit spending', personaRole, summary);
      return res.json({ text: fallbackText, success: true });
    }
  } catch (error: any) {
    console.error('Error in /api/advisor/audit:', error);
    const fallbackText = generateFallbackAdvisorResponse('audit spending', req.body.personaRole, req.body.summary);
    return res.json({ text: fallbackText, success: true });
  }
});

// 3. API: Generate Smart Budget Plan
app.post('/api/advisor/budget-plan', async (req: Request, res: Response) => {
  try {
    const { personaRole, totalIncome, currentBudgets, currentExpenses } = req.body;

    if (ai) {
      const prompt = `You are an automated budget architect. Create a customized, highly optimized monthly budget plan for a ${personaRole} with total monthly take-home income of $${totalIncome}.
Current budgets: ${JSON.stringify(currentBudgets)}
Current monthly spend: ${JSON.stringify(currentExpenses)}

Provide:
1. The 50/30/20 breakdown in exact dollar amounts ($ Needs, $ Wants, $ Savings/Runway)
2. Specific recommended category allocations (Rent, Groceries, Utilities, Transport, Dining, Entertainment, Subscriptions, Emergency Fund, Investments)
3. 3 practical rules to avoid overspending in discretionary categories
Ensure total allocations sum to exactly $${totalIncome} (zero-based budgeting discipline).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ text: response.text || '', success: true });
    } else {
      const fallback = generateFallbackAdvisorResponse('budget plan', personaRole, { totalIncome });
      return res.json({ text: fallback, success: true });
    }
  } catch (error: any) {
    console.error('Error in /api/advisor/budget-plan:', error);
    const fallback = generateFallbackAdvisorResponse('budget plan', req.body.personaRole, { totalIncome: req.body.totalIncome });
    return res.json({ text: fallback, success: true });
  }
});

// 4. API: Predictive Analytics & Forecasting
app.post('/api/advisor/predict', async (req: Request, res: Response) => {
  try {
    const { personaRole, summary, daysPassedInMonth = 27, daysInMonth = 30 } = req.body;

    if (ai) {
      const prompt = `Perform predictive spending analytics and forecast for a ${personaRole}.
Current month progress: Day ${daysPassedInMonth} of ${daysInMonth}.
Month-to-date Income: $${summary?.totalIncome || 0}
Month-to-date Expenses: $${summary?.totalExpense || 0}
Needs Spent: $${summary?.needsSpent || 0}
Wants Spent: $${summary?.wantsSpent || 0}
Overspent items: ${JSON.stringify(summary?.overspentCategories || [])}

Predict:
1. Projected total end-of-month spend and net savings cushion.
2. High-risk categories that could spiral in the final days of the month.
3. Next month outlook: Anticipated recurring bills and proactive recommendations.
Format cleanly with markdown and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ text: response.text || '', success: true });
    } else {
      const fallback = generateFallbackAdvisorResponse('predict forecast', personaRole, summary);
      return res.json({ text: fallback, success: true });
    }
  } catch (error: any) {
    console.error('Error in /api/advisor/predict:', error);
    const fallback = generateFallbackAdvisorResponse('predict forecast', req.body.personaRole, req.body.summary);
    return res.json({ text: fallback, success: true });
  }
});

// 5. API: Storage State Persistence
app.get('/api/storage/state', (req: Request, res: Response) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: null });
  } catch (err) {
    return res.json({ success: false, data: null });
  }
});

app.post('/api/storage/state', (req: Request, res: Response) => {
  try {
    const data = req.body;
    fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

#  Personal Finance Advisor Bot

**An AI-powered personal finance management platform for budgeting, expense tracking, savings planning, and financial insights.**

##  Project Overview

The **Personal Finance Advisor Bot** is an AI-powered financial planning assistant designed to help individuals manage their money with clarity and confidence. It brings income tracking, expense management, budget planning, savings goals, and monthly financial reporting into one centralized application.

Users can record monthly income and daily expenses, organize transactions by category, monitor budget limits, track savings goals, and review financial summaries. The application also includes an AI Advisor Bot that provides personalized financial insights and recommendations based on the financial information available to it.

The platform is designed for different financial situations, including salaried professionals, college students, freelancers with variable income, and household managers.

##  Project Objectives

- Simplify personal income and expense tracking.
- Organize transactions into meaningful spending categories.
- Help users create and monitor realistic budgets.
- Apply the 50/30/20 budgeting approach as a financial planning guide.
- Identify overspending and highlight areas where expenses can be reduced.
- Help users set savings goals and monitor their progress.
- Provide financial summaries and AI-assisted recommendations.
- Encourage better financial awareness and saving habits.

## Application Features

### 1. Dashboard

The dashboard provides an overview of a user's financial position, including:

- Total monthly income.
- Total expenses.
- Net monthly surplus.
- Savings rate.
- Financial Health Score and grade.
- Budget allocation overview.
- Recent transactions.
- Active savings goals.

### 2. AI Advisor Bot

The AI Advisor Bot provides personalized financial analysis and suggestions. The application interface includes AI-generated spending reviews and recommendations, such as identifying overspending categories and suggesting ways to redirect money toward savings goals.

### 3. Income & Expenses

Users can record and review income and expense transactions.

- Add income and expense entries.
- Record transaction dates, descriptions, categories, and amounts.
- Classify spending, including essential needs and discretionary wants.
- Search transactions by description, payee, or amount.
- Filter transactions by type, category, and spending tier.
- View income, expenses, and net totals for the selected records.

### 4. Quick Expense Log

The dashboard provides quick-entry options for frequent expenses, such as coffee and snacks, lunch or takeaway, groceries, gas or transit, and subscriptions. Users can also use a custom entry option.

### 5. Budget Planner

The Budget Planner helps users compare spending against planned category limits.

- View total monthly income.
- View total budgeted limits.
- See the unallocated amount or savings buffer.
- Set and review category-wise budget limits.
- Compare actual spending with each category's limit.
- Identify categories that have exceeded their budgets.
- Review allocation using the 50/30/20 approach:
  - **50% Needs:** essential expenses.
  - **30% Wants:** discretionary expenses.
  - **20% Savings:** savings and financial growth.

The 50/30/20 rule is a budgeting guideline; actual allocations may vary according to a user's financial situation.

### 6. Savings & Goals

Users can create and monitor financial goals.

- Create savings goals with target amounts.
- Record contributions toward goals.
- View the amount saved and remaining target.
- Monitor goal completion through progress indicators.
- Review target deadlines and suggested monthly contribution pace.
- Track goals such as an emergency fund, home down payment, or travel.

### 7. Emergency Fund Planning

The application displays an emergency reserve metric based on essential monthly expenses. It helps users understand how many months of essential expenses their current emergency savings could cover and track progress toward an emergency fund target.

### 8. Monthly Financial Report

The Monthly Report section provides a consolidated view of financial performance, including:

- Total income.
- Total expenses.
- Net savings achieved.
- Net savings rate.
- Budget allocation across needs, wants, and savings.
- Budget overruns and financial targets.

The interface also provides options to export the report as a CSV file or print/save it as a PDF.

### 9. Scenario Explorer

The Scenario Explorer demonstrates how the application can support different types of users through sample financial profiles and datasets.

- **Salaried Professional:** Reviews fixed monthly income, spending leaks, and savings for larger goals.
- **College Student:** Plans a limited allowance, controls discretionary spending, and works toward student savings goals.
- **Freelancer:** Reviews changing income and expenses and plans for months with lower earnings.
- **Household Manager:** Monitors shared family income, household expenses, and family savings goals.

The scenarios are illustrative examples for exploring the application's financial-planning approach; they should not be interpreted as actual financial records.

## 👥 Use-Case Scenarios

### Scenario 1: Salaried Professional

A salaried professional records monthly income and expenses across categories such as rent, food, transport, and entertainment. The system helps review spending patterns, identify overspending, and prepare a budget with saving suggestions. The monthly report helps the user review income, expenses, savings, and upcoming goals.

### Scenario 2: College Student

A college student uses the platform to manage a limited monthly allowance. The system helps the student set practical budget limits, track essential and discretionary expenses, and receive suggestions for reducing unnecessary spending.

### Scenario 3: Freelancer

A freelancer records earnings from multiple clients and tracks project-related expenses. The platform helps review variable income patterns, understand changes in saving capacity, and plan toward an emergency fund.

### Scenario 4: Household Manager

A household manager records shared family income and expenses such as groceries, utilities, education, and healthcare. The platform helps review category-wise spending, identify budget overruns, and plan savings for family goals.

## 🛠️ Technologies Used

The following technologies are listed for the project:

| Technology | Purpose |
|---|---|
| Python | Main programming language and application logic |
| Flask | Backend web framework |
| SQLAlchemy | Object-relational mapping and database interaction |
| SQLite | Database for storing application records |
| Gemini AI | AI-powered financial analysis and recommendations |
| JavaScript | Frontend interactions and dynamic functionality |

##  Technical Architecture

The project is described as a full-stack application with a web interface, backend application logic, database layer, and AI integration.

```text
                 USER
                   |
                   v
             WEB INTERFACE
          (HTML / CSS / JavaScript)
                   |
                   v
             FLASK BACKEND
                (Python)
                   |
          +--------+--------+
          |                 |
          v                 v
      DATABASE          GEMINI AI
     (SQLAlchemy)       INTEGRATION
          |                 |
          v                 v
        SQLite        AI-ASSISTED ANALYSIS
          |                 |
          +--------+--------+
                   |
                   v
       BUDGET INSIGHTS AND REPORTS
                   |
                   v
                  USER
```

### Architecture Components

1. **Frontend:** Provides the interface for recording transactions and viewing budgets, goals, and reports.
2. **Flask Backend:** Handles application routes, user requests, and application logic.
3. **SQLAlchemy:** Provides the database interaction layer.
4. **SQLite:** Stores application data such as financial records.
5. **Gemini AI Integration:** Supports AI-assisted financial analysis and recommendations.

*This is a high-level conceptual architecture based on the technologies provided for the project. The exact implementation and data flow should be checked against the source code.*

## ⚙️ System Requirements

### Hardware Requirements

| Component | Requirement |
|---|---|
| Processor | Intel Core i5 (8th Gen or above) / AMD Ryzen 5 or equivalent |
| RAM | Minimum 8 GB; 16 GB recommended |
| Storage | 256 GB SSD or 500 GB HDD minimum |
| Internet Connectivity | Stable high-speed connection: minimum 10 Mbps; 20 Mbps recommended |

### Software Requirements

| Software | Requirement |
|---|---|
| Operating System | Windows 10/11, macOS Monterey or later, or Linux (Ubuntu 20.04+) |
| Web Browser | Latest Google Chrome, Mozilla Firefox, or Microsoft Edge |
| IDE / Code Editor | Visual Studio Code or any preferred IDE |
| Programming Language | Python 3.8 or above |
| Version Control | Git (latest version) |
| Additional Tool | AWS CLI (latest version), if required by the project environment |

## 🚀 Installation and Setup

The following is a general setup guide. Confirm the actual entry-point filename, dependencies, and configuration names from the project source code before running these commands.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows**
```bash
venv\Scripts\activate
```

**macOS / Linux**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

If the repository contains a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### 4. Configure Gemini AI

If the application uses the Gemini API, create an API key and configure it using the environment variable name expected by the project code.

Example for Windows PowerShell:

```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

Example for macOS / Linux:

```bash
export GEMINI_API_KEY="your_api_key_here"
```

Do not commit API keys, passwords, or other secrets to GitHub.

### 5. Run the Application

If the Flask entry-point file is named `app.py`, a possible command is:

```bash
python app.py
```

If the project is configured for the Flask CLI, use the appropriate application module, for example:

```bash
flask --app app run
```

Open the local address displayed in the terminal in your web browser. A common Flask development address is `http://127.0.0.1:5000/`.

##  How to Use the Application

1. Open the application in a web browser.
2. Select or explore a financial scenario, if available.
3. Review the dashboard for the financial overview.
4. Add income and expense transactions.
5. Categorize transactions and review spending.
6. Open the Budget Planner to review category limits and allocation.
7. Use the AI Advisor Bot to view available financial insights and suggestions.
8. Create savings goals and track contributions.
9. Review the Monthly Report and export it when needed.

*The exact screens and available actions depend on the current implementation.*

## Project Statistics

| Metric | Count |
|---|---:|
| Total Epics | 8 |
| Total Stories & Tasks | 15 |
| Total Subtasks | 0 |

##  Future Enhancements

The project may be extended with:

- Predictive spending analytics.
- Personalized investment suggestions.
- Goal-based savings tracking enhancements.
- Advanced AI-driven financial health monitoring.
- Improved visual analytics and financial trend comparisons.
- Additional support for variable income and household budgeting.

##  Security and Responsible Use

- Keep API keys and credentials out of source control.
- Do not upload real or sensitive personal financial information to public repositories.
- Validate user-provided income and expense data.
- Protect financial records through appropriate access controls.
- Review AI-generated recommendations before acting on them.
- Treat the application as a budgeting and informational tool, not as professional investment, tax, or legal advice.

## Mentor

**Sai Prathyusha Nagilla**  
Email: prathyusha+mentor@thesmartbridge.com

##  Skills Required

- Python
- Gemini AI
- Flask (Web Framework)
- SQLite
- JavaScript (Programming Language)

##  Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Make and test your updates.
4. Commit and push your changes.
5. Open a pull request with a description of the improvements.

##  License

No license information was provided for this project. Add a `LICENSE` file if you intend to publish the repository under an open-source license.

---

**Personal Finance Advisor Bot** — Make personal finance easier to understand through organized tracking, budgeting, savings goals, and AI-assisted insights.

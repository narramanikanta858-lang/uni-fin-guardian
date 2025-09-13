import React, { useState } from 'react';
import { BalanceOverview } from './BalanceOverview';
import { TransactionManager } from './TransactionManager';
import { GoalsInsights } from './GoalsInsights';
import { AIInsights } from './AIInsights';
import { ChartsSection } from './ChartsSection';
import { GraduationCap } from 'lucide-react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: Date;
  recurring?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'cash';
  balance: number;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  category: string;
}

export const FinanceManager = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Part-time job salary',
      amount: 450,
      category: 'income',
      type: 'income',
      date: new Date(2024, 8, 10),
    },
    {
      id: '2',
      description: 'Coffee at Starbucks',
      amount: 5.50,
      category: 'food',
      type: 'expense',
      date: new Date(2024, 8, 12),
    },
    {
      id: '3',
      description: 'Textbooks',
      amount: 89.99,
      category: 'books',
      type: 'expense',
      date: new Date(2024, 8, 8),
    },
    {
      id: '4',
      description: 'Bus pass',
      amount: 25,
      category: 'transport',
      type: 'expense',
      date: new Date(2024, 8, 5),
    },
  ]);

  const [accounts] = useState<Account[]>([
    { id: '1', name: 'Checking', type: 'checking', balance: 1247.50 },
    { id: '2', name: 'Savings', type: 'savings', balance: 850.00 },
    { id: '3', name: 'Cash', type: 'cash', balance: 45.75 },
  ]);

  const [activeAccount, setActiveAccount] = useState<string>('1');

  const [goals] = useState<Goal[]>([
    { id: '1', title: 'Emergency Fund', target: 800, current: 500, category: 'savings' },
    { id: '2', title: 'New Laptop', target: 1200, current: 200, category: 'technology' },
    { id: '3', title: 'Spring Break Fund', target: 600, current: 150, category: 'travel' },
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const currentAccount = accounts.find(acc => acc.id === activeAccount);
  const monthlySpent = transactions
    .filter(t => t.type === 'expense' && t.date.getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smart Student Finance Manager
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            AI-Powered Budget Optimization & Expense Tracking with Advanced Analytics
          </p>
        </header>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BalanceOverview
            account={currentAccount}
            accounts={accounts}
            activeAccount={activeAccount}
            onAccountChange={setActiveAccount}
            monthlySpent={monthlySpent}
            transactions={transactions}
          />
          
          <TransactionManager
            transactions={transactions}
            onAddTransaction={addTransaction}
          />
          
          <GoalsInsights goals={goals} />
        </div>

        {/* AI Insights */}
        <AIInsights transactions={transactions} monthlySpent={monthlySpent} />

        {/* Charts Section */}
        <ChartsSection transactions={transactions} />
      </div>
    </div>
  );
};
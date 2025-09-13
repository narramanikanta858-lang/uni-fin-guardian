import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Wallet, TrendingUp, Calendar, Target } from 'lucide-react';
import type { Account, Transaction } from './FinanceManager';

interface BalanceOverviewProps {
  account?: Account;
  accounts: Account[];
  activeAccount: string;
  onAccountChange: (accountId: string) => void;
  monthlySpent: number;
  transactions: Transaction[];
}

export const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  account,
  accounts,
  activeAccount,
  onAccountChange,
  monthlySpent,
  transactions,
}) => {
  const dailyAvg = monthlySpent / new Date().getDate();
  const budgetLimit = 1000;
  const budgetPercent = Math.round((monthlySpent / budgetLimit) * 100);
  const budgetRemaining = budgetLimit - monthlySpent;

  const getBudgetStatus = () => {
    if (budgetPercent >= 90) return 'danger';
    if (budgetPercent >= 75) return 'warning';
    return 'success';
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Account Overview</h3>
      </div>

      {/* Account Selector */}
      <div className="flex gap-2 mb-6">
        {accounts.map((acc) => (
          <Button
            key={acc.id}
            variant={activeAccount === acc.id ? 'gradient' : 'account'}
            size="sm"
            onClick={() => onAccountChange(acc.id)}
            className="flex-1 text-xs"
          >
            {acc.name}
          </Button>
        ))}
      </div>

      {/* Balance Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-foreground counter-up mb-2">
          ${account?.balance.toFixed(2) || '0.00'}
        </div>
        <div className="text-success text-sm">+$23.50 this week</div>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-warning text-xl">🔥</span>
        <span className="text-sm font-medium">7 days on budget!</span>
      </div>

      {/* Achievement Badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <span className="achievement-badge bg-gradient-to-r from-warning to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
          🎯 Budget Master
        </span>
        <span className="achievement-badge bg-gradient-to-r from-success to-emerald-400 text-white px-3 py-1 rounded-full text-xs font-bold">
          💰 Saver
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-secondary/60 rounded-lg border-l-4 border-primary hover:scale-105 transition-transform">
          <div className="text-xl font-bold text-foreground">${monthlySpent.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
        <div className="text-center p-3 bg-secondary/60 rounded-lg border-l-4 border-primary hover:scale-105 transition-transform">
          <div className="text-xl font-bold text-foreground">${dailyAvg.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Daily Avg</div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Monthly Budget</span>
          <span className="text-sm text-muted-foreground">{budgetPercent}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 progress-shimmer relative overflow-hidden ${
              getBudgetStatus() === 'danger' ? 'bg-gradient-to-r from-destructive to-red-400' :
              getBudgetStatus() === 'warning' ? 'bg-gradient-to-r from-warning to-yellow-400' :
              'bg-gradient-to-r from-success to-green-400'
            }`}
            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          ${budgetRemaining.toFixed(0)} remaining of ${budgetLimit} budget
        </div>
      </div>
    </Card>
  );
};
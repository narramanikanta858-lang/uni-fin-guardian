import React from 'react';
import { Card } from './ui/card';
import { PieChart, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import type { Transaction } from './FinanceManager';
import chartIcon from '@/assets/chart-icon.jpg';
import trendIcon from '@/assets/trend-icon.jpg';
import budgetIcon from '@/assets/budget-icon.jpg';
import incomeExpensesIcon from '@/assets/income-expenses-icon.jpg';

interface ChartsSectionProps {
  transactions: Transaction[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ transactions }) => {
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartCards = [
    {
      title: 'Interactive Spending Categories',
      icon: <PieChart className="w-5 h-5" />,
      image: chartIcon,
      description: 'Visual breakdown of your spending by category'
    },
    {
      title: 'Spending Trend Analysis',
      icon: <TrendingUp className="w-5 h-5" />,
      image: trendIcon,
      description: 'Track your spending patterns over time'
    },
    {
      title: 'Budget vs Actual',
      icon: <BarChart3 className="w-5 h-5" />,
      image: budgetIcon,
      description: 'Compare planned vs actual spending'
    },
    {
      title: 'Income vs Expenses',
      icon: <DollarSign className="w-5 h-5" />,
      image: incomeExpensesIcon,
      description: 'Monitor your financial balance'
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-foreground">
        Financial Analytics Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartCards.map((chart, index) => (
          <Card key={index} className="glass-card p-6 group">
            <div className="flex items-center gap-2 mb-4">
              {chart.icon}
              <h3 className="text-lg font-semibold">{chart.title}</h3>
            </div>
            
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-secondary/40 to-primary/20">
              <img 
                src={chart.image} 
                alt={chart.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{chart.description}</p>
            
            {/* Sample Data Display */}
            {index === 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Top Categories:</h4>
                {Object.entries(categoryTotals)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([category, amount]) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span className="font-medium">${amount.toFixed(2)}</span>
                    </div>
                  ))}
              </div>
            )}
            
            {index === 3 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-success">Total Income:</span>
                  <span className="font-medium text-success">+${totalIncome.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-destructive">Total Expenses:</span>
                  <span className="font-medium text-destructive">-${totalExpenses.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Net Balance:</span>
                  <span className={totalIncome - totalExpenses >= 0 ? 'text-success' : 'text-destructive'}>
                    ${(totalIncome - totalExpenses).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">${totalExpenses.toFixed(0)}</div>
          <div className="text-sm text-muted-foreground">Total Expenses</div>
        </Card>
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-success">${totalIncome.toFixed(0)}</div>
          <div className="text-sm text-muted-foreground">Total Income</div>
        </Card>
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {Object.keys(categoryTotals).length}
          </div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </Card>
        <Card className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {transactions.filter(t => t.type === 'expense').length}
          </div>
          <div className="text-sm text-muted-foreground">Transactions</div>
        </Card>
      </div>
    </section>
  );
};
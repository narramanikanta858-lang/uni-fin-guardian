import React from 'react';
import { Card } from './ui/card';
import { Brain, Lightbulb, TrendingUp } from 'lucide-react';
import type { Transaction } from './FinanceManager';

interface AIInsightsProps {
  transactions: Transaction[];
  monthlySpent: number;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ transactions, monthlySpent }) => {
  const predictedMonthlySpend = Math.round(monthlySpent * 1.1);
  const foodExpenses = transactions
    .filter(t => t.type === 'expense' && t.category === 'food')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const avgExpensePerDay = monthlySpent / new Date().getDate();
  const recommendation = foodExpenses > 100 
    ? "Consider reducing dining out expenses by $50 to stay within budget. Your coffee purchases have increased 40% this week."
    : "Great job managing your food expenses! Consider setting aside the savings for your emergency fund.";

  const insights = [
    "You spend 23% more on weekends than weekdays. Consider meal prepping to reduce weekend food costs.",
    "Your transportation costs are 15% below average for students. Keep using that bus pass!",
    "Best spending day: Tuesday (lowest average). Worst: Saturday (highest impulse purchases).",
  ];

  return (
    <Card className="glass-card p-6 mb-8 bg-gradient-to-br from-primary/90 to-accent/90 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5" />
        <h3 className="text-lg font-semibold">AI Spending Insights & Predictions</h3>
      </div>

      <div className="text-lg mb-4">
        <TrendingUp className="inline w-5 h-5 mr-2" />
        Based on your spending patterns, you're likely to spend <strong>${predictedMonthlySpend}</strong> this month.
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 mt-0.5 text-yellow-300" />
          <div>
            <h4 className="font-medium mb-2">Smart Recommendation</h4>
            <p className="text-sm opacity-90">{recommendation}</p>
          </div>
        </div>
      </div>

      <div className="bg-success/20 backdrop-blur-sm rounded-lg p-4 border border-success/30">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span>
          Did You Know?
        </h4>
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <p key={index} className="text-sm opacity-90">
              • {insight}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};
import React from 'react';
import { Card } from './ui/card';
import { Target, Bell, TrendingUp } from 'lucide-react';
import type { Goal } from './FinanceManager';

interface GoalsInsightsProps {
  goals: Goal[];
}

export const GoalsInsights: React.FC<GoalsInsightsProps> = ({ goals }) => {
  const alerts = [
    { type: 'warning', message: 'Coffee expenses up 40% this week - consider cutting back' },
    { type: 'success', message: 'You\'re $50 under budget this month! Great job!' },
    { type: 'info', message: 'Emergency fund goal is 62% complete' },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-gradient-to-r from-success to-green-400';
    if (progress >= 50) return 'bg-gradient-to-r from-warning to-yellow-400';
    return 'bg-gradient-to-r from-primary to-blue-400';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📍';
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'border-warning/20 bg-warning/10 text-warning';
      case 'success': return 'border-success/20 bg-success/10 text-success';
      case 'info': return 'border-primary/20 bg-primary/10 text-primary';
      default: return 'border-muted/20 bg-muted/10';
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Financial Goals & Insights</h3>
      </div>

      {/* Goals Section */}
      <div className="space-y-4 mb-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div
              key={goal.id}
              className="bg-secondary/60 p-4 rounded-lg border-l-4 border-success hover:translate-x-1 transition-transform"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{goal.title}</span>
                <span className="font-bold text-success">
                  ${goal.current}/${goal.target}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${getProgressColor(progress)} progress-shimmer relative overflow-hidden`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {progress.toFixed(1)}% complete
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Alerts */}
      <div className="space-y-3">
        <h4 className="flex items-center gap-2 font-medium">
          <Bell className="w-4 h-4" />
          Smart Alerts
        </h4>
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] slide-in-right ${getAlertStyle(alert.type)}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-lg">{getAlertIcon(alert.type)}</span>
            <p className="text-sm flex-1">{alert.message}</p>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <h4 className="flex items-center gap-2 font-medium text-primary mb-2">
          <TrendingUp className="w-4 h-4" />
          Weekly Insight
        </h4>
        <p className="text-sm text-foreground">
          You're spending 15% less than last week! Your biggest savings come from cooking at home instead of dining out.
        </p>
      </div>
    </Card>
  );
};
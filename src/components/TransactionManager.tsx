import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Plus, Minus, FileText, Download, Search, Calendar, Repeat } from 'lucide-react';
import type { Transaction } from './FinanceManager';

interface TransactionManagerProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const TransactionManager: React.FC<TransactionManagerProps> = ({
  transactions,
  onAddTransaction,
}) => {
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  
  const [incomeDesc, setIncomeDesc] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  
  const [recurringDesc, setRecurringDesc] = useState('');
  const [recurringAmount, setRecurringAmount] = useState('');
  const [recurringFreq, setRecurringFreq] = useState('monthly');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' },
    { value: 'books', label: 'Books & Supplies' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'other', label: 'Other' },
  ];

  const handleAddExpense = () => {
    if (!expenseDesc || !expenseAmount) return;
    
    const category = expenseCategory || categorizeExpense(expenseDesc);
    
    onAddTransaction({
      description: expenseDesc,
      amount: parseFloat(expenseAmount),
      category,
      type: 'expense',
    });

    setExpenseDesc('');
    setExpenseAmount('');
    setExpenseCategory('');
  };

  const handleAddIncome = () => {
    if (!incomeDesc || !incomeAmount) return;

    onAddTransaction({
      description: incomeDesc,
      amount: parseFloat(incomeAmount),
      category: 'income',
      type: 'income',
    });

    setIncomeDesc('');
    setIncomeAmount('');
  };

  const handleAddRecurring = () => {
    if (!recurringDesc || !recurringAmount) return;

    onAddTransaction({
      description: `${recurringDesc} (${recurringFreq})`,
      amount: parseFloat(recurringAmount),
      category: 'recurring',
      type: 'expense',
      recurring: true,
      frequency: recurringFreq as any,
    });

    setRecurringDesc('');
    setRecurringAmount('');
  };

  const categorizeExpense = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('coffee') || desc.includes('food') || desc.includes('restaurant') || desc.includes('lunch')) return 'food';
    if (desc.includes('bus') || desc.includes('uber') || desc.includes('gas') || desc.includes('transport')) return 'transport';
    if (desc.includes('book') || desc.includes('textbook') || desc.includes('supplies') || desc.includes('pen')) return 'books';
    if (desc.includes('movie') || desc.includes('game') || desc.includes('entertainment') || desc.includes('netflix')) return 'entertainment';
    if (desc.includes('doctor') || desc.includes('medicine') || desc.includes('health') || desc.includes('pharmacy')) return 'health';
    return 'other';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Transaction Manager</h3>
      </div>

      {/* Income Section */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
        <h4 className="flex items-center gap-2 font-medium text-success mb-3">
          <Plus className="w-4 h-4" />
          Add Income
        </h4>
        <div className="flex gap-2">
          <Input
            placeholder="Income source (e.g., 'Part-time job')"
            value={incomeDesc}
            onChange={(e) => setIncomeDesc(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            className="w-24"
          />
          <Button variant="success" onClick={handleAddIncome}>
            Add
          </Button>
        </div>
      </div>

      {/* Recurring Expenses */}
      <div className="bg-secondary/60 rounded-lg p-4 mb-4">
        <h4 className="flex items-center gap-2 font-medium mb-3">
          <Repeat className="w-4 h-4" />
          Recurring Expenses
        </h4>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., 'Netflix subscription'"
            value={recurringDesc}
            onChange={(e) => setRecurringDesc(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={recurringAmount}
            onChange={(e) => setRecurringAmount(e.target.value)}
            className="w-24"
          />
          <Select value={recurringFreq} onValueChange={setRecurringFreq}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="gradient" onClick={handleAddRecurring}>
            Add
          </Button>
        </div>
      </div>

      {/* Expense Input */}
      <div className="space-y-3 mb-4">
        <h4 className="flex items-center gap-2 font-medium">
          <Minus className="w-4 h-4" />
          Add Expense
        </h4>
        <div className="flex gap-2">
          <Input
            placeholder="Expense description (e.g., 'Coffee at Starbucks')"
            value={expenseDesc}
            onChange={(e) => setExpenseDesc(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="w-24"
          />
        </div>
        <div className="flex gap-2">
          <Select value={expenseCategory} onValueChange={setExpenseCategory}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="AI will categorize automatically" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="gradient" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Export Buttons */}
      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm">
          <FileText className="w-4 h-4" />
          Export CSV
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Recent Transactions */}
      <h4 className="font-medium mb-3">Recent Transactions</h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTransactions.slice(0, 10).map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg hover:bg-secondary/60 transition-colors slide-in-left"
          >
            <div className="flex-1">
              <div className="font-medium text-sm">{transaction.description}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {transaction.category}
                {transaction.recurring && (
                  <span className="ml-2 px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                    {transaction.frequency}
                  </span>
                )}
              </div>
            </div>
            <div className={`font-bold ${
              transaction.type === 'income' ? 'text-success' : 'text-destructive'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
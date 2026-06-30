import { useState } from 'react';
import { DollarSign, Users, AlertCircle, TrendingUp, Settings, Download, LogOut, Check } from 'lucide-react';

interface AdminDashboardProps {
  onLogout?: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [viewTab, setViewTab] = useState<'overview' | 'payroll' | 'budget' | 'reconciliation'>('overview');
  
  // Payroll Calculator States
  const [basicSalary, setBasicSalary] = useState(80000);
  const [housingAllowance, setHousingAllowance] = useState(15000);
  
  // Reconciliation Action States
  const [unmatchedTx, setUnmatchedTx] = useState([
    { id: 'TX-QHP89F7F8S', payer: 'Jane Smith (0712345678)', amount: 'KES 45,000', date: '2024-06-27', matched: false },
    { id: 'TX-QHP12D3F5X', payer: 'Mark Johnson (0722334455)', amount: 'KES 280,000', date: '2024-06-26', matched: false },
  ]);

  const stats = [
    { label: 'Total Revenue', value: 'KES 2.4M', change: '+12.5%', icon: DollarSign },
    { label: 'Active Students', value: '1,240', change: '+8.2%', icon: Users },
    { label: 'Pending Invoices', value: '48', change: '-3.1%', icon: AlertCircle },
    { label: 'Collected Today', value: 'KES 185K', change: '+5.7%', icon: TrendingUp },
  ];

  const recentTransactions = [
    { id: 1, student: 'John Doe', amount: 'KES 150,000', status: 'Completed', date: '2024-06-28' },
    { id: 2, student: 'Jane Smith', amount: 'KES 45,000', status: 'Pending', date: '2024-06-27' },
    { id: 3, student: 'Mark Johnson', amount: 'KES 280,000', status: 'Processing', date: '2024-06-26' },
  ];

  const adminActions = [
    { label: 'Create Invoices', icon: '📄', action: 'New Fee Invoice' },
    { label: 'View Reports', icon: '📊', action: 'Financial Reports' },
    { label: 'Manage Expenses', icon: '💰', action: 'Track Expenses' },
    { label: 'Payroll Setup', icon: '👥', action: 'Staff Salaries' },
  ];

  // Kenyan statutory calculations
  const grossSalary = basicSalary + housingAllowance;
  const shafDeduction = grossSalary * 0.0275;
  const housingLevy = grossSalary * 0.015;
  const nssfDeduction = 1080; 
  const payeTax = grossSalary > 50000 ? (grossSalary - 24000) * 0.25 : 0;
  const totalDeductions = shafDeduction + housingLevy + nssfDeduction + payeTax;
  const netPay = grossSalary - totalDeductions;

  // Budget data
  const budgetLineItems = [
    { category: 'Administration & Boarding', planned: 1200000, actual: 1320000 },
    { category: 'Linguistic Immersion / CBC', planned: 500000, actual: 480000 },
    { category: 'Information Technology & ERP', planned: 400000, actual: 385000 },
    { category: 'Sports & Student Welfare', planned: 300000, actual: 310000 },
  ];

  const handleMatchTransaction = (id: string) => {
    setUnmatchedTx(prev => prev.map(tx => tx.id === id ? { ...tx, matched: true } : tx));
  };

  return (
    <div className="min-h-screen bg-cream text-forest font-sans selection:bg-forest/10 selection:text-forest">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-forest/10 bg-cream/80 backdrop-blur-xl">
        <div className="px-6 py-5 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display text-forest">Admin Dashboard</h1>
              <p className="text-sm text-forest/70 mt-1">Complete school finance overview</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 bg-forest hover:bg-forest-light text-cream font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200 flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="px-5 py-2.5 bg-red-50/50 hover:bg-red-100/50 text-red-700 hover:text-red-800 font-bold rounded-full border border-red-200 transition-all flex items-center gap-2 text-sm active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Dashboard View Tabs */}
          <div className="flex items-center gap-2 border-b border-forest/10 pb-4 mb-8 overflow-x-auto whitespace-nowrap">
            <button 
              onClick={() => setViewTab('overview')}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                viewTab === 'overview' ? 'bg-forest text-cream shadow-sm' : 'text-forest/60 hover:bg-forest/5'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setViewTab('payroll')}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                viewTab === 'payroll' ? 'bg-forest text-cream shadow-sm' : 'text-forest/60 hover:bg-forest/5'
              }`}
            >
              Kenyan Payroll
            </button>
            <button 
              onClick={() => setViewTab('budget')}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                viewTab === 'budget' ? 'bg-forest text-cream shadow-sm' : 'text-forest/60 hover:bg-forest/5'
              }`}
            >
              Budget Variance
            </button>
            <button 
              onClick={() => setViewTab('reconciliation')}
              className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                viewTab === 'reconciliation' ? 'bg-forest text-cream shadow-sm' : 'text-forest/60 hover:bg-forest/5'
              }`}
            >
              M-Pesa Reconciliation
            </button>
          </div>

          {/* Render Active View Tab */}
          {viewTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  const isPositive = stat.change.includes('+');
                  return (
                    <div key={idx} className="border border-forest/10 bg-cream-dark/30 hover:border-accent/40 rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md text-left">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-forest">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isPositive ? 'bg-accent/15 text-accent' : 'bg-red-500/15 text-red-700'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-display text-forest">Recent Transactions</h2>
                    <a href="#" className="text-xs uppercase tracking-wider font-bold text-accent hover:text-emerald-700 transition-colors">View All</a>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-forest/10">
                          <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Student</th>
                          <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Amount</th>
                          <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Status</th>
                          <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((tx) => (
                          <tr key={tx.id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                            <td className="py-4 px-4 text-forest font-semibold">{tx.student}</td>
                            <td className="py-4 px-4 text-right text-forest font-bold">{tx.amount}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                                tx.status === 'Completed' ? 'bg-accent/15 text-accent' :
                                tx.status === 'Pending' ? 'bg-orange-500/15 text-orange-700' :
                                'bg-forest/10 text-forest/80'
                              }`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right text-forest/55">{tx.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                  <h3 className="text-lg font-bold font-display text-forest mb-6">Quick Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-cream-dark border border-forest/5 p-4 rounded-xl">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Collection Rate</p>
                      <p className="text-2xl font-bold text-accent">92.4%</p>
                    </div>
                    <div className="bg-cream-dark border border-forest/5 p-4 rounded-xl">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Outstanding Balance</p>
                      <p className="text-2xl font-bold text-orange-700">KES 180K</p>
                    </div>
                    <div className="bg-cream-dark border border-forest/5 p-4 rounded-xl">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Monthly Expenses</p>
                      <p className="text-2xl font-bold text-forest">KES 980K</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                <h2 className="text-xl font-bold font-display text-forest mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Administrative Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {adminActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    >
                      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                      <p className="font-semibold text-forest mb-1">{action.label}</p>
                      <p className="text-xs text-accent font-bold group-hover:text-emerald-700">{action.action}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Kenyan Statutory Payroll Board */}
          {viewTab === 'payroll' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              {/* Calculator Inputs */}
              <div className="lg:col-span-5 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold font-display text-forest mb-4">Deduction settings & parameters</h3>
                
                <div>
                  <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-2">
                    Basic Salary (KES): {basicSalary.toLocaleString()}
                  </label>
                  <input 
                    type="range"
                    min="30000"
                    max="200000"
                    step="5000"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-2">
                    Housing Allowance (KES): {housingAllowance.toLocaleString()}
                  </label>
                  <input 
                    type="range"
                    min="5000"
                    max="50000"
                    step="2000"
                    value={housingAllowance}
                    onChange={(e) => setHousingAllowance(Number(e.target.value))}
                    className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <div className="bg-forest/5 p-4 rounded-xl border border-forest/5 text-xs text-forest/70 space-y-2">
                  <p className="font-bold">Kenyan Statutory Guidelines:</p>
                  <p>• **SHAF**: Deducted at 2.75% of gross earnings.</p>
                  <p>• **Housing Levy**: Deducted at 1.5% of gross earnings.</p>
                  <p>• **PAYE**: Subject to standard tiered KRA brackets.</p>
                </div>
              </div>

              {/* Deductions breakdown */}
              <div className="lg:col-span-7 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold font-display text-forest mb-4">Deductions Breakdown & Net Salary</h3>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center p-3 bg-cream-dark rounded-xl border border-forest/5">
                    <span className="text-forest/70 text-sm font-semibold">Gross earnings (Basic + Housing)</span>
                    <span className="text-forest font-bold">KES {grossSalary.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-forest/10 pt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-forest/60">SHAF Deductions (2.75%)</span>
                      <span className="font-bold text-red-700">KES {shafDeduction.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-forest/60">Housing Levy Deductions (1.5%)</span>
                      <span className="font-bold text-red-700">KES {housingLevy.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-forest/60">NSSF Contribution (Tier 1 & 2)</span>
                      <span className="font-bold text-red-700">KES {nssfDeduction.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-forest/60">PAYE Tax estimation</span>
                      <span className="font-bold text-red-700">KES {payeTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                  </div>

                  <div className="border-t border-forest/10 pt-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-forest">Total Deductions</p>
                      <p className="text-[10px] text-forest/40 uppercase font-bold">Sum of statutory allocations</p>
                    </div>
                    <span className="text-lg font-bold text-red-700">KES {totalDeductions.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>

                  <div className="border-t-2 border-double border-forest/15 pt-4 flex justify-between items-center p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <div>
                      <p className="font-bold text-accent text-lg">Net Payout</p>
                      <p className="text-[10px] text-forest/50 uppercase font-bold">Estimated Take-Home</p>
                    </div>
                    <span className="text-3xl font-bold text-accent">KES {netPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Budget vs Expenditure variance progress tracker */}
          {viewTab === 'budget' && (
            <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-forest mb-1">Budget vs Expenditure</h3>
                <p className="text-xs text-forest/60">Current academic term line item variance report</p>
              </div>

              <div className="space-y-6">
                {budgetLineItems.map((item, idx) => {
                  const variance = item.actual - item.planned;
                  const variancePct = (item.actual / item.planned) * 100;
                  const isOverBudget = variance > 0;
                  
                  return (
                    <div key={idx} className="space-y-2 pb-4 border-b border-forest/5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-forest text-sm">{item.category}</p>
                          <p className="text-xs text-forest/55">
                            Planned: KES {item.planned.toLocaleString()} | Actual: KES {item.actual.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isOverBudget ? 'bg-red-500/15 text-red-700' : 'bg-accent/15 text-accent'
                          }`}>
                            {isOverBudget ? `+ KES ${variance.toLocaleString()}` : `- KES ${Math.abs(variance).toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full h-3 bg-forest/10 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOverBudget ? 'bg-red-500' : 'bg-accent'
                          }`}
                          style={{ width: `${Math.min(variancePct, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: M-Pesa Transaction Reconciliation Board */}
          {viewTab === 'reconciliation' && (
            <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold font-display text-forest mb-1">M-Pesa Reconciliation Log</h3>
                <p className="text-xs text-forest/60">Match incoming gateway transactions to school invoices</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-forest/10">
                      <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Payer details</th>
                      <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Amount</th>
                      <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Date</th>
                      <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unmatchedTx.map((tx) => (
                      <tr key={tx.id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                        <td className="py-4 px-4 text-forest font-semibold">{tx.id}</td>
                        <td className="py-4 px-4 text-forest">{tx.payer}</td>
                        <td className="py-4 px-4 text-right text-forest font-bold">{tx.amount}</td>
                        <td className="py-4 px-4 text-right text-forest/55">{tx.date}</td>
                        <td className="py-4 px-4 text-center">
                          {tx.matched ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/15 px-3 py-1 rounded-full">
                              <Check className="w-3 h-3" /> Reconciled
                            </span>
                          ) : (
                            <button
                              onClick={() => handleMatchTransaction(tx.id)}
                              className="px-4 py-1.5 bg-forest hover:bg-forest-light text-cream font-bold text-xs uppercase tracking-wider rounded-full shadow-sm active:scale-95 transition-all duration-200"
                            >
                              Match Invoice
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Health Status (Shared at bottom of tabs) */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
              <h3 className="text-lg font-bold font-display text-forest mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-cream-dark rounded-xl border border-forest/5">
                  <span className="text-forest/80 text-sm font-semibold">Database</span>
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">✓ Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-cream-dark rounded-xl border border-forest/5">
                  <span className="text-forest/80 text-sm font-semibold">API Server</span>
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-cream-dark rounded-xl border border-forest/5">
                  <span className="text-forest/80 text-sm font-semibold">Payment Gateway</span>
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">✓ Connected</span>
                </div>
              </div>
            </div>

            <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
              <h3 className="text-lg font-bold font-display text-forest mb-4">Alerts</h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <p className="text-sm text-orange-850 font-semibold">⚠️ 5 invoices overdue by 30+ days</p>
                </div>
                <div className="p-3.5 bg-forest/10 border border-forest/20 rounded-xl">
                  <p className="text-sm text-forest/90 font-semibold">ℹ️ Payroll runs tomorrow at 3 PM</p>
                </div>
                <div className="p-3.5 bg-accent/10 border border-accent/25 rounded-xl">
                  <p className="text-sm text-accent font-semibold">✓ Monthly budget reviewed successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

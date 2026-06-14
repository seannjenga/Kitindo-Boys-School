import Sidebar from './components/Sidebar';
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, TrendingUp, CheckCircle, Clock, FileText, CreditCard, BarChart3, Zap, Eye, ArrowRight, Activity, AlertCircle, RefreshCw, Filter, Bell, Search } from 'lucide-react';

function App() {
  const stats = [
    { label: 'Total Revenue', value: 'KES 2.4M', change: '+12.5%', icon: DollarSign, color: 'bg-green-50', iconColor: 'text-green-600', bgColor: 'bg-green-500' },
    { label: 'Active Students', value: '1,240', change: '+8.2%', icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-600', bgColor: 'bg-blue-500' },
    { label: 'Pending Invoices', value: '48', change: '-3.1%', icon: AlertCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', bgColor: 'bg-orange-500' },
    { label: 'Collected Today', value: 'KES 185K', change: '+5.7%', icon: TrendingUp, color: 'bg-purple-50', iconColor: 'text-purple-600', bgColor: 'bg-purple-500' },
  ];

  const transactions = [
    { id: 1, name: 'Form 2 - Class A Fees', amount: 'KES 150,000', status: 'Completed', icon: CheckCircle, color: 'text-green-600', date: 'Today at 2:30 PM' },
    { id: 2, name: 'School Supplies Payment', amount: 'KES 45,000', status: 'Pending', icon: Clock, color: 'text-yellow-600', date: 'Yesterday at 10:15 AM' },
    { id: 3, name: 'Staff Salary Advance', amount: 'KES 280,000', status: 'Processing', icon: Activity, color: 'text-blue-600', date: '2 days ago' },
    { id: 4, name: 'Maintenance Fund', amount: 'KES 92,000', status: 'Completed', icon: CheckCircle, color: 'text-green-600', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <Sidebar />
      
      {/* Top Header */}
      <div className="md:pl-64 sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-gradient">Financial Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">📊 Real-time school finance management system</p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-emerald-400" />
              <input type="text" placeholder="Search transactions..." className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-32" />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-emerald-400 transition-all group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full badge-pulse"></span>
            </button>
            <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Last updated: Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:pl-64 p-6 pb-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              const isNegative = stat.change.includes('-');
              return (
                <div key={idx} className="group stat-card-enhanced slide-in hover-lift card-interactive relative" style={{ animationDelay: `${idx * 100}ms` }}>
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center group-hover:shadow-2xl transition-all group-hover:scale-125 group-hover:-rotate-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity"></div>
                        <Icon className={`w-8 h-8 ${stat.iconColor} relative z-10 group-hover:rotate-12 transition-transform`} />
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md border ${
                        isNegative 
                          ? 'bg-red-500/20 text-red-300 border-red-400/30' 
                          : 'bg-green-500/20 text-green-300 border-green-400/30'
                      }`}>
                        {isNegative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                        {stat.change}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-white count-animate">{stat.value}</p>
                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                      <span>vs. last month</span>
                      <BarChart3 className="w-3 h-3 text-emerald-400 opacity-60" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="lg:col-span-2 card-enhanced">
              <div className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to Kitondo Finance</h2>
                    <p className="text-gray-300">Your comprehensive financial management dashboard for educational institutions</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 relative z-10">
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-400/30 hover:border-green-400/60 backdrop-blur-sm group cursor-pointer hover-lift card-interactive">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all group-hover:scale-110 group-hover:rotate-6">
                        <Activity className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">⚡ Real-time Tracking</p>
                      <p className="text-gray-400 text-xs mt-1">Monitor all transactions instantly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-400/30 hover:border-blue-400/60 backdrop-blur-sm group cursor-pointer hover-lift card-interactive">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all group-hover:scale-110 group-hover:rotate-6">
                        <BarChart3 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">📊 Detailed Reports</p>
                      <p className="text-gray-400 text-xs mt-1">Generate insights & analytics</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-xl border border-purple-400/30 hover:border-purple-400/60 backdrop-blur-sm group cursor-pointer hover-lift card-interactive">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all group-hover:scale-110 group-hover:rotate-6">
                        <Users className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">👥 Student Management</p>
                      <p className="text-gray-400 text-xs mt-1">Track student fees & records</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-xl border border-orange-400/30 hover:border-orange-400/60 backdrop-blur-sm group cursor-pointer hover-lift card-interactive">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center group-hover:shadow-xl group-hover:shadow-orange-500/50 transition-all group-hover:scale-110 group-hover:rotate-6">
                        <TrendingUp className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">📈 Growth Analytics</p>
                      <p className="text-gray-400 text-xs mt-1">Track revenue trends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-enhanced">
              <div className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-3 relative z-10">
                  <button className="btn-primary-enhanced w-full group btn-interactive hover-lift">
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>📄 Create Invoice</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
                  </button>
                  <button className="btn-secondary-enhanced w-full group btn-interactive hover-lift">
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>👁️ View Payments</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
                  </button>
                  <button className="btn-secondary-enhanced w-full group btn-interactive hover-lift">
                    <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>📊 Generate Report</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
                  </button>
                  <button className="btn-secondary-enhanced w-full group btn-interactive hover-lift">
                    <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>💳 Manage Fees</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 card-enhanced">
            <div className="p-6 border-b border-white/20 bg-gradient-to-r from-white/10 to-transparent">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  💰 Recent Transactions
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-emerald-400 transition-all rounded-lg hover:bg-white/10 group">
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-400 transition-all rounded-lg hover:bg-white/10 group">
                    <Filter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center gap-1 ml-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20 bg-white/5">
                    <th className="text-left px-6 py-4 text-gray-300 font-bold text-sm">Transaction</th>
                    <th className="text-left px-6 py-4 text-gray-300 font-bold text-sm">Date & Time</th>
                    <th className="text-left px-6 py-4 text-gray-300 font-bold text-sm">Status</th>
                    <th className="text-right px-6 py-4 text-gray-300 font-bold text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const Icon = tx.icon;
                    return (
                      <tr key={tx.id} className="border-b border-white/10 hover:bg-white/10 transition-all group cursor-pointer hover-lift card-interactive">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:shadow-xl group-hover:scale-110 transition-all group-hover:bg-white/20`}>
                              <Icon className={`w-5 h-5 ${tx.color} group-hover:rotate-6 transition-transform`} />
                            </div>
                            <span className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors">{tx.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors flex items-center gap-1">
                            <Clock className="w-3 h-3 opacity-60" />
                            {tx.date}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border transition-all group-hover:scale-105 ${
                            tx.status === 'Completed' ? 'bg-green-500/20 text-green-300 border-green-400/30 group-hover:bg-green-500/30 group-hover:border-green-400/60' :
                            tx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30 group-hover:bg-yellow-500/30 group-hover:border-yellow-400/60' :
                            'bg-blue-500/20 text-blue-300 border-blue-400/30 group-hover:bg-blue-500/30 group-hover:border-blue-400/60'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                              tx.status === 'Completed' ? 'bg-green-400' :
                              tx.status === 'Pending' ? 'bg-yellow-400' :
                              'bg-blue-400'
                            }`}></span>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">{tx.amount}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
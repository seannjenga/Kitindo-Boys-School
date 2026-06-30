import { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, Download, Plus, LogOut, X, Smartphone } from 'lucide-react';

interface ParentDashboardProps {
  onLogout?: () => void;
}

export default function ParentDashboard({ onLogout }: ParentDashboardProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('0709953000');
  const [stkStatus, setStkStatus] = useState<'idle' | 'sending' | 'prompted' | 'completed' | 'failed'>('idle');

  const stats = [
    { label: 'Total Fees', value: 'KES 150,000', status: 'All Fees', icon: DollarSign },
    { label: 'Amount Paid', value: 'KES 120,000', status: 'Completed', icon: CheckCircle },
    { label: 'Outstanding', value: 'KES 30,000', status: 'Pending', icon: AlertCircle },
    { label: 'Available Credit', value: 'KES 15,000', status: 'Fee Overpayments', icon: CreditCard },
  ];

  const pendingInvoices = [
    { 
      id: 1, 
      name: 'School Fees - Term 1', 
      amount: 'KES 30,000', 
      dueDate: '2024-07-15', 
      status: 'Overdue',
      lineItems: [
        { desc: 'Tuition Fee', amt: 'KES 20,000', category: 'Tuition' },
        { desc: 'Boarding & Meals', amt: 'KES 7,500', category: 'Boarding' },
        { desc: 'Medical Cover & Insurance', amt: 'KES 2,500', category: 'Insurance' }
      ]
    },
    { 
      id: 2, 
      name: 'Transport Fees', 
      amount: 'KES 5,000', 
      dueDate: '2024-08-01', 
      status: 'Due Soon',
      lineItems: [
        { desc: 'Bus Fuel & Maintenance', amt: 'KES 3,550', category: 'Transport' },
        { desc: 'Driver & Custodian Welfare', amt: 'KES 1,450', category: 'Welfare' }
      ]
    },
  ];

  const paymentMethods = [
    { name: 'M-Pesa Paybill', icon: '📱', category: 'Paybill: 222999', available: true },
    { name: 'M-Pesa STK Push', icon: '⚡', category: 'Instant STK Pop-up', available: true, action: 'stk' },
    { name: 'Equity Bank', icon: '🏦', category: 'Bank Transfer (Equity)', available: true },
    { name: 'KCB Bank', icon: '🏦', category: 'Bank Transfer (KCB)', available: true },
  ];

  const handleStkPush = (e: React.FormEvent) => {
    e.preventDefault();
    setStkStatus('sending');
    setTimeout(() => {
      setStkStatus('prompted');
      setTimeout(() => {
        setStkStatus('completed');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream text-forest font-sans selection:bg-forest/10 selection:text-forest">
      <div className="sticky top-0 z-40 border-b border-forest/10 bg-cream/80 backdrop-blur-xl">
        <div className="px-6 py-5 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display text-forest">Pay School Fees</h1>
              <p className="text-sm text-forest/70 mt-1">Manage your child's fees and payments</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-2.5 bg-forest hover:bg-forest-light text-cream font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 duration-200 flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Make Payment
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

      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
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
                  <p className="text-xs text-accent font-bold uppercase tracking-wider">{stat.status}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-display text-forest flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-700 animate-pulse" />
                  Outstanding Invoices
                </h2>
                <a href="#" className="text-xs uppercase tracking-wider font-bold text-accent hover:text-emerald-700 transition-colors">View All</a>
              </div>
              <div className="space-y-3">
                {pendingInvoices.map((invoice) => (
                  <div 
                    key={invoice.id} 
                    onClick={() => setSelectedInvoice(invoice)}
                    className="bg-cream-dark/50 hover:bg-cream-dark p-4 rounded-xl border border-forest/5 hover:border-accent/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-forest font-semibold group-hover:text-accent transition-colors">{invoice.name}</p>
                      <p className="text-xs text-forest/60">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-forest font-bold mb-1">{invoice.amount}</p>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        invoice.status === 'Overdue' ? 'bg-red-500/15 text-red-700' : 'bg-orange-500/15 text-orange-750'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
              <h3 className="text-lg font-bold font-display text-forest mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-forest hover:bg-forest-light text-cream font-bold text-sm py-3 px-4 rounded-full shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 duration-200"
                >
                  <DollarSign className="w-4 h-4" />
                  Pay Balance Now
                </button>
                <button className="w-full border border-forest/10 hover:border-forest text-forest hover:bg-forest/5 font-bold text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-250">
                  <Download className="w-4 h-4" />
                  Download Statement
                </button>
                <button className="w-full border border-forest/10 hover:border-forest text-forest hover:bg-forest/5 font-bold text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-all duration-250">
                  <TrendingUp className="w-4 h-4" />
                  Payment History
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
            <h2 className="text-xl font-bold font-display text-forest mb-6">Available Payment Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (method.action === 'stk') {
                      setShowPaymentModal(true);
                    }
                  }}
                  className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                  <p className="font-semibold text-forest mb-1">{method.name}</p>
                  <p className="text-xs text-forest/50">{method.category}</p>
                  {method.available && (
                    <div className="mt-3 text-accent text-xs font-bold uppercase tracking-wider">Available</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-cream border border-forest/10 rounded-3xl p-8 max-w-lg w-full text-left shadow-2xl relative">
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-forest/10 hover:bg-forest/5 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/15 px-3 py-1 rounded-full">
              Invoice Details
            </span>
            <h3 className="font-display text-2xl font-bold text-forest mt-4 mb-1">
              {selectedInvoice.name}
            </h3>
            <p className="text-xs text-forest/50 uppercase tracking-widest font-bold mb-6">
              Due Date: {selectedInvoice.dueDate}
            </p>

            <div className="space-y-4 border-t border-b border-forest/10 py-6 mb-6">
              {selectedInvoice.lineItems.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-forest">{item.desc}</p>
                    <p className="text-[10px] uppercase tracking-wider text-forest/40">{item.category}</p>
                  </div>
                  <span className="font-bold text-forest">{item.amt}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm text-forest/60">Total Amount Due:</span>
              <span className="text-2xl font-bold text-forest">{selectedInvoice.amount}</span>
            </div>

            <button 
              onClick={() => {
                setSelectedInvoice(null);
                setShowPaymentModal(true);
              }}
              className="w-full py-3 bg-forest hover:bg-forest-light text-cream font-bold rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 duration-200"
            >
              Pay Outstanding Fees
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-cream border border-forest/10 rounded-3xl p-8 max-w-md w-full text-left shadow-2xl relative">
            <button 
              onClick={() => {
                setShowPaymentModal(false);
                setStkStatus('idle');
              }}
              className="absolute top-6 right-6 w-8 h-8 rounded-full border border-forest/10 hover:bg-forest/5 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-forest">Lipa Na M-Pesa</h3>
                <p className="text-xs text-forest/50">Instant STK Push fee payment</p>
              </div>
            </div>

            {stkStatus === 'idle' && (
              <form onSubmit={handleStkPush} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-2">
                    M-Pesa Mobile Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    required
                    placeholder="e.g. 0709953000"
                    className="w-full px-4 py-3 border border-forest/20 rounded-xl bg-cream-dark/20 focus:border-accent focus:outline-none font-semibold text-forest"
                  />
                </div>

                <div className="bg-forest/5 p-4 rounded-xl border border-forest/5 text-xs text-forest/70 space-y-1">
                  <p className="font-bold">Transaction Info:</p>
                  <p>• Payer phone will receive a prompt to enter PIN.</p>
                  <p>• Receipt will reconcile automatically in real-time.</p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-forest hover:bg-forest-light text-cream font-bold rounded-full shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 duration-200"
                >
                  Send STK Push Request
                </button>
              </form>
            )}

            {stkStatus === 'sending' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-forest/10 border-t-accent animate-spin mx-auto"></div>
                <p className="font-semibold text-forest">Connecting to payment gateway...</p>
                <p className="text-xs text-forest/50">Initiating secure Lipa Na M-Pesa transaction</p>
              </div>
            )}

            {stkStatus === 'prompted' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto text-orange-700 animate-pulse">
                  📱
                </div>
                <p className="font-semibold text-forest">Prompt Sent!</p>
                <p className="text-xs text-forest/70 max-w-xs mx-auto">
                  Please enter your M-Pesa PIN on your phone ({paymentPhone}) to authorize the payment.
                </p>
              </div>
            )}

            {stkStatus === 'completed' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto text-accent text-xl">
                  ✓
                </div>
                <p className="font-semibold text-forest text-lg">Payment Successful!</p>
                <p className="text-xs text-forest/70 max-w-xs mx-auto mb-4">
                  Your payment of KES 30,000 has been verified. M-Pesa Receipt Code: <span className="font-bold text-accent">SGK8Y8F89S</span>.
                </p>
                <button 
                  onClick={() => {
                    setShowPaymentModal(false);
                    setStkStatus('idle');
                  }}
                  className="mt-4 px-6 py-2 bg-forest hover:bg-forest-light text-cream font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all active:scale-95 duration-200"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { 
  GraduationCap, Shield, Calculator, Brush, Sparkles, 
  LogOut, Clock, UserPlus, Check, ArrowLeft, BarChart3, RefreshCw
} from 'lucide-react';

interface StaffDashboardProps {
  onLogout?: () => void;
}

type StaffType = 'teacher' | 'cleaner' | 'accountant' | 'security' | null;

export default function StaffDashboard({ onLogout }: StaffDashboardProps) {
  const [staffType, setStaffType] = useState<StaffType>(null);
  
  // Cleaner Workspace States
  const [cleanerTasks, setCleanerTasks] = useState([
    { id: 1, name: 'Sanitize Science Lab', completed: true, zone: 'Block A' },
    { id: 2, name: 'Mop Dining Hall East', completed: false, zone: 'Dining' },
    { id: 3, name: 'Sanitize Classroom Form 1 East', completed: true, zone: 'Block B' },
    { id: 4, name: 'Disinfect Admin Offices', completed: false, zone: 'Admin' },
  ]);
  const [supplyRequest, setSupplyRequest] = useState({ item: 'Liquid Soap', qty: '2 Gallons', success: false });

  // Security Workspace States
  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Peter Mwangi', phone: '0711223344', student: 'David Mwangi (F2)', checkIn: '08:45 AM', checkedOut: false },
    { id: 2, name: 'Sarah Jepchirchir', phone: '0722334455', student: 'Amos Kiprop (F4)', checkIn: '10:15 AM', checkedOut: true },
  ]);
  const [newVisitor, setNewVisitor] = useState({ name: '', phone: '', student: '' });

  // Accountant Workspace States
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 'LDG-903', description: 'Term 2 Tuition Allocation', amount: 'KES 45,000', type: 'Credit', status: 'Audited' },
    { id: 'LDG-904', description: 'Lost Library Book Fee', amount: 'KES 1,500', type: 'Debit', status: 'Pending' },
    { id: 'LDG-905', description: 'Co-curricular Activity Fee', amount: 'KES 5,050', type: 'Credit', status: 'Audited' },
  ]);

  // General Handlers
  const handleToggleTask = (id: number) => {
    setCleanerTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleRequestSupplies = (e: React.FormEvent) => {
    e.preventDefault();
    setSupplyRequest(prev => ({ ...prev, success: true }));
    setTimeout(() => {
      setSupplyRequest(prev => ({ ...prev, success: false, item: 'Liquid Soap', qty: '2 Gallons' }));
    }, 3000);
  };

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.phone) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setVisitors(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newVisitor.name,
        phone: newVisitor.phone,
        student: newVisitor.student || 'General Inquiry',
        checkIn: time,
        checkedOut: false
      }
    ]);
    setNewVisitor({ name: '', phone: '', student: '' });
  };

  const handleCheckOutVisitor = (id: number) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, checkedOut: true } : v));
  };

  const handleAuditLedger = (id: string) => {
    setLedgerEntries(prev => prev.map(l => l.id === id ? { ...l, status: 'Audited' } : l));
  };

  // Cleaner Stats
  const completedCleanerCount = cleanerTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-cream text-forest font-sans selection:bg-forest/10 selection:text-forest">
      
      {/* 1. INITIAL ROLE SELECTION OVERLAY */}
      {!staffType && (
        <div className="fixed inset-0 z-50 bg-forest/30 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-cream border border-forest/10 rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-forest">Staff Authentication</h2>
              <p className="text-sm text-forest/60 mt-1">Select your department roster for today's session</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teacher */}
              <button 
                onClick={() => setStaffType('teacher')}
                className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-left transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-4 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-forest text-lg">Teacher / Academic staff</h3>
                <p className="text-xs text-forest/50 mt-1">Manage CBC performance, class fee collection, and calendars</p>
              </button>

              {/* Accountant */}
              <button 
                onClick={() => setStaffType('accountant')}
                className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-left transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-4 group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-forest text-lg">Accountant / Bursar</h3>
                <p className="text-xs text-forest/50 mt-1">Verify payment ledger codes, audits, and statutory runs</p>
              </button>

              {/* Cleaner */}
              <button 
                onClick={() => setStaffType('cleaner')}
                className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-left transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-4 group-hover:scale-105 transition-transform">
                  <Brush className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-forest text-lg">Sanitation & Operations</h3>
                <p className="text-xs text-forest/50 mt-1">View campus sanitation checklists and request supplies</p>
              </button>

              {/* Security */}
              <button 
                onClick={() => setStaffType('security')}
                className="group border border-forest/10 bg-cream-dark/40 hover:bg-cream-dark hover:border-accent/40 rounded-2xl p-6 text-left transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-forest/5 flex items-center justify-center text-forest mb-4 group-hover:scale-105 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-forest text-lg">Security officer</h3>
                <p className="text-xs text-forest/50 mt-1">Register visitors, gate check-ins, and key logs</p>
              </button>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-forest/10">
              <p className="text-xs text-forest/40 font-bold uppercase tracking-wider">Kitondo Boys School Portal</p>
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-full transition-all active:scale-95 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN STAFF LAYOUT */}
      {staffType && (
        <>
          {/* Header */}
          <div className="sticky top-0 z-40 border-b border-forest/10 bg-cream/80 backdrop-blur-xl">
            <div className="px-6 py-5 max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStaffType(null)}
                  className="w-10 h-10 border border-forest/10 hover:bg-forest/5 text-forest flex items-center justify-center rounded-full transition-colors"
                  title="Change Department Role"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold font-display text-forest capitalize">
                    {staffType} Workspace
                  </h1>
                  <p className="text-xs text-forest/60">
                    Kitondo staff portal • Signed in as <span className="font-semibold">{staffType}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
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

          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              
              {/* ================= TEACHER WORKSPACE ================= */}
              {staffType === 'teacher' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">My Assigned Class</p>
                      <p className="text-2xl font-bold text-forest">Form 3 East</p>
                      <p className="text-xs text-accent mt-2 font-semibold">CBC Curriculum</p>
                    </div>
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Students Registered</p>
                      <p className="text-2xl font-bold text-forest">42</p>
                      <p className="text-xs text-forest/50 mt-2">All Active</p>
                    </div>
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Mean Term Score</p>
                      <p className="text-2xl font-bold text-accent">B+ (71.2)</p>
                      <p className="text-xs text-forest/50 mt-2">Term 1 finals</p>
                    </div>
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                      <p className="text-forest/60 text-xs uppercase tracking-wider font-bold mb-1">Fee Completion</p>
                      <p className="text-2xl font-bold text-forest">87%</p>
                      <p className="text-xs text-orange-700 mt-2 font-semibold">5 Defaulters remaining</p>
                    </div>
                  </div>

                  {/* Class collection details */}
                  <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 text-left shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold font-display text-forest flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-accent" />
                        Class Fee Collection
                      </h2>
                      <span className="text-xs text-forest/50 font-bold uppercase tracking-wider">Form 3 East</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-forest/10">
                            <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Student Name</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Admission No.</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Fees Due</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Paid</th>
                            <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'David Kipkorir', adm: 'ADM-8902', due: 'KES 45,000', paid: 'KES 45,000', status: 'Completed' },
                            { name: 'Peter Kamau', adm: 'ADM-8910', due: 'KES 45,000', paid: 'KES 30,000', status: 'Partial' },
                            { name: 'Ezekiel Omwamba', adm: 'ADM-8954', due: 'KES 45,000', paid: 'KES 0', status: 'Unpaid' },
                          ].map((std, idx) => (
                            <tr key={idx} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-forest">{std.name}</td>
                              <td className="py-4 px-4 text-center text-forest/70">{std.adm}</td>
                              <td className="py-4 px-4 text-center text-forest font-semibold">{std.due}</td>
                              <td className="py-4 px-4 text-center text-accent font-bold">{std.paid}</td>
                              <td className="py-4 px-4 text-right">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                                  std.status === 'Completed' ? 'bg-accent/15 text-accent' :
                                  std.status === 'Partial' ? 'bg-orange-500/15 text-orange-700' :
                                  'bg-red-500/15 text-red-750'
                                }`}>
                                  {std.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= CLEANER WORKSPACE ================= */}
              {staffType === 'cleaner' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                  {/* Task checklist */}
                  <div className="lg:col-span-8 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-display text-forest">Sanitation Roster</h3>
                        <p className="text-xs text-forest/60 mt-1">Check off zones as you finish sanitizing them</p>
                      </div>
                      <span className="text-xs font-bold text-accent bg-accent/15 px-3 py-1 rounded-full">
                        Cleaned: {completedCleanerCount} / {cleanerTasks.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cleanerTasks.map(task => (
                        <div 
                          key={task.id}
                          onClick={() => handleToggleTask(task.id)}
                          className="flex items-center justify-between p-4 bg-cream-dark/50 border border-forest/5 hover:border-accent/30 rounded-xl cursor-pointer transition-all hover:bg-cream-dark select-none"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              task.completed ? 'bg-accent border-accent text-cream' : 'border-forest/30 bg-white'
                            }`}>
                              {task.completed && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-sm font-semibold transition-all ${
                              task.completed ? 'line-through text-forest/40' : 'text-forest'
                            }`}>
                              {task.name}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-forest/40 bg-forest/5 px-2 py-0.5 rounded">
                            {task.zone}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supplies checklist & Schedule */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Supplies form */}
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-md font-bold font-display text-forest mb-4">Request Cleaning Supplies</h4>
                      {supplyRequest.success ? (
                        <div className="bg-accent/15 border border-accent/25 p-4 rounded-xl text-center space-y-2 text-accent">
                          <Sparkles className="w-8 h-8 mx-auto" />
                          <p className="font-semibold text-sm">Request Submitted!</p>
                          <p className="text-xs text-emerald-800">Bursar will notify you when approved.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleRequestSupplies} className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-2">Item needed</label>
                            <input 
                              type="text" 
                              value={supplyRequest.item}
                              onChange={(e) => setSupplyRequest(prev => ({ ...prev, item: e.target.value }))}
                              className="w-full px-4 py-2.5 bg-white border border-forest/15 rounded-xl text-forest focus:outline-none focus:border-accent text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-2">Quantity</label>
                            <input 
                              type="text" 
                              value={supplyRequest.qty}
                              onChange={(e) => setSupplyRequest(prev => ({ ...prev, qty: e.target.value }))}
                              className="w-full px-4 py-2.5 bg-white border border-forest/15 rounded-xl text-forest focus:outline-none focus:border-accent text-sm font-semibold"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full py-2.5 bg-forest hover:bg-forest-light text-cream font-bold rounded-xl text-sm transition-all active:scale-95 duration-200"
                          >
                            Submit Requisition
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Cleaning log timeline */}
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-md font-bold font-display text-forest mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        Today's Schedule
                      </h4>
                      <div className="space-y-3.5 text-xs">
                        <div className="p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <p className="font-bold text-forest/45 uppercase tracking-wider text-[9px]">07:30 AM - 09:00 AM</p>
                          <p className="font-semibold text-forest mt-0.5">Morning Sweep & Class Disinfection</p>
                        </div>
                        <div className="p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <p className="font-bold text-forest/45 uppercase tracking-wider text-[9px]">12:30 PM - 02:00 PM</p>
                          <p className="font-semibold text-forest mt-0.5">Dining Hall Cleanup & Post-Lunch Mop</p>
                        </div>
                        <div className="p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <p className="font-bold text-forest/45 uppercase tracking-wider text-[9px]">04:00 PM - 05:30 PM</p>
                          <p className="font-semibold text-forest mt-0.5">Final Trash Rounds & Lockup Check</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= ACCOUNTANT WORKSPACE ================= */}
              {staffType === 'accountant' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  {/* Ledger Audit Entry table */}
                  <div className="lg:col-span-2 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-display text-forest">Transaction Ledger</h3>
                        <p className="text-xs text-forest/60 mt-1">Audit and verify allocations posted by payment gateways</p>
                      </div>
                      <button className="p-2 border border-forest/10 hover:bg-forest/5 text-forest rounded-full transition-colors">
                        <RefreshCw className="w-4 h-4 animate-spin-slow" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-forest/10">
                            <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Code</th>
                            <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Details</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Amount</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Type</th>
                            <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ledgerEntries.map(log => (
                            <tr key={log.id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-forest">{log.id}</td>
                              <td className="py-4 px-4 text-forest">{log.description}</td>
                              <td className="py-4 px-4 text-center text-forest font-bold">{log.amount}</td>
                              <td className="py-4 px-4 text-center">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  log.type === 'Credit' ? 'bg-accent/15 text-accent' : 'bg-red-500/15 text-red-750'
                                }`}>
                                  {log.type}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                {log.status === 'Audited' ? (
                                  <span className="text-accent text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                                    ✓ Audited
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleAuditLedger(log.id)}
                                    className="px-3 py-1 bg-forest hover:bg-forest-light text-cream font-bold text-xs uppercase tracking-wider rounded"
                                  >
                                    Verify
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Summary card */}
                  <div className="space-y-6">
                    <div className="border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-md font-bold font-display text-forest mb-4">Financial Controls</h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <span className="text-forest/70 font-semibold">Audited Ledger Sum</span>
                          <span className="font-bold text-accent">KES 50,050</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <span className="text-forest/70 font-semibold">Unresolved items</span>
                          <span className="font-bold text-orange-700">1 Pending</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-cream-dark rounded-xl border border-forest/5">
                          <span className="text-forest/70 font-semibold">Daily Cash Reconciliation</span>
                          <span className="font-bold text-accent">Synchronized</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                      <p className="text-xs text-orange-850 font-semibold">
                        ⚠️ **Compliance Note:** Please audit all M-Pesa debit fees before closing the reconciliation batch.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SECURITY WORKSPACE ================= */}
              {staffType === 'security' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                  {/* Visitor check in Form */}
                  <div className="lg:col-span-4 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold font-display text-forest mb-2 flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-accent" />
                      Register New Visitor
                    </h3>

                    <form onSubmit={handleAddVisitor} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-1.5">Visitor Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Peter Mwangi"
                          value={newVisitor.name}
                          onChange={(e) => setNewVisitor(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-white border border-forest/15 rounded-xl text-forest focus:outline-none focus:border-accent text-sm font-semibold"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-1.5">Contact Phone</label>
                        <input 
                          type="tel" 
                          placeholder="e.g. 0711223344"
                          value={newVisitor.phone}
                          onChange={(e) => setNewVisitor(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-white border border-forest/15 rounded-xl text-forest focus:outline-none focus:border-accent text-sm font-semibold"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold tracking-widest text-forest/60 mb-1.5">Student / Purpose</label>
                        <input 
                          type="text" 
                          placeholder="e.g. David Mwangi (F2)"
                          value={newVisitor.student}
                          onChange={(e) => setNewVisitor(prev => ({ ...prev, student: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-white border border-forest/15 rounded-xl text-forest focus:outline-none focus:border-accent text-sm font-semibold"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3 bg-forest hover:bg-forest-light text-cream font-bold rounded-xl text-sm transition-all active:scale-95 duration-200 mt-2"
                      >
                        Check In Visitor
                      </button>
                    </form>
                  </div>

                  {/* Visitor log Table */}
                  <div className="lg:col-span-8 border border-forest/10 bg-cream-dark/30 rounded-2xl p-6 shadow-sm space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-forest">Gate Entry Log</h3>
                      <p className="text-xs text-forest/60 mt-1">Real-time visitor logs and check-out tracking</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-forest/10">
                            <th className="text-left py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Name</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Contact</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Student/Reason</th>
                            <th className="text-center py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">In Time</th>
                            <th className="text-right py-3 px-4 text-forest/60 font-bold uppercase tracking-wider text-xs">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visitors.map(v => (
                            <tr key={v.id} className="border-b border-forest/5 hover:bg-forest/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-forest">{v.name}</td>
                              <td className="py-4 px-4 text-center text-forest/70">{v.phone}</td>
                              <td className="py-4 px-4 text-center text-forest">{v.student}</td>
                              <td className="py-4 px-4 text-center text-forest/50">{v.checkIn}</td>
                              <td className="py-4 px-4 text-right">
                                {v.checkedOut ? (
                                  <span className="text-forest/40 text-xs font-semibold">Checked Out</span>
                                ) : (
                                  <button
                                    onClick={() => handleCheckOutVisitor(v.id)}
                                    className="px-3 py-1 border border-forest/10 hover:bg-forest/5 text-forest font-bold text-xs uppercase tracking-wider rounded"
                                  >
                                    Check Out
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </>
      )}

    </div>
  );
}

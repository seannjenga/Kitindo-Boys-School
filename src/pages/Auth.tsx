import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, User, Users, GraduationCap } from 'lucide-react';

type UserType = 'parent' | 'admin' | 'staff' | null;

interface AuthProps {
  onLogin?: (userType: UserType) => void;
  onBackToHome?: () => void;
  activeLanguage?: 'en' | 'fr';
}

export default function Auth({ onLogin, onBackToHome, activeLanguage = 'en' }: AuthProps) {
  const [userType, setUserType] = useState<UserType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userTypeOptions = [
    {
      type: 'parent' as UserType,
      label: 'Parent',
      icon: User,
      description: 'Pay fees & track payments',
      color: 'from-accent/20 to-accent/5',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
    },
    {
      type: 'admin' as UserType,
      label: 'Admin',
      icon: Users,
      description: 'Manage school finance',
      color: 'from-forest/20 to-forest/5',
      bgColor: 'bg-forest/10',
      iconColor: 'text-forest',
    },
    {
      type: 'staff' as UserType,
      label: 'Staff',
      icon: GraduationCap,
      description: 'Access staff portals & rosters',
      color: 'from-forest/15 to-forest/5',
      bgColor: 'bg-forest/5',
      iconColor: 'text-forest',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      console.log(`Login as ${userType}:`, { email, password });
      setIsLoading(false);
      
      // Call the onLogin callback with the selected user type
      if (onLogin) {
        onLogin(userType);
      }
    }, 1500);
  };

  const handleBackToSelection = () => {
    setUserType(null);
    setEmail('');
    setPassword('');
  };

  const selectedOption = userTypeOptions.find(opt => opt.type === userType);

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden flex flex-col items-center justify-center p-6 text-forest">
      
      {/* Back to Home Button */}
      {onBackToHome && (
        <button 
          onClick={onBackToHome}
          className="absolute top-8 left-8 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-forest/60 hover:text-forest transition-colors duration-200"
        >
          ← {activeLanguage === 'en' ? 'Back to Home' : 'Retour à l\'accueil'}
        </button>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md my-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 bg-forest rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-cream font-display font-bold text-2xl">K</span>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-forest mb-1">
            Kitondo Boys School
          </h1>
          <p className="text-forest/60 text-xs uppercase tracking-widest font-bold">Finance Portal</p>
        </div>

        {!userType ? (
          <>
            {/* User Role Selection */}
            <div className="bg-cream-dark border border-forest/10 p-8 rounded-3xl shadow-xl space-y-6">
              
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold text-forest">Select Your Role</h2>
                <p className="text-forest/60 text-xs mt-1">Choose how you access the system</p>
              </div>

              <div className="space-y-3">
                {userTypeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.type}
                      onClick={() => setUserType(option.type)}
                      className="w-full group bg-white border border-forest/10 hover:border-forest/30 p-5 rounded-2xl text-left transition-all duration-200 flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${option.bgColor} rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${option.iconColor}`} />
                        </div>
                        <div>
                          <p className="text-forest font-bold text-sm">{option.label}</p>
                          <p className="text-forest/60 text-xs mt-0.5">{option.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-forest/40 group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-200" />
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-cream-dark border border-forest/10 p-3 rounded-2xl text-center">
                <Zap className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-[10px] uppercase font-bold tracking-wider text-forest/60">Fast</p>
              </div>
              <div className="bg-cream-dark border border-forest/10 p-3 rounded-2xl text-center">
                <Lock className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-[10px] uppercase font-bold tracking-wider text-forest/60">Secure</p>
              </div>
              <div className="bg-cream-dark border border-forest/10 p-3 rounded-2xl text-center">
                <Users className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-[10px] uppercase font-bold tracking-wider text-forest/60">Trusted</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Login Form */}
            <div className="bg-cream-dark border border-forest/10 p-8 rounded-3xl shadow-xl">
              
              <div className="text-center mb-6">
                <div className={`w-10 h-10 ${selectedOption?.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {selectedOption && <selectedOption.icon className={`w-5 h-5 ${selectedOption.iconColor}`} />}
                </div>
                <h2 className="text-xl font-bold text-forest">{selectedOption?.label} Login</h2>
                <p className="text-forest/60 text-xs mt-0.5">{selectedOption?.description}</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest/70 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-11 pr-4 py-2.5 bg-white border border-forest/10 rounded-xl text-forest placeholder-forest/30 focus:outline-none focus:border-forest/30 focus:ring-1 focus:ring-forest/10 text-sm transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-forest/70">Password</label>
                    <a href="#" className="text-xs font-bold text-accent hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-2.5 bg-white border border-forest/10 rounded-xl text-forest placeholder-forest/30 focus:outline-none focus:border-forest/30 focus:ring-1 focus:ring-forest/10 text-sm transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white border border-forest/10 accent-forest" />
                  <span className="text-xs text-forest/60">Remember me</span>
                </label>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-forest hover:bg-forest-light text-cream font-bold rounded-xl shadow transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-forest/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-cream-dark text-forest/40 uppercase tracking-widest font-bold">or</span>
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={handleBackToSelection}
                className="w-full py-2.5 bg-white border border-forest/15 hover:border-forest/30 text-forest font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Change Role
              </button>

            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-forest/40 font-bold uppercase tracking-wider">
          <p>© 2026 Kitondo Boys School. All rights reserved.</p>
        </div>

      </div>

    </div>
  );
}

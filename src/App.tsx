import { useState } from 'react';
import Header from './components/Header';
import FullScreenMenu from './components/FullScreenMenu';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';

type UserRole = 'parent' | 'admin' | 'staff' | null;
type ViewState = 'landing' | 'auth' | 'dashboard';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fr'>('en');

  // Callback for Auth component to set user role after successful login
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setView('dashboard');
  };

  // Callback to logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setView('landing');
  };

  const handlePortalClick = () => {
    setView('auth');
  };

  const handleBackToHome = () => {
    setView('landing');
  };

  // Route to role-specific dashboard with logout handler if authenticated
  if (isAuthenticated) {
    if (userRole === 'parent') {
      return <ParentDashboard onLogout={handleLogout} />;
    }
    if (userRole === 'staff') {
      return <StaffDashboard onLogout={handleLogout} />;
    }
    // Return default admin dashboard
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Show Auth page if view state is auth
  if (view === 'auth') {
    return (
      <Auth 
        onLogin={handleLogin} 
        onBackToHome={handleBackToHome}
        activeLanguage={activeLanguage}
      />
    );
  }

  // Otherwise show public landing page
  return (
    <div className="min-h-screen bg-cream text-forest flex flex-col">
      <Header 
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onPortalClick={handlePortalClick}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
      />
      
      <FullScreenMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onPortalClick={handlePortalClick}
        activeLanguage={activeLanguage}
      />

      <main className="flex-grow">
        <LandingPage 
          activeLanguage={activeLanguage}
          onPortalClick={handlePortalClick}
        />
      </main>
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegistrationForm } from './components/registration/RegistrationForm';
import { RegistrationSuccess } from './pages/RegistrationSuccess';
import { ClientDashboard } from './pages/ClientDashboard';
import { LoginModal } from './components/auth/LoginModal';
import { SignupModal } from './components/auth/SignupFlow/SignupModal';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Account } from './pages/Account';
import { Billing } from './pages/Billing';
import { Customization } from './pages/Customization';
import { Support } from './pages/Support';
import { Installation } from './pages/Installation';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated ? (
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/customization" element={<Customization />} />
                <Route path="/support" element={<Support />} />
                <Route path="/installation" element={<Installation />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/signup" element={<SignupModal />} />
            <Route path="*" element={<LoginModal />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
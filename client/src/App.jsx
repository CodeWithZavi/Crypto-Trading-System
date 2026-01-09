import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
import Markets from './pages/Markets';
import QuickTrade from './pages/QuickTrade';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-crypto-dark text-white flex flex-col">
          <Navbar />
          <div className="flex flex-grow overflow-hidden">
            <div className="flex-grow flex flex-col min-w-0 overflow-auto">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/quick-trade" element={<QuickTrade />} />
                  <Route path="/trade" element={<Trade />} />
                  <Route path="/trade/:symbol" element={<Trade />} />
                  <Route path="/wallet" element={<Wallet />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonateFood from './pages/DonateFood';
import FindFood from './pages/FindFood';
import BiogasRegister from './pages/BiogasRegister';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import VolunteerRegister from './pages/VolunteerRegister';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { AppProvider } from './context/AppContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/donate" element={<DonateFood />} />
            <Route path="/find" element={<FindFood />} />
            <Route path="/biogas" element={<BiogasRegister />} />
            <Route path="/volunteer" element={<VolunteerRegister />} />
            <Route path="/impact" element={<Dashboard />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;

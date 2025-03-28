import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Menu,
  X
} from 'lucide-react';
import DashboardSection from './DashboardSection';
import UsersSection from './UsersSection';
import LiveFeedback from './LiveFeedback';
import SettingsSection from './SettingsSection';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', component: DashboardSection },
    { id: 'users', icon: Users, label: 'Users', component: UsersSection },
    { id: 'LiveFeedback', icon: FileText, label: 'Reports', component: LiveFeedback },
    { id: 'settings', icon: Settings, label: 'Settings', component: SettingsSection },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeMenuItem = menuItems.find(item => item.id === activeSection);
  const ActiveComponent = activeMenuItem?.component;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg">
        <div className="p-4 bg-indigo-600">
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${activeSection === item.id
                ? 'bg-indigo-100 text-indigo-600'
                : 'hover:bg-gray-100'
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile menu button and overlay */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-gray-600 bg-opacity-50">
          <div className="fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg">
            <nav className="p-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{activeMenuItem?.label}</h2>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
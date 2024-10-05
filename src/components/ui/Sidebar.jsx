import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css'; 
import SvgComponenta from '@/assets/Farmer';
import { Link, Routes, Route } from 'react-router-dom';

import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import Schemes from '@/pages/dashboardpages/Scheme.jsx'; 
import Irrigation from '@/pages/dashboardpages/Irrigation.jsx'; 
import HistoricalYield from '@/pages/dashboardpages/Historical.jsx';
import AISamadhaan from '@/pages/dashboardpages/Aisamadhan.jsx';
import Weather from '@/pages/dashboardpages/Weather.jsx';
import User from '@/pages/dashboardpages/User.jsx';
import CropDetails from '@/pages/dashboardpages/Pesticides';
import { useAppStore } from '@/store';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); 
  const { userInfo } = useAppStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      <div
        className={`sidebar bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}
        style={{ backgroundColor: '#365170', position: 'fixed', height: '100%' }}
      >
        <div className="flex items-center justify-between pt-7 pb-0 pl-7 pr-7">
          {isOpen && <h1 className='flex items-center text-lg pl-7'>Farmingo</h1>}
          <i
            className="bx bx-menu text-2xl cursor-pointer"
            onClick={toggleSidebar}
          ></i>
        </div>

       
        <ul className="mt-6">
          {['Dashboard', 'News', 'Irrigation Model', 'Historical Yield', 'AI Assistant', 'Crop Diseases', 'User', 'Pesticide'].map((item, index) => {
            const path = `${index === 0 ? 'dashboard' : index === 1 ? 'schemes' : index === 2 ? 'irrigation' : index === 3 ? 'historical' : index === 4 ? 'ai' : index === 5 ? 'weather' : index === 6 ? 'user' : 'pesticide'}`;

            return (
              <Link key={index} to={`/${path}`}>
                <li className="flex items-center pt-7 pb-2 pl-7 pr-7 hover:bg-gray-700 cursor-pointer">
                  <i className={`bx ${index === 0 ? 'bx-grid-alt' : index === 1 ? 'bx-bell' : index === 2 ? 'bx-chat' : index === 3 ? 'bx-news' : index === 4 ? 'bx-bot' : index === 5 ? 'bx-leaf' : index === 6 ? 'bx-user' : 'bx-injection'} text-xl`}></i>
                  {isOpen && <span className="ml-4">{item}</span>}
                </li>
              </Link>
            );
          })}
        </ul>

        
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center">
            <SvgComponenta className="w-20 h-14 rounded-full" />
            {isOpen && <span className="ml-4">{userInfo.firstName + ' ' + userInfo.lastName}</span>}
          </div>
        </div>
      </div>

      
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/irrigation" element={<Irrigation />} />
            <Route path="/historical" element={<HistoricalYield />} />
            <Route path="/ai" element={<AISamadhaan />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/user" element={<User />} />
            <Route path="/pesticide" element={<CropDetails />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            z-index: 10;
          }
          .ml-64 {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;

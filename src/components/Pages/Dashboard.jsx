import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { FaLaptopCode, FaUserPlus } from "react-icons/fa";
import { CgPerformance } from "react-icons/cg";
import 'react-toastify/dist/ReactToastify.css';
import { API_URLS }  from '../../config';
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userCount, setUserCount] = useState(); // State to store user count

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
      setIsSidebarOpen(false); // Close sidebar on mobile view
    } else {
      setIsMobile(false);
      setIsSidebarOpen(true); // Open sidebar on desktop view
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(API_URLS.getUser);
        if (!response.ok) {
          throw new Error('Failed to fetch user count');
        }
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setUserCount(data.data.length);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
        // Optionally handle error state or display an error message
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg p-6 rounded-lg flex flex-col justify-between hover:from-red-500 hover:to-red-700 transition-all duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg hover:underline cursor-pointer font-semibold">Projects</h2>
                <FaLaptopCode className="text-3xl text-white" />
              </div>
              <p className="mt-4">Manage and track all your projects in one place.</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg p-6 rounded-lg flex flex-col justify-between hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg hover:underline cursor-pointer font-semibold">
                  <Link to="/registered-details"> Total Users</Link>
                </h2>
                <FaUserPlus className="text-3xl text-white" />
              </div>
              {/* <p className="mt-3">Total Users</p> */}
              <p className="mb-4 text-2xl"> {userCount}</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-white shadow-lg p-6 rounded-lg flex flex-col justify-between hover:from-cyan-500 hover:to-cyan-700 transition-all duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg hover:underline cursor-pointer font-semibold">Performance</h2>
                <CgPerformance className="text-3xl text-white" />
              </div>
              <p className="mt-4">Monitor the performance of your projects and users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

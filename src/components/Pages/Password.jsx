import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URLS }  from '../../config';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Password = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState(null); // Initialize with null

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
    // Retrieve user data from sessionStorage
    const storedUserId = sessionStorage.getItem('loggedInUserId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    if (!userId) {
      toast.error('User ID is required');
      return;
    }

    try {
      const response = await fetch(API_URLS.changePassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else if (result.message === 'Old password not matched') {
        toast.error('Old password is incorrect');
      } else {
        toast.error(result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    }
  };

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex min-h-screen bg-gray-100 items-center justify-center">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <form className="bg-white mb-8 mt-6 p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Change Your Password!</h2>
            <div className="mb-6">
              <label className="block mb-1 text-gray-600">Old Password</label>
              <input
                type="password"
                name="oldpassword"
                id="oldPassword"
                className="w-full p-2 border border-gray-300 rounded"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-gray-600">New Password</label>
              <input
                type="password"
                name="newpassword"
                id="newPassword"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="Confirmpassword"
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { API_URLS } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
      setIsSidebarOpen(false);
    } else {
      setIsMobile(false);
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem('loggedInUserId');
    const userName = sessionStorage.getItem('loggedInUserName');
    const userEmail = sessionStorage.getItem('loggedInUserEmail');
    const userContact = sessionStorage.getItem('loggedInUserContact');
    
    setUserData({
      id: userId || '',
      name: userName || '',
      email: userEmail || '',
      contact: userContact || '',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS.updateProfile, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="bg-gray-100 min-h-screen pt-6">
          <div className="text-center justify-center">
            <h3 className="text-2xl font-semibold  ">Edit Your Profile</h3>
          </div>
          <form className="space-y-10  m-8" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-5">
              <div className="md:w-1/3 px-5 mb-10 md:mb-0">
                <div className="bg-white p-5 rounded">
                  <div className="text-center">
                    <h4 className="mb-4 text-xl">Upload your photo here!</h4>
                    <div className="relative h-40 w-40 mx-auto mb-4 border border-gray-300 bg-white rounded">
                      {file ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Profile"
                          className="h-full w-full object-cover rounded"
                        />
                      ) : (
                        <i className="fas fa-user absolute inset-0 flex items-center justify-center text-gray-300 text-7xl"></i>
                      )}
                    </div>
                    <input
                      type="file"
                      id="customFile"
                      name="file"
                      hidden
                      onChange={handleFileChange}
                    />
                    <label
                      className="block mb-2 py-2 px-4 bg-green-100 text-green-700 rounded cursor-pointer"
                      htmlFor="customFile"
                    >
                      Upload
                    </label>
                    {file && (
                      <button
                        type="button"
                        className="block mb-2 py-2 px-4 bg-red-100 text-red-700 rounded"
                        onClick={handleRemoveFile}
                      >
                        Remove
                      </button>
                    )}
                    <p className="text-gray-500 mt-3">
                      <span className="font-semibold">Note:</span> Minimum size 300px * 300px
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 px-5">
                <div className="bg-white p-5 rounded text-center">
                  <h4 className="mb-4 text-xl">Contact Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <label htmlFor="id" className="w-1/4 text-right mr-4">Id</label>
                      <input
                        type="text"
                        id="id"
                        name="id"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Id"
                        value={userData.id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="name" className="w-1/4 text-right mr-4">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="email" className="w-1/4 text-right mr-4">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="number" className="w-1/4 text-right mr-4">Mobile No</label>
                      <input
                        type="tel"
                        id="number"
                        name="contact"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Mobile Number"
                        value={userData.contact}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="flex items-center">
                      <label htmlFor="address" className="w-1/4 text-right mr-4">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Address"
                        value={userData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="pincode" className="w-1/4 text-right mr-4">Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="flex-1 py-2 px-3 border border-gray-300 rounded"
                        placeholder="Pincode"
                        value={userData.pincode}
                        onChange={handleChange}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" className="py-2 px-4 bg-red-500 text-white rounded">Delete profile</button>
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Update profile</button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Profile;

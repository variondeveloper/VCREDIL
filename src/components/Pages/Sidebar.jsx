import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiLayer, BiGridAlt, BiUser } from 'react-icons/bi';
import { FaUsers } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('loggedInUserName'); 
    if (storedUserName) {
      setUser({ name: storedUserName});
      
    }
  }, []);

  return (
    <div className={`bg-white text-gray-800 ${isSidebarOpen ? 'w-64' : 'w-16'} min-h-screen p-4 transition-width duration-600`}>
      <nav>
        <div className="mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <BiLayer className="text-2xl" />
            {isSidebarOpen && <span className="text-lg font-bold">{user ? user.name : 'Upicon'}</span>}
          </Link>
        </div>
        <hr />
        <div className="flex flex-col space-y-5 mt-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <BiGridAlt className="text-2xl" />
            {isSidebarOpen && <span className="hover:underline">Dashboard</span>}
          </Link>
          <Link to="/registration" className="flex items-center space-x-2">
            <BiUser className="text-2xl" />
            {isSidebarOpen && <span className="hover:underline">User Registration</span>}
          </Link>
          <Link to="/registered-details" className="flex items-center space-x-2">
            <FaUsers className="text-2xl" />
            {isSidebarOpen && <span className="hover:underline">Registered Detail</span>}
          </Link>
          
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DataTable from 'react-data-table-component';
import { API_URLS } from '../../config';

const RegisteredDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    const fetchRegisteredDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URLS.getUser);
        if (!response.ok) {
          throw new Error('Failed to fetch registered details');
        }
        const data = await response.json();
        setData(data.data);
        setFilteredData(data.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching registered details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredDetails();
  }, []);

  useEffect(() => {
    const result = data.filter(item => {
      return Object.values(item).join(' ').toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search, data]);

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at,
      sortable: true,
    },
  ];

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4 bg-gray-100 min-h-screen">
          <h2 className="text-2xl font-semibold text-center mb-4">Registered Details</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={loading}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default RegisteredDetails;

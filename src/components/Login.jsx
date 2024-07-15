import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_URLS } from '../config';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(API_URLS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      if (data && data.data) {
        // Store user info in sessionStorage
        sessionStorage.setItem("loggedInUserId", data.data.id);
        sessionStorage.setItem("loggedInUserName", data.data.name);
        sessionStorage.setItem("loggedInUserEmail", data.data.email);
        sessionStorage.setItem("loggedInUserContact", data.data.contact);

        login();
        console.log(data);
        toast.success(data.message);  // Ensure this is called
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); // Delay navigation to allow toast to display
      } else {
        throw new Error("User data is missing from the response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className="bg-white p-4 rounded shadow w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login;

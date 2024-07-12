import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Pages/Dashboard";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Registration from './components/Pages/Registration';
// import Footer from './components/Pages/Footer';
import RegisteredDetails from "./components/Pages/RegisteredDetails";
import Profile from './components/Pages/Profile';
import Password from './components/Pages/Password';


function App() {
  return (


    <AuthProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
             <Route path="/profile" element={<Profile />} />
             <Route path="/password" element={<Password/>} />
             <Route path="/registration" element={<Registration />} />
             <Route path="/registered-details" element={<RegisteredDetails />} />
             
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
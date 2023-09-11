import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import UserProfile from './pages/user/Profile';
import RegistrationPage from './pages/login/RegistrationPage';
import ForgotPassword from './pages/login/ForgotPassword';
import Home from './pages/Home';
import './stylesheets/App.css';
import ChangePassword from './pages/login/ChangePassword';
// import { fakeAuthProvider } from "./auth";
const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:token" element={<ChangePassword/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<LoginPage/>} />
        </Routes>
      </Router>
  );
};
export default App;
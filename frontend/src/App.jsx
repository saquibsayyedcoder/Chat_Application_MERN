import React, { useEffect } from 'react';
import Navbar from './Pages/Navbar';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SettingPage from './Pages/SettingPage';
import ProfilePage from './Pages/ProfilePage';
import SignUpPage from './Pages/SignUpPage';
import { useAuthStore } from '../store/useAuthsStore';
import { useThemeStore } from '../store/useThemeStore';
import {Loader} from "lucide-react";
import { Navigate } from 'react-router-dom';
import {Toaster} from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, OnlineUsers } = useAuthStore();
const {theme} = useThemeStore();

console.log({OnlineUsers})

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div  data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ='/login'/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to ='/signup'/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to ='/login'/>} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to ='/profile'/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

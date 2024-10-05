

import React, { Children, useEffect, useState } from "react";
import Landing from './pages/Landing/Landing'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

//Harsh
import Dashboard from "./pages/Dashboard/Dashboard";
import Schemes from "./pages/dashboardpages/Scheme";
import Irrigation from "./pages/dashboardpages/Irrigation";
import HistoricalYield from "@/pages/dashboardpages/Historical";
import AISamadhaan from "@/pages/dashboardpages/Aisamadhan";
import Weather from "@/pages/dashboardpages/Weather";
import User from "@/pages/dashboardpages/User";
import CropDetails from "./pages/dashboardpages/Pesticides";
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        console.log({ response });
      } catch (error) {
        setUserInfo(undefined);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/schemes"
          element={
            <PrivateRoute>
              <Schemes />
            </PrivateRoute>
          }
        />
        <Route
          path="/irrigation"
          element={
            <PrivateRoute>
              <Irrigation />
            </PrivateRoute>
          }
        />
        <Route
          path="/historical"
          element={
            <PrivateRoute>
              <HistoricalYield />
            </PrivateRoute>
          }
        />
        <Route
          path="/pesticide"
          element={
            <PrivateRoute>
              <CropDetails/>
            </PrivateRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <AISamadhaan />
            </PrivateRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <PrivateRoute>
              <Weather />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

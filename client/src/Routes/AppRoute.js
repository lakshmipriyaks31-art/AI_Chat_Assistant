import React, { useCallback, useEffect } from "react";
import {  Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import { useAuth } from '../context/AuthContext';
import NotFoundPage from "../pages/NotFoundPage";

import ConversationPage from '../pages/ConversationPage';
import ChatsPage from '../pages/ChatsPage';
import { getUsers } from "../utils/storage";
export default function AppRoute () {
const {isAuthenticated} = useAuth()
const value= getUsers()
const PrivateRoute = useCallback(({ children })=> {
  return value ? children  : <Navigate to="/login" replace />;
},[value])

/* Redirect authenticated users away from /login */
const PublicRoute=useCallback(({ children })=>{
  return value ? <Navigate to="/chats" replace /> : children ;
},[value])

    return(
        <Routes>
             <Route  path="/"
                    element={
                    <Navigate to="/chats" replace/>
                    }
            />
            <Route  path="/login"
                    element={
                    <PublicRoute>
                        <AuthPage />
                    </PublicRoute>
                    }
            />
            <Route
        path="/chats"
        element={
          <PrivateRoute>
            <ChatsPage />
          </PrivateRoute>
        }
      />
        <Route
        path="/chats/:chatId"
        element={
          <PrivateRoute>
            <ConversationPage />
          </PrivateRoute>
        }
      />
             <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
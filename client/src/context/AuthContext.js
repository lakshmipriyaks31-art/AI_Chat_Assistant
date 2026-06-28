import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { clearUsers, getUsers, saveUsers } from '../utils/storage';
import { loginService,registerService,currentUserService,logoutService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState({});
  const navigate = useNavigate()
  useEffect(()=>{
      getusersdata()
  },[])

  const clearError = useCallback(() => setAuthError({}), []);

  const errorFunction = (data) => {
    for (const [key, value] of Object.entries(data)) {
        if(!value) {
          setAuthError({...authError,...{[key]:`${key} is required`}})
          return true
        }
    }
    return false
  }

  const getusersdata = async()=>{
      const users = await currentUserService();
      if(!users.success) {
        clearUsers()
        navigate('/login')
      }
      
      setCurrentUser(users?.data)
      return true;
  }
   const authfunction = async(values,from)=>{
    errorFunction(values)
    const users =  from =="login"?await loginService(values):await registerService(values);
    
    if(!users?.success){
      clearUsers()
      setAuthError(users?.errors)
      return false
    }
    setCurrentUser(users?.data)
    saveUsers(users?.data?._id)
    setAuthError({});
    return true;
  }


  
  const login = useCallback(async(values) => {
    return await authfunction(values,"login")
  }, []);

  const register = useCallback(async(values) => {
    return await authfunction(values,"register")
  }, []);

  const logout = useCallback(async() => {
    const users = await logoutService();
      setCurrentUser(null)
      clearUsers()
      setAuthError({})
      return true
  }, []);


  const value = {
    currentUser,
    authError,
    clearError,
    login,
    setAuthError,
    register,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

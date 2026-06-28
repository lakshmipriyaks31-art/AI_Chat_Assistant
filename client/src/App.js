import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './Routes/AppRoute';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
   <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <AppRoute />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Login from './pages/Login';
import Children from './pages/Children';
import Home from './pages/Home';
import Register from './pages/Register';
import GetChild from './pages/GetChild';
import NewChild from './pages/NewChild';
import ChildId from './pages/childId';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/children" element={<Children />} />
            <Route path="/new-register" element={<Register />} />
            <Route path="/new-child" element={<NewChild />} />
            <Route path="/perfil-child/:childId" element={<ChildId />} />
            <Route path="/get-child/:id" element={<GetChild />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
  )
}

// Layout privado com Header
const PrivateLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

// 🔓 Rota pública (se tiver token, redireciona)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/home" replace /> : children;
};

export default App

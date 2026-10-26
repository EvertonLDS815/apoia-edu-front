import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Login from './pages/Login';
import GetChildren from './pages/GetChildren';
import Home from './pages/Home';
import NewRecord from './pages/NewRecord';
import GetChild from './pages/GetChild';
import NewChild from './pages/NewChild';
import PerfilChild from './pages/PerfilChild';
import EditRecord from './pages/EditRecord';
import EditChild from './pages/EditChild';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/children" element={<GetChildren />} />
            <Route path="/new-record" element={<NewRecord />} />
            <Route path="/new-child" element={<NewChild />} />
            <Route path="/perfil-child/:childId" element={<PerfilChild />} />
            <Route path="/get-child/:id" element={<GetChild />} />
            <Route path="/edit-record/:recordId" element={<EditRecord />} />
            <Route path="/edit-child/:childId" element={<EditChild />} />
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

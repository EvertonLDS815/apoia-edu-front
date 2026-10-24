import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function logout() {
    localStorage.removeItem('token');
    navigate('/login');
}

export default logout;
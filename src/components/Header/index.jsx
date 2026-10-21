import Logo from "../Logo";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {

    function logout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="header">
                <div className="align-div-h">
                    <a onClick={() => navigate('/')} className="link-logo"><Logo /></a>

                    <nav>
                        <a onClick={() => navigate('/')} className={"nav-link " + (location.pathname === '/home' ? 'active' : '')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54676d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                            Início
                        </a>
                        <a onClick={() => navigate('/children')} className={"nav-link " + (location.pathname === '/children' ? 'active' : '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54676d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            Crianças
                        </a>
                        <a onClick={() => navigate('/new-register')} className={"nav-link " + (location.pathname === '/new-register' ? 'active' : '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54676d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 21h8"></path><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg>
                            Novo Registro
                        </a>
                    </nav>

                    <button onClick={logout} className="logout nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54676d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                        Sair
                    </button>
                </div>
            </header>
    )
}

export default Header
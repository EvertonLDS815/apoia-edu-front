import Logo from "../../components/Logo";
import { useState } from "react";
import api from '../../config';
import { useNavigate } from "react-router-dom";


function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        // Handle login logic here

        api.post('/login', { login, password })
            .then(response => {
               localStorage.setItem('token', response.data.token);
               navigate('/home');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    return (
        <div className="align-form-login">
            <form onSubmit={handleSubmit} className="form-login">
                <div className="form-display">
                    <Logo />
                    <p>Cuidar e acompanhar cada passo.</p>
                </div>
                <label>Usuário
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        />
                </label>
                <label>Senha
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </label>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login;
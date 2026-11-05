import Logo from "../../components/Logo";
import { useState } from "react";
import api from '../../config';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';

function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        // Handle login logic here

        api.post('/login', { login, password })
            .then(({ data }) => {
               localStorage.setItem('token', data.token);
               navigate('/home');
               return toast.success(<div>Bem vindo(a)
                                        <strong style={{ marginLeft: "5px" }}>{data.user.name}</strong>!
                                    </div>);
            })
            .catch(err => {
                console.error('login ou senha inválido!', err);
                return toast.error('Login ou senha inválido!');
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
                        autoCapitalize="none"
                    />
                </label>
                <label>Senha
                <div className="password-wrapper">
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="toggle-password"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                </div>
            </label>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login;
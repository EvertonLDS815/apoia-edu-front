import { useEffect, useState } from "react";
import Header from "../../components/Header"
import api from "../../config";
import { useNavigate } from "react-router-dom";


function Home() {
    const [name, setName] = useState("");
    const [records, setRecords] = useState([]);
    const [children, setChildren] = useState([]);
    
    const navigate = useNavigate();

    function handleGetChild(id) {
        navigate(`/get-child/${id}`);
    }
    
    useEffect(() => {
        async function getChildren() {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.log('Token não encontrado');
                    return;
                }

                const { data } = await api.get('/children');

                setChildren(data);
            } catch (err) {
                console.error(
                    'Erro ao buscar crianças:',
                    err.response?.data || err.message
                );
            }
        }

        getChildren();
    }, []);

    const hoje = new Date();

    const registrosHoje = records.filter((record) => {
        const data = new Date(record.date);

        return (
            data.getDate() === hoje.getDate() &&
            data.getMonth() === hoje.getMonth() &&
            data.getFullYear() === hoje.getFullYear()
        );
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        function getUserByToken() {
            api.get('/user')
            .then(response => {
                setName(response.data.name);
            }
            )
            .catch(error => {
                console.error('Failed to fetch user data:', error);
            });
        }
            getUserByToken(token);
    }, []);


    useEffect(() => {
        async function getRecords() {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.log('Token não encontrado');
                    return;
                }

                const { data } = await api.get('/records');

                setRecords(data);
            } catch (err) {
                console.error(
                    'Erro ao buscar registros',
                    err.response?.data || err.message
                );
            }
        }

        getRecords();
    }, []);

    
    return (
        <>
            <Header />

            <main>
                <div className="box-content">

                    <div>
                        <h1 className="title-name">Olá, {name}!</h1>
                        <p className="p-title">Que bom ter você aqui. Veja o resumo de hoje.</p>
                    </div>

                    <div className="align-buttons">

                        <button className="new-child">+ Nova Criança</button>
                        <button className="new-reg" onClick={() => navigate('/new-register')}>+ Novo Registro</button>
                    </div>
                </div>
                <div className="box-2">
                    <div className="align-data">
                        <div className="box-2-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        </div>
                        <div>
                            <h3>{children.length}</h3>
                            <span className="des">Crianças cadastradas</span>
                        </div>
                    </div>
                    <div className="align-data">
                        <div className="box-2-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>
                        </div>
                        <div>
                            <h3>{registrosHoje.length}</h3>
                            <span className="des">Registros de hoje</span>
                        </div>
                    </div>

                </div>
                        {records.length  === 0 && 
                            <h2 className="title-recent">Sem registros</h2>
                        }
                        {records.length > 0 && 
                        <>
                            <h2 className="title-recent">Registros recentes</h2>

                            <div className="box-3">
                                    {records.map((rec) => (
                                        <div className="recents" key={rec._id} onClick={() => handleGetChild(rec._id)}>
                                            <div>
                                                <strong>{rec.childId.name}</strong>
                                                {rec.behavior.set.length > 0 && 
                                                <p>
                                                    {rec.behavior.set.map((set, index) => (
                                                            <span key={index}>
                                                                {index > 0 && " - "}
                                                                {set}
                                                            </span>
                                                    ))}

                                                    {rec.participation.set.map((set, index) => (
                                                        <span key={index}>
                                                                {" - "}
                                                                {set}
                                                        </span>
                                                    ))}
                                                </p>
                                                }
                                                </div>
                                            <span>{new Date(rec.date).toLocaleDateString("pt-BR")}</span>
                                        </div>
                                    ))}
                            </div>
                        </>
                            }
            </main>
        </>
    )
}

export default Home
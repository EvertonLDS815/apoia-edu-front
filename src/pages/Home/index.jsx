import { useEffect, useState } from "react";
import Header from "../../components/Header"
import api from "../../config";
import { useNavigate } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";


function Home() {
    const [name, setName] = useState("");
    const [records, setRecords] = useState([]);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    function handleGetRecord(id) {
        navigate(`/get-record/${id}`);
    }
    
    useEffect(() => {
    async function loadDashboard() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado");
                return;
            }

            const results = await Promise.allSettled([
                api.get("/user"),
                api.get("/children"),
                api.get("/records")
            ]);

            // Dados do usuário
            if (results[0].status === "fulfilled") {
                setName(results[0].value.data.name);
            } else {
                console.error("Erro ao buscar usuário:", results[0].reason);
            }

            // Crianças cadastradas
            if (results[1].status === "fulfilled") {
                setChildren(results[1].value.data);
            } else {
                console.error("Erro ao buscar crianças:", results[1].reason);
            }

            // Registros
            if (results[2].status === "fulfilled") {
                setRecords(results[2].value.data);
            } else {
                console.error("Erro ao buscar registros:", results[2].reason);
            }
            
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

        loadDashboard();
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

    if (loading) {
        return (
            <>
                <Header />
                <div className="loading-page">
                    <div className="spinner"></div>
                    <p>Carregando informações...</p>
                </div>
            </>
        );
    }

    
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

                        <button className="new-child" onClick={() => navigate('/new-child')}>+ Nova Criança</button>
                        <button className="new-reg" onClick={() => navigate('/new-record')}>+ Novo Registro</button>
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
                                        <div className="recents" key={rec._id} onClick={() => handleGetRecord(rec._id)}>
                                            <div>
                                                <strong>{rec.childId?.name || "Criança não identificada"}</strong>
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
                                            <strong className="span-date">{FormatDate(rec.date)}</strong>
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
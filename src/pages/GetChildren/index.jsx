import { useState, useEffect } from "react";
import Header from "../../components/Header";

import api from '../../config';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function GetChildren() {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadChildren() {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.log('Token não encontrado');
                    return;
                }

                const { data } = await api.get('/children');


                setLoading(false);
                setChildren(data);
            } catch (err) {
                console.error(err);
                return toast.error("Erro ao buscar crianças!");
            }
        }

        loadChildren();
    }, []);

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
                        <h1 className="title-name">Minhas crianças</h1>
                        <p className="p-title">
                            {children.length}{" "}
                            {children.length === 1
                                ? "criança acompanhada"
                                : "crianças acompanhadas"}
                        </p>
                    </div>

                    <div className="align-buttons">

                        <button className="new-reg" onClick={() => navigate('/new-child')}>+ Nova Criança</button>
                    </div>

                </div>
                    <div className="box-4">
                        {children.map((kid) => (
                            <div className="children-content" key={kid._id}>
                                <div className="user-data">
                                    <div className="user-let">
                                        {kid.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-grade">
                                        <strong>{kid.name}</strong>
                                        <span className="des">{kid.grade}</span>
                                    </div>
                                </div>

                                <p>
                                    Último Registro:{" "}
                                    <strong className="date">
                                        {kid.lastRecordDate
                                            ? new Date(kid.lastRecordDate).toLocaleDateString("pt-BR")
                                            : "Nenhum registro"}
                                    </strong>
                                </p>

                                <button className="follow-see" onClick={() => navigate(`/child/record/${kid._id}`)}>Ver acompanhamento</button>
                            </div>
                        ))}
                    </div>
            </main>
        </>
    )
}

export default GetChildren
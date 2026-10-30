
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../config";
import { useEffect, useState } from "react";
import FormatDate from "../../utils/FormatDate";
import DeleteRecord from "../../components/DeleteRecord";

function GetChild() {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { recordId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function loadChild() {
            try {
                const { data } = await api.get(`/record/${recordId}`);
                console.log(data)

                setRecord(data);
            } catch (err) {
                console.log('logout aqui');
                console.error("Erro ao carregar registro:", err);
            } finally {
                setLoading(false);
            }
        }

        loadChild();
    }, [recordId]);

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

    if (!record) {
        return (
            <>
                <Header />
                <main>
                    <h1 className="title-name">Registro não encontrado!!</h1>
                </main>
            </>
        );
    }

    function handleToggleModal() {
        setIsModalVisible((prev) => !prev);
    }

    return (
        <>
            <Header />
            <DeleteRecord
            visible={isModalVisible}
            onClose={handleToggleModal}
            params={recordId}
            date={record.date}
            child={record.childId._id}
            />
            <main>
                <div className="box-content">
                    <div>
                        <h1 className="title-name">
                            {record.childId?.name}
                        </h1>

                        <p className="p-title">
                            Registro de {FormatDate(record.date)}
                        </p>
                    </div>
                    
                </div>

                <div className="soft-card">
                    <div className="p-5">
                        <p className="head-p">Estado emocional / social</p>

                        <p className="body-p">
                            {record.behavior?.set?.join(", ")}
                        </p>
                    </div>

                    <div className="p-5">
                        <p className="head-p">Participação</p>

                        <p className="body-p">
                            {record.participation?.set?.join(", ")}
                        </p>
                    </div>

                    <div className="p-5">
                        <p className="head-p">Relatório</p>

                        <p className="body-p">
                            {record.description}
                        </p>
                    </div>
                    <div className="box-2-content">
                        <div className="align-buttons">
                            <button className="new-child dis-b" onClick={() => navigate(`/edit-record/${record._id}`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
                            Editar
                            </button>
                            <button className="delete-button dis-b" onClick={handleToggleModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            Excluir
                            </button>
                        </div>
                    </div>
                </div>
                <Link to={`/child/record/${record.childId._id}`} className="head-p follow">
                    Voltar ao acompanhamento
                </Link>
            </main>
        </>
    );
}

export default GetChild;

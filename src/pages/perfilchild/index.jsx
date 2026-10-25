import Header from "../../components/Header";
import api from '../../config'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";


function PerfilChild() {
    const [reg, setReg] = useState({ child: null, records: []});
    const { childId } = useParams();

    const navigate = useNavigate();

    
    useEffect(() => {
        async function regChild() {
            try {
                const { data } = await api.get(`/records/${childId}`);

                setReg(data);
            } catch (err) {
                navigate('/home');
                console.error(
                    "Erro ao buscar registros:",
                    err.response?.data || err.message
                );
            }
        }

        if (childId) {
            regChild();
        }
    }, [childId]);



  return (
    <>
        <Header />

        <main>

            <div className="box-content">
                <div>
                    <h1 className="title-name">{reg.child?.name}</h1>
                    <p className="p-title">
                        {reg.child?.grade} · Último registro: {reg.lastRecordDate === null ? "Sem registros" : FormatDate(reg.lastRecordDate)}
                    </p>
                </div>
                <div className="align-buttons">
                    <button className="new-child dis-b" onClick={() => navigate('/edit')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
                    Editar
                    </button>
                    <button className="delete-button dis-b">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Excluir
                    </button>
                </div>
            </div>

            <div className="desc-child">{reg.child?.description}</div>

            <h2 className="title-recent">Histórico de registros</h2>

            {reg.records.length === 0 && <p className="p-title">Nenhum registro ainda.</p>}

            <div className="box-3">
                    {reg.records.map((r) => (
                        <div className="recents" key={r._id}>
                            <div>
                                <strong className="span-date">{FormatDate(r.date)}</strong>
                                <p>
                                    {r.behavior.set.map((set, index) => (
                                        <span key={index}>
                                                {index > 0 && " - "}
                                                {set}
                                        </span>
                                    ))}

                                    {r.participation.set.map((set, index) => (
                                        <span key={index}>
                                                {" - "}
                                                {set}
                                        </span>
                                    ))}
                                </p>
                            </div>

                            <button className="view" onClick={() => navigate(`/get-child/${r._id}`)}>Visualizar</button>
                        </div>
                    ))}
            </div>
        </main>
    </>
  )
}

export default PerfilChild;
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../config";
import { useState } from 'react';

function NewChild() {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    async function handleNewChild(event) {
        event.preventDefault();

        try {
            const child = {
                name,
                grade,
                description
            }

            await api.post('/child', child);

            navigate('/children');
        } catch (err) {
            console.error(
                "Erro ao criar criança",
                err.response?.data || err.message
            )
        }
    }

    return (
        <>
            <Header />

            <main>
                <div className="box-content">
                    <div>
                        <h1 className="title-name">Nova criança</h1>
                        <p className="p-title">Preencha as informações básicas</p>
                    </div>
                </div>

                <form className="form-reg" onSubmit={handleNewChild}>
                    <label>
                        <span className="legend">Nome da criança</span>
                            <input type="text"
                            className="nc-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <span className="legend">Turma</span>
                        <input
                                type="text"
                                className="nc-input"
                                placeholder="Ex: 2º A"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            />
                    </label>
                    <div className="desc-beh">
                        <label>
                            <span className="legend">Observações gerais</span>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                            <button className="new-reg">Salvar criança</button>
                        </label>
                    </div>
                </form>
            </main>
        </>
    )
}

export default NewChild;
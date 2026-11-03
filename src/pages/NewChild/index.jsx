import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../config";
import { useState } from 'react';
import { toast } from "react-toastify";

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

            toast.success("Criança criada com sucesso!");

            navigate('/children');
        } catch (err) {
            console.error(
                "Erro ao criar criança",
                err.response?.data || err.message
            );

            return toast.error("Não foi possível criar a criança.");
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

                <div className="new-record-div">
                    <form className="form-reg" onSubmit={handleNewChild}>
                        <label>
                            <span className="legend">Nome da criança</span>
                                <input type="text"
                                className="nc-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
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
                                    required
                                />
                        </label>
                        <div className="desc-beh">
                            <label>
                                <span className="legend">Observações gerais</span>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                            </label>
                            <button className="new-reg">Salvar criança</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default NewChild;
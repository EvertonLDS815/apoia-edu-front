import { useEffect, useState } from "react"
import Header from "../../components/Header"
import api from "../../config";
import { useNavigate, useParams } from "react-router-dom";


function EditChild() {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [description, setDescription] = useState("");

    const {childId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
    async function getChild() {
        const { data } = await api.get(`/child/${childId}`);

        setName(data.name);
        setGrade(data.grade);
        setDescription(data.description);
    }

    getChild();
}, [])

    async function handleEditChild(event) {
        event.preventDefault();

        try {
            await api.put(`/child/${childId}`, {
                name,
                grade,
                description
            });
            navigate(`/perfil-child/${childId}`);
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Header />

            <main>

                <form className="form-reg" onSubmit={handleEditChild}>
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

export default EditChild
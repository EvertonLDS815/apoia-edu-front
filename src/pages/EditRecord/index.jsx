import Header from "../../components/Header";
import {useState, useEffect} from 'react';
import api from "../../config";
import { useNavigate, useParams } from "react-router-dom";


function EditRecord() {
    const [children, setChildren] = useState([]);
    const [childId, setChildId] = useState("");
    const [behavior, setBehavior] = useState([]);
    const [participation, setParticipation] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true);

    const {recordId} = useParams();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        async function getRecord() {
            try {
                const { data } = await api.get(`/record/${recordId}`);

                setChildId(
                    typeof data.childId === "object"
                        ? data.childId?._id
                        : data.childId
                );

                setBehavior(data.behavior?.set || []);
                setParticipation(data.participation?.set || []);
                setDescription(data.description || "");

                if (data.date) {
                    const parsedDate = new Date(data.date);

                    setDate([
                        parsedDate.getFullYear(),
                        String(parsedDate.getMonth() + 1).padStart(2, "0"),
                        String(parsedDate.getDate()).padStart(2, "0")
                    ].join("-"));
                }
            
                setLoading(false);
            } catch (err) {
                console.error(
                    "Erro ao buscar registro:",
                    err.response?.data || err.message
                );
            }
        }

        if (recordId) {
            getRecord();
        }
    }, [recordId]);

    useEffect(() => {
        async function getChildren() {
            try {
                const { data } = await api.get("/children");
                setChildren(data);
            } catch (err) {
                console.error("Erro ao buscar crianças:", err);
            }
        }

        getChildren();
    }, []);


    function handleToggle(value, state, setState) {
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    }

    function handleSingleToggle(value, setState) {
        setState((prev) => prev === value ? "" : value);
    }

    async function handleEditRecord(event) {
    event.preventDefault();

    try {

        const payload = {
            date: new Date(`${date}T12:00:00`).toISOString(),
            behavior: {
                set: behavior
            },
            participation: {
                set: participation
            },
            description: description,
            childId: childId
        };

        if (participation.length === 0 || behavior.length === 0 || !childId || !date) {
            return alert("Preencha os campos obrigatórios!");
        }

        await api.put(`/record/${recordId}`, payload);

        navigate(`/get-record/${recordId}`);
        } catch (err) {
            console.error("Erro ao atualizar registro:", err);
            alert("Não foi possível atualizar o registro.");
        }
    }

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
            <div className="new-record-div">
                <form className="form-reg" onSubmit={handleEditRecord}>

                        <div className="child-f">
                            <label>
                                <span className="legend">Criança *</span>
                                <select
                                    value={childId}
                                    onChange={(e) => setChildId(e.target.value)}
                                >
                                    <option value="">Selecione...</option>

                                    {children.map((child) => (
                                        <option key={child._id} value={child._id}>
                                            {child.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="legend">Data *</span>
                                <input value={date} type="date" name="date" onChange={(e) => setDate(e.target.value)} />
                            </label>
                        </div>

                            <span className="legend">Estado emocional / social *</span>
                            <div className="behavior">
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Ansioso(a)")}
                                    onClick={() =>
                                        handleToggle("Ansioso(a)", behavior, setBehavior)
                                    }
                                >Ansioso(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Calmo(a)")}
                                    onClick={() =>
                                        handleToggle("Calmo(a)", behavior, setBehavior)
                                    }
                                >Calmo(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Cooperativo(a)")}
                                    onClick={() =>
                                        handleToggle("Cooperativo(a)", behavior, setBehavior)
                                    }
                                >Cooperativo(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Feliz")}
                                    onClick={() =>
                                        handleToggle("Feliz", behavior, setBehavior)
                                    }
                                >Feliz</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Inquieto(a)")}
                                    onClick={() =>
                                        handleToggle("Inquieto(a)", behavior, setBehavior)
                                    }
                                >Inquieto(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Introvertido(a)")}
                                    onClick={() =>
                                        handleToggle("Introvertido(a)", behavior, setBehavior)
                                    }
                                >Introvertido(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Nervoso(a)")}
                                    onClick={() =>
                                        handleToggle("Nervoso(a)", behavior, setBehavior)
                                    }
                                >Nervoso(a)</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Sociável")}
                                    onClick={() =>
                                        handleToggle("Sociável", behavior, setBehavior)
                                    }
                                >Sociável</button>
                                <button
                                    type="button"
                                    aria-pressed={behavior.includes("Sonolento(a)")}
                                    onClick={() =>
                                        handleToggle("Sonolento(a)", behavior, setBehavior)
                                    }
                                >Sonolento(a)</button>
                            </div>
                            <span className="legend">Participação nas atividades *</span>
                            <div className="behavior">
                                <button
                                    type="button"
                                    className={
                                        participation.includes("Participou com apoio")
                                            ? "selected"
                                            : ""
                                    }
                                    aria-pressed={participation.includes("Participou com apoio")}
                                    onClick={() =>
                                        handleSingleToggle("Participou com apoio", setParticipation)
                                    }
                                >Participou com apoio</button>
                                <button
                                    type="button"
                                    className={
                                        participation.includes("Participou sem apoio")
                                            ? "selected"
                                            : ""
                                    }
                                    aria-pressed={participation.includes("Participou sem apoio")}
                                    onClick={() =>
                                        handleSingleToggle("Participou sem apoio", setParticipation)
                                    }
                                >Participou sem apoio</button>
                                <button
                                    type="button"
                                    className={
                                        participation.includes("Não participou")
                                            ? "selected"
                                            : ""
                                    }
                                    aria-pressed={participation.includes("Não participou")}
                                    onClick={() =>
                                        handleSingleToggle("Não participou", setParticipation)
                                    }
                                >Não participou</button>
                            </div>
                            <div className="desc-beh">
                                <label>
                                <span className="legend">Relatório(avanço ou dificuldade observada)</span>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        />
                                </label>
                                <button className="new-reg">Salvar Registro</button>
                            </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default EditRecord
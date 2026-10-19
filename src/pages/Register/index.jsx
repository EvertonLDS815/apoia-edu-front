import Header from "../../components/Header";


function Register() {

    return (

        <>
            <Header />
            <main>
                <div className="box-content">
                    <div>
                        <h1 className="title-name">Novo registro diário</h1>
                        <p className="p-title">Anote como foi o dia da criança. Campos com * são obrigatórios</p>
                    </div>
                </div>

                <form action="" className="form-reg">

                    <div className="child-f">
                        <label>
                            <span className="legend">Criança *</span>
                            <select>
                                <option>Selecione...</option>
                                <option>Sofia</option>
                                <option>Arthur</option>
                            </select>
                        </label>

                        <label>
                            <span className="legend">Data *</span>
                            <input type="date" name="date" />
                        </label>
                    </div>

                        <span className="legend">Comportamento / estado emocional</span>
                        <div className="behavior">
                            <button aria-pressed="false">Ansioso(a)</button>
                            <button aria-pressed="false">Calmo(a)</button>
                            <button aria-pressed="false">Cooperativo(a)</button>
                            <button aria-pressed="false">Feliz</button>
                            <button aria-pressed="false">Inquieto(a)</button>
                            <button aria-pressed="false">Introvertido(a)</button>
                            <button aria-pressed="false">Nervoso(a)</button>
                            <button aria-pressed="false">Sociável</button>
                        </div>
                        <span className="legend">Participação nas atividades</span>
                        <div className="behavior">
                            <button aria-pressed="false">Participou com apoio</button>
                            <button aria-pressed="false">Participou sem apoio</button>
                            <button aria-pressed="false">Não participou</button>
                        </div>
                        <div className="desc-beh">
                            <span className="legend">Relatório(avanço ou dificuldade observada)</span>
                            <textarea />
                            <button type="submit" className="new-reg">Salvar Registro</button>
                        </div>
                </form>
            </main>
        </>
    )
}

export default Register;
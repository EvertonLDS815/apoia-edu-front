import Header from "../../components/Header";

function NewChild() {

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

                <form className="form-reg">
                    <label>
                        <span className="legend">Nome da criança</span>
                        <input type="text" className="nc-input" />
                    </label>
                    <label>
                        <span className="legend">Turma</span>
                        <input type="text" className="nc-input" placeholder="Ex: 2º A" />
                    </label>
                    <div className="desc-beh">
                        <label>
                            <span className="legend">Observações gerais</span>
                            <textarea/>
                            <button className="new-reg">Salvar criança</button>
                        </label>
                    </div>
                </form>
            </main>
        </>
    )
}

export default NewChild;
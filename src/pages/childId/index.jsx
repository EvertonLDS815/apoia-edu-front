import Header from "../../components/Header";


function ChildId() {

  return (
    <>
        <Header />

        <main>

            <div className="box-content">
                <div>
                    <h1 className="title-name">Everton Lino</h1>
                    <p className="p-title">3º ano C · Último registro: 22/10/2026</p>
                </div>
                <div className="align-buttons">
                    <button class="new-child dis-b">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
                    Editar
                    </button>
                    <button class="delete-button dis-b">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Excluir
                    </button>
                </div>
            </div>

            <div className="desc-child">Ele gosta muito de matemática</div>

            <h2 className="title-recent">Histórico de registros</h2>

            <div className="box-3">
                <div className="recents">
                    <div>
                        <strong className="span-date">22/10/2026</strong>
                        <p>
                            <span>Sociável</span>
                            <span>Participou sem apoio</span>
                        </p>
                    </div>

                    <button className="view">Visualizar</button>
                </div>
            </div>
        </main>
    </>
  )
}

export default ChildId;
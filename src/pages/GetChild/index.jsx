
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";

function GetChild() {
    
    const location = useLocation();
    console.log(location.pathname.split('/')[2])
    
    return(
        <>
                <Header />
                <main>
                    <div className="box-content">
                        <div>
                            <h1 class="title-name">Lucas Andrade</h1>
                            <p class="p-title">Registro de 21/10/2026</p></div><div class="align-buttons">
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

                    <div className="soft-card">
                        <div className="p-5">
                            <p className="head-p">Comportamento / estado emocional</p>
                            <p className="body-p">Alegre</p>
                        </div>
                        <div className="p-5">
                            <p className="head-p">Participação</p>
                            <p className="body-p">Participou com apoio</p>
                        </div>
                        <div className="p-5">
                            <p className="head-p">Relatório</p>
                            <p className="body-p">Ele aprendeu a fazer conta de adição.</p>
                        </div>
                    </div>
                </main>
        </>
    )
}

export default GetChild
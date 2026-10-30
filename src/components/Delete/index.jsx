

function Delete({visible, onClose}) {

    if(!visible) {
        return null;
    }

    return(
        <>
            <main className="fix-modal">

                <div className="modal">
                    <h3>Excluir Lucas Andrade?</h3>
                    <p className="p-title">A criança e todos os seus 3 registro(s) serão removidos permanentemente.</p>

                        <div className="align-b2">
                            <button className="cancele-button" onClick={onClose}>Cancelar</button>
                            <button className="delete-2b">Excluir</button>
                        </div>
                </div>
            </main>
        </>
    )
}

export default Delete;
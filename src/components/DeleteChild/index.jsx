import { useNavigate } from "react-router-dom";
import api from "../../config";


function DeleteChild({visible, onClose, params, perfil}) {
    const navigate = useNavigate();

    if(!visible) {
        return null;
    }


    async function deleteChildAndRecords() {
        try {
            await api.delete(`/child/record/${params}`);

            navigate('/children');
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <>
            <main className="fix-modal">

                <div className="modal">
                    <h3>Excluir {perfil.child.name}?</h3>
                    <p className="p-title">A criança e todos os seus {perfil.records.length} registro(s) serão removidos permanentemente.</p>

                        <div className="align-b2">
                            <button className="cancele-button" onClick={onClose}>Cancelar</button>
                            <button className="delete-2b" onClick={deleteChildAndRecords}>Excluir</button>
                        </div>
                </div>
            </main>
        </>
    )
}

export default DeleteChild;
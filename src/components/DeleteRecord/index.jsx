import { useNavigate } from "react-router-dom";
import api from "../../config";
import FormatDate from "../../utils/FormatDate";
import { toast } from "react-toastify";


function DeleteRecord({visible, date, params, onClose, child}) {
    const navigate = useNavigate();

    if(!visible) {
        return null;
    }


    async function deleteRecord() {
        try {
            await api.delete(`/record/${params}`);

            navigate(`/child/record/${child}`);
            return toast.success("Registro deletado!");
        } catch (err) {
            console.error(err);
            return toast.error("Erro ao deletar o registro!");
        }
    }

    return(
        <>
            <main className="fix-modal">

                <div className="modal">
                    <h3>Excluir este registro?</h3>
                    <p className="p-title">O registro de <strong>{FormatDate(date)}</strong> será removido permanentemente.</p>

                        <div className="align-b2">
                            <button className="cancele-button" onClick={onClose}>Cancelar</button>
                            <button className="delete-2b" onClick={deleteRecord}>Excluir</button>
                        </div>
                </div>
            </main>
        </>
    )
}

export default DeleteRecord;
import Modal from "react-modal";
import "./style.css";
import { FaWindowClose } from "react-icons/fa";
import { api } from "../../services/api";

export function ModalDeleteTrack({ modalIsOpen, closeModal, trackDeleteId}) {
  function handleDelete() {
     //recebe o id da faixa e envia requisição para deletar
    api.delete(`faixa/${trackDeleteId}`);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        onRequestClose={closeModal}
        contentLabel="Excluir essa faixa?"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <h2 className="title">Excluir essa faixa?</h2>
          <button className="modal-close" onClick={closeModal}>
            <FaWindowClose size={30} />
          </button>
          <form onSubmit={handleDelete}>
            <div className="button-actions">
              <button
                className="button-register"
                type="submit"
                onClick={handleDelete}
              >
                Confirmar
              </button>
              <button className="button-cancel" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

import Modal from "react-modal";
import { useState } from "react";
import "./style.css";
import { FaWindowClose } from "react-icons/fa";
import { api } from "../../services/api";

export function ModalEditTrack({ modalIsOpen, closeModal, trackUpdatId, trackIdRelated }) {
  //variaveis que guardam os valores dos input
  const [music, setMusic] = useState("");
  const [durationMusic, setDurationMusic] = useState(0);

  async function handleEdit() {
  //cria novo ocjeto com dados do input para editar a faixa
    const newTrack = {
      id: trackUpdatId,
      nome: music,
      duracao: durationMusic,
      album_id: trackIdRelated
    }
    await api.put(`faixa/${trackUpdatId}`, newTrack)

    setMusic('')
    setDurationMusic(0)
    closeModal()
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        onRequestClose={closeModal}
        contentLabel="Editar faixa"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <h2 className="title">Editar Faixa</h2>
          <button className="modal-close" onClick={closeModal}>
            <FaWindowClose size={30} />
          </button>
          <form onSubmit={handleEdit}>
            <div className="album-musics">
              <input
                className="input-text"
                placeholder="Novo nome da música"
                onChange={(event) => setMusic(event.target.value)}
                value={music}
              />
              <input
                className="input-number"
                placeholder="Nova duração"
                type="number"
                onChange={(event) => setDurationMusic(event.target.value)}
                value={durationMusic}
              />
            </div>
            <div className="button-actions">
              <button
                className="button-register"
                type="submit"
                onClick={handleEdit}
              >
                Salvar
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

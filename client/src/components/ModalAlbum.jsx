import Modal from "react-modal";
import { useState } from "react";
import '../styles/modal.css'
import { FaWindowClose } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

export function ModalAlbum({ modalIsOpen, closeModal }) {
  //variaveis que guardam os valores dos input
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState(0);
  const [music, setMusic] = useState("");
  const [durationMusic, setDurationMusic] = useState(0);
  const [album, setAlbum] = useState([]);

  function handleRegister(event) {
    event.preventDefault();
    //colocar log para caso nao clicar no + adcionar musica
  }

  function handleAdd(event) {
    event.preventDefault();

    const albumTemp = {
      album: nameAlbum,
      year: yearAlbum,
      musics: [
        {
          name: music,
          duration: durationMusic,
        },
      ],
    };
    setAlbum(albumTemp);
    setMusic("");
    setDurationMusic(0);
  }

  return (
    <div>
      {console.log(album)}
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        onRequestClose={closeModal}
        contentLabel="Adcionar Album"
      >
        <div className="modal-content">
          <h2 className="title">Adcionar Album</h2>
          <button className="modal-close" onClick={closeModal}>
            <FaWindowClose size={30} />
          </button>
          <form
            onSubmit={() => {
              console.log("cadastrou");
            }}
          >
            <div className="album-title">
              {album?.album ? (
                <>
                  <input
                    disable={true}
                    placeholder="se for true desabilitado"
                    onChange={(event) => setNameAlbum(event.target.value)}
                    className="input-text"
                  />
                  <input
                    placeholder="Ano"
                    type="number"
                    onChange={(event) => setYearAlbum(event.target.value)}
                    className="input-number"
                  />
                </>
              ) : (
                <>
                  <input
                    disable={true}
                    placeholder="Nome do Album"
                    onChange={(event) => setNameAlbum(event.target.value)}
                    className="input-text"
                  />
                  <input
                    placeholder="Ano"
                    type="number"
                    onChange={(event) => setYearAlbum(event.target.value)}
                    className="input-number"
                  />
                </>
              )}
            </div>
            <div className="album-musics">
              <input
                className="input-text"
                placeholder="Nome da música"
                onChange={(event) => setMusic(event.target.value)}
              />
              <input
                className="input-number"
                placeholder="Duração"
                onChange={(event) => setDurationMusic(event.target.value)}
              />
              <button onClick={handleAdd}><FaRegPlusSquare size={25} /></button>
            </div>
            <div className="album-data">
              <h3>Album: Rei do Gado, Ano: 1961</h3>
              <table>
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Faixa</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Alma de boêmio</td>
                    <td>3:15</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Borboleta do asfalto</td>
                    <td>2:59</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Punhal da falsidade</td>
                    <td>3:08</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="button-actions">
              <button className="button-register" type="submit" onClick={handleRegister}>
                Cadastrar
              </button>
              <button className="button-cancel" onClick={closeModal}>Cancelar</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

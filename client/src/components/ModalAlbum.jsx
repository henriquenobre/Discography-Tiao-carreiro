import Modal from "react-modal";
import { useState } from "react";
import "../styles/modal.css";
import { FaWindowClose } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

export function ModalAlbum({ modalIsOpen, closeModal }) {
  //variaveis que guardam os valores dos input
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState(0);
  const [music, setMusic] = useState("");
  const [durationMusic, setDurationMusic] = useState(0);
  const [album, setAlbum] = useState([]);
  const [musicsAlbum, setMusicsAlbum] = useState([]);
  const [counter, setCounter] = useState(1)

  function handleRegister(event) {
    event.preventDefault();
    //colocar log para caso nao clicar no + adcionar musica
  }

  function handleAdd(event) {
    event.preventDefault();

    const updateAlbum = {
      album: nameAlbum,
      year: yearAlbum,
    };
    const updateMusicsALbum = [
      ...musicsAlbum,
      {
        id: counter,
        music: music,
        duration: durationMusic,
      },
    ];

    setAlbum(updateAlbum);
    setMusicsAlbum(updateMusicsALbum);
    setMusic("");
    setDurationMusic(0);
    setCounter(counter + 1)
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        onRequestClose={closeModal}
        contentLabel="Adcionar Album"
        ariaHideApp={false}
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
                    disabled
                    placeholder="se for true desabilitado"
                    onChange={(event) => setNameAlbum(event.target.value)}
                    className="input-text"
                  />
                  <input
                    disabled
                    placeholder="Ano"
                    type="number"
                    onChange={(event) => setYearAlbum(event.target.value)}
                    className="input-number"
                  />
                </>
              ) : (
                <>
                  <input
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
              <button onClick={handleAdd}>
                <FaRegPlusSquare size={25} />
              </button>
            </div>
            <div className="album-data">
              <h3>
                Album: {nameAlbum}, Ano: {yearAlbum}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Faixa</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {musicsAlbum.map((musicsAlbum) => {
                    return (
                      <tr key={musicsAlbum.id}>
                        <td>{musicsAlbum.id}</td>
                        <td>{musicsAlbum.music}</td>
                        <td>{musicsAlbum.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="button-actions">
              <button
                className="button-register"
                type="submit"
                onClick={handleRegister}
              >
                Cadastrar
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

import Modal from "react-modal";
import { useState } from "react";
import "../styles/modal.css";
import { FaWindowClose } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { api } from "../services/api";

export function ModalAlbum({ modalIsOpen, closeModal, albumName }) {
  //variaveis que guardam os valores dos input
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState(0);
  const [music, setMusic] = useState("");
  const [durationMusic, setDurationMusic] = useState(0);
  const [album, setAlbum] = useState([]);
  const [musicsAlbum, setMusicsAlbum] = useState([]);
  const [indexMusic, setIndexMusic] = useState(1)

  //cadastrar album no banco de dados
   function handleRegister(event) {
    event.preventDefault();
  
  //  api.post("faixa", {
  //      "numero": 1,
  //      "nome": "music",
  //      "duracao": 5,
  //      "album_id": 1
  //    }
  //  )

     musicsAlbum.forEach((tracks) =>{
    console.log(tracks);
    api.post("faixa", tracks);
   })
  


    console.log(album, musicsAlbum);
  //  api.post("album", album)
  //  api.post("faixa", musicsAlbum)
  //  setAlbum([])
  //  setMusicsAlbum([])
  //  closeModal()
  }

  //usado para preencher album_id que relaciona as tabelas do banco
  const albumRelated = albumName

  //registrar album e faixas para serem cadastradas
  function handleAdd(event) {
    event.preventDefault();

    const updateAlbum = {
      nome: nameAlbum,
      ano: yearAlbum,
    };
    const updateMusicsALbum = [
      ...musicsAlbum,
      {
        numero: indexMusic,
        nome: music,
        duracao: parseInt(durationMusic),
        album_id: albumRelated.length + 1
      },
    ];

    setAlbum(updateAlbum);
    setMusicsAlbum(updateMusicsALbum);
    setMusic("");
    setDurationMusic(0);
    setIndexMusic(indexMusic + 1)
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
                value={music}
              />
              <input
                className="input-number"
                placeholder="Duração"
                type="number"
                onChange={(event) => setDurationMusic(event.target.value)}
                value={durationMusic}
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
                      <tr key={musicsAlbum.numero}>
                        <td>{musicsAlbum.numero}</td>
                        <td>{musicsAlbum.nome}</td>
                        <td>{musicsAlbum.duracao}</td>
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

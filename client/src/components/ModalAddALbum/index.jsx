import Modal from "react-modal";
import { useState } from "react";
import "./style.css";
import { FaWindowClose, FaRegPlusSquare } from "react-icons/fa";
import { api } from "../../services/api";

export function ModalAddAlbum({ modalIsOpen, closeModalAlbum }) {
  const [nameAlbum, setNameAlbum] = useState("");
  const [yearAlbum, setYearAlbum] = useState(0);
  const [music, setMusic] = useState("");
  const [durationMusic, setDurationMusic] = useState('');
  const [album, setAlbum] = useState([]);
  const [musicsAlbum, setMusicsAlbum] = useState([]);
  const [indexMusic, setIndexMusic] = useState(1);

  //cadastrar album no banco de dados
  async function handleRegister(event) {
    event.preventDefault();

    //envia requisição para cadastrar album
    const resAlbum = await api.post("album", album);

    //adciona o id que relaciona as tabelas
    const newMusicArr = musicsAlbum.map((e) => {
      e.album_id = resAlbum.data.id;
      return e;
    });


    //passa pelo array e envia uma requisição para cada faixa de musica
    for (let i = 0; i < newMusicArr.length; i++) {
      const element = newMusicArr[i];

      try {
        let resMusic = await api.post("faixa", element);
      resMusic.status === 200
          ? console.log("Album adcionado com sucesso")
          : console.log("Houve um erro");
      } catch (error) {
        console.log(error.message);
      }
    }

    setAlbum([])
    setMusicsAlbum([])
    closeModalAlbum()
  }

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
        duracao: durationMusic,
      },
    ];

    setAlbum(updateAlbum);
    setMusicsAlbum(updateMusicsALbum);
    setMusic("");
    setDurationMusic(0);
    setIndexMusic(indexMusic + 1);
  }



  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        onRequestClose={closeModalAlbum}
        contentLabel="Adcionar Album"
        ariaHideApp={false}
      >
        <div className="modal-content">
          <h2 className="title">Adcionar Album</h2>
          <button className="modal-close" onClick={closeModalAlbum}>
            <FaWindowClose size={30} />
          </button>
          <form onSubmit={(event) => handleRegister(event)}>
            <div className="album-title">
              {album?.album ? (
                <>
                  <input
                    disabled
                    placeholder="Nome do album"
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
                onClick={(event) => handleRegister(event)}
              >
                Cadastrar
              </button>
              <button className="button-cancel" onClick={closeModalAlbum}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

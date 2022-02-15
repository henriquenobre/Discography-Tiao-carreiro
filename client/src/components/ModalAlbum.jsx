import Modal from "react-modal";
import { useState } from "react";

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
        onRequestClose={closeModal}
        contentLabel="Adcionar Album"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Adcionar Album</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <form
          onSubmit={() => {
            console.log("cadastrou");
          }}
        >
          <div style={{ display: "flex" }}>
            {album?.album ? (
              <>
                <input
                  disable={true}
                  placeholder="se for true desabilitado"
                  onChange={(event) => setNameAlbum(event.target.value)}
                />
                <input
                  placeholder="Ano"
                  type="number"
                  onChange={(event) => setYearAlbum(event.target.value)}
                />
              </>
            ) : (
              <>
                <input
                  disable={true}
                  placeholder="Nome do Album"
                  onChange={(event) => setNameAlbum(event.target.value)}
                />
                <input
                  placeholder="Ano"
                  type="number"
                  onChange={(event) => setYearAlbum(event.target.value)}
                />
              </>
            )}
          </div>
          <div style={{ display: "flex" }}>
            {album?.musics?.map((music) => (
              <>
                <div key={music}>
                  <input
                    placeholder={music.name}
                    onChange={(event) => setMusic(event.target.value)}
                  />
                  <input
                    placeholder="Duração"
                    onChange={(event) => setDurationMusic(event.target.value)}
                  />
                </div>
              </>
            ))}
            <input
              placeholder="Nome da música"
              onChange={(event) => setMusic(event.target.value)}
            />
            <input
              placeholder="Duração"
              onChange={(event) => setDurationMusic(event.target.value)}
            />
            <button onClick={handleAdd}>+</button>
          </div>
          <button type="submit" onClick={handleRegister}>
            Cadastrar
          </button>
          <button onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
}

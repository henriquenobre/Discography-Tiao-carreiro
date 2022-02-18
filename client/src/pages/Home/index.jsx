import logoImg from "../../assets/images/logoTiao.png";
import { useState, useEffect } from "react";
import "./style.css";
import { ModalAddAlbum } from "../../components/ModalAddALbum";
import { ModalEditTrack } from "../../components/ModalEditTrack";
import { api } from "../../services/api";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export function Home() {
  //constante para abertura e fechamento do modal
  const [modalAlbumIsOpen, setAlbumIsOpen] = useState(false);
  const [modalEditAlbum, setModalEditAlbum] = useState(false);
  const [trackUpdatId, setTrackId] = useState(0);
  const [trackIdRelated, setTrackIdRelated] = useState(0);
  const [album, setAlbum] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllDatas();
  }, []);

  //função que cria um array de objetos relacioando as tabelas de album com a de faixas
  async function getAllDatas() {
    const albumRes = await api.get("album");

    const trackRes = await api.get("faixa");

    const updateAlbum = albumRes.data.map((album) => {
      const newTracks = [];

      //passa em cada objeto retornando os dados das faixas para dentro do novo objeto
      trackRes.data.forEach((track) => {
        if (track.album_id === album.id) {
          newTracks.push(track);
        }
      });

      album.tracks = newTracks;

      return album;
    });

    setAlbum(updateAlbum);
  }

  function deleteTrack(track) {
    api.delete(`faixa/${track}`);
  }

  //funções para abrir e fechar o modal
  function openModalAlbum() {
    setAlbumIsOpen(true);
  }
  function openEditModal(index, idRelated) {
    setTrackId(index);
    setTrackIdRelated(idRelated);
    setModalEditAlbum(true);
  }

  function closeModalAlbum() {
    setAlbumIsOpen(false);
  }
  function closeEditModal() {
    setModalEditAlbum(false);
  }

  console.log(album);

  function handleSearch() {
    for (let i = 0; i < album.length; i++) {
      var tracks = album[i].tracks
      for (let index = 0; index < tracks.length; index++) {
        var trackFound= tracks[index].nome
        if(trackFound === search){
          const seachTrack = tracks[index]
        } else console.log('não encontrou');
      }
    }
  }

  return (
    <div className="containerHome">
      <div className="backgroundTransparent">
        <div className="header">
          <img src={logoImg} alt="" />
          <h1>Discografia</h1>
        </div>
        <div className="modal-add">
          <button className="add-album" onClick={openModalAlbum}>
            Adcionar Album
          </button>
          <ModalAddAlbum
            openModal={openModalAlbum}
            closeModal={closeModalAlbum}
            modalIsOpen={modalAlbumIsOpen}
          />
          <ModalEditTrack
            openModal={openEditModal}
            closeModal={closeEditModal}
            modalIsOpen={modalEditAlbum}
            trackUpdatId={trackUpdatId}
            trackIdRelated={trackIdRelated}
          />
        </div>
        <div className="search">
          <strong>Buscar Música ou Album</strong>
          <div className="searchFlex">
            <input
              type="text"
              placeholder="Digite o nome da música ou do album"
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={handleSearch}>Procurar</button>
          </div>
        </div>
        {album.map((album) => {
          return (
            <div key={album.id} className="table-album">
              <h2>{`Album: ${album.nome} , Ano: ${album.ano}`}</h2>
              <table>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Faixa</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {album.tracks.map((track) => (
                    <tr key={track.id}>
                      <td>{track.numero}</td>
                      <td>{track.nome}</td>
                      <td>{track.duracao}</td>
                      <td
                        onClick={() => openEditModal(track.id, track.album_id)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaEdit />
                      </td>
                      <td
                        onClick={() => deleteTrack(track.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaTrashAlt />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import logoImg from "../../assets/images/logoTiao.png";
import { useState, useEffect } from "react";
import "./style.css";
import { ModalAddAlbum } from "../../components/ModalAddALbum";
import { ModalEditTrack } from "../../components/ModalEditTrack";
import { api } from "../../services/api";
import { FaTrashAlt, FaEdit, FaArrowCircleLeft } from "react-icons/fa";
import { ModalDeleteTrack } from "../../components/ModalDeleteTrack";

export function Home() {
  const [modalAlbumIsOpen, setAlbumIsOpen] = useState(false);
  const [modalEditAlbum, setModalEditAlbum] = useState(false);
  const [modalDeleteTrackIsOpen, setModalDeleteTrackIsOpen] = useState(false);
  const [trackDeleteId, setTrackDeleteId] = useState(0)
  const [trackUpdatId, setTrackId] = useState(0);
  const [trackIdRelated, setTrackIdRelated] = useState(0);
  const [album, setAlbum] = useState([]);
  const [search, setSearch] = useState("");
  const [trackFound, setTrackFound] = useState({})
  useEffect(() => {
    getAllDatas();
  }, [modalAlbumIsOpen]);

  //função que cria uma modalDeleteTrack array de objetos relacioando as tabelas de album com a de faixas
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


  //funções para abrir e fechar modal
  function openModalAlbum() {
    setAlbumIsOpen(true);
  }
  function openEditModal(index, idRelated) {
    setTrackId(index);
    setTrackIdRelated(idRelated);
    setModalEditAlbum(true);
  }
  function openDeleteTrack(track) {
    setTrackDeleteId(track)
    setModalDeleteTrackIsOpen(true)
  }

  function closeModalAlbum() {
    setAlbumIsOpen(false);
  }
  function closeEditModal() {
    setModalEditAlbum(false);
  }
  function closeDeleteTrack() {
    setModalDeleteTrackIsOpen(false)
  }

  //função que passa pelo array de objetos pesquisando a faixa
  function handleSearch() {
    for (let i = 0; i < album.length; i++) {
      var tracks = album[i].tracks
      for (let index = 0; index < tracks.length; index++) {
        var trackFound = tracks[index].nome
        if (trackFound === search) {
          const searchTrack = tracks[index]
          const searchAlbum = album[i]
          setTrackFound({
            album_id: searchAlbum.id,
            album: searchAlbum.nome,
            ano: searchAlbum.ano,
            faixaId: searchTrack.id,
            numero: searchTrack.numero,
            faixa: searchTrack.nome,
            duracao: searchTrack.duracao
          })
        }
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
        <div className="search">
          <strong>Buscar Música</strong>
          <div className="searchFlex">
            <input
              type="text"
              placeholder="Digite o nome da música"
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={handleSearch}>Procurar</button>
          </div>
        </div>
        <div className="modal-add">
          <button className="add-album" onClick={openModalAlbum}>
            Adcionar Album
          </button>
          <ModalAddAlbum
            closeModalAlbum={closeModalAlbum}
            modalIsOpen={modalAlbumIsOpen}
          />
          <ModalEditTrack
            closeModal={closeEditModal}
            modalIsOpen={modalEditAlbum}
            trackUpdatId={trackUpdatId}
            trackIdRelated={trackIdRelated}
          />
          <ModalDeleteTrack
            closeModal={closeDeleteTrack}
            modalIsOpen={modalDeleteTrackIsOpen}
            trackDeleteId={trackDeleteId}
          />
        </div>
        {trackFound?.album ? (
          <div className="table-album">
            <button
              onClick={() => setTrackFound({})}
              style={{ cursor: 'pointer', border: 'none', marginTop: '15px' }}
            >
              <FaArrowCircleLeft size={25} />
            </button>
            <h2>{`Album: ${trackFound.album} , Ano: ${trackFound.ano}`}</h2>
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Faixa</th>
                  <th>Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{trackFound.numero}</td>
                  <td>{trackFound.faixa}</td>
                  <td>{trackFound.duracao}</td>
                  <td
                    onClick={() => openEditModal(trackFound.faixaId, trackFound.album_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaEdit />
                  </td>
                  <td
                    onClick={() => openDeleteTrack(trackFound.faixaId)}
                    style={{ cursor: "pointer" }}
                  >
                    <FaTrashAlt />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          album.map((album) => {
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
                          onClick={() => openDeleteTrack(track.id)}
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
          })
        )
        }
      </div>
    </div>
  );
}

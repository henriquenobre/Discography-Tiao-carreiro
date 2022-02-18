import logoImg from "../assets/images/logoTiao.png";
import { useState, useEffect } from "react";
import "../styles/home.css";
import { ModalAlbum } from "../components/ModalAlbum";
import { api } from "../services/api"

export function Home() {
  //constante para abertura e fechamento do modal
  const [modalAlbumIsOpen, setAlbumIsOpen] = useState(false);
  const [album, setAlbum] = useState([])
  const [musics, setMusics] = useState([])
  const [finalData, setFinalData] = useState([])
  useEffect(() => {
    getAllDatas()
  }, []);


  //função que cria um array de objetos relacioando as tabelas de album com a de faixas
  async function getAllDatas() {

    const albumRes = await api.get("album");
    setAlbum(albumRes.data)

    const trackRes = await api.get("faixa");
    setMusics(trackRes.data)

    const finalData = albumRes.data.map(album => {

      const newTracks = []

      //passa em cada objeto retornando os dados das faixas para dentro do novo objeto
      trackRes.data.forEach(track => {

        if (track.album_id === album.id) {
          newTracks.push(track)
        }

      })

      album.tracks = newTracks

      return album
    })

    setFinalData(finalData)
  }

  //funções para abrir e fechar o modal
  function openModalAlbum() {
    setAlbumIsOpen(true);
  }

  function closeModalAlbum() {
    setAlbumIsOpen(false);
  }

  return (
    <div className="containerHome">
      <div className="backgroundTransparent">
        <div className="header">
          <img src={logoImg} alt="" />
          <h1>Discografia</h1>
        </div>
        <div className="modal-add">
          <button className="add-album" onClick={openModalAlbum}>Adcionar Album</button>
          <ModalAlbum
            openModal={openModalAlbum}
            closeModal={closeModalAlbum}
            modalIsOpen={modalAlbumIsOpen}
            albumName={album}
          />
        </div>
        <div className="search">
          <strong>Buscar Música ou Album</strong>
          <div className="searchFlex">
            <input type="text" placeholder="Digite o nome da música ou do album" />
            <button>Procurar</button>
          </div>
        </div>
        {finalData.map((album) => {
          return (
            <div className="table-album">
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
                  {album.tracks.map(tranck =>
                    <tr>
                      <td>{ tranck.numero }</td>
                      <td>{ tranck.nome }</td>
                      <td>{ tranck.duracao }</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        })
        }
      </div>
    </div>
  );
}

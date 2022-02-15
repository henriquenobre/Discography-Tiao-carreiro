import logoImg from "../assets/images/logoTiao.png";
import { useState } from "react";

import "../styles/home.css";
import { ModalAlbum } from "../components/ModalAlbum";

export function Home() {
  //constante para abertura e fechamento do modal
  const [modalAlbumIsOpen, setAlbumIsOpen] = useState(false);

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
          />
        </div>
        <div className="search">
          <strong>Buscar Música ou Album</strong>
          <div className="searchFlex">
            <input type="text" placeholder="Digite o nome da música ou do album" />
            <button>Procurar</button>
          </div>
        </div>
        <div className="table-album">
          <h2>Album: Rei do Gado, Ano: 1961</h2>
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
      </div>
    </div>
  );
}

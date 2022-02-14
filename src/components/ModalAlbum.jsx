import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export function ModalAlbum({modalIsOpen, closeModal}) {
  
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {console.log('cadastrado')}}
        overlayClassName="react-modal-overlay"
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Adcionar Album</h2>
        <button onClick={closeModal}>X</button>
        <form>
          <input placeholder='Nome do Album'/>
          <input placeholder='Duração'/>
          <button>Cadastrar</button>
          <button onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
}
import Modal from "react-modal";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import "./styles.scss";

Modal.setAppElement("#root");

type DeleteModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteItem: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
};

export function DeleteModal({
  isModalOpen,
  handleCloseModal,
  handleDeleteItem,
  title,
  subtitle,
  buttonText,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="content">
        <DeleteIcon />

        <h1>{title}</h1>
        <p>{subtitle}</p>

        <div className="buttons">
          <button onClick={() => handleCloseModal()}>Cancelar</button>
          <button
            className="red"
            onClick={() => {
              handleDeleteItem();
              handleCloseModal();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

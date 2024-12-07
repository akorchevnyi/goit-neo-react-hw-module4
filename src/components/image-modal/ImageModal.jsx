import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ closeModal, imageUrl }) {
    return (
        <Modal
            className={styles.modal}
            isOpen={!!imageUrl}
            onRequestClose={closeModal}
            overlayClassName={styles.overlay}  // Используем кастомный класс для наложения
        >
            <button className={styles.closeButton} onClick={closeModal}>&times;</button>
            <img className={styles.img} src={imageUrl} alt="image" />
        </Modal>
    );
}

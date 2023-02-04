interface IModalProps {
  children: JSX.Element;
  closeModal: () => void;
  id: string;
}

const Modal = ({ children, closeModal, id }: IModalProps) => {
  return (
    <div id={id} className="modal">
      <div
        className="modal-backdrop"
        onClick={() => {
          closeModal();
        }}
      ></div>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;

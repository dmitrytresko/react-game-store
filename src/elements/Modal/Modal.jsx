// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import closeImg from "../../assets/img/close.png"
import "./styles.scss";

const Modal = ({ opened, type, children, onCloseClick }) => {
  if (!opened) return null;

  return ReactDOM.createPortal(
    <>
      <div className="content-overlay" />

      <div className="modal">
        <div className="modal__head-block">
          <h2 className="modal__title">{type}</h2>
          <button className="modal__close-btn" onClick={onCloseClick}>
            <img src={closeImg}></img>
          </button>
        </div>

        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal;

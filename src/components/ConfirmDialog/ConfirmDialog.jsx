import { useEffect } from "react";
import ReactDOM from "react-dom";
import crossImg from "../../assets/img/cross.jpg";
import "./styles.scss";

const ConfirmDialog = ({
  title,
  children,
  warnLayout = false,
  secondStep = false,
  confirmHandler,
  onCloseClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "overlay");
  });

  return ReactDOM.createPortal(
    <>
      {!secondStep && <div className="content-overlay" />}

      <div className="dialog flex-column center-x">
        <button
          className="modal__close-btn"
          type="button"
          onClick={onCloseClick}
        >
          <img src={crossImg} className="modal__close-btn--img"></img>
        </button>

        <div className="dialog__title center-x">
          <p>{title}</p>
        </div>

        <div className="dialog__body center-x">{children}</div>

        <div className="dialog__footer">
          <button
            className={`dialog__btn ${warnLayout ? "warn-cancel" : "cancel"}`}
            onClick={onCloseClick}
          >
            Cancel
          </button>
          <button
            className={`dialog__btn ${warnLayout ? "warn-confirm" : "confirm"}`}
            onClick={confirmHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default ConfirmDialog;

const AlertBox = ({ title, text, acceptBtn }) => {
  return (
    <div
      className="modal fade"
      id="alertBox"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="alertBoxLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Chiudi
            </button>
            <button type="button" className="btn btn-primary">
              {acceptBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;

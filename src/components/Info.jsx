export const Info = ({ cost, onCostChange, context, onContextChange }) => {
  const handleCostChange = (e) => onCostChange(e.target.value);
  const handleContextChange = (e) => onContextChange(e.target.value);

  return (
    <>
      <div className="input-group w-50">
        <input
          type="text"
          className="form-control"
          aria-label="Costo (Singola lezione)"
          value={cost}
          onChange={handleCostChange}
        />
        <span className="input-group-text">€</span>
      </div>

      <div className="input-group w-50">
        <span className="input-group-text" id="basic-addon1">
          Contesto
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Contesto lezioni"
          value={context}
          onChange={handleContextChange}
        />
      </div>
    </>
  );
};

export default Info;

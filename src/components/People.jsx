import React, { useState } from "react";

export const People = ({ people, onPersonClick }) => {
  const [visible, setVisible] = useState({});

  const handlePersonClick = (p) =>
    onPersonClick(p.map((a) => getDateAndDesc(a, true)));

  const weekDays = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ];

  function getDateAndDesc(evt, style = false) {
    const date = new Date(evt.start.dateTime || evt.start.date);
    const desc = evt.description ? ` (${evt.description})` : "";
    const listStyle = style ? "- " : "";

    const weekDay = weekDays[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${weekDay} ${day}/${month} ore ${hours}:${minutes}`;
    return `${listStyle}${formattedDate}${desc}`;
  }

  function toggleVisibility(key) {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [key]: !prevVisible[key],
    }));
  }

  return (
    <ol className="list-group">
      {Object.keys(people).map((p) => (
        <li key={p} className="list-group-item">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <a
                key={p}
                onClick={() => toggleVisibility(p)}
                style={{ cursor: "pointer" }}
              >
                {p !== "undefined" ? p : "Senza Nome"}
              </a>
              <span className="badge text-bg-primary rounded-pill">
                {people[p].length}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => handlePersonClick(people[p])}
            >
              Invia
            </button>
          </div>
          {visible[p] && (
            <div>
              <ol className="list-group mt-3 mb-2">
                {people[p].map((evt) => {
                  return (
                    <li key={evt.id} className="list-group-item">
                      {getDateAndDesc(evt)}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default People;

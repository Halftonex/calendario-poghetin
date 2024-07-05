import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Info from "./components/Info";
import People from "./components/People";
import AlertBox from "./components/AlertBox";
import "./App.css";

//TODO Aggiornare la pagina quando si fa login o logout
//TODO controllo sul valore del costo quando si invia (che sia un numero)
//FIXME sistemare l'AlertBox(Modal)

function App() {
  const [cost, setCost] = useState(20);
  const [context, setContext] = useState("");
  const [people, setPeople] = useState({});
  const [appointments, setAppointments] = useState([]);

  const handleCost = (newCost) => setCost(newCost);
  const handleContext = (newContext) => setContext(newContext);
  const handleAppointments = (newAppointments) =>
    setAppointments(newAppointments);

  useEffect(() => {
    if (appointments.length > 0) {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(template())}`,
        "_blank"
      );
    }
  }, [appointments]);

  console.log(cost);

  const template = () =>
    `Ciao ☺️\nEcco i nostri appuntamenti${
      context && ` ${context}`
    }:\n\nPer le lezioni le date saranno:\n\n${appointments.join(
      "\n"
    )}\n\n💰 Il totale è quindi di: ${
      cost * appointments.length
    }€\n\nTi ricordo che il pagamento delle lezioni vale come conferma della prenotazione e va effettuato entro la prima settimana.\n\nA presto 😘`;

  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid p-2">
          <a className="navbar-brand" href="#">
            Calendario Poghetin
          </a>
          <Calendar setPeople={setPeople} />
        </div>
      </nav>
      {Object.keys(people).length !== 0 ? (
        <>
          <div className="container d-flex flex-row justify-content-start mt-4 mb-4 gap-5">
            <Info
              cost={cost}
              onCostChange={handleCost}
              context={context}
              onContextChange={handleContext}
            />
          </div>
          <div className="container-fluid">
            <People people={people} onPersonClick={handleAppointments} />
          </div>
        </>
      ) : (
        <div className="container alert alert-warning text-center mt-3">
          Nessun appuntamento trovato.
        </div>
      )}
      <AlertBox title="wee" text="wela" acceptBtn="Invia" />
    </div>
  );
}

export default App;

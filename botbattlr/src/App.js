import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'


function BotCollection() {
  const [bots, setBots] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [army, setArmy] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8001/bots")
      .then((response) => response.json())
      .then((data) => {
        setBots(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error.sorry}</p>;
  } else if (isLoading) {
    return <p>{isLoading}</p>;
  }

  const handleEnlist = (bot) => {
    setArmy([...army, bot]);
  };

  const handleDischarge = (botId) => {
    fetch(`http://localhost:3000/bots/${botId}`, {
      method: "DELETE",
    }).then(() => {
      setArmy(army.filter((bot) => bot.id !== botId));
    });
  };

  return (
    <div>
      <div>
        <h1
           style={{
          textColor: "black",
          textAlign: "center",
        }}
        >My Bot Collection</h1>
      </div>
      <div className="bot-card-container">
        <div className="ui four column grid">
         
          <div className="row">
            {army.map((arm) => (
              <div
                className="col-md-3 bot-card"
                key={arm.id}
                style={{ backgroundColor: "green" }}
              >
                <img src={arm.avatar_url} alt={arm.name} />
                <h2>Name:{arm.name}</h2>
                <h3>Health:{arm.health} ❤️</h3>
                <h3>Damage:{arm.damage}🤜</h3>
                <h3>Armor:{arm.armor}⚡</h3>
                <h3>Bot_class:{arm.bot_class}</h3>
                <button onClick={() => handleDischarge(arm.id)}>
                  Discharge.
                </button>
              </div>
            ))}
          </div>
          <div className="row">
            <h1
              style={{
              textColor: "black",
              textAlign: "center",
          }}
            >Bot collection</h1>
            {bots.map((bot) => (
              <div className="col-md-3 bot-card" key={bot.id}>
                <img src={bot.avatar_url} alt={bot.name} />
                <h2>Name:{bot.name}</h2>
                <h3>❤️ : {bot.health} </h3>
                <h3>🤜:{bot.damage}</h3>
                <h3>⚡:{bot.armor}</h3>
                <h3>Bot_class:{bot.bot_class}</h3>
                <button className="btn btn-primary" onClick={() => handleEnlist(bot)}>
                  Enlist
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function YourArmy() {
  const [army, setArmy] = useState([]);
  const handleDischarge = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: "DELETE",
    }).then(() => {
      setArmy(army.filter((bot) => bot.id !== botId));
    });
  };
  return (
    <div className="army-container">
      <div className="ui segment inverted olive bot-army">
        <div className="ui four column grid">
          <div className="row bot-army-row">
            {army.map((bot) => (
              <div className="bot-card" key={bot.id}>
                <img src={bot.avatar_url} alt={bot.name} />
                <h2>{bot.name}</h2>
                <p>{bot.catchphrase}</p>
                <button onClick={() => handleDischarge(bot.id)}>
                  Discharge
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BotSpecs() {
  return <div></div>;
}

function App() {
  return (
    <div className="App">
      <h1
        style={{
          backgroundColor: "blue",
          textColor: "white",
          textAlign: "center",
        }}
      >
        Bot Battlr
      </h1>
      <BotCollection />
      <YourArmy />
      <BotSpecs />
    </div>
  );
}

export default App;


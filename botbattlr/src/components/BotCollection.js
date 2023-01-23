import React from "react";
import BotCard from "./BotCard";

function BotCollection(props) {

  const bots = props.bots.map((bot) => {
    return <BotCard key={bot.id} bot={bot} botFunction={props.botFunction}   style={{ backgroundColor: "blue" }}/>
  })

  return (
    <div className="ui four column grid">
      <div className="row">
        {bots}
      </div>
    </div>
  );
}

export default BotCollection;


import React from "react";

const Card = ({ task, empty }) => {
    console.log('task', task)
  return <div className={`card ` + (empty ? "card--empty" : "")}>{task}</div>;
};

export default Card;

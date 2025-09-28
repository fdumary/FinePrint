import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Genpage() {
  const Navigate = useNavigate();
  const submission = () => {
    Navigate("/");
  };
  return (
    <>
      <h1>New page</h1>
      <button onClick={submission}>Submit another TOS</button>
    </>
  );
}

export default Genpage;

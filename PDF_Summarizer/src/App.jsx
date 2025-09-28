import { useState } from "react";
import "./App.css";
import Frontpage from "./Frontpage";

function Apps() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <h1>TOS Summarizer</h1>
      </header>
      <Frontpage />
    </>
  );
}

export default Apps;

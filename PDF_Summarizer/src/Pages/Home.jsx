import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  const submission = async (event) => {
    event.preventDefault();
    Navigate("/gen");
  };

  return (
    <>
      <header>
        <h1>TOS Summarizer</h1>
      </header>
      <div className="Frontpginsert">
        <div>
          <form onSubmit={submission}>
            <input name="Paste text here" />
            <div></div>
            <input type="file"></input>
            <div></div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;

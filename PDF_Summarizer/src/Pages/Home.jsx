import { useState } from "react";
import "../App.css";
import { extractTextFromPDF } from "../Summarizer";
import { SimplifyDocument } from "../Summarizer";



function Home() {

  const [extractedText, setExtractedText] = useState([]);
  const [simplifiedText, setSimplifiedText] = useState("");
  const [filePath, setFilePath] = useState("");
  


  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    await SimplifyDocument(file);
    if(!file) return;

    const extracted =await extractTextFromPDF(file);
    setExtractedText(extracted);
    
        // Save file locally or get its path (Node.js backend required)
    const localPath = file.path || URL.createObjectURL(file);
    setFilePath(localPath);
    };
  const handleSimplify = async (e) => {
    e.preventDefault();
    if (!filePath) return;
    const simplified = await SimplifyDocument(filePath);
    setSimplifiedText(simplified);
  };
    

  

  const submission = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget)
  const texts = formdata.get("textsub")
  console.log(texts)
    //Navigate("/gen");
  };
  

  return (
    <>
      <header>
        <h1>TOS Summarizer</h1>
      </header>
      <div className="Frontpginsert">
        <div>
          <form onSubmit={handleSimplify}>
            <input name="textsub" />
            <div></div>
            <input onChange= {handleOnChange}name="filesub" type="file"></input>
            
            <div></div>
            
            <input type="submit" />
          </form>
        </div>
         <div>
        </div>
      </div>
    </>
  );
}

export default Home;

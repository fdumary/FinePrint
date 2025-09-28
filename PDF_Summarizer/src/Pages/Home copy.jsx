import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack';



pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

function Home() {
  const Navigate = useNavigate();
    const [extractedText, setExtractedText] = useState([]);

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    

    setExtractedText([]);
    
    try{
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const numPages = pdfDoc.numPages;
        const pageTexts = [];

        const worker = await createWorker({
          logger: m => console.log(m), // Optional: for progress logging
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // Adjust scale as needed
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          const imageDataURL = canvas.toDataURL('image/png');
          
          

          const { data: { text } } = await worker.recognize(imageDataURL);
          pageTexts.push(text);
          console.log(text)
          
        }

        await worker.terminate();
        setExtractedText(pageTexts);
      };
      reader.readAsArrayBuffer(file)
    } catch (error){
        console.error('Error during OCR process:', error);
    

    }
  }


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
          <form onSubmit={submission}>
            <input name="textsub" />
            <div></div>
            <input onChange= {handleOnChange}name="filesub" type="file"></input>
            
            <div></div>
            
            <input type="submit" />
          </form>
        </div>
         <div>
          <h2>Extracted Text:</h2>
          {extractedText.map((text, index) => (
            <div key={index}>
              <h3>Page {index + 1}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

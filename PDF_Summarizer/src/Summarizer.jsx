import ollama from 'ollama'
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/webpack';



async function UseOllama(prompt) {
    var fullPrompt = "Act as a legal expert and you are reviewing the terms and conditions your client has provided. Your job is to simplify the document into a more understandable form so that your client, who is unfamiliar with legal terminology, can understand it.\n\n";
    fullPrompt += prompt

    const response = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
    })

    let fullResponse = ''
    for await (const part of response) {
        if (part.message?.content) {
            process.stdout.write(part.message.content)
            fullResponse += part.message.content
        }
    }

    return fullResponse
}


pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.mjs';

export async function extractTextFromPDF(file) {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      const maxPages = pdf.numPages;
      const pageTextPromises = [];

      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const pagePromise = pdf.getPage(pageNum).then(page =>
          page.getTextContent().then(textContent =>
            textContent.items.map(item => item.str).join(' ')
          )
        );
        pageTextPromises.push(pagePromise);
      }

      try {
        const allText = await Promise.all(pageTextPromises);
        resolve(allText.join(' '));
      } catch (err) {
        reject(err);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
}

        

    //     new PdfReader().parseFileItems(pdfPath, (err, item) => {
    //         if (err) {
    //             console.error("error:", err);
    //             reject(err);
    //         } else if (!item) {
    //             console.warn("end of file");
    //             // Clean up the extracted text
    //             const cleanedText = pdfText
    //                 .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    //                 .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters if missing
    //                 .replace(/(\w)(\w)/g, '$1$2') // Keep words together
    //                 .trim(); // Remove leading/trailing whitespace

    //             resolve(cleanedText);
    //         } else if (item.text) {
    //             // Check if we need to add spacing based on position
    //             if (lastY !== null && lastX !== null) {
    //                 // If we're on a new line (different Y position)
    //                 if (Math.abs(item.y - lastY) > 1) {
    //                     pdfText += " ";
    //                 }
    //                 // If there's a significant horizontal gap
    //                 else if (item.x - lastX > 10) {
    //                     pdfText += " ";
    //                 }
    //             }

    //             pdfText += item.text;
    //             lastY = item.y;
    //             lastX = item.x + (item.width || 0);
    //             // console.log(item.text);
    //         }
    //     });
    // });
//}



// var givePrompt = " This document constitutes a legally binding agreement (\"Agreement\") between the User (\"You\") and the Service Provider (\"Company\") governing Your access to and use of the services, website, and all associated content (collectively, the \"Service\"). By accessing or using the Service, You acknowledge that You have read, understood, and agree to be bound by these Terms and Conditions. The Company reserves the right, at its sole discretion, to modify or replace these terms at any time without prior notice. Continued use of the Service following any such changes shall constitute Your acceptance of the revised Terms."
// givePrompt += " You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service. You shall not upload or transmit any material that is libelous, defamatory, obscene, or harmful to minors. All intellectual property rights, including but not limited to copyrights, patents, and trademarks in the Service and its contents, are owned by or licensed to the Company. Unauthorized use, reproduction, or distribution of this content is strictly prohibited and may result in civil and criminal penalties, including statutory damages."
// givePrompt += " The Service is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the Company be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses. The Company may terminate or suspend your access to all or part of the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms set forth herein.";

// let extractedText = await extractTextFromPDF("sample.pdf");
// console.log(extractedText);
// UseOllama(extractedText).then(console.log);

export async function SimplifyDocument(file) {
  const extractedText = await extractTextFromPDF(file);
  const simplifiedText = await UseOllama(extractedText);
  return simplifiedText;
}
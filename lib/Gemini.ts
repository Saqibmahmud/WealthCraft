

import {
    GoogleGenerativeAI,
   
  }  from "@google/generative-ai";
 const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
 if (!apiKey) {
   throw new Error("GEMINI_API_KEY is not defined");
 }
 const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export async function run(prompt:string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    return result.response.text();
  }
  
  export default run;
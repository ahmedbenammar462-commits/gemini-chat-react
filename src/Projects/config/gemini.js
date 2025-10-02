import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY ;  // Use environment variable or fallback API key
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      /*console.log(prompt);
      console.log(result.response.text());*/
      return(result.response.text());
    } catch (error) {
      console.error("Error during fetching data:", error);
    }
  }
  
  export default run;
  
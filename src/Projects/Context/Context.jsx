import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(""); // Correction du nom

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + (prev ? " " : "") + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
  };

  const onSent = async (prompt) => {
    if (!prompt) return; // Éviter d'appeler l'API avec un prompt vide

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPrevPrompts((prev) => [...prev, prompt]);
    setInput("");

    try {
      const response = await run(prompt);
      console.log(response);
      if (!response) {
        setResultData("No response from the model.");
        return;
      }

      // Traitement de la réponse
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += `<b>${responseArray[i]}</b>`;
        }
      }

      let newResponse2 = newResponse.replace(/\n/g, "<br/>").replace(/\*/g, "<br/>");
      let newResponseArray = newResponse2.split(" ");

      // Affichage progressif des mots
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.message && error.message.includes("503")) {
        setResultData("The model is overloaded. Please try again later.");
      } else {
        setResultData("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
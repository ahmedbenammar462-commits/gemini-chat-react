import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../Assets/assets";
import Sidebar from "../Sidebar/SideBar";
import { Context } from "../Context/Context";
import DOMPurify from "dompurify"; // Pour sécuriser le rendu HTML

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  // Gestion de la soumission via la touche Entrée
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user} alt="User profile" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                { text: "Suggest beautiful places for a road trip", icon: assets.abd },
                { text: "Plan a weekend getaway itinerary", icon: assets.abe },
                { text: "Recommend scenic hiking trails", icon: assets.abc },
                { text: "Find top-rated restaurants for a trip", icon: assets.abc },
              ].map((card, index) => (
                <div className="card" key={index}>
                  <p>{card.text}</p>
                  <img src={card.icon} alt={card.text} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="User profile" width="50" height="50" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.abd} alt="Gemini response" width="50" height="50" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(resultData.replace(/\n/g, "<br/>")),
                  }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              aria-label="Enter your prompt"
            />
            <div className="search-icons">
              <img src={assets.gallery} alt="Upload image" role="button" aria-label="Upload image" />
              <img src={assets.micro} alt="Voice input" role="button" aria-label="Voice input" />
              {input && (
                <img
                  onClick={() => onSent(input)}
                  src={assets.envoyer}
                  alt="Send prompt"
                  role="button"
                  aria-label="Send prompt"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
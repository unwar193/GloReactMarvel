import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";

const App = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            {/* Главная страница */}
            <Route 
              path="/" 
              element={
                <>
                  <ErrorBoundary>
                    <RandomChar />
                  </ErrorBoundary>
                  <div className="char__content">
                    <ErrorBoundary>
                      <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                  </div>
                  <img className="bg-decoration" src={decoration} alt="vision" />
                </>
              } 
            />
            
            {/* Страница комиксов */}
            <Route 
              path="/comics" 
              element={
                <ErrorBoundary>
                  <ComicsList charId={selectedChar} />
                </ErrorBoundary>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
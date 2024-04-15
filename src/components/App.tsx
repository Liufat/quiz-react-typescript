import React from "react";

import { QuestionsProvider } from "../context/QuestionsContext";
import FirstPage from "./FirstPage";

function App() {
  return (
    <QuestionsProvider>
      <FirstPage />
    </QuestionsProvider>
  );
}

export default App;

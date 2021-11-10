import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./components/UI/Routes/Routers";


const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;

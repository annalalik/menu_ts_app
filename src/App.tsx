import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Home } from "./components/Home";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";

const GeneralWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <GeneralWrapper>
      <GlobalStyle />
      <Outlet />
    </GeneralWrapper>
  );
}

export default App;

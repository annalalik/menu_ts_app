import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";

const GeneralWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <GeneralWrapper>
      <GlobalStyle />
      <Outlet />
    </GeneralWrapper>
  );
}

export default App;

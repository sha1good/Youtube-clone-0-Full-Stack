import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import SidebarMenu from "./components/SidebarMenu";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.bg};
`;

const Main = styled.div`
  flex: 7;
 
`;
const Wrapper = styled.div`
   padding: 20px 40px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
         <BrowserRouter>
         <SidebarMenu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
             <Routes>
                <Route path="/">
                    <Route index element={<Home type="random"/>} />
                    <Route path="trend" element={<Home type="trend"/>} />
                    <Route path="subscriptions" element={<Home  type="sub"/>} />
                    <Route path="search" element={<Search />} />
                    <Route path="signin" element={ currentUser  ? <Home /> : <SignIn />} />
                    <Route path="video">
                       <Route path=":id" element={<Video />} />
                    </Route>
                </Route>
             </Routes>
          </Wrapper>
        </Main>
         </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

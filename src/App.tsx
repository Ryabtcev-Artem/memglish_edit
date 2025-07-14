import './App.scss'
import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App

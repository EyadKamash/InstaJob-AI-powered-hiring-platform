import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import axios from "axios";
import ClientInterface from "./pages/ClientInterface";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clienthome" element={<ClientInterface />} />
      </Route>
    </Routes>
  );
}

export default App;

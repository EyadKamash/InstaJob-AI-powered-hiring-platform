import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import ClientInterface from "./pages/ClientInterface";
import CompanyInterface from "./pages/CompanyInterface";
import { useUser, UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

function AppRoutes() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !user &&
      (location.pathname === "/clienthome" ||
        location.pathname === "/companyhome")
    ) {
      alert("You must be logged in!");
      navigate("/login", { replace: true });
    }
  }, [user, navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user && (
          <>
            <Route path="/clienthome" element={<ClientInterface />} />
            {user.usertype === "company" && (
              <Route path="/companyhome" element={<CompanyInterface />} />
            )}
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;

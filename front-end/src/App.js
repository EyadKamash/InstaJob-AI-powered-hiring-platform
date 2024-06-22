import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import ClientInterface from "./pages/ClientInterface";
import CompanyInterface from "./pages/CompanyInterface";
import { useUser, UserContextProvider } from "./UserContext";
import VideoForm from "./pages/VideoForm";
import VideoInterview from "./pages/VideoInterview";
import axios from "axios";
import Questions from "./pages/Questions";

function App() {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
}

function AppRoutes() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/checkauth", {
          withCredentials: true,
        });
        const user = response.data;
        setUser(user);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setUser(null);
        if (
          location.pathname === "/clienthome" ||
          location.pathname === "/companyhome"
        ) {
          alert("Unauthorized");
          navigate(
            user && user.usertype === "job_seeker" ? "/clienthome" : "/companyhome",
            { replace: true }
          );
        }
      }
    };
  
    checkAuthStatus();
  }, [setUser, navigate, location.pathname]);  // Removed user?.usertype since user might be null initially
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/videoform" element={<VideoForm />} />
        <Route path="/videointerview" element={<VideoInterview />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {user && (
          <>
            {user.usertype === "job_seeker" && (
              <Route path="/clienthome" element={<ClientInterface />} />
            )}
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

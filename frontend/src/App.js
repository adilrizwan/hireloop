import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedUser from "./components/LoggedUser";
import GuestUser from "./components/GuestUser";
import Login from "./pages/Login";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import RegisterApplicant from "./pages/applicant/RegisterApplicant";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import RegisterEmployer from "./pages/employer/RegisterEmployer";
import DashboardApplicant from "./pages/applicant/DashboardApplicant";
import DashboardEmployer from "./pages/employer/DashboardEmployer";

function App() {
  const [user, setIsAuthenticated] = useState(localStorage.getItem("user"));

  useEffect(() => {
    setIsAuthenticated(user);
  }, [user]);
  return (
    <>
      <Router>
        <div className="container">
          {user ? (
            <LoggedUser setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <GuestUser setIsAuthenticated={setIsAuthenticated} />
          )}
          <Routes>
            <Route path="/" element={<Homepage />}>
              {" "}
            </Route>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            >
              {" "}
            </Route>
            <Route
              path="/admin/login"
              element={<LoginAdmin setIsAuthenticated={setIsAuthenticated} />}
            >
              {" "}
            </Route>
            <Route path="/register" element={<RegisterPage />}>
              {" "}
            </Route>
            <Route path="/register/applicant" element={<RegisterApplicant />}>
              {" "}
            </Route>
            <Route path="/register/employer" element={<RegisterEmployer />}>
              {" "}
            </Route>
            <Route path="/register/admin" element={<RegisterAdmin />}>
              {" "}
            </Route>
            <Route path="/applicant/dashboard" element={<DashboardApplicant />}>
              {" "}
            </Route>
            {/* <Route path="/applicant/profile" element={<ApplicantProfile />}>
              {" "}
            </Route> */}
            <Route path="/employer/dashboard" element={<DashboardEmployer />}>
              {" "}
            </Route>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;

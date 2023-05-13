import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedUser from "./components/LoggedUser";
import GuestUser from "./components/GuestUser";
import Login from "./pages/Login";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import RegisterApplicant from "./pages/applicant/RegisterApplicant";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import RegisterEmployer from "./pages/employer/RegisterEmployer";
import DashboardApplicant from "./pages/applicant/DashboardApplicant";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardEmployer from "./pages/employer/DashboardEmployer";

export default function App() {
  const [user] = useState(localStorage.getItem("userRole"));
  return (
    <>
      <Router>
        <div className="container">
          {user ? <LoggedUser></LoggedUser> : <GuestUser></GuestUser>}
          {!user ? (
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<LoginAdmin />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register/admin" element={<RegisterAdmin />} />
              <Route
                path="/register/applicant"
                element={<RegisterApplicant />}
              />
              <Route path="/register/employer" element={<RegisterEmployer />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "APPLICANT" ? (
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/applicant/dashboard"
                element={<DashboardApplicant />}
              ></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "EMPLOYER" ? (
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/employer/dashboard"
                element={<DashboardEmployer />}
              ></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : user === "ADMIN" ? (
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/admin/dashboard"
                element={<DashboardAdmin />}
              ></Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          ) : (
            <NotFound></NotFound>
          )}
          <Footer></Footer>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

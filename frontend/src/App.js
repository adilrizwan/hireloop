import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginAdmin from "./pages/admin/LoginAdmin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import RegisterApplicant from "./pages/applicant/RegisterApplicant";
import RegisterAdmin from "./pages/admin/RegisterAdmin";
import RegisterEmployer from "./pages/employer/RegisterEmployer";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <NavBar id={0}></NavBar>
          <Routes>
            <Route path="/" element={<Homepage />}>
              {" "}
            </Route>
            <Route path="/login" element={<Login />}>
              {" "}
            </Route>
            <Route path="/admin/login" element={<LoginAdmin />}>
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
            <Route path="/applicant/dashboard" element={<Dashboard />}>
              {" "}
            </Route>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;

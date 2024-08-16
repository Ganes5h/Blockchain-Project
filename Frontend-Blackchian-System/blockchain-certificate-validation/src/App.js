import "./App.css";
import { Toaster, toast } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Authentication/Signup";
import Home from "./components/Home.js/Home";
import Goverment from "./components/Government/Govt";
import Student from "./components/Student/Student";
import Industry from "./components/Industry/Industry";
import Institution from "./components/Institute/Institute";
import Institute from "./components/Institute/Institute";
import LoginDialog from "./components/Authentication/LoginDialog";
import SignupDialog from "./components/Authentication/SignupDialog";
import Contact from "./components/Contact/Contact";
import IssuedByYou from "./components/Government/IssuedByYou";
import Validate from "./components/Government/Validate";
import Revoke from "./components/Government/Revoke";
import AllCertificates from "./components/Government/AllCertificates";
import Digiloker from "./components/Government/Digiloker";
import Issue from "./components/Government/Isuue";
import WhatWeDo from "./components/What we do/WhatWeDo";
import About from "./components/About/Aboutus";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
function App() {
  return (
    <Provider store={store}>
      <PerfectScrollbar className="dialog-scrollbar-home">
        <div>
          <Router>
            <Navbar />
            <Routes>
              {/* <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route> */}
              <Route path="/student-section" element={<Student />}></Route>
              <Route path="/industry-section" element={<Industry />}></Route>
              <Route path="/institute-section" element={<Institute />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/what-we-do" element={<WhatWeDo />}></Route>
              <Route path="/about-us" element={<About />}></Route>
            </Routes>
            {/* Government Section Routes */}
            <Routes>
              <Route path="/govt-section" element={<Goverment />}></Route>
              <Route path="/issue-certificate" element={<Issue />}></Route>
              <Route
                path="/validate-certificates"
                element={<Validate />}
              ></Route>
              <Route path="/revoke-certificates" element={<Revoke />}></Route>
              <Route
                path="/issued-certificates"
                element={<IssuedByYou />}
              ></Route>
              <Route
                path="/all-certificates"
                element={<AllCertificates />}
              ></Route>
              <Route path="/digilocker" element={<Digiloker />}></Route>
            </Routes>
            <Routes>
              {/* <Route path="/login" element={<LoginDialog />} />
            <Route path="/signup" element={<SignupDialog />} /> */}
            </Routes>
          </Router>
          <Toaster position="top-right" richColors />
        </div>
      </PerfectScrollbar>
    </Provider>
  );
}

export default App;

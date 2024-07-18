import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import CertificateGenerator from "./components/CertificateGenerator";
import CertificateValidator from "./components/CertificateValidator";
import RegisterPage from "./components/Authentication/RegisterPage";
import Login from "./components/Authentication/Login";
import StudentRegister from "./components/Authentication/Student";

import CertificateTemplate from "./components/CertificateTemplates/Certificate_1/Certificate_1";
import Certificate_2 from "./components/CertificateTemplates/Certificate_2/Certificate_2";
import Certificate_3 from "./components/CertificateTemplates/Certificate_3/Certificate_3";
import SideNavGov from "./components/Government/GovMainLayout/SideNavGov";
import LandingPage from "./components/Landing Page/Landing";
import Certificate_4 from "./components/CertificateTemplates/Certificate_4/Certificate_4";
import NewLogin from "./components/Authentication/NewLogin";
import NewRegister from "./components/Authentication/NewRegister";
import Industry from "./components/Industry/IndustryLayout/SideNavGov";
import NewLandingPage from "./components/Landing Page/NewLandingPage";
import Student from "./components/Student/StudentLayout/SideNavGov";

import Institute from "./components/Institute/InstituteLayout/SideNavGov";
import About from "./components/AboutUs/About";
import GovernmentRegister from "./components/Authentication/GovernmentRegister";
import InstituteRegister from "./components/Authentication/InstituteRegister";
import IndustryRegister from "./components/Authentication/IndustryRegister";
import WhatWeDo from "./components/What_we_do/What_we_do";
import Contact from "./components/Contact/Contact";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/generate" element={<CertificateGenerator />}></Route>
          <Route path="/what_we_do" element={<WhatWeDo />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route> */}
          <Route path="/student_register" element={<StudentRegister />}></Route>
          <Route
            path="/industry_register"
            element={<IndustryRegister />}
          ></Route>
          <Route
            path="/institute_register"
            element={<InstituteRegister />}
          ></Route>
          <Route
            path="/government_register"
            element={<GovernmentRegister />}
          ></Route>
          <Route path="/student" element={<Student />}></Route>
          <Route
            path="/industryregister"
            element={<IndustryRegister />}
          ></Route>
          <Route path="/validate" element={<CertificateValidator />}></Route>
          <Route
            path="/cenrtificate_tenplate_1"
            element={<CertificateTemplate />}
          ></Route>
          <Route
            path="/cenrtificate_tenplate_2"
            element={<Certificate_2 />}
          ></Route>
          <Route
            path="/cenrtificate_tenplate_3"
            element={<Certificate_3 />}
          ></Route>
          <Route path="/government_dashboard" element={<SideNavGov />}></Route>
          <Route path="/industry_dashboard" element={<Industry />}></Route>
          <Route path="/institute_dashboard" element={<Institute />}></Route>
          <Route path="/student_dashboard" element={<Student />}></Route>
          {/* <Route path="/newlanding" element={<NewLandingPage />}></Route> */}
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/cert4" element={<Certificate_4 />}></Route>
          <Route path="/login" element={<NewLogin />}></Route>
          <Route path="/register" element={<NewRegister />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Router>

      {/* <CertificateGenerator />
      <CertificateValidator /> */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;

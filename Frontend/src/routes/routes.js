// import { Route, Routes } from "react-router-dom";
import Login from "../pages/login.js";
import Home from "../pages/home.js";
import ShowDegrees from "../pages/issuer/ShowDegree.js";
import Students from "../pages/issuer/Students.js";
import Features from "../pages/features.js";
import About from "../pages/about.js";
import Contact from "../pages/contact.js";
import Info from "../pages/holder/InfoHolder.js";
import DegreeHolder from "../pages/holder/DegreeHolder.js";
import DetailDegree from "../pages/holder/DetailDegree.js";
import SendProof from "../pages/holder/SendProof.js";
import ChangePassword from "../pages/holder/ChangePassword.js";
import InfoVerifier from "../pages/verifier/InfoVerifier.js";
import Verified from "../pages/verifier/Verified.js";
import InfoIssuer from "../pages/issuer/InfoIssuer.js";
import SignIn from "../pages/signIn/index.js";
export const routes = [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/degrees-issuer",
    page: ShowDegrees,
  },
  {
    path: "/students",
    page: Students,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/info-holder",
    page: Info,
  },
  {
    path: "/info-issuer",
    page: InfoIssuer,
  },
  {
    path: "/degree-holder",
    page: DegreeHolder,
  },
  {
    path: "/degree-holder/detail",
    page: DetailDegree,
  },
  {
    path: "/send-proof",
    page: SendProof,
  },
  {
    path: "/change-password",
    page: ChangePassword,
  },
  {
    path: "/info-verifier",
    page: InfoVerifier,
  },
  {
    path: "/submited-proofs",
    page: Verified,
  },
  {
    path: "/signin",
    page: SignIn,
  },
  // Redirect to Home for any other route
  {
    path: "*",
    page: Home, // Redirect to Home
  },
];

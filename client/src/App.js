import React, { useEffect } from "react";



import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import NotFound from "./pages/not_found/NotFound";
import VerifyUser from "./pages/verify_user/VerifyUser";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/reset_password/ResetPassword";
import UpdatePassword from "./pages/update_password/UpdatePassword";
import ProtectedRoute from "./Protectroute/ProtectRoute";
import Task from "./pages/task/Task";
import Navigation from "./component/navbar/Navigation";
import ReactEndPoint from "./constant/ReactEndPoint";

import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";
import TermCondition from "./pages/term_condition/TermCondition";
import Disclaimer from "./pages/disclaimer/Disclaimer";
import './index.css';

function App() {  
  return (
    <div className="font-monospace">
      <div className="App">
        <Navigation />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path={ReactEndPoint.SIGN_UP} element={<SignUp />} />
          <Route path={ReactEndPoint.LOGIN} element={<Login />} />
          <Route path={ReactEndPoint.PRIVACY_POLICY} element={<PrivacyPolicy companyName="Kru LLC" />} />
          <Route path={ReactEndPoint.TERM_CONDITION} element={<TermCondition companyName="Kru LLC " />}/>
          <Route path={ReactEndPoint.DISCLAIMER} element={<Disclaimer companyName="Kru LLC" />} />
          <Route path={ReactEndPoint.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ReactEndPoint.UPDATE_PASSWORD + "/:token"} element={<UpdatePassword />} />
          <Route path={ReactEndPoint.VERIFY_USER} element={<VerifyUser />} />
          <Route path={ReactEndPoint.TASK} element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;

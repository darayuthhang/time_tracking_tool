import React from "react";



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
import Cookie from "./uti/Cookie";
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {


  const { user, isAuth } = useSelector((state) => state.authReducers)

  const refreshToken = Cookie.getLocalRefreshToken();


  const navigateToHomePage = () => {
    window.location.reload()
    // <Navigate to="/" />
  }
  if (refreshToken) {
    var decoded = jwt_decode(refreshToken);
    //if token expire.
    if (decoded?.exp * 1000 < Date.now()) {
      //check the cookies from back-end
      Cookie.removeUser();
      navigateToHomePage();
      //remove cookies for cookies js
    }
  }

  const handleLogout = () => {
    Cookie.removeUser();
    navigateToHomePage();
  }

  return (
    <div className="font-monospace">
      {/* <Ads dataAdSlot='6642898968' /> */}
      <BrowserRouter >
        <div className="App">
          <Navigation
            isAuth={isAuth}
            handleLogout={handleLogout}

          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={ReactEndPoint.SIGN_UP} element={<SignUp />} />
            <Route path={ReactEndPoint.LOGIN} element={<Login />} />
            <Route path={ReactEndPoint.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={ReactEndPoint.UPDATE_PASSWORD + "/:token"} element={<UpdatePassword />} />
            <Route path={ReactEndPoint.VERIFY_USER} element={<VerifyUser />} />
            <Route path={ReactEndPoint.TASK} element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />

            {/* <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />}>
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes> */}



          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./pages/home/Home";
import SignUp from "./pages/sign_up/SignUp";
import ReactEndPoint from "./constant/ReactEndPoint";
import NotFound from "./pages/not_found/NotFound";
import VerifyUser from "./pages/verify_user/VerifyUser";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/reset_password/ResetPassword";
import UpdatePassword from "./pages/update_password/UpdatePassword";
import ProtectedRoute from "./Protectroute/ProtectRoute";
import Task from "./pages/task/Task";
function App() {
  return (
    <div>
          {/* <Ads dataAdSlot='6642898968' /> */}
      <BrowserRouter >
        <div className="App">
          {/* <Navbar  variant="dark" className={` mb-5 ${styles.darkblue} `}>
            
          </Navbar> */}
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
            }/>
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

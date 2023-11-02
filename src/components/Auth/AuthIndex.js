import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthIndex = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <div className="flex">
        <div className="">
          {showLogin ? (
            <Login onRegisterClick={() => setShowLogin(false)} />
          ) : (
            <Register onLoginClick={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthIndex;

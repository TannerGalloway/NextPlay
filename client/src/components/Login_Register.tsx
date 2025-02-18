import React from "react";
import "../styles/Login_Register.css";

interface Login_RegisterProps {
  authType: string;
}
const Login_Register: React.FC<Login_RegisterProps> = ({ authType }) => {
  return (
    <>
      <div className="authCard">
        <form
          className="authForm"
          action={`/${authType}`}
          method="post"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          {authType === "Register" ? (
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          ) : null}
          <button type="submit">{authType}</button>
        </form>
      </div>
    </>
  );
};

export default Login_Register;

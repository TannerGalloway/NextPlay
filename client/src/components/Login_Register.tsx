import React from "react";
import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";
import axios from "axios";
import "../styles/Login_Register.css";

interface Login_RegisterProps {
  authType: string;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}
const Login_Register: React.FC<Login_RegisterProps> = ({
  authType,
  setSession,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setComfirmPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form validation
    if (authType === "register" && password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    } else if (authType === "register" && password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Submit form data to the server
    axios
      .post(`https://nextplay-dq7r.onrender.com/auth/${authType}`, {
        email: email,
        password: password,
      })
      .then((response) => {
        // Set the supabase session after successful login
        supabase.auth.setSession(response.data.session);
        // Set the session state to the supabase session
        setSession(response.data.session);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="authCard">
        <form className="authForm" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          {authType === "register" ? (
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(event) =>
                setComfirmPassword(event.currentTarget.value)
              }
            />
          ) : null}
          <button type="submit">
            {authType === "register" ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login_Register;

import React from "react";
import { useState } from "react";
import axios from 'axios';
import "../styles/Login_Register.css";

interface Login_RegisterProps {
  authType: string;
}
const Login_Register: React.FC<Login_RegisterProps> = ({ authType }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setComfirmPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authType === "register" && password !== confirmPassword ) {
      alert("Passwords don't match");
      return
    }
    
    axios.post(`http://localhost:8080/auth/${authType}`, {
      email: email,
      password: password,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="authCard">
        <form
          className="authForm"
          onSubmit={handleSubmit}
        >
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
              onChange={(event) => setComfirmPassword(event.currentTarget.value)}
            />
          ) : null}
          <button type="submit">{authType === "register" ? "Register" : "Login"}</button>
        </form>
      </div>
    </>
  );
};

export default Login_Register;

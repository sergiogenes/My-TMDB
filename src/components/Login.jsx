import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const Login = ({ setUser }) => {
  const email = useInput("");
  const password = useInput("");
  const navigate = useNavigate();
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/login/",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((response) => response.data)
      .then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/movie");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={handlerSubmit} className="formLogin">
        <label>E - mail:</label>
        <input type="email" {...email} />
        <label>Password:</label>
        <input type="password" {...password} />
        <button type="submit">Login</button>
      </form>
      <h3>Si no tienes una cuenta podes crearla aquí</h3>
      <Link to="/register">
        <h4>Register</h4>
      </Link>
    </>
  );
};

export default Login;

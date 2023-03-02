import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const userName = useInput("");
  const birthday = useInput("");
  const password = useInput("");
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register/", {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        userName: userName.value,
        birthday: birthday.value,
        password: password.value,
      })
      .then((response) => response.data)
      .then((user) => console.log(user))
      .catch((error) => console.error(error));
    navigate("/login");
  };
  return (
    <form onSubmit={handlerSubmit} style={style}>
      <label>First Name:</label>
      <input type="text" {...firstName} />
      <label>Last Name:</label>
      <input type="text" {...lastName} />
      <label>E - mail:</label>
      <input type="email" {...email} />
      <label>User Name:</label>
      <input type="text" {...userName} />
      <label>Birthday:</label>
      <input type="date" {...birthday} />
      <label>Password:</label>
      <input type="password" {...password} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

const style = {
  display: "flex",
  width: "50%",
  flexDirection: "column",
  justifyContent: "center",
  alingsItems: "center",
  gap: "10px",
  fontSize: "16px",
};

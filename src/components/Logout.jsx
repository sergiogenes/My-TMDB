import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();
  const handlerLogout = (e) => {
    axios
      .post(
        "http://localhost:3001/api/users/logout/",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser({});
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <button onClick={handlerLogout}>Logout</button>
    </>
  );
};

export default Logout;

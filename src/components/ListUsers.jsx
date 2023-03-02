import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/", { withCredentials: true })
      .then((result) => result.data)
      .then((users) => setListUsers(users));
  }, []);

  return (
    <>
      <h1>Lista de usuarios</h1>
      {listUsers.length !== 0 ? (
        listUsers.map((user) => (
          <Link to={`${user.id}`}>
            <h3 key={user.id}>{`${user.userName}`}</h3>
          </Link>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ListUsers;

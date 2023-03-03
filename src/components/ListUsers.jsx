import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";

const ListUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [newSearch, setNewSearch] = useState(false);
  const search = useInput("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/", { withCredentials: true })
      .then((result) => result.data)
      .then((users) => setListUsers(users));
  }, [newSearch]);

  console.log("listUsers  ==>>", listUsers);
  const handlerFind = (e) => {
    e.preventDefault();

    console.log("findUserName ==>>", search.value);
    const findUser =
      listUsers.find((user) => user.userName === search.value) || {};
    console.log("findUser ==>>", findUser);
    if (findUser.id) return setListUsers([findUser]);
    alert("no se ha encontrado ningun usuario con ese User Name!!");
    setNewSearch(!newSearch);
  };

  return (
    <>
      <form className="searchForm" onSubmit={handlerFind}>
        <input type="text" {...search} placeholder="User Name" />
        <button type="submit">Search</button>
      </form>
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

import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = ({ user, setUser }) => {
  return (
    <>
      <nav className="navbar">
        <div>
          <img />
          <h1>
            {user.id
              ? `Wellcome ${user.firstName} !!`
              : "Wellcome to my TMDB !!"}
          </h1>
        </div>

        {user.id ? (
          <>
            <Link to="movie">
              <p>Movies</p>
            </Link>
            <Link to="tv">
              <p>Tv Series</p>
            </Link>
            <Link to="person">
              <p>Persons</p>
            </Link>
            <Link to="favorites">
              <p>Favorites</p>
            </Link>
            <Logout setUser={setUser} />
          </>
        ) : (
          <Link to="login">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;

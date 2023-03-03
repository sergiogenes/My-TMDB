import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = ({ user, setUser }) => {
  return (
    <>
      <nav className="navbar">
        <div className="navbarLogo">
          <Link to="/">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" />
          </Link>
          <h1>
            {user.id
              ? `Wellcome ${user.firstName} !!`
              : "Wellcome to my TMDB !!"}
          </h1>
        </div>

        {user.id ? (
          <div className="navbarLinks">
            <Link to="movie">
              <p>Movies</p>
            </Link>
            <Link to="tv">
              <p>Tv Series</p>
            </Link>
            <Link to="user/favorites/movie">
              <p>Favorites Movies</p>
            </Link>
            <Link to="user/favorites/tv">
              <p>Favorites Tv Series</p>
            </Link>
            <Link to="user">
              <p>List Users</p>
            </Link>
            <Logout setUser={setUser} />
          </div>
        ) : (
          <Link to="login" className="loginButton">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;

import React from 'react';
import logo from '../assets/banana-01.png';
import { useHistory, Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
  const {authorization} = React.useContext(AuthContext);
  console.log(authorization);


  const history = useHistory();

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        {authorization === false && <button
          type="button"
          onClick={() => history.push('/signin')}
        >
          Log in
        </button>}
        {authorization === true && <button
            type="button"
            onClick={() => history.push('/signin')}
        >
          Log out
        </button>}
        {authorization === false && <button
          type="button"
          onClick={() => history.push('/signup')}
        >
          Registreren
        </button>}
      </div>
    </nav>
  );
}

export default NavBar;
import React from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {userLogin} = React.useContext(AuthContext);
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    async function fetchData() {
        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: emailValue,
                password: passwordValue,
            });
            console.log(result.data.accessToken);
            userLogin(result.data.accessToken);
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form
          onSubmit={(e) => {
              e.preventDefault();
              console.log(emailValue, passwordValue);
              fetchData();
          }
      }
      >
          <label>
              E-mailadres
              <input
                  type="text"
                  name="email-address"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
              />
          </label>
          <label>
              Wachtwoord
              <input
                  type="text"
                  name="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
              />
          </label>
        <button
        >
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;
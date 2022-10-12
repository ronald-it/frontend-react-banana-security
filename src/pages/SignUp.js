import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";

function SignUp() {

    const history = useHistory();

    const [emailValue, setEmailValue] = React.useState('');
    const [usernameValue, setUsernameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    async function fetchData() {
        try {
            const result = await axios.post('http://localhost:3000/register', {
                email: emailValue,
                password: passwordValue,
                username: usernameValue,
            });
            console.log(result);
            history.push("/signin")
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(emailValue, usernameValue, passwordValue);
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
                    Gebruikersnaam
                    <input
                        type="text"
                        name="username"
                        value={usernameValue}
                        onChange={(e) => setUsernameValue(e.target.value)}
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
                    type="submit"
                >
                    Registreren
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
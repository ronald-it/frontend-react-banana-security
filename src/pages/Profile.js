import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = React.useContext(AuthContext);
    console.log(user.username, user.email);
    const [data, setData] = React.useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        async function fetchUserData(token) {
            try {
                const result = await axios.get('http://localhost:3000/660/private-content/', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log(result);
                setData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchUserData(token);
    }, [])

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>{data.title}</h2>
                <p>{data.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = React.useContext(AuthContext);
    console.log(user.username, user.email);
    const [profileData, setProfileData] = useState({
        authorization: false,
        user: null,
        status: 'pending',
    });

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
                setProfileData({
                        authorization: true,
                        user: {
                            username: result.data.username,
                            email: result.data.id,
                            id: result.data.id,
                        },
                        status: 'done'
                    }
                )

            } catch (e) {
                console.error(e);
                setProfileData({
                        authorization: false,
                        user: null,
                        status: 'done',
                    }
                );
            }
        }

        fetchUserData(token);
    }, [])

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {profileData.user.username}</p>
                <p><strong>Email:</strong> {profileData.user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                    molestias qui quo unde?</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
import React, { useEffect, useState } from "react";

const Profile = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('user');

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData.user);
        }
    }, []);

    return (
        <div className="profile">
            <h1>User Profile</h1>
            {userData ? (
                <div className="profile-content">
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default Profile;

import React from 'react';

import profile from '../assets/person.svg'; 

const ProfilePic = () =>{
    return (
        <div>
            <img className="profilePic" src={profile}/>
        </div>
    );
}

export default ProfilePic;
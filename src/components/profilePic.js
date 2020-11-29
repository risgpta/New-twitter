import React from 'react';

import profile from '../assets/person.svg'; 

const ProfilePic = (props) =>{
    return (
        <div>
            {
                props.image ? 
                <img className="profilePic" src={props.image}/>
                :
                <img className="profilePic" src={profile}/>
            }
        </div>
    );
}

export default ProfilePic;
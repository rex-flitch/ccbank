import React, { useState } from 'react'
import parse from 'html-react-parser'

const TeamMember = ({ Name, Headshot, Position, Bio }) => {
    const [showBio, setShowBio] = useState(false);
    return (

        <div className='team-flex-item'>
            <div className='item-content'>
                <button className='hover-button' onClick={() => setShowBio(!showBio)}>View Bio</button>
            </div>
            <div className='team-img'><img src={Headshot.data.attributes.url} alt={Name}/></div>
            <h4>{Name}</h4>
            <p>{Position}</p>

            {showBio && (
                <div className="bio-overlay">
                <div className="bio-container">
                    <div className="close-button" onClick={() => setShowBio(false)}>
                    X
                    </div>
                    <div className="bio">
                        <div className="bio-image"><img src={Headshot.data.attributes.url} alt={Name}/></div>
                        <div className="bio-info">
                            <h4>{Name}</h4>
                            <p>{Position}</p>
                            <hr className="orange"></hr>
                            {parse(Bio)}
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default TeamMember;
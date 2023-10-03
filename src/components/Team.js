import React from 'react';
import TeamMember from '../components/TeamMember';

const Team = ({ teamMembers }) => {
console.log(teamMembers);
  return (
    <div className='leadership'>
        <div className='container'>
            <h2 className='center'>Leadership Team</h2>
            <hr className="green center"></hr>
            <div className='team-flex'>
                {teamMembers?.map((member, index) => (
                    <TeamMember
                    key={member.id}
                    Name={member.attributes.Name}
                    Headshot={member.attributes.Headshot}
                    Position={member.attributes.Position}
                    Bio={member.attributes.Bio}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Team;
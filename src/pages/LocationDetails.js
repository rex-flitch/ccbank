import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import HolidayHours from '../components/HolidayHours'
import parse from 'html-react-parser'

const LOCATION = gql`
    query GetLocation($slug: String!) {
        ccBankLocations(filters: { slug: { eq: $slug } }) {
            data {
              attributes {
                City,
                Address,
                State,
                Zip,
                Telephone,
                HasATM,
                Map,
                Image {
                    data {
                        attributes {
                            url
                            alternativeText
                        }
                    }
                }
                LobbyHours,
                DriveThroughHours,
                slug
                Team {
                    TeamMemberName,
                    TeamMemberPhone,
                    TeamMemberPosition,
                    TeamMemberEmail,
                    NMLS,
                    slug,
                    TeamMemberImage {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
              }
            }
        }
    }
`
export default function LocationDetails() {
    const { slug } = useParams()
    const { loading, error, data } = useQuery(LOCATION, {
        variables: { slug: slug }
    })
    const pageclassname = `${slug} location-details-image`;
    console.log(data)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    function extractNumbers(str) {
        return str.replace(/\D/g, '');
    }
    return (
        <main className='wrapper location' id='main' tabindex="-1">
            <div className={pageclassname} style={{backgroundImage: `url(${data.ccBankLocations.data[0].attributes.Image.data.attributes.url})`}}></div>
            <div className='container'>
                <h1 className='center orange mg-top-50'>{data.ccBankLocations.data[0].attributes.City}</h1>
                <hr className='center green' />
                <p className='center'>{data.ccBankLocations.data[0].attributes.Address} {data.ccBankLocations.data[0].attributes.City}, {data.ccBankLocations.data[0].attributes.State} {data.ccBankLocations.data[0].attributes.Zip}</p>
                <p className='center'><Link to={`tel:${data.ccBankLocations.data[0].attributes.Telephone}`}>{data.ccBankLocations.data[0].attributes.Telephone}</Link></p>
                <div className='btn-green center mg-bottom-50'><Link to={data.ccBankLocations.data[0].attributes.Map} target="_blank" rel="noopener noreferrer">Map</Link></div>
            </div>
            <div className='location-team'>
                <h2 className='center'>Team</h2>
                <hr className='green center' />
                <div className='team-container container'>
                    {data.ccBankLocations.data[0].attributes.Team.map((team) => (
                        <div key='team.id' className='location-team-item'>
                            <div className='link-overlay'><Link to={`/team/${team.slug}`}></Link></div>
                            <div className='location-team-image'><img src={team.TeamMemberImage.data.attributes.url} alt={team.TeamMemberImage.data.attributes.alternativeText} /></div>
                            <h3 className='green uppercase'>{team.TeamMemberName}</h3>
                            <p>{parse(team.TeamMemberPosition)}</p>
                            {team.NMLS && 
                                <p>NMLS: {team.NMLS}</p>
                            }
                            <p>{team.TeamMemberPhone}</p>
                            <p>{team.TeamMemberEmail}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container'>
                <div className='location-hours'>
                    {data.ccBankLocations.data[0].attributes.LobbyHours !== null &&
                    <div className='hours-item'>
                        <h2 className='center orange'>Lobby Hours</h2>
                        <hr className='center green' />
                        <p className='center'>{parse(data.ccBankLocations.data[0].attributes.LobbyHours)}</p>
                    </div>
                    }
                    {data.ccBankLocations.data[0].attributes.DriveThroughHours !== null &&
                    <div className='hours-item'>
                        <h2 className='center orange'>Drive Through Hours</h2>
                        <hr className='center green' />
                        <p className='center'>{parse(data.ccBankLocations.data[0].attributes.DriveThroughHours)}</p>
                    </div>
                    }
                </div>
            </div>
            <HolidayHours />
        </main>
    )
}
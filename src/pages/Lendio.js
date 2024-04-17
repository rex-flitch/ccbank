import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'

const LENDIOQUERY = gql`
    query getLendio {
        lendio {
            data {
              id
              attributes {
                Hero {
                  id
                  Title
                  Description
                  ButtonURL
                  ButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
                Title
                Description
                Step1
                Step2
                Step3
                BoxInfo {
                  id
                  MainTitle
                  SuperTitle
                }
                Additional
                TeamMembers {
                  id
                  TeamMemberName
                  TeamMemberPhone
                  TeamMemberEmail
                  TeamMemberPosition
                  TeamMemberImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  slug
                  NMLS
                  Bio
                }
              }
            }
          }
    }
`
export default function Lendio() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(LENDIOQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper partners' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.lendio.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.lendio.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.lendio.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.lendio.data.attributes.Hero.Description)}</p>
                    }
                    {data.lendio.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.lendio.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <div className='steps'>
          <div className='step'>
            <span>1.</span>
            <div>{parse(data.lendio.data.attributes.Step1)}</div>
          </div>
          <div className="line-with-circles"><div className='line'></div></div>
          <div className='step'>
            <span>2.</span>
            <div>{parse(data.lendio.data.attributes.Step2)}</div>
          </div>
          <div className="line-with-circles"><div className='line'></div></div>
          <div className='step'>
            <span>3.</span>
            <div>{parse(data.lendio.data.attributes.Step3)}</div>
          </div>
        </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.lendio.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <p>{data.lendio.data.attributes.Description}</p>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <div className='box-cta mg-auto'>
            {data.lendio.data.attributes.BoxInfo.map((box) => (
                <div key='box.id' className='box-item'>
                    <h4 className='green left'>{box.MainTitle}</h4>
                    <div>{parse(box.SuperTitle)}</div>
                </div>
            ))}
        </div>
      </div>
      <div className='grey-box'>
        <div className='team-container container'>
            {data.lendio.data.attributes.TeamMembers.map((team) => (
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
    </main>
  )
}

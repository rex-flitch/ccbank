import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import HolidayHours from '../components/HolidayHours'
import AccountLogin from '../components/AccountLogin'

const LOCATIONSPAGE = gql`
    query getLocations {
        ccBankLocations(sort:"City:asc") {
            data {
              attributes {
                City,
                Address,
                State,
                Zip,
                Telephone,
                HasATM,
                slug,
                Image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
        }
        location {
            data {
              attributes {
                LocationsHero {
                  Title,
                  Description,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
                HolidaysTitle,
                Holidays,
              }
            }
        }
        holidaySchedules {
            data {
              attributes {
                Date,
                DayOfWeek,
                HolidayName
              }
            }
        }
        ccBankSettings {
            data {
              attributes {
                RouterNumber
              }
            }
        }
    }
`
export default function Locations() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(LOCATIONSPAGE)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  
  return (
    <main className='wrapper locations' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.location.data.attributes.LocationsHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.location.data.attributes.LocationsHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.location.data.attributes.LocationsHero.Description !== null &&
                      <p>{data.location.data.attributes.LocationsHero.Description}</p>
                    }
                    {data.location.data.attributes.LocationsHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.location.data.attributes.LocationsHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className="locations-section container">
        <h2 className='center'>Locations</h2>
        <hr className='green center'></hr>
        <p className='center'>As a valued customer, your feedback is very important to CCBank, so we make it easy for you to
contact us in person, on the phone, or online.</p>
        <div className='location-flex'>
            {data.ccBankLocations.data.map((locate, index) => (
            <div key={locate.id} className='location-item'>
                <div className='location-image'><img src={locate.attributes.Image.data.attributes.url} alt={locate.attributes.City}/></div>
                <div className='location-info'>
                    <h4 className='green'>{locate.attributes.City}</h4>
                    <div className='address'><p>{locate.attributes.Address} {locate.attributes.City}, {locate.attributes.State} {locate.attributes.Zip}</p></div>
                    <div className='telephone'><p>{locate.attributes.Telephone}</p></div>
                    <div className='atm'><p>{locate.attributes.HasATM === true ? 'ATM Available' : 'ATM Not Available'}</p></div>
                    <div className='btn-green'><Link to={`/locations/${locate.attributes.slug}`}>HOURS & DIRECTIONS</Link></div>
                </div>
            </div>
            ))}
        </div>
      </div>
      <HolidayHours />
      <h4 className='center green mg-0 mg-top-50'>Routing Number</h4>
            <p className='center mg-0'>{data.ccBankSettings.data[0].attributes.RouterNumber}</p>
    </main>
  )
}

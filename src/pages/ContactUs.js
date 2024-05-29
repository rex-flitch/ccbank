import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
// import HolidayHours from '../components/HolidayHours'
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
                      alternativeText
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
                        alternativeText
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
        contact {
            data {
              attributes {
                Hero {
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
                JotForm
              }
            }
          }
    }
`
export default function Locations() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const [iframeHeight, setIframeHeight] = useState('600px'); // Default height

    const updateHeightBasedOnWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 540) {
        setIframeHeight('800px'); // Smaller devices
        } else if (screenWidth > 1000) {
        setIframeHeight('600px'); // Larger devices
        } else {
        setIframeHeight('600px'); // Default for others
        }
    };

    useEffect(() => {
        updateHeightBasedOnWidth();
        window.addEventListener('resize', updateHeightBasedOnWidth);

        return () => {
        window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, []);
  const { loading, error, data } = useQuery(LOCATIONSPAGE)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  
  return (
    <main className='wrapper locations' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.contact.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.contact.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.contact.data.attributes.Hero.Description !== null &&
                      <p>{data.contact.data.attributes.Hero.Description}</p>
                    }
                    {data.contact.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.contact.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
                <h2 className='center orange'>Contact Us</h2>
                <hr className='green center'></hr>
                <p className='center'>1909 W. State Street, Pleasant Grove, UT 84062</p>
                <div className='flexbox center max-800 mg-auto mg-top-50'>
                    <div><strong>Phone:</strong><br />801-763-5066</div>
                    <div><strong>Email:</strong><br /><Link to="mailto:customercare@ccbank.com">customercare@ccbank.com</Link></div>
                </div>
                <iframe
                src={data.contact.data.attributes.JotForm}
                title="JotForm"
                width="100%"
                style={{ height: iframeHeight }}
                frameBorder="0"
                />
            </div>
      <div className="locations-section container">
        <h2 className='center'>Locations</h2>
        <hr className='green center'></hr>
        <p className='center'>From St. George to Sandy, our six branch offices are conveniently located to serve your financial needs. While we love when you visit us online, we'd welcome your visit in person at our branch office.</p>
        <div className='location-flex'>
            {data.ccBankLocations.data.map((locate, index) => (
            <div key={locate.id} className='location-item'>
                <div className='location-image'><img src={locate.attributes.Image.data.attributes.url} alt={locate.attributes.Image.data.attributes.alternativeText}/></div>
                <div className='location-info'>

                    <h4 className='green'>{locate.attributes.City}</h4>

                    <div className='address'><p>{locate.attributes.Address}<br />
                    {locate.attributes.City !== 'Corporate Office' &&
                      <span>{locate.attributes.City}, </span>
                    }
                    {locate.attributes.City === 'Corporate Office' &&
                      <span>Pleasant Grove, </span>
                    }
                    {locate.attributes.State} {locate.attributes.Zip}</p></div>
                    <div className='telephone'><p>{locate.attributes.Telephone}</p></div>
                    <div className='atm'><p>{locate.attributes.HasATM === true ? 'ATM Available' : 'ATM Not Available'}</p></div>
                    {locate.attributes.Address !== '1835 W. State Street' &&
                      <div className='btn-green mg-top-20'><Link to={`/locations/${locate.attributes.slug}`}>HOURS & DIRECTIONS</Link></div>
                    }
                </div>
            </div>
            ))}
        </div>
      </div>
      {/* <h4 className='center green mg-0 mg-top-50'>Routing Number</h4>
            <p className='center mg-0'>{data.ccBankSettings.data[0].attributes.RouterNumber}</p> */}
    </main>
  )
}

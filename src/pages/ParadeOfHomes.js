import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
// import HolidayHours from '../components/HolidayHours'
import AccountLogin from '../components/AccountLogin'

const PARADEOFHOMEPAGE = gql`
    query getParade {
        paradeOfHome {
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
                Title
                Description
              }
            }
          }
    }
`
export default function ParadeOfHomes() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const [iframeHeight, setIframeHeight] = useState('1400px'); // Default height

    const updateHeightBasedOnWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 540) {
        setIframeHeight('1600px'); // Smaller devices
        } else if (screenWidth > 1000) {
        setIframeHeight('1400px'); // Larger devices
        } else {
        setIframeHeight('1400px'); // Default for others
        }
    };

    useEffect(() => {
        updateHeightBasedOnWidth();
        window.addEventListener('resize', updateHeightBasedOnWidth);

        return () => {
        window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, []);
  const { loading, error, data } = useQuery(PARADEOFHOMEPAGE)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  
  return (
    <main className='wrapper locations' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.paradeOfHome.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.paradeOfHome.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.paradeOfHome.data.attributes.Hero.Description !== null &&
                      <p>{data.paradeOfHome.data.attributes.Hero.Description}</p>
                    }
                    {data.paradeOfHome.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.paradeOfHome.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
                <h2 className='center orange'>{data.paradeOfHome.data.attributes.Title}</h2>
                <hr className='green center'></hr>
                {data.paradeOfHome.data.attributes.Description !== null &&
                    <div>{parse(data.paradeOfHome.data.attributes.Description)}</div>
                }
                <iframe
                src={data.paradeOfHome.data.attributes.JotForm}
                title="JotForm"
                width="100%"
                style={{ height: iframeHeight }}
                frameBorder="0"
                />
            </div>
      {/* <h4 className='center green mg-0 mg-top-50'>Routing Number</h4>
            <p className='center mg-0'>{data.ccBankSettings.data[0].attributes.RouterNumber}</p> */}
    </main>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
// import HolidayHours from '../components/HolidayHours'
import AccountLogin from '../components/AccountLogin'

const SHMOPTOUT = gql`
    query getshmOptOut {
        shmOptOut {
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
export default function ShmOptOut() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const [iframeHeight, setIframeHeight] = useState('1800px'); // Default height

    const updateHeightBasedOnWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 540) {
        setIframeHeight('2000px'); // Smaller devices
        } else if (screenWidth > 1000) {
        setIframeHeight('1800px'); // Larger devices
        } else {
        setIframeHeight('1800px'); // Default for others
        }
    };

    useEffect(() => {
        updateHeightBasedOnWidth();
        window.addEventListener('resize', updateHeightBasedOnWidth);

        return () => {
        window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, []);
  const { loading, error, data } = useQuery(SHMOPTOUT)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  
  return (
    <main className='wrapper locations' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero bg-center' style={{backgroundImage: `url(${data.shmOptOut.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.shmOptOut.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.shmOptOut.data.attributes.Hero.Description !== null &&
                      <p>{data.shmOptOut.data.attributes.Hero.Description}</p>
                    }
                    {data.shmOptOut.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.shmOptOut.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
                <iframe
                src={data.shmOptOut.data.attributes.JotForm}
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

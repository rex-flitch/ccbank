import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
const CAREERSPAGE = gql`
    query getAbout {
        career {
            data {
              attributes {
                Title,
                WelcomeParagraph,
                CommittedToYou,
                CommittedToYouText,
                EmploymentOpportunitesButtonText,
                EmploymentOpportunitesButtonURL
                CommittedToOur {
                  Title,
                  Description,
                  Image {
                    data {
                      attributes {
                        url,
                        alternativeText
                      }
                    }
                  }
                }
                CareersHero {
                  Title,
                  Description,
                  ButtonURL,
                  ButtonTitle,
                  BackgroundImage {
                    data {
                      attributes {
                        url,
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
export default function Careers() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(CAREERSPAGE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <div className='wrapper careers'>
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND}${data.career.data.attributes.CareersHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-hero'>
                  <h1>{data.career.data.attributes.CareersHero.Title}</h1>
                  <hr className='orange'></hr>
                  {data.career.data.attributes.CareersHero.Description !== null &&
                    <p>{data.career.data.attributes.CareersHero.Description}</p>
                  }
                  {data.career.data.attributes.CareersHero.ButtonTitle !== null &&
                    <div className='btn-green'><Link to=''>{data.career.data.attributes.CareersHero.ButtonTitle}</Link></div>
                  }
              </div>
          </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.career.data.attributes.Title}</h2>
        <hr className="green center"></hr>
        <p className='max-800 mg-auto'>{parse(data.career.data.attributes.WelcomeParagraph)}</p>
      </div>
      <div className='image-cta-grey'>
        <div className='image-cta-grey-box container'>
            <div className='image-cta-grey-info'>
                <h2>{data.career.data.attributes.CommittedToOur.Title}</h2>
                <hr className='green'></hr>
                <p>{data.career.data.attributes.CommittedToOur.Description}</p>
            </div>
            <div className='image-cta-grey-player'>
                <img src={process.env.REACT_APP_BACKEND + data.career.data.attributes.CommittedToOur.Image.data.attributes.url} alt={data.career.data.attributes.CommittedToOur.Image.data.attributes.alternativeText}/>
            </div>
        </div>
      </div>
      <div className='container mg-top-50 mg-bottom-50'>
        <h2 className='center'>{data.career.data.attributes.CommittedToYou}</h2>
        <hr className='center green' />
        <div className='max-800 mg-auto'>{parse(data.career.data.attributes.CommittedToYouText)}</div>
        <div className='btn-green max-800 mg-auto pd-top-20'><Link to={data.career.data.attributes.EmploymentOpportunitesButtonURL}>{data.career.data.attributes.EmploymentOpportunitesButtonText}</Link></div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETPARTNERS = gql`
    query partnersQuery {
        partners {
            data {
              id
              attributes {
                Title
                Logo {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                LogoGrayscale {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                LinkURL
                sku
              }
            }
          }
          partnerPage {
            data {
              attributes {
                Title
                Hero {
                  Title
                  Description
                  ButtonTitle
                  ButtonURL
                  BackgroundImage {
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
export default function Partners() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETPARTNERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper partners' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.partnerPage.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.partnerPage.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.partnerPage.data.attributes.Hero.Description !== null &&
                      <p>{parse(data.partnerPage.data.attributes.Hero.Description)}</p>
                    }
                    {data.partnerPage.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.partnerPage.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.partnerPage.data.attributes.Title}</h2>
        <hr className='green center'></hr>
      </div>
      <div className='partners-section container mg-top-50 mg-bottom-50'>
        <div className='box-cta flex-wrap'>
        {data.partners.data.map((partner) => (
          <div key={partner.id} className={`box-item ${partner.attributes.sku}`}>
            <div><Link to={partner.attributes.LinkURL}><img src={partner.attributes.Logo.data.attributes.url} alt={partner.attributes.Logo.data.attributes.alternativeText} /></Link></div>
          </div>
        ))}
        </div>
      </div>
    </main>
  )
}

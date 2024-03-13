import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const SITEMAP = gql`
    query getSiteMap {
        siteMap {
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
                Sitemap {
                  id
                  LinkTitle
                  LinkURL
                }
              }
            }
          }
    }
`
export default function SiteMap() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(SITEMAP)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper personal-banking' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' id={`sba-hero-id-${data.siteMap.data.attributes.Hero.id}`} style={{backgroundImage: `url(${data.siteMap.data.attributes.Hero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.siteMap.data.attributes.Hero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.siteMap.data.attributes.Hero.Description !== null &&
                      <p>{data.siteMap.data.attributes.Hero.Description}</p>
                    }
                    {data.siteMap.data.attributes.Hero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.siteMap.data.attributes.Hero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='bg-grey pd-tb-50'>
        <div className='container'>
        {data.siteMap.data.attributes.Sitemap.map((sitemap) => (
            <div key={sitemap.id} className='sitemap'>
                <Link to={sitemap.LinkURL}>{sitemap.LinkTitle}</Link>
            </div>
        ))}
        </div>
     </div>
    </main>
  )
}

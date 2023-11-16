import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BILLERSOLUTIONSAUTH = gql`
    query billerSolutions {
        billerSolutionsAuthorizationAchDebit {
            data {
              id
              attributes {
                Title
                MainContent
                AuthAchHero {
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
              }
            }
          }
    }
`
export default function AuthorizationAchDebits() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BILLERSOLUTIONSAUTH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper biller-solutions' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.Description !== null &&
                      <p>{data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.Description}</p>
                    }
                    {data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.billerSolutionsAuthorizationAchDebit.data.attributes.AuthAchHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.billerSolutionsAuthorizationAchDebit.data.attributes.Title}</h2>
        <div>{parse(data.billerSolutionsAuthorizationAchDebit.data.attributes.MainContent)}</div>
      </div>
    </main>
  )
}

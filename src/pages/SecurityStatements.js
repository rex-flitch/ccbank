import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const BILLERSOLUTIONSAUTH = gql`
    query billerSolutions {
        securityStatement {
            data {
              id
              attributes {
                Title
                MainContent
                SecurityStatementHero {
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
export default function SecurityStatements() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(BILLERSOLUTIONSAUTH)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper biller-solutions' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.securityStatement.data.attributes.SecurityStatementHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.securityStatement.data.attributes.SecurityStatementHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.securityStatement.data.attributes.SecurityStatementHero.Description !== null &&
                      <p>{data.securityStatement.data.attributes.SecurityStatementHero.Description}</p>
                    }
                    {data.securityStatement.data.attributes.SecurityStatementHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.securityStatement.data.attributes.SecurityStatementHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.securityStatement.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div>{parse(data.securityStatement.data.attributes.MainContent)}</div>
      </div>
    </main>
  )
}

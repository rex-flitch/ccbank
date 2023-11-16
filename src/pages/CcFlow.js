import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import AccountLogin from '../components/AccountLogin'
const GETCCFLOW = gql`
    query ccFlowQuery {
        ccFlow {
            data {
              attributes {
                CCFlowHero {
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
                QA {
                  id
                  Question
                  Answer
                }
              }
            }
          }
          affiliatedCompaniesDisclaimers {
            data {
              attributes {
                Info
              }
            }
          }
    }
`
export default function CcFlow() {
  //const { loading, error, data } = useFetch('http://localhost:1337/api/image-ctas')
  const { loading, error, data } = useQuery(GETCCFLOW)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)
  return (
    <main className='wrapper opp-loans' id='main' tabindex="-1">
      <div className='hero-banner'>
          <div className='hero' style={{backgroundImage: `url(${data.ccFlow.data.attributes.CCFlowHero.BackgroundImage.data[0].attributes.url})`}}>
              <div className='grad-overlay'></div>
              <div className='inner-container'>
                <AccountLogin />
                <div className='inner-hero'>
                    <h1>{data.ccFlow.data.attributes.CCFlowHero.Title}</h1>
                    <hr className='orange'></hr>
                    {data.ccFlow.data.attributes.CCFlowHero.Description !== null &&
                      <p>{parse(data.ccFlow.data.attributes.CCFlowHero.Description)}</p>
                    }
                    {data.ccFlow.data.attributes.CCFlowHero.ButtonTitle !== null &&
                      <div className='btn-green'><Link to=''>{data.ccFlow.data.attributes.CCFlowHero.ButtonTitle}</Link></div>
                    }
                </div>
              </div>
          </div>
      </div>
      <div className='container mg-top-80 mg-bottom-50'>
        <h2 className='center orange'>{data.ccFlow.data.attributes.Title}</h2>
        <hr className='green center'></hr>
        <div className='max-800 mg-auto'>{parse(data.ccFlow.data.attributes.Description)}</div>
      </div>
      <div className='qa-section container mg-top-100'>
        <h2 className='center mg-top-50'>Frequently Asked Questions</h2>
        <hr className='center green'></hr>
        
        <div className='qa-container'>
        {data.ccFlow.data.attributes.QA.map((item) => (
          <details className='qa-item'>
            <summary className='question'>{item.Question}</summary>
            <div className='answer'>{parse(item.Answer)}</div>
          </details>
          ))}
        </div>
      </div>
      <h6 className='container mg-bottom-50'>{parse(data.affiliatedCompaniesDisclaimers.data[0].attributes.Info)}</h6>
    </main>
  )
}
